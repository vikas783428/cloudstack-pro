import { useEffect, useState } from 'react'
import {
  checkBackendHealth,
  connectCloudProvider,
  getCloudConnection,
  getCloudResources,
} from '../lib/api'

function Dashboard({
  onNavigate,
  openConnectModal,
  setOpenConnectModal,
}) {

  const [selectedProvider, setSelectedProvider] = useState(null)
  const [connectedProvider, setConnectedProvider] = useState(null)
  const [backendStatus, setBackendStatus] = useState('Checking...')

  const [resources, setResources] = useState([])
  const [resourcesLoading, setResourcesLoading] = useState(true)
  // Check backend + load cloud connection + load resources
  useEffect(() => {
    checkBackendHealth()
      .then((data) => {
        if (data.success) {
          setBackendStatus(data.message)
        } else {
          setBackendStatus('Backend connection failed')
        }
      })
      .catch(() => {
        setBackendStatus('Backend connection failed')
      })

    getCloudConnection()
      .then((data) => {
        if (data.success && data.connection) {
          setConnectedProvider(data.connection.provider)
        }
      })
      .catch((error) => {
        console.error('Failed to load cloud connection:', error)
      })

    getCloudResources()
      .then((data) => {
        console.log('Dashboard resources API response:', data)

        if (data.success && Array.isArray(data.resources)) {
          setResources(data.resources)
        } else {
          setResources([])
        }
      })
      .catch((error) => {
        console.error('Failed to load dashboard resources:', error)
        setResources([])
      })
      .finally(() => {
        setResourcesLoading(false)
      })
  }, [])

  // Connect cloud provider
  const connectProvider = async () => {
    if (!selectedProvider) return

    try {
      const data = await connectCloudProvider(selectedProvider)

      if (data.success && data.connection) {
        setConnectedProvider(data.connection.provider)
        setOpenConnectModal(false)
        setSelectedProvider(null)
      }
    } catch (error) {
      console.error('Cloud connection failed:', error)
      alert(error.message)
    }
  }

 const closeModal = () => {
  setOpenConnectModal(false)
  setSelectedProvider(null)
}

  const providerConnected = Boolean(connectedProvider)

  // Real resource statistics
  const totalResources = resources.length

  const activeServices = resources.filter(
    (resource) => resource.status === 'Running'
  ).length

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="flex min-h-screen">

        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-slate-800 bg-slate-900 md:flex md:flex-col">

          {/* Logo */}
          <div className="flex h-16 items-center border-b border-slate-800 px-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 font-bold">
                C
              </div>

              <span className="font-bold">
                CloudStack Pro
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">

            <NavItem
              icon="⌂"
              label="Overview"
              active
              onClick={() => onNavigate('overview')}
            />

            <NavItem
              icon="☁"
              label="Cloud Resources"
              onClick={() => onNavigate('cloud-resources')}
            />

            <NavItem
              icon="◉"
              label="Monitoring"
              onClick={() => onNavigate('monitoring')}
            />

            <NavItem
              icon="$"
              label="Billing"
              onClick={() => onNavigate('billing')}
            />

            <NavItem
              icon="♟"
              label="Team"
              onClick={() => onNavigate('team')}
            />

            <NavItem
              icon="⚿"
              label="API Keys"
              onClick={() => onNavigate('api-keys')}
            />

            <div className="my-4 border-t border-slate-800" />

            <NavItem
              icon="✦"
              label="AI DevOps"
              onClick={() => onNavigate('ai-devops')}
            />

          </nav>

          {/* Workspace */}
          <div className="border-t border-slate-800 p-4">
            <p className="text-xs text-slate-500">
              WORKSPACE
            </p>

            <div className="mt-2 rounded-xl bg-slate-800 p-3">
              <p className="text-sm font-semibold">
                My Workspace
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Free plan
              </p>
            </div>
          </div>

        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1">

          {/* Header */}
          <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900/60 px-5">

            <div>
              <p className="text-xs text-slate-500">
                WORKSPACE
              </p>

              <h1 className="text-lg font-semibold">
                Overview
              </h1>
            </div>

            <div className="flex items-center gap-3">

              <button
                onClick={() => setOpenConnectModal(true)}
                className="hidden rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold transition hover:bg-blue-500 sm:block"
              >
                + Connect Cloud
              </button>

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold">
                V
              </div>

            </div>

          </header>

          {/* Dashboard Content */}
          <div className="p-5 sm:p-6">

            <div className="mx-auto max-w-7xl">

              {/* Welcome */}
              <div className="mb-7">

                <h2 className="text-2xl font-bold">
                  Good evening, Vikas 👋
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Here's what's happening with your infrastructure.
                </p>

                {/* API Status */}
                <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs">

                  <span
                    className={`h-2 w-2 rounded-full ${
                      backendStatus === 'CloudStack Pro API is running'
                        ? 'bg-emerald-400'
                        : backendStatus === 'Checking...'
                          ? 'bg-yellow-400'
                          : 'bg-red-400'
                    }`}
                  />

                  <span className="text-slate-400">
                    API:
                  </span>

                  <span className="font-medium text-white">
                    {backendStatus}
                  </span>

                </div>

              </div>

              {/* Connected Cloud */}
              {providerConnected && (
                <div className="mb-6 flex items-center justify-between rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
                      ☁
                    </div>

                    <div>
                      <p className="text-sm font-semibold">
                        {connectedProvider} connected
                      </p>

                      <p className="text-xs text-slate-400">
                        Your cloud account is ready to be managed.
                      </p>
                    </div>

                  </div>

                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                    Connected
                  </span>

                </div>
              )}

              {/* Stats */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                <Stat
                  title="Cloud Resources"
                  value={
                    resourcesLoading
                      ? '...'
                      : totalResources
                  }
                  text={
                    totalResources > 0
                      ? 'Resources discovered'
                      : 'No resources connected'
                  }
                />

                <Stat
                  title="Active Services"
                  value={
                    resourcesLoading
                      ? '...'
                      : activeServices
                  }
                  text={
                    activeServices > 0
                      ? 'Services running'
                      : 'Everything is quiet'
                  }
                />

                <Stat
                  title="Monthly Usage"
                  value="$0.00"
                  text="Current billing cycle"
                />

                <Stat
                  title="System Health"
                  value="100%"
                  text="All systems operational"
                />

              </div>

              {/* Main Cards */}
              <div className="mt-6 grid gap-6 lg:grid-cols-3">

                {/* Getting Started */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 lg:col-span-2">

                  <div className="flex items-start justify-between">

                    <div>
                      <h3 className="text-lg font-semibold">
                        Get started with CloudStack Pro
                      </h3>

                      <p className="mt-1 text-sm text-slate-400">
                        Connect your first cloud account to start managing
                        your infrastructure.
                      </p>
                    </div>

                    <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                      {providerConnected ? '2 / 4' : '1 / 4'}
                    </span>

                  </div>

                  <div className="mt-6 space-y-3">

                    <Setup
                      number="✓"
                      title="Create your workspace"
                      description="Set up your CloudStack workspace."
                      completed
                    />

                    <Setup
                      number={providerConnected ? '✓' : '2'}
                      title="Connect a cloud provider"
                      description={
                        providerConnected
                          ? `${connectedProvider} account connected successfully.`
                          : 'Connect AWS, Azure, or Google Cloud.'
                      }
                      completed={providerConnected}
                    />

                    <Setup
                      number="3"
                      title="Deploy your first resource"
                      description="Start managing your infrastructure."
                    />

                    <Setup
                      number="4"
                      title="Enable monitoring"
                      description="Monitor your infrastructure in real time."
                    />

                  </div>

                </div>

                {/* AI Assistant */}
                <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-purple-600/10 p-6">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-lg">
                    ✦
                  </div>

                  <h3 className="mt-5 text-lg font-semibold">
                    AI DevOps Assistant
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Analyze infrastructure, troubleshoot issues, and
                    optimize cloud costs with AI.
                  </p>

                  <button
                    onClick={() => onNavigate('ai-devops')}
                    className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold transition hover:bg-blue-500"
                  >
                    Open AI Assistant
                  </button>

                </div>

              </div>

              {/* Recent Activity */}
              <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">

                <h3 className="text-lg font-semibold">
                  Recent Activity
                </h3>

                <div className="flex min-h-32 items-center justify-center">

                  <div className="text-center">

                    <div className="text-2xl">
                      ◌
                    </div>

                    <p className="mt-2 text-sm text-slate-500">
                      No activity yet
                    </p>

                    <p className="mt-1 text-xs text-slate-600">
                      Your infrastructure activity will appear here.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </main>

      </div>

      {/* Connect Cloud Modal */}
      {openConnectModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal()
            }
          }}
        >

          <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">

            {/* Provider Selection */}
            {!selectedProvider ? (
              <>
                <div className="flex items-start justify-between">

                  <div>
                    <h2 className="text-xl font-bold">
                      Connect Cloud Provider
                    </h2>

                    <p className="mt-1 text-sm text-slate-400">
                      Choose a cloud provider to connect.
                    </p>
                  </div>

                  <button
                    onClick={closeModal}
                    className="text-slate-500 transition hover:text-white"
                  >
                    ✕
                  </button>

                </div>

                <div className="mt-6 space-y-3">

                  <Provider
                    icon="☁"
                    name="Amazon Web Services"
                    label="AWS"
                    onClick={() => setSelectedProvider('AWS')}
                  />

                  <Provider
                    icon="▣"
                    name="Microsoft Azure"
                    label="Azure"
                    onClick={() => setSelectedProvider('Azure')}
                  />

                  <Provider
                    icon="◉"
                    name="Google Cloud Platform"
                    label="Google Cloud"
                    onClick={() => setSelectedProvider('Google Cloud')}
                  />

                </div>
              </>

            ) : (

              /* Provider Form */
              <>
                <div className="flex items-start justify-between">

                  <div>
                    <h2 className="text-xl font-bold">
                      Connect {selectedProvider}
                    </h2>

                    <p className="mt-1 text-sm text-slate-400">
                      Enter your cloud connection details.
                    </p>
                  </div>

                  <button
                    onClick={closeModal}
                    className="text-slate-500 transition hover:text-white"
                  >
                    ✕
                  </button>

                </div>

                <div className="mt-6 space-y-4">

                  {/* AWS */}
                  {selectedProvider === 'AWS' && (
                    <>
                      <Input
                        label="AWS Account ID"
                        placeholder="Enter 12-digit AWS account ID"
                      />

                      <Input
                        label="Access Key ID"
                        placeholder="Enter AWS access key ID"
                      />

                      <Input
                        label="Secret Access Key"
                        placeholder="Enter AWS secret access key"
                        type="password"
                      />

                      <Input
                        label="AWS Region"
                        placeholder="e.g. ap-south-1"
                      />
                    </>
                  )}

                  {/* Azure */}
                  {selectedProvider === 'Azure' && (
                    <>
                      <Input
                        label="Subscription ID"
                        placeholder="Enter Azure subscription ID"
                      />

                      <Input
                        label="Tenant ID"
                        placeholder="Enter Azure tenant ID"
                      />

                      <Input
                        label="Client ID"
                        placeholder="Enter Azure client ID"
                      />

                      <Input
                        label="Client Secret"
                        placeholder="Enter Azure client secret"
                        type="password"
                      />
                    </>
                  )}

                  {/* Google Cloud */}
                  {selectedProvider === 'Google Cloud' && (
                    <>
                      <Input
                        label="Project ID"
                        placeholder="Enter Google Cloud project ID"
                      />

                      <Input
                        label="Service Account Email"
                        placeholder="Enter service account email"
                      />

                      <Input
                        label="Private Key"
                        placeholder="Enter service account private key"
                        type="password"
                      />

                      <Input
                        label="Region"
                        placeholder="e.g. asia-south1"
                      />
                    </>
                  )}

                </div>

                {/* Buttons */}
                <div className="mt-6 flex gap-3">

                  <button
                    onClick={() => setSelectedProvider(null)}
                    className="flex-1 rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold transition hover:bg-slate-800"
                  >
                    Back
                  </button>

                  <button
                    onClick={connectProvider}
                    className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold transition hover:bg-blue-500"
                  >
                    Connect {selectedProvider}
                  </button>

                </div>

                <p className="mt-4 text-center text-xs text-slate-600">
                  Demo mode — credentials are not sent anywhere.
                </p>

              </>
            )}

          </div>

        </div>
      )}

    </div>
  )
}

/* Provider Component */

function Provider({ icon, name, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-4 rounded-xl border border-slate-800 bg-slate-950 p-4 text-left transition hover:border-blue-500/50 hover:bg-slate-800"
    >

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600/10 text-xl text-blue-400">
        {icon}
      </div>

      <div>
        <p className="font-semibold">
          {label}
        </p>

        <p className="mt-1 text-xs text-slate-500">
          {name}
        </p>
      </div>

      <span className="ml-auto text-slate-500">
        →
      </span>

    </button>
  )
}

/* Input Component */

function Input({
  label,
  placeholder,
  type = 'text',
}) {
  return (
    <div>

      <label className="mb-2 block text-xs font-medium text-slate-400">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
      />

    </div>
  )
}

/* Stat Card */

function Stat({
  title,
  value,
  text,
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

      <p className="text-sm text-slate-400">
        {title}
      </p>

      <p className="mt-3 text-3xl font-bold">
        {value}
      </p>

      <p className="mt-2 text-xs text-slate-500">
        {text}
      </p>

    </div>
  )
}

/* Setup Step */

function Setup({
  number,
  title,
  description,
  completed = false,
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-950/50 p-4">

      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
          completed
            ? 'bg-emerald-500/10 text-emerald-400'
            : 'bg-slate-800 text-white'
        }`}
      >
        {number}
      </div>

      <div>

        <p className="text-sm font-semibold">
          {title}
        </p>

        <p className="mt-1 text-xs text-slate-500">
          {description}
        </p>

      </div>

    </div>
  )
}

/* Navigation Item */

function NavItem({
  icon,
  label,
  active,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
        active
          ? 'bg-blue-600/10 text-blue-400'
          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      }`}
    >

      <span className="w-5 text-center">
        {icon}
      </span>

      <span>
        {label}
      </span>

    </button>
  )
}

export default Dashboard