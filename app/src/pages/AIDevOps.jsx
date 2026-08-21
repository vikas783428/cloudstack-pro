import { useState } from 'react'

function AIDevOps({ onNavigate }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      text: 'Hello Vikas 👋 I’m your CloudStack AI DevOps Assistant. I can help analyze infrastructure, troubleshoot issues, and suggest cloud optimizations.',
    },
  ])

  const [input, setInput] = useState('')

  const suggestions = [
    'Analyze my infrastructure',
    'Check for security issues',
    'How can I reduce cloud costs?',
    'Show me unhealthy resources',
  ]

  const sendMessage = (message = input) => {
    const text = message.trim()

    if (!text) return

    const userMessage = {
      id: Date.now(),
      role: 'user',
      text,
    }

    setMessages((current) => [
      ...current,
      userMessage,
      {
        id: Date.now() + 1,
        role: 'assistant',
        text: getDemoResponse(text),
      },
    ])

    setInput('')
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

            <div>
              <h1 className="text-lg font-semibold">
                AI DevOps
              </h1>
            </div>

          </div>

        </div>

        <div className="flex items-center gap-3">

          <div className="hidden items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5 sm:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-xs text-emerald-400">
              AI Online
            </span>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold">
            V
          </div>

        </div>

      </header>

      {/* Main */}
      <main className="p-5 sm:p-6">

        <div className="mx-auto max-w-7xl">

          {/* Intro */}
          <div className="mb-6">

            <div className="flex items-start gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-xl">
                ✦
              </div>

              <div>

                <h2 className="text-2xl font-bold">
                  AI DevOps Assistant
                </h2>

                <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-400">
                  Analyze your infrastructure, troubleshoot cloud issues,
                  improve security, and optimize cloud costs with AI.
                </p>

              </div>

            </div>

          </div>

          <div className="grid gap-6 lg:grid-cols-3">

            {/* Chat */}
            <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 lg:col-span-2">

              {/* Chat Header */}
              <div className="flex items-center justify-between border-b border-slate-800 p-5">

                <div>

                  <h3 className="font-semibold">
                    CloudStack AI
                  </h3>

                  <div className="mt-1 flex items-center gap-2">

                    <span className="h-2 w-2 rounded-full bg-emerald-400" />

                    <span className="text-xs text-slate-500">
                      Ready to help
                    </span>

                  </div>

                </div>

                <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
                  DevOps AI
                </span>

              </div>

              {/* Messages */}
              <div className="flex min-h-[420px] flex-col gap-4 overflow-y-auto p-5">

                {messages.map((message) => (

                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === 'user'
                        ? 'justify-end'
                        : 'justify-start'
                    }`}
                  >

                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'border border-slate-800 bg-slate-950 text-slate-300'
                      }`}
                    >
                      {message.text}
                    </div>

                  </div>

                ))}

              </div>

              {/* Suggestions */}
              <div className="border-t border-slate-800 p-4">

                <div className="mb-3 flex flex-wrap gap-2">

                  {suggestions.map((suggestion) => (

                    <button
                      key={suggestion}
                      onClick={() => sendMessage(suggestion)}
                      className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-400 transition hover:border-blue-500/40 hover:text-white"
                    >
                      {suggestion}
                    </button>

                  ))}

                </div>

                {/* Input */}
                <div className="flex gap-2">

                  <input
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        sendMessage()
                      }
                    }}
                    placeholder="Ask CloudStack AI..."
                    className="min-w-0 flex-1 rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-blue-500"
                  />

                  <button
                    onClick={() => sendMessage()}
                    disabled={!input.trim()}
                    className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Send
                  </button>

                </div>

                <p className="mt-3 text-center text-[11px] text-slate-600">
                  Demo AI environment — real AI integration will be connected through the backend.
                </p>

              </div>

            </section>

            {/* AI Capabilities */}
            <section className="space-y-4">

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

                <h3 className="font-semibold">
                  AI Capabilities
                </h3>

                <div className="mt-5 space-y-3">

                  <Capability
                    icon="⌁"
                    title="Infrastructure Analysis"
                    text="Analyze cloud resources and identify issues."
                  />

                  <Capability
                    icon="⚠"
                    title="Troubleshooting"
                    text="Investigate infrastructure problems and failures."
                  />

                  <Capability
                    icon="◈"
                    title="Cost Optimization"
                    text="Find opportunities to reduce cloud spending."
                  />

                  <Capability
                    icon="✓"
                    title="Security Analysis"
                    text="Identify common infrastructure security risks."
                  />

                </div>

              </div>

              <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-purple-600/10 p-5">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
                  ✦
                </div>

                <h3 className="mt-4 font-semibold">
                  Connected Infrastructure
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  CloudStack AI can analyze the resources connected to your
                  workspace.
                </p>

                <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-950/60 p-3">

                  <span className="text-xs text-slate-400">
                    Resources
                  </span>

                  <span className="text-sm font-semibold">
                    12
                  </span>

                </div>

                <div className="mt-2 flex items-center justify-between rounded-xl bg-slate-950/60 p-3">

                  <span className="text-xs text-slate-400">
                    System Health
                  </span>

                  <span className="text-sm font-semibold text-emerald-400">
                    100%
                  </span>

                </div>

              </div>

            </section>

          </div>

        </div>

      </main>

    </div>
  )
}

/* -------------------------------- */
/* Capability */
/* -------------------------------- */

function Capability({ icon, title, text }) {
  return (
    <div className="flex gap-3 rounded-xl border border-slate-800 bg-slate-950/50 p-3">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600/10 text-blue-400">
        {icon}
      </div>

      <div>

        <p className="text-sm font-medium">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-600">
          {text}
        </p>

      </div>

    </div>
  )
}

/* -------------------------------- */
/* Demo AI Responses */
/* -------------------------------- */

function getDemoResponse(message) {
  const text = message.toLowerCase()

  if (text.includes('cost')) {
    return 'Based on the current demo infrastructure, your monthly cloud usage is $0.00. In the production version, I’ll analyze resource utilization and identify idle or oversized resources that could reduce costs.'
  }

  if (text.includes('security')) {
    return 'I can perform a security review of your connected resources. In the production backend, I’ll check exposed services, network configuration, access policies, and other security signals.'
  }

  if (text.includes('unhealthy') || text.includes('health')) {
    return 'Your current demo workspace reports 100% system health. In the production version, I’ll inspect live monitoring data and identify unhealthy resources automatically.'
  }

  if (text.includes('infrastructure') || text.includes('resource')) {
    return 'Your workspace currently contains 12 demo cloud resources across Azure, AWS, and Google Cloud. The production AI will analyze live resource metadata, health, usage, and configuration.'
  }

  return 'I understand. In the production CloudStack Pro backend, I’ll analyze your connected cloud infrastructure and provide a DevOps recommendation based on live data.'
}

export default AIDevOps