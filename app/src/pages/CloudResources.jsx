import { useMemo, useState } from 'react'

const resources = [
  {
    id: 'vm-001',
    name: 'web-server-prod',
    type: 'Virtual Machine',
    provider: 'Azure',
    status: 'Running',
    region: 'East US',
    ip: '20.42.18.101',
  },
  {
    id: 'vm-002',
    name: 'api-server',
    type: 'Virtual Machine',
    provider: 'Azure',
    status: 'Running',
    region: 'Central US',
    ip: '20.51.92.44',
  },
  {
    id: 'db-001',
    name: 'database-prod',
    type: 'Database',
    provider: 'Azure',
    status: 'Healthy',
    region: 'East US',
    ip: '10.0.2.15',
  },
  {
    id: 'storage-001',
    name: 'cloudstack-storage',
    type: 'Storage',
    provider: 'Azure',
    status: 'Active',
    region: 'East US',
    ip: '—',
  },
  {
    id: 'vnet-001',
    name: 'vnet-production',
    type: 'Network',
    provider: 'Azure',
    status: 'Active',
    region: 'East US',
    ip: '10.0.0.0/16',
  },
  {
    id: 'vm-003',
    name: 'worker-prod-01',
    type: 'Virtual Machine',
    provider: 'AWS',
    status: 'Running',
    region: 'ap-south-1',
    ip: '13.201.42.88',
  },
  {
    id: 'vm-004',
    name: 'worker-prod-02',
    type: 'Virtual Machine',
    provider: 'AWS',
    status: 'Stopped',
    region: 'ap-south-1',
    ip: '13.201.54.21',
  },
  {
    id: 'db-002',
    name: 'analytics-db',
    type: 'Database',
    provider: 'AWS',
    status: 'Healthy',
    region: 'ap-south-1',
    ip: '10.20.4.18',
  },
  {
    id: 'bucket-001',
    name: 'cloudstack-backups',
    type: 'Storage',
    provider: 'AWS',
    status: 'Active',
    region: 'ap-south-1',
    ip: '—',
  },
  {
    id: 'vm-005',
    name: 'gcp-api-prod',
    type: 'Virtual Machine',
    provider: 'Google Cloud',
    status: 'Running',
    region: 'asia-south1',
    ip: '34.93.120.42',
  },
  {
    id: 'db-003',
    name: 'gcp-database',
    type: 'Database',
    provider: 'Google Cloud',
    status: 'Healthy',
    region: 'asia-south1',
    ip: '10.30.1.12',
  },
  {
    id: 'network-001',
    name: 'gcp-production-vpc',
    type: 'Network',
    provider: 'Google Cloud',
    status: 'Active',
    region: 'asia-south1',
    ip: '10.30.0.0/16',
  },
]

function CloudResources({ onNavigate, onConnectCloud }) {
  const [provider, setProvider] = useState('All')
  const [type, setType] = useState('All')
  const [search, setSearch] = useState('')
  const [selectedResource, setSelectedResource] = useState(null)

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const matchesProvider =
        provider === 'All' || resource.provider === provider

      const matchesType =
        type === 'All' || resource.type === type

      const searchText = search.toLowerCase().trim()

      const matchesSearch =
        !searchText ||
        resource.name.toLowerCase().includes(searchText) ||
        resource.type.toLowerCase().includes(searchText) ||
        resource.provider.toLowerCase().includes(searchText) ||
        resource.region.toLowerCase().includes(searchText)

      return matchesProvider && matchesType && matchesSearch
    })
  }, [provider, type, search])

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
      Cloud Resources
    </h1>
  </div>
</div>

<button
  onClick={onConnectCloud}
  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold transition hover:bg-blue-500"
>
  + Connect Cloud
</button>

      </header>

      <main className="p-5 sm:p-6">

        <div className="mx-auto max-w-7xl">

          {/* Page intro */}
          <div className="mb-6">

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

              <div>
                <h2 className="text-2xl font-bold">
                  Infrastructure
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  View and manage resources across your connected cloud providers.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3">
                <p className="text-xs text-slate-500">
                  Total Resources
                </p>

                <p className="mt-1 text-xl font-bold">
                  {filteredResources.length}
                </p>
              </div>

            </div>

          </div>

          {/* Summary cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <SummaryCard
              label="Total Resources"
              value={resources.length}
              icon="☁"
            />

            <SummaryCard
              label="Running"
              value={resources.filter((r) => r.status === 'Running').length}
              icon="●"
              success
            />

            <SummaryCard
              label="Healthy"
              value={resources.filter((r) => r.status === 'Healthy').length}
              icon="✓"
              success
            />

            <SummaryCard
              label="Stopped"
              value={resources.filter((r) => r.status === 'Stopped').length}
              icon="Ⅱ"
            />

          </div>

          {/* Filters */}
          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-4">

            <div className="grid gap-3 md:grid-cols-[1fr_180px_180px]">

              <div className="relative">

                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  ⌕
                </span>

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search resources..."
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-blue-500"
                />

              </div>

              <select
                value={provider}
                onChange={(event) => setProvider(event.target.value)}
                className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
              >
                <option value="All">All Providers</option>
                <option value="Azure">Azure</option>
                <option value="AWS">AWS</option>
                <option value="Google Cloud">Google Cloud</option>
              </select>

              <select
                value={type}
                onChange={(event) => setType(event.target.value)}
                className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
              >
                <option value="All">All Types</option>
                <option value="Virtual Machine">Virtual Machine</option>
                <option value="Database">Database</option>
                <option value="Storage">Storage</option>
                <option value="Network">Network</option>
              </select>

            </div>

          </div>

          {/* Resource table */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

            <div className="border-b border-slate-800 p-5">

              <div className="flex items-center justify-between">

                <div>
                  <h3 className="font-semibold">
                    Resources
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    {filteredResources.length} resources found
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSearch('')
                    setProvider('All')
                    setType('All')
                  }}
                  className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-slate-800"
                >
                  Reset Filters
                </button>

              </div>

            </div>

            {filteredResources.length > 0 ? (

              <div className="overflow-x-auto">

                <table className="w-full min-w-[800px] text-left">

                  <thead className="border-b border-slate-800 bg-slate-950/50">

                    <tr className="text-xs text-slate-500">

                      <th className="px-5 py-4 font-medium">
                        Resource
                      </th>

                      <th className="px-5 py-4 font-medium">
                        Type
                      </th>

                      <th className="px-5 py-4 font-medium">
                        Provider
                      </th>

                      <th className="px-5 py-4 font-medium">
                        Status
                      </th>

                      <th className="px-5 py-4 font-medium">
                        Region
                      </th>

                      <th className="px-5 py-4 font-medium">
                        Action
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {filteredResources.map((resource) => (

                      <tr
                        key={resource.id}
                        className="border-b border-slate-800/70 transition hover:bg-slate-800/40"
                      >

                        <td className="px-5 py-4">

                          <div className="flex items-center gap-3">

                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600/10 text-blue-400">
                              {resource.type === 'Virtual Machine'
                                ? '▣'
                                : resource.type === 'Database'
                                  ? '◉'
                                  : resource.type === 'Storage'
                                    ? '▤'
                                    : '⌁'}
                            </div>

                            <div>
                              <p className="text-sm font-semibold">
                                {resource.name}
                              </p>

                              <p className="mt-1 text-xs text-slate-600">
                                {resource.id}
                              </p>
                            </div>

                          </div>

                        </td>

                        <td className="px-5 py-4 text-sm text-slate-400">
                          {resource.type}
                        </td>

                        <td className="px-5 py-4">

                          <span className="rounded-lg bg-slate-800 px-2.5 py-1 text-xs text-slate-300">
                            {resource.provider}
                          </span>

                        </td>

                        <td className="px-5 py-4">
                          <StatusBadge status={resource.status} />
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-400">
                          {resource.region}
                        </td>

                        <td className="px-5 py-4">

                          <button
                            onClick={() => setSelectedResource(resource)}
                            className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
                          >
                            View
                          </button>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            ) : (

              <div className="flex min-h-64 items-center justify-center p-8">

                <div className="text-center">

                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-xl text-slate-500">
                    ⌕
                  </div>

                  <h3 className="mt-4 font-semibold">
                    No resources found
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Try changing your search or filters.
                  </p>

                </div>

              </div>

            )}

          </div>

        </div>

      </main>

      {/* Resource details modal */}
      {selectedResource && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedResource(null)
            }
          }}
        >

          <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-xs text-blue-400">
                  RESOURCE DETAILS
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  {selectedResource.name}
                </h2>
              </div>

              <button
                onClick={() => setSelectedResource(null)}
                className="text-slate-500 transition hover:text-white"
              >
                ✕
              </button>

            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">

              <Detail label="Resource ID" value={selectedResource.id} />

              <Detail label="Provider" value={selectedResource.provider} />

              <Detail label="Type" value={selectedResource.type} />

              <Detail label="Status">
                <StatusBadge status={selectedResource.status} />
              </Detail>

              <Detail label="Region" value={selectedResource.region} />

              <Detail label="IP / Address" value={selectedResource.ip} />

            </div>

            <div className="mt-6 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">

              <p className="text-sm font-medium">
                Demo resource
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                This resource is currently simulated for the CloudStack Pro SaaS MVP.
                Real cloud provider APIs will be connected later.
              </p>

            </div>

          </div>

        </div>

      )}

    </div>
  )
}

function SummaryCard({ label, value, icon, success = false }) {
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

function StatusBadge({ status }) {
  const styles = {
    Running: 'bg-emerald-500/10 text-emerald-400',
    Healthy: 'bg-emerald-500/10 text-emerald-400',
    Active: 'bg-blue-500/10 text-blue-400',
    Stopped: 'bg-amber-500/10 text-amber-400',
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
        styles[status] || 'bg-slate-800 text-slate-400'
      }`}
    >
      <span>●</span>
      {status}
    </span>
  )
}

function Detail({ label, value, children }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">

      <p className="text-xs text-slate-500">
        {label}
      </p>

      <div className="mt-2 text-sm font-medium text-white">
        {children || value}
      </div>

    </div>
  )
}

export default CloudResources