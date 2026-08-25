const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Temporary in-memory cloud connection
let cloudConnection = null

// --------------------------------
// Health Check
// --------------------------------

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'CloudStack Pro API is running',
  })
})

// --------------------------------
// Cloud Resources
// --------------------------------

app.get('/api/cloud/resources', (req, res) => {
  res.json({
    success: true,
    resources: [
      {
        id: 1,
        name: 'cloudstack-web-server',
        type: 'Virtual Machine',
        provider: 'Azure',
        status: 'Running',
        region: 'Central India',
        ip: '20.42.18.101',
      },
      {
        id: 2,
        name: 'cloudstack-database',
        type: 'Database',
        provider: 'Azure',
        status: 'Healthy',
        region: 'Central India',
        ip: '10.0.2.15',
      },
      {
        id: 3,
        name: 'cloudstack-storage',
        type: 'Storage',
        provider: 'Azure',
        status: 'Active',
        region: 'Central India',
        ip: '—',
      },
    ],
  })
})
// --------------------------------
// Monitoring
// --------------------------------

app.get('/api/monitoring', (req, res) => {
  res.json({
    success: true,
    monitoring: {
      systemHealth: 98,
      cpuUsage: 42,
      memoryUsage: 68,
      networkUsage: 35,
      activeResources: 3,
      runningResources: 1,
      alerts: 0,
      uptime: '99.9%',
    },
  })
})
// --------------------------------
// Get Cloud Connection
// --------------------------------

app.get('/api/cloud/connection', (req, res) => {
  res.json({
    success: true,
    connection: cloudConnection,
  })
})

// --------------------------------
// Connect Cloud Provider
// --------------------------------

app.post('/api/cloud/connect', (req, res) => {
  const { provider } = req.body

  if (!provider) {
    return res.status(400).json({
      success: false,
      message: 'Cloud provider is required',
    })
  }

  cloudConnection = {
    provider,
    status: 'connected',
  }

  res.json({
    success: true,
    message: `${provider} connected successfully`,
    connection: cloudConnection,
  })
})

// --------------------------------
// Start Server
// --------------------------------

app.listen(PORT, () => {
  console.log(
    `CloudStack Pro API running on http://localhost:${PORT}`
  )
})