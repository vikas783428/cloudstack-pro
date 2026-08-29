import { useState } from 'react'
import Dashboard from './pages/Dashboard'
import CloudResources from './pages/CloudResources'
import Monitoring from './pages/Monitoring'
import Billing from './pages/Billing'
import Team from './pages/Team'
import ApiKeys from './pages/ApiKeys'
import AIDevOps from './pages/AIDevOps'

function App() {
  const [page, setPage] = useState('overview')
  const [openConnectModal, setOpenConnectModal] = useState(false)

  const navigateToCloudConnect = () => {
    setPage('overview')
    setOpenConnectModal(true)
  }

  return (
    <>
      {page === 'overview' && (
        <Dashboard
          onNavigate={setPage}
          openConnectModal={openConnectModal}
          setOpenConnectModal={setOpenConnectModal}
        />
      )}

      {page === 'cloud-resources' && (
        <CloudResources
          onNavigate={setPage}
          onConnectCloud={navigateToCloudConnect}
        />
      )}

      {page === 'monitoring' && (
        <Monitoring
          onNavigate={setPage}
        />
      )}

      {page === 'billing' && (
        <Billing
          onNavigate={setPage}
        />
      )}

      {page === 'team' && (
        <Team
          onNavigate={setPage}
        />
      )}

      {page === 'api-keys' && (
        <ApiKeys
          onNavigate={setPage}
        />
      )}

      {page === 'ai-devops' && (
        <AIDevOps
          onNavigate={setPage}
        />
      )}
    </>
  )
}

export default App