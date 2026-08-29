const express = require('express')
const cors = require('cors')
const Razorpay = require('razorpay')
const crypto = require('crypto')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// --------------------------------
// Razorpay
// --------------------------------

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})
// --------------------------------
// Create Razorpay Order
// --------------------------------

const PLAN_PRICES = {
  Starter: 1599,
  Professional: 4099,
  Enterprise: 16599,
}

app.post('/api/payment/create-order', async (req, res) => {
  try {
    const { plan } = req.body

    if (!plan) {
      return res.status(400).json({
        success: false,
        message: 'Plan is required',
      })
    }

    const amount = PLAN_PRICES[plan]

    if (!amount) {
      return res.status(400).json({
        success: false,
        message: 'Invalid plan selected',
      })
    }

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: 'INR',
      receipt: `cloudstack_${Date.now()}`,
    })

    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      plan,
    })
  } catch (error) {
    console.error('Razorpay Order Error:', error)

    res.status(500).json({
      success: false,
      message: 'Unable to create payment order',
    })
  }
})
// --------------------------------
// Temporary In-Memory Data
// --------------------------------

// Cloud connection
let cloudConnection = null

// Cloud resources
let cloudResources = [
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
]

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
// Get Cloud Resources
// --------------------------------

app.get('/api/cloud/resources', (req, res) => {
  res.json({
    success: true,
    resources: cloudResources,
  })
})

// --------------------------------
// Resource Actions
// --------------------------------

app.post('/api/cloud/resources/:id/action', (req, res) => {
  const resourceId = Number(req.params.id)
  const { action } = req.body

  const allowedActions = ['start', 'stop', 'restart']

  if (!allowedActions.includes(action)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid resource action',
    })
  }

  const resource = cloudResources.find(
    (item) => item.id === resourceId
  )

  if (!resource) {
    return res.status(404).json({
      success: false,
      message: 'Resource not found',
    })
  }

  // Only Virtual Machines support these actions
  if (resource.type !== 'Virtual Machine') {
    return res.status(400).json({
      success: false,
      message: `${resource.name} does not support start, stop, or restart actions`,
    })
  }

  // Update the actual resource
  if (action === 'start') {
    resource.status = 'Running'
  }

  if (action === 'stop') {
    resource.status = 'Stopped'
  }

  if (action === 'restart') {
    resource.status = 'Running'
  }

  res.json({
    success: true,
    message: `${resource.name} ${action} action completed`,
    resource,
  })
})

// --------------------------------
// Monitoring
// --------------------------------

app.get('/api/monitoring', (req, res) => {
  const metrics = [
    {
      id: 1,
      name: 'web-server-prod',
      provider: 'Azure',
      status: 'Healthy',
      cpu: 34,
      memory: 58,
      network: 72,
    },
    {
      id: 2,
      name: 'api-server',
      provider: 'Azure',
      status: 'Healthy',
      cpu: 47,
      memory: 64,
      network: 54,
    },
    {
      id: 3,
      name: 'database-prod',
      provider: 'Azure',
      status: 'Healthy',
      cpu: 29,
      memory: 71,
      network: 48,
    },
    {
      id: 4,
      name: 'worker-prod-01',
      provider: 'AWS',
      status: 'Warning',
      cpu: 76,
      memory: 82,
      network: 67,
    },
    {
      id: 5,
      name: 'worker-prod-02',
      provider: 'AWS',
      status: 'Stopped',
      cpu: 0,
      memory: 0,
      network: 0,
    },
    {
      id: 6,
      name: 'gcp-api-prod',
      provider: 'Google Cloud',
      status: 'Healthy',
      cpu: 41,
      memory: 55,
      network: 61,
    },
  ]

  const healthyCount = metrics.filter(
    (metric) => metric.status === 'Healthy'
  ).length

  const warningCount = metrics.filter(
    (metric) => metric.status === 'Warning'
  ).length

  const stoppedCount = metrics.filter(
    (metric) => metric.status === 'Stopped'
  ).length

  const averageCpu = Math.round(
    metrics.reduce(
      (sum, metric) => sum + metric.cpu,
      0
    ) / metrics.length
  )

  const runningCount = metrics.filter(
    (metric) => metric.status !== 'Stopped'
  ).length

  const systemHealth = Math.round(
    (healthyCount / metrics.length) * 100
  )

  res.json({
    success: true,

    monitoring: {
      metrics,

      summary: {
        healthyResources: healthyCount,
        warnings: warningCount,
        stopped: stoppedCount,
        averageCpu,
        totalResources: metrics.length,
        runningResources: runningCount,
        systemHealth,
      },

      alerts: [
        {
          id: 1,
          severity: 'Warning',
          title: 'High resource utilization',
          resource: 'worker-prod-01',
          message:
            'worker-prod-01 is currently using 76% CPU and 82% memory.',
          detected: '4 minutes ago',
        },
      ],
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
// Billing
// --------------------------------

app.get('/api/billing', (req, res) => {
  res.json({
    success: true,

    billing: {
      plan: {
        name: 'Free Plan',
        price: 0,
        currency: 'USD',
        interval: 'month',
        status: 'current',
      },

      usage: {
        cloudResources: {
          used: 12,
          limit: 25,
        },

        teamMembers: {
          used: 1,
          limit: 3,
        },

        apiRequests: {
          used: 1240,
          limit: 10000,
        },

        aiRequests: {
          used: 18,
          limit: 100,
        },
      },

      cloudCost: {
        current: 0,
        budget: 100,
        currency: 'USD',
      },

      paymentMethod: {
        added: false,
        status: 'Not added',
      },

      billingHistory: [],
    },
  })
})
// --------------------------------
// Razorpay Payment Verification
// --------------------------------

app.post('/api/payment/verify', (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        error: 'Missing payment verification details',
      })
    }

    if (!process.env.RAZORPAY_KEY_SECRET) {
      console.error('Razorpay secret is missing.')

      return res.status(500).json({
        success: false,
        error: 'Payment verification is not configured',
      })
    }

    const generatedSignature = crypto
      .createHmac(
        'sha256',
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(
        `${razorpay_order_id}|${razorpay_payment_id}`
      )
      .digest('hex')

    const isValid = crypto.timingSafeEqual(
      Buffer.from(generatedSignature),
      Buffer.from(razorpay_signature)
    )

    if (!isValid) {
      return res.status(400).json({
        success: false,
        error: 'Payment signature verification failed',
      })
    }

    console.log(
      'Razorpay payment verified:',
      razorpay_payment_id
    )

    return res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
    })
  } catch (error) {
    console.error(
      'Razorpay Verification Error:',
      error
    )

    return res.status(500).json({
      success: false,
      error: 'Unable to verify payment',
    })
  }
})
// --------------------------------
// Start Server
// --------------------------------

app.listen(PORT, () => {
  console.log(
    `CloudStack Pro API running on http://localhost:${PORT}`
  )
})
