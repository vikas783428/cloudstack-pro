import { useState } from 'react'

const initialMembers = [
  {
    id: 1,
    initials: 'VP',
    name: 'Vikas P',
    email: 'vikas783428@gmail.com',
    role: 'Owner',
    status: 'Active',
  },
  {
    id: 2,
    initials: 'AJ',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    role: 'Admin',
    status: 'Active',
  },
  {
    id: 3,
    initials: 'SW',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    role: 'Developer',
    status: 'Pending',
  },
]

function Team({ onNavigate }) {
  const [members, setMembers] = useState(initialMembers)
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)

  const [inviteName, setInviteName] = useState('')
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState('Developer')

  const totalMembers = members.length

  const activeMembers = members.filter(
    (member) => member.status === 'Active'
  ).length

  const pendingInvites = members.filter(
    (member) => member.status === 'Pending'
  ).length

  const inviteMember = () => {
    if (!inviteName.trim() || !inviteEmail.trim()) {
      return
    }

    const initials = inviteName
      .trim()
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()

    const newMember = {
      id: Date.now(),
      initials,
      name: inviteName.trim(),
      email: inviteEmail.trim(),
      role: inviteRole,
      status: 'Pending',
    }

    setMembers((currentMembers) => [
      ...currentMembers,
      newMember,
    ])

    setInviteName('')
    setInviteEmail('')
    setInviteRole('Developer')
    setShowInviteModal(false)
  }

  const updateRole = (role) => {
    if (!selectedMember) return

    setMembers((currentMembers) =>
      currentMembers.map((member) =>
        member.id === selectedMember.id
          ? { ...member, role }
          : member
      )
    )

    setSelectedMember((currentMember) => ({
      ...currentMember,
      role,
    }))
  }

  const toggleStatus = () => {
    if (!selectedMember) return

    const newStatus =
      selectedMember.status === 'Active'
        ? 'Inactive'
        : 'Active'

    setMembers((currentMembers) =>
      currentMembers.map((member) =>
        member.id === selectedMember.id
          ? { ...member, status: newStatus }
          : member
      )
    )

    setSelectedMember((currentMember) => ({
      ...currentMember,
      status: newStatus,
    }))
  }

  const removeMember = () => {
    if (!selectedMember) return

    setMembers((currentMembers) =>
      currentMembers.filter(
        (member) => member.id !== selectedMember.id
      )
    )

    setSelectedMember(null)
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
              Team
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

          {/* Page intro */}
          <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

            <div>
              <h2 className="text-2xl font-bold">
                Team Members
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Manage workspace members and their access permissions.
              </p>
            </div>

            <button
              onClick={() => setShowInviteModal(true)}
              className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold transition hover:bg-blue-500"
            >
              + Invite Member
            </button>

          </div>

          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-3">

            <StatCard
              title="Total Members"
              value={totalMembers}
            />

            <StatCard
              title="Active Members"
              value={activeMembers}
              success
            />

            <StatCard
              title="Pending Invites"
              value={pendingInvites}
            />

          </div>

          {/* Members */}
          <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900">

            <div className="border-b border-slate-800 p-5">

              <h3 className="font-semibold">
                Workspace Members
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                People who have access to this workspace.
              </p>

            </div>

            <div className="divide-y divide-slate-800">

              {members.length === 0 ? (

                <div className="p-10 text-center">

                  <div className="text-3xl">
                    ♟
                  </div>

                  <p className="mt-3 font-semibold">
                    No workspace members
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Invite someone to collaborate with your workspace.
                  </p>

                </div>

              ) : (

                members.map((member) => (

                  <div
                    key={member.id}
                    className="flex flex-col gap-4 p-5 transition hover:bg-slate-800/30 sm:flex-row sm:items-center"
                  >

                    {/* Member */}
                    <div className="flex min-w-0 flex-1 items-center gap-4">

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600/10 text-sm font-bold text-blue-400">
                        {member.initials}
                      </div>

                      <div className="min-w-0">

                        <p className="truncate text-sm font-semibold">
                          {member.name}
                        </p>

                        <p className="mt-1 truncate text-xs text-slate-500">
                          {member.email}
                        </p>

                      </div>

                    </div>

                    {/* Role */}
                    <div className="sm:w-28">

                      <p className="text-sm text-slate-300">
                        {member.role}
                      </p>

                      <div className="mt-1 flex items-center gap-1.5">

                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            member.status === 'Active'
                              ? 'bg-emerald-400'
                              : member.status === 'Pending'
                                ? 'bg-amber-400'
                                : 'bg-slate-500'
                          }`}
                        />

                        <span
                          className={`text-xs ${
                            member.status === 'Active'
                              ? 'text-emerald-400'
                              : member.status === 'Pending'
                                ? 'text-amber-400'
                                : 'text-slate-500'
                          }`}
                        >
                          {member.status}
                        </span>

                      </div>

                    </div>

                    {/* Manage */}
                    <button
                      onClick={() => setSelectedMember(member)}
                      disabled={member.role === 'Owner'}
                      className={`rounded-lg border px-3 py-2 text-xs font-medium transition ${
                        member.role === 'Owner'
                          ? 'cursor-not-allowed border-slate-800 text-slate-600'
                          : 'border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      Manage
                    </button>

                  </div>

                ))

              )}

            </div>

          </section>

          {/* Roles */}
          <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <h3 className="font-semibold">
              Workspace Roles
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Control what each team member can access.
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-3">

              <RoleCard
                role="Owner"
                description="Full workspace access including billing and team management."
              />

              <RoleCard
                role="Admin"
                description="Manage infrastructure, monitoring, and team resources."
              />

              <RoleCard
                role="Developer"
                description="View and manage assigned cloud infrastructure."
              />

            </div>

          </section>

          {/* RBAC */}
          <div className="mt-6 rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-600/10 to-purple-600/10 p-6">

            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-lg">
                ✦
              </div>

              <div>

                <h3 className="font-semibold">
                  Role-based access control
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-400">
                  CloudStack Pro will use role-based permissions to control
                  access to infrastructure, billing, monitoring, API keys,
                  and workspace settings.
                </p>

              </div>

            </div>

          </div>

        </div>

      </main>

      {/* Invite Modal */}
      {showInviteModal && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowInviteModal(false)
            }
          }}
        >

          <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-xs font-medium text-blue-400">
                  TEAM
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  Invite Member
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Invite someone to join your workspace.
                </p>
              </div>

              <button
                onClick={() => setShowInviteModal(false)}
                className="text-slate-500 transition hover:text-white"
              >
                ✕
              </button>

            </div>

            <div className="mt-6 space-y-4">

              <Input
                label="Full Name"
                placeholder="Enter member name"
                value={inviteName}
                onChange={setInviteName}
              />

              <Input
                label="Email Address"
                placeholder="Enter email address"
                type="email"
                value={inviteEmail}
                onChange={setInviteEmail}
              />

              <div>

                <label className="mb-2 block text-xs font-medium text-slate-400">
                  Role
                </label>

                <select
                  value={inviteRole}
                  onChange={(event) => setInviteRole(event.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500"
                >
                  <option value="Admin">
                    Admin
                  </option>

                  <option value="Developer">
                    Developer
                  </option>
                </select>

              </div>

            </div>

            <div className="mt-6 flex gap-3">

              <button
                onClick={() => setShowInviteModal(false)}
                className="flex-1 rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold transition hover:bg-slate-800"
              >
                Cancel
              </button>

              <button
                onClick={inviteMember}
                disabled={!inviteName.trim() || !inviteEmail.trim()}
                className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Send Invitation
              </button>

            </div>

            <p className="mt-4 text-center text-xs text-slate-600">
              Demo mode — invitation will be stored locally.
            </p>

          </div>

        </div>

      )}

      {/* Manage Modal */}
      {selectedMember && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedMember(null)
            }
          }}
        >

          <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">

            <div className="flex items-start justify-between">

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600/10 font-bold text-blue-400">
                  {selectedMember.initials}
                </div>

                <div>

                  <h2 className="text-xl font-bold">
                    {selectedMember.name}
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    {selectedMember.email}
                  </p>

                </div>

              </div>

              <button
                onClick={() => setSelectedMember(null)}
                className="text-slate-500 transition hover:text-white"
              >
                ✕
              </button>

            </div>

            <div className="mt-6">

              <p className="text-xs font-medium text-slate-500">
                ROLE
              </p>

              <div className="mt-3 grid gap-2 sm:grid-cols-2">

                <RoleButton
                  role="Admin"
                  selected={selectedMember.role === 'Admin'}
                  onClick={() => updateRole('Admin')}
                />

                <RoleButton
                  role="Developer"
                  selected={selectedMember.role === 'Developer'}
                  onClick={() => updateRole('Developer')}
                />

              </div>

            </div>

            <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950 p-4">

              <p className="text-xs text-slate-500">
                CURRENT STATUS
              </p>

              <div className="mt-2 flex items-center gap-2">

                <span
                  className={`h-2 w-2 rounded-full ${
                    selectedMember.status === 'Active'
                      ? 'bg-emerald-400'
                      : selectedMember.status === 'Pending'
                        ? 'bg-amber-400'
                        : 'bg-slate-500'
                  }`}
                />

                <span className="text-sm font-medium">
                  {selectedMember.status}
                </span>

              </div>

            </div>

            <div className="mt-6 flex flex-col gap-3">

              <button
                onClick={toggleStatus}
                className="rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold transition hover:bg-slate-800"
              >
                {selectedMember.status === 'Active'
                  ? 'Deactivate Member'
                  : 'Activate Member'}
              </button>

              <button
                onClick={removeMember}
                className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/10"
              >
                Remove Member
              </button>

              <button
                onClick={() => setSelectedMember(null)}
                className="rounded-xl bg-slate-800 px-4 py-3 text-sm font-semibold transition hover:bg-slate-700"
              >
                Close
              </button>

            </div>

            <p className="mt-4 text-center text-xs text-slate-600">
              Demo mode — changes are stored locally.
            </p>

          </div>

        </div>

      )}

    </div>
  )
}

/* ----------------------------- */
/* Stat Card */
/* ----------------------------- */

function StatCard({ title, value, success = false }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

      <div className="flex items-center justify-between">

        <p className="text-sm text-slate-400">
          {title}
        </p>

        <span
          className={
            success
              ? 'text-emerald-400'
              : 'text-blue-400'
          }
        >
          ●
        </span>

      </div>

      <p className="mt-3 text-3xl font-bold">
        {value}
      </p>

    </div>
  )
}

/* ----------------------------- */
/* Input */
/* ----------------------------- */

function Input({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
}) {
  return (
    <div>

      <label className="mb-2 block text-xs font-medium text-slate-400">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
      />

    </div>
  )
}

/* ----------------------------- */
/* Role Card */
/* ----------------------------- */

function RoleCard({ role, description }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">

      <div className="flex items-center justify-between">

        <p className="font-semibold">
          {role}
        </p>

        <span className="rounded-md bg-blue-500/10 px-2 py-1 text-[10px] font-medium text-blue-400">
          RBAC
        </span>

      </div>

      <p className="mt-3 text-xs leading-5 text-slate-500">
        {description}
      </p>

    </div>
  )
}

/* ----------------------------- */
/* Role Button */
/* ----------------------------- */

function RoleButton({ role, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${
        selected
          ? 'border-blue-500 bg-blue-500/10 text-blue-400'
          : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700 hover:text-white'
      }`}
    >
      {role}

      {selected && (
        <span className="ml-2">
          ✓
        </span>
      )}
    </button>
  )
}

export default Team