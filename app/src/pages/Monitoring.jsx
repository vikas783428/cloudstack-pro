import { useEffect, useMemo, useState } from 'react'
import { getMonitoringData } from '../lib/api'

function Monitoring({ onNavigate }) {
  const [provider, setProvider] = useState('All')
  const [timeRange, setTimeRange] = useState('24h')

  const [metrics, setMetrics] = useState([])
  const [summary, setSummary] = useState({
    healthyResources: 0,
    warnings: 0,
    stopped: 0,
    averageCpu: 0,
    totalResources: 0,
    runningResources: 0,
    systemHealth: 0,
  })

  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true

    const loadMonitoring = async () => {
      try {
        setError('')

        const data = await getMonitoringData()

        if (!mounted) return

        if (data.success && data.monitoring) {
          setMetrics(
            Array.isArray(data.monitoring.metrics)
              ? data.monitoring.metrics
              : []
          )

          setSummary(
            data.monitoring.summary || {
              healthyResources: 0,
              warnings: 0,
              stopped: 0,
              averageCpu: 0,
              totalResources: 0,
              runningResources: 0,
              systemHealth: 0,
            }
          )

          setAlerts(
            Array.isArray(data.monitoring.alerts)
              ? data.monitoring.alerts
              : []
          )
        } else {
          setMetrics([])
          setAlerts([])
          setError('Failed to load monitoring data')
        }
      } catch (err) {
        console.error('Failed to load monitoring data:', err)

        if (!mounted) return

        setMetrics([])
        setAlerts([])
        setError('Unable to connect to monitoring API')
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    loadMonitoring()

    return () => {
      mounted = false
    }
  }, [])

  const filteredMetrics = useMemo(() => {
    if (provider === 'All') {
      return metrics
    }

    return metrics.filter(
      (metric) => metric.provider === provider
    )
  }, [metrics, provider])

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Header */}
      <header className="flex min-h-16 items-center justify-between border-b border-slate-800 bg-slate-900/60 px-5 sm:px-6">

        <div>
          <p className="text-xs text-slate-500">
            WORKSPACE
          </p>

          <div className="flex items-center gap-3">

            <button
              onClick={() => onNavigate('overview')}
              className="text-slate-400 transition hover:text-white"
            >
              ←
            </button>

            <h1 className="text-lg font-semibold">
              Monitoring
            </h1>

          </div>
        </div>

        <div className="flex items-center gap-3">

          <select
            value={timeRange}
            onChange={(event) => setTimeRange(event.target.value)}
            className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-slate-300 outline-none focus:border-blue-500"
          >
            <option value="1h">Last 1 hour</option>
            <option value="6h">Last 6 hours</option>
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
          </select>

          <span className="hidden rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400 sm:inline-flex">
            ● Live
          </span>

        </div>

      </header>

      <main className="p-5 sm:p-6">

        <div className="mx-auto max-w-7xl">

          {/* Intro */}
          <div className="mb-7">

            <h2 className="text-2xl font-bold">
              Infrastructure Monitoring
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Monitor the health and performance of your cloud infrastructure.
            </p>

            {error && (
              <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3 text-xs text-red-400">
                {error}
              </div>
            )}

          </div>

          {/* Summary */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <MetricCard
              label="Healthy Resources"
              value={
                loading
                  ? '...'
                  : summary.healthyResources
              }
              icon="✓"
              success
            />

            <MetricCard
              label="Warnings"
              value={
                loading
                  ? '...'
                  : summary.warnings
              }
              icon="!"
              warning
            />

            <MetricCard
              label="Stopped"
              value={
                loading
                  ? '...'
                  : summary.stopped
              }
              icon="Ⅱ"
            />

            <MetricCard
              label="Average CPU"
              value={
                loading
                  ? '...'
                  : `${summary.averageCpu}%`
              }
              icon="◉"
            />

          </div>

          {/* Performance */}
          <div className="mt-6 grid gap-6 lg:grid-cols-3">

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 lg:col-span-2">

              <div className="flex items-start justify-between">

                <div>
                  <h3 className="font-semibold">
                    Performance Overview
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Average infrastructure performance
                  </p>
                </div>

                <span className="text-xs text-slate-500">
                  {timeRange}
                </span>

              </div>

              {/* Performance chart */}
              <div className="mt-6 h-56 rounded-xl border border-slate-800 bg-slate-950 p-5">

                {loading ? (
                  <div className="flex h-full items-center justify-center text-xs text-slate-600">
                    Loading performance data...
                  </div>
                ) : metrics.length === 0 ? (
                  <div className="flex h-full items-center justify-center text-xs text-slate-600">
                    No monitoring data available
                  </div>
                ) : (
                  <div className="flex h-full items-end gap-2">

                    {metrics.map((metric) => (
                      <div
                        key={metric.id || metric.name}
                        title={`${metric.name}: ${metric.cpu}% CPU`}
                        className="flex-1 rounded-t bg-blue-600/70 transition hover:bg-blue-500"
                        style={{
                          height: `${Math.max(
                            metric.cpu,
                            5
                          )}%`,
                        }}
                      />
                    ))}

                  </div>
                )}

              </div>

              <div className="mt-4 flex justify-between text-xs text-slate-600">
                <span>00:00</span>
                <span>06:00</span>
                <span>12:00</span>
                <span>18:00</span>
                <span>Now</span>
              </div>

            </div>

            {/* Health */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <h3 className="font-semibold">
                System Health
              </h3>

              <div className="mt-6 flex items-center justify-center">

                <div className="flex h-36 w-36 items-center justify-center rounded-full border-[14px] border-emerald-500/30">

                  <div className="text-center">

                    <p className="text-3xl font-bold">
                      {loading
                        ? '...'
                        : `${summary.systemHealth}%`}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {summary.systemHealth >= 80
                        ? 'Healthy'
                        : 'Needs attention'}
                    </p>

                  </div>

                </div>

              </div>

              <div className="mt-6 space-y-3">

                <HealthRow
                  label="Services"
                  value={
                    loading
                      ? '...'
                      : `${summary.runningResources} / ${summary.totalResources}`
                  }
                />

                <HealthRow
                  label="Resources"
                  value={
                    loading
                      ? '...'
                      : `${summary.healthyResources} / ${summary.totalResources}`
                  }
                />

                <HealthRow
                  label="Monitoring"
                  value={loading ? '...' : 'Active'}
                />

              </div>

            </div>

          </div>

          {/* Resource Monitoring */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

            <div className="border-b border-slate-800 p-5">

              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                <div>
                  <h3 className="font-semibold">
                    Resource Monitoring
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Live performance metrics for connected resources.
                  </p>
                </div>

                <select
                  value={provider}
                  onChange={(event) => setProvider(event.target.value)}
                  className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-300 outline-none focus:border-blue-500"
                >
                  <option value="All">All Providers</option>
                  <option value="Azure">Azure</option>
                  <option value="AWS">AWS</option>
                  <option value="Google Cloud">Google Cloud</option>
                </select>

              </div>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full min-w-[850px] text-left">

                <thead className="border-b border-slate-800 bg-slate-950/50">

                  <tr className="text-xs text-slate-500">

                    <th className="px-5 py-4 font-medium">
                      Resource
                    </th>

                    <th className="px-5 py-4 font-medium">
                      Provider
                    </th>

                    <th className="px-5 py-4 font-medium">
                      Status
                    </th>

                    <th className="px-5 py-4 font-medium">
                      CPU
                    </th>

                    <th className="px-5 py-4 font-medium">
                      Memory
                    </th>

                    <th className="px-5 py-4 font-medium">
                      Network
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {loading ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-5 py-10 text-center text-xs text-slate-600"
                      >
                        Loading monitoring resources...
                      </td>
                    </tr>
                  ) : filteredMetrics.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-5 py-10 text-center text-xs text-slate-600"
                      >
                        No resources found.
                      </td>
                    </tr>
                  ) : (
                    filteredMetrics.map((metric) => (

                      <tr
                        key={metric.id || metric.name}
                        className="border-b border-slate-800/70 transition hover:bg-slate-800/40"
                      >

                        <td className="px-5 py-4">

                          <p className="text-sm font-semibold">
                            {metric.name}
                          </p>

                        </td>

                        <td className="px-5 py-4">

                          <span className="rounded-lg bg-slate-800 px-2.5 py-1 text-xs text-slate-300">
                            {metric.provider}
                          </span>

                        </td>

                        <td className="px-5 py-4">
                          <MonitoringStatus
                            status={metric.status}
                          />
                        </td>

                        <td className="px-5 py-4">
                          <Progress value={metric.cpu} />
                        </td>

                        <td className="px-5 py-4">
                          <Progress value={metric.memory} />
                        </td>

                        <td className="px-5 py-4">
                          <Progress value={metric.network} />
                        </td>

                      </tr>

                    ))
                  )}

                </tbody>

              </table>

            </div>

          </div>

          {/* Alerts */}
          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <div className="flex items-center justify-between">

              <div>
                <h3 className="font-semibold">
                  Recent Alerts
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Issues detected by CloudStack monitoring.
                </p>
              </div>

              <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs text-amber-400">
                {alerts.length} Warning
              </span>

            </div>

            {alerts.length === 0 ? (
              <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950 p-4 text-xs text-slate-600">
                No recent alerts.
              </div>
            ) : (
              alerts.map((alert) => (

                <div
                  key={alert.id}
                  className="mt-5 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4"
                >

                  <div className="flex items-start gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
                      !
                    </div>

                    <div>

                      <p className="text-sm font-semibold">
                        {alert.title}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {alert.message}
                      </p>

                      <p className="mt-2 text-[11px] text-slate-600">
                        Detected {alert.detected}
                      </p>

                    </div>

                  </div>

                </div>

              ))
            )}

          </div>

        </div>

      </main>

    </div>
  )
}

function MetricCard({
  label,
  value,
  icon,
  success = false,
  warning = false,
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

      <div className="flex items-center justify-between">

        <p className="text-sm text-slate-400">
          {label}
        </p>

        <span
          className={
            success
              ? 'text-emerald-400'
              : warning
                ? 'text-amber-400'
                : 'text-blue-400'
          }
        >
          {icon}
        </span>

      </div>

      <p className="mt-3 text-3xl font-bold">
        {value}
      </p>

    </div>
  )
}

function HealthRow({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-slate-950 px-3 py-2">

      <span className="text-xs text-slate-500">
        {label}
      </span>

      <span className="text-xs font-medium text-emerald-400">
        {value}
      </span>

    </div>
  )
}

function MonitoringStatus({ status }) {
  const styles = {
    Healthy: 'bg-emerald-500/10 text-emerald-400',
    Warning: 'bg-amber-500/10 text-amber-400',
    Stopped: 'bg-slate-800 text-slate-500',
  }

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
        styles[status] || 'bg-slate-800 text-slate-400'
      }`}
    >
      ● {status}
    </span>
  )
}

function Progress({ value }) {
  return (
    <div className="flex items-center gap-3">

      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-800">

        <div
          className={`h-full rounded-full ${
            value >= 80
              ? 'bg-amber-500'
              : 'bg-blue-500'
          }`}
          style={{ width: `${value}%` }}
        />

      </div>

      <span className="w-8 text-xs text-slate-400">
        {value}%
      </span>

    </div>
  )
}

export default Monitoring