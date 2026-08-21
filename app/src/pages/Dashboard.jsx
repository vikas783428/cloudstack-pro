function Dashboard() {
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

            <NavItem icon="⌂" label="Overview" active />
            <NavItem icon="☁" label="Cloud Resources" />
            <NavItem icon="◉" label="Monitoring" />
            <NavItem icon="$" label="Billing" />
            <NavItem icon="♟" label="Team" />
            <NavItem icon="⚿" label="API Keys" />

            <div className="my-4 border-t border-slate-800" />

            <NavItem icon="✦" label="AI DevOps" />

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

              <button className="hidden rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold transition hover:bg-blue-500 sm:block">
                + Connect Cloud
              </button>

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold">
                V
              </div>

            </div>

          </header>

          {/* Dashboard content */}
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
              </div>

              {/* Stats */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                <Stat
                  title="Cloud Resources"
                  value="0"
                  text="No resources connected"
                />

                <Stat
                  title="Active Services"
                  value="0"
                  text="Everything is quiet"
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

              {/* Main cards */}
              <div className="mt-6 grid gap-6 lg:grid-cols-3">

                {/* Getting started */}
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
                      0 / 4
                    </span>

                  </div>

                  <div className="mt-6 space-y-3">

                    <Setup
                      number="1"
                      title="Create your workspace"
                      description="Set up your CloudStack workspace."
                    />

                    <Setup
                      number="2"
                      title="Connect a cloud provider"
                      description="Connect AWS, Azure, or Google Cloud."
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

                {/* AI */}
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

                  <button className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold transition hover:bg-blue-500">
                    Open AI Assistant
                  </button>

                </div>

              </div>

              {/* Activity */}
              <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">

                <h3 className="text-lg font-semibold">
                  Recent Activity
                </h3>

                <div className="flex min-h-32 items-center justify-center">

                  <div className="text-center">
                    <div className="text-2xl">◌</div>

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
    </div>
  )
}

function NavItem({ icon, label, active }) {
  return (
    <button
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
        active
          ? 'bg-blue-600/10 text-blue-400'
          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      }`}
    >
      <span className="w-5 text-center">
        {icon}
      </span>

      <span>{label}</span>
    </button>
  )
}

function Stat({ title, value, text }) {
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

function Setup({ number, title, description }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-950/50 p-4">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-800 text-sm font-semibold">
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

export default Dashboard