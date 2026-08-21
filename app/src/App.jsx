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

  return (
    <>
      {page === 'overview' && (
        <Dashboard onNavigate={setPage} />
      )}

      {page === 'cloud-resources' && (
        <CloudResources
          onNavigate={setPage}
          onConnectCloud={() => setPage('overview')}
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