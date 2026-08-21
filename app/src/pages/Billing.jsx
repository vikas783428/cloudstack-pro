function Billing({ onNavigate }) {
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
              Billing
            </h1>

          </div>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold">
          V
        </div>

      </header>

      {/* Main */}
      <main className="p-5 sm:p-6">

        <div className="mx-auto max-w-7xl">

          {/* Intro */}
          <div className="mb-7">

            <h2 className="text-2xl font-bold">
              Billing & Usage
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Manage your CloudStack Pro subscription and monitor usage.
            </p>

          </div>

          {/* Current plan */}
          <div className="grid gap-6 lg:grid-cols-3">

            <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-purple-600/10 p-6 lg:col-span-2">

              <div className="flex flex-col justify-between gap-5 sm:flex-row">

                <div>

                  <div className="flex items-center gap-3">

                    <h3 className="text-xl font-bold">
                      Free Plan
                    </h3>

                    <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                      Current Plan
                    </span>

                  </div>

                  <p className="mt-2 text-sm text-slate-400">
                    Get started with CloudStack Pro and manage your
                    infrastructure from one workspace.
                  </p>

                </div>

                <div className="text-left sm:text-right">

                  <p className="text-3xl font-bold">
                    $0
                  </p>

                  <p className="text-xs text-slate-500">
                    per month
                  </p>

                </div>

              </div>

              <div className="mt-6 flex flex-wrap gap-3">

                <span className="rounded-lg border border-slate-700 bg-slate-950/50 px-3 py-2 text-xs text-slate-300">
                  ✓ Cloud monitoring
                </span>

                <span className="rounded-lg border border-slate-700 bg-slate-950/50 px-3 py-2 text-xs text-slate-300">
                  ✓ Basic resources
                </span>

                <span className="rounded-lg border border-slate-700 bg-slate-950/50 px-3 py-2 text-xs text-slate-300">
                  ✓ AI DevOps
                </span>

              </div>

            </div>

            {/* Upgrade */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <p className="text-sm font-medium text-slate-400">
                Need more?
              </p>

              <h3 className="mt-2 text-lg font-bold">
                Upgrade your workspace
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Unlock advanced monitoring, team collaboration,
                automation, and higher resource limits.
              </p>

              <button
                className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold transition hover:bg-blue-500"
              >
                Upgrade Plan
              </button>

            </div>

          </div>

          {/* Usage */}
          <div className="mt-6">

            <h3 className="mb-4 text-lg font-semibold">
              Current Usage
            </h3>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              <UsageCard
                title="Cloud Resources"
                value="12"
                limit="25"
                percentage={48}
              />

              <UsageCard
                title="Team Members"
                value="1"
                limit="3"
                percentage={33}
              />

              <UsageCard
                title="API Requests"
                value="1,240"
                limit="10,000"
                percentage={12}
              />

              <UsageCard
                title="AI Requests"
                value="18"
                limit="100"
                percentage={18}
              />

            </div>

          </div>

          {/* Cost overview */}
          <div className="mt-6 grid gap-6 lg:grid-cols-2">

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <div className="flex items-center justify-between">

                <div>
                  <h3 className="font-semibold">
                    Cloud Cost
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Current billing cycle
                  </p>
                </div>

                <span className="rounded-lg bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                  On track
                </span>

              </div>

              <p className="mt-6 text-4xl font-bold">
                $0.00
              </p>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-800">

                <div
                  className="h-full rounded-full bg-blue-500"
                  style={{ width: '8%' }}
                />

              </div>

              <div className="mt-2 flex justify-between text-xs text-slate-500">

                <span>
                  $0 used
                </span>

                <span>
                  $100 budget
                </span>

              </div>

            </div>

            {/* Payment */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <div className="flex items-center justify-between">

                <div>
                  <h3 className="font-semibold">
                    Payment Method
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Manage your payment details.
                  </p>
                </div>

                <span className="rounded-lg bg-slate-800 px-3 py-1 text-xs text-slate-400">
                  Not added
                </span>

              </div>

              <div className="mt-6 rounded-xl border border-dashed border-slate-700 p-5 text-center">

                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800">
                  $
                </div>

                <p className="mt-3 text-sm font-medium">
                  No payment method
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Add a payment method when you upgrade your plan.
                </p>

              </div>

            </div>

          </div>

          {/* Billing history */}
          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900">

            <div className="border-b border-slate-800 p-6">

              <h3 className="font-semibold">
                Billing History
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Your previous CloudStack Pro invoices.
              </p>

            </div>

            <div className="p-6">

              <div className="flex min-h-32 items-center justify-center">

                <div className="text-center">

                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800 text-slate-500">
                    $
                  </div>

                  <p className="mt-3 text-sm font-medium">
                    No invoices yet
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Your billing history will appear here after your
                    first payment.
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Razorpay notice */}
          <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">

            <div className="flex gap-3">

              <div className="text-amber-400">
                ⚡
              </div>

              <div>

                <p className="text-sm font-semibold">
                  Secure payments coming soon
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  CloudStack Pro will use Razorpay for secure subscription
                  payments. Payment processing will be enabled when billing
                  is connected to the production backend.
                </p>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  )
}

function UsageCard({
  title,
  value,
  limit,
  percentage,
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

      <p className="text-sm text-slate-400">
        {title}
      </p>

      <div className="mt-3 flex items-end justify-between">

        <p className="text-2xl font-bold">
          {value}
        </p>

        <p className="text-xs text-slate-500">
          / {limit}
        </p>

      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">

        <div
          className="h-full rounded-full bg-blue-500"
          style={{ width: `${percentage}%` }}
        />

      </div>

      <p className="mt-2 text-xs text-slate-500">
        {percentage}% used
      </p>

    </div>
  )
}

export default Billing