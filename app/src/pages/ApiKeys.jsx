import { useState } from 'react'

const initialKeys = [
  {
    id: 1,
    name: 'Production API Key',
    prefix: 'csp_live_',
    key: 'csp_live_xxxxxxxxxxxxxxxxxxxx',
    created: 'Aug 21, 2026',
    lastUsed: 'Never',
    status: 'Active',
  },
]

function ApiKeys({ onNavigate }) {
  const [keys, setKeys] = useState(initialKeys)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showKeyModal, setShowKeyModal] = useState(false)
  const [selectedKey, setSelectedKey] = useState(null)

  const [keyName, setKeyName] = useState('')
  const [generatedKey, setGeneratedKey] = useState('')

  const createApiKey = () => {
    if (!keyName.trim()) return

    const randomPart = Math.random()
      .toString(36)
      .slice(2, 26)

    const newKey = {
      id: Date.now(),
      name: keyName.trim(),
      prefix: 'csp_live_',
      key: `csp_live_${randomPart}`,
      created: 'Aug 21, 2026',
      lastUsed: 'Never',
      status: 'Active',
    }

    setKeys((currentKeys) => [
      ...currentKeys,
      newKey,
    ])

    setGeneratedKey(newKey.key)
    setSelectedKey(newKey)

    setKeyName('')
    setShowCreateModal(false)
    setShowKeyModal(true)
  }

  const revokeKey = (id) => {
    setKeys((currentKeys) =>
      currentKeys.map((key) =>
        key.id === id
          ? { ...key, status: 'Revoked' }
          : key
      )
    )

    setShowKeyModal(false)
    setSelectedKey(null)
  }

  const deleteKey = (id) => {
    setKeys((currentKeys) =>
      currentKeys.filter((key) => key.id !== id)
    )

    setShowKeyModal(false)
    setSelectedKey(null)
  }

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
              className="text-xl text-slate-400 transition hover:text-white"
            >
              ←
            </button>

            <h1 className="text-lg font-semibold">
              API Keys
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
          <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

            <div>

              <h2 className="text-2xl font-bold">
                Developer API Keys
              </h2>

              <p className="mt-1 max-w-2xl text-sm text-slate-400">
                Create and manage API keys for accessing CloudStack Pro
                services and automation.
              </p>

            </div>

            <button
              onClick={() => setShowCreateModal(true)}
              className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold transition hover:bg-blue-500"
            >
              + Create API Key
            </button>

          </div>

          {/* Security banner */}
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">

            <div className="flex items-start gap-4">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                ⚠
              </div>

              <div>

                <h3 className="text-sm font-semibold text-amber-300">
                  Keep your API keys secure
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Never share API keys publicly or commit them to GitHub.
                  Use environment variables when integrating CloudStack Pro
                  with your applications.
                </p>

              </div>

            </div>

          </div>

          {/* API Keys */}
          <section className="mt-6 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

            <div className="border-b border-slate-800 p-5">

              <h3 className="font-semibold">
                Your API Keys
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                API keys provide programmatic access to your workspace.
              </p>

            </div>

            {keys.length === 0 ? (

              <div className="flex min-h-64 items-center justify-center p-8">

                <div className="text-center">

                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-xl text-slate-500">
                    ⚿
                  </div>

                  <h3 className="mt-4 font-semibold">
                    No API keys
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Create an API key to connect your applications.
                  </p>

                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold hover:bg-blue-500"
                  >
                    Create API Key
                  </button>

                </div>

              </div>

            ) : (

              <div className="divide-y divide-slate-800">

                {keys.map((apiKey) => (

                  <div
                    key={apiKey.id}
                    className="flex flex-col gap-4 p-5 transition hover:bg-slate-800/30 lg:flex-row lg:items-center"
                  >

                    <div className="flex min-w-0 flex-1 items-center gap-4">

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600/10 text-blue-400">
                        ⚿
                      </div>

                      <div className="min-w-0">

                        <div className="flex flex-wrap items-center gap-2">

                          <p className="text-sm font-semibold">
                            {apiKey.name}
                          </p>

                          <span
                            className={`rounded-full px-2 py-1 text-[10px] font-medium ${
                              apiKey.status === 'Active'
                                ? 'bg-emerald-500/10 text-emerald-400'
                                : 'bg-red-500/10 text-red-400'
                            }`}
                          >
                            {apiKey.status}
                          </span>

                        </div>

                        <p className="mt-1 font-mono text-xs text-slate-500">
                          {apiKey.prefix}••••••••••••••••
                        </p>

                      </div>

                    </div>

                    <div className="grid grid-cols-2 gap-5 text-xs sm:grid-cols-3 lg:w-[420px]">

                      <div>
                        <p className="text-slate-600">
                          Created
                        </p>

                        <p className="mt-1 text-slate-400">
                          {apiKey.created}
                        </p>
                      </div>

                      <div>
                        <p className="text-slate-600">
                          Last used
                        </p>

                        <p className="mt-1 text-slate-400">
                          {apiKey.lastUsed}
                        </p>
                      </div>

                      <div>
                        <button
                          onClick={() => {
                            setSelectedKey(apiKey)
                            setGeneratedKey(apiKey.key)
                            setShowKeyModal(true)
                          }}
                          className="rounded-lg border border-slate-700 px-3 py-2 font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                          Manage
                        </button>
                      </div>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </section>

          {/* API Information */}
          <section className="mt-6 grid gap-6 lg:grid-cols-2">

            <InfoCard
              icon="▣"
              title="API Access"
              text="Use your API key to authenticate requests to CloudStack Pro APIs."
            />

            <InfoCard
              icon="⌁"
              title="Automation"
              text="Connect CI/CD pipelines, infrastructure automation, and DevOps tools."
            />

          </section>

          {/* Demo notice */}
          <div className="mt-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5">

            <p className="text-sm font-medium">
              Demo API environment
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              API keys are currently generated locally for the SaaS MVP.
              Secure server-side key storage and authentication will be
              connected when the backend is implemented.
            </p>

          </div>

        </div>

      </main>

      {/* Create API Key Modal */}
      {showCreateModal && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowCreateModal(false)
            }
          }}
        >

          <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-xs font-medium text-blue-400">
                  DEVELOPER
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  Create API Key
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Give your API key a descriptive name.
                </p>

              </div>

              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-500 transition hover:text-white"
              >
                ✕
              </button>

            </div>

            <div className="mt-6">

              <label className="mb-2 block text-xs font-medium text-slate-400">
                API Key Name
              </label>

              <input
                value={keyName}
                onChange={(event) => setKeyName(event.target.value)}
                placeholder="e.g. Production CI/CD"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
              />

            </div>

            <div className="mt-6 flex gap-3">

              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold transition hover:bg-slate-800"
              >
                Cancel
              </button>

              <button
                onClick={createApiKey}
                disabled={!keyName.trim()}
                className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Generate Key
              </button>

            </div>

          </div>

        </div>

      )}

      {/* API Key Details Modal */}
      {showKeyModal && selectedKey && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowKeyModal(false)
            }
          }}
        >

          <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-xs font-medium text-emerald-400">
                  API KEY
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  {selectedKey.name}
                </h2>

              </div>

              <button
                onClick={() => setShowKeyModal(false)}
                className="text-slate-500 transition hover:text-white"
              >
                ✕
              </button>

            </div>

            <div className="mt-6">

              <p className="mb-2 text-xs font-medium text-slate-400">
                API KEY
              </p>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">

                <p className="break-all font-mono text-xs text-slate-300">
                  {generatedKey}
                </p>

              </div>

              <p className="mt-2 text-xs text-slate-600">
                Demo key — real secret storage will be handled by the backend.
              </p>

            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">

                <p className="text-xs text-slate-500">
                  Status
                </p>

                <p className="mt-2 text-sm font-medium">
                  {selectedKey.status}
                </p>

              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">

                <p className="text-xs text-slate-500">
                  Created
                </p>

                <p className="mt-2 text-sm font-medium">
                  {selectedKey.created}
                </p>

              </div>

            </div>

            <div className="mt-6 flex flex-col gap-3">

              {selectedKey.status === 'Active' && (

                <button
                  onClick={() => revokeKey(selectedKey.id)}
                  className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-sm font-semibold text-amber-400 transition hover:bg-amber-500/10"
                >
                  Revoke API Key
                </button>

              )}

              <button
                onClick={() => deleteKey(selectedKey.id)}
                className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/10"
              >
                Delete API Key
              </button>

              <button
                onClick={() => setShowKeyModal(false)}
                className="rounded-xl bg-slate-800 px-4 py-3 text-sm font-semibold transition hover:bg-slate-700"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  )
}

/* ----------------------------- */
/* Info Card */
/* ----------------------------- */

function InfoCard({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <div className="flex items-start gap-4">

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600/10 text-blue-400">
          {icon}
        </div>

        <div>

          <h3 className="font-semibold">
            {title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {text}
          </p>

        </div>

      </div>

    </div>
  )
}

export default ApiKeys