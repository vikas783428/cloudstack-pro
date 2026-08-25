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