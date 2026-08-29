const API_URL = 'http://localhost:5000'

export async function checkBackendHealth() {
  const response = await fetch(`${API_URL}/api/health`)

  if (!response.ok) {
    throw new Error('Backend request failed')
  }

  return response.json()
}

export async function connectCloudProvider(provider) {
  const response = await fetch(`${API_URL}/api/cloud/connect`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      provider,
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Cloud connection failed')
  }

  return data
}

export async function getCloudConnection() {
  const response = await fetch(`${API_URL}/api/cloud/connection`)

  if (!response.ok) {
    throw new Error('Failed to get cloud connection')
  }

  return response.json()
}

export async function getCloudResources() {
  const response = await fetch(`${API_URL}/api/cloud/resources`)

  if (!response.ok) {
    throw new Error('Failed to get cloud resources')
  }

  return response.json()
}

export async function getMonitoringData() {
  const response = await fetch(`${API_URL}/api/monitoring`)

  if (!response.ok) {
    throw new Error('Failed to get monitoring data')
  }

  return response.json()
}
export async function performResourceAction(resourceId, action) {
  const response = await fetch(
    `${API_URL}/api/cloud/resources/${resourceId}/action`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action,
      }),
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Resource action failed')
  }

  return data
}
export async function getBillingData() {
  const response = await fetch(`${API_URL}/api/billing`)

  if (!response.ok) {
    throw new Error('Failed to get billing data')
  }

  return response.json()
}
export async function createRazorpayOrder(plan) {
  const response = await fetch('http://localhost:5000/api/payment/create-order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      plan,
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Failed to create Razorpay order')
  }

  return data
}