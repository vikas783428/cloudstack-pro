import { useEffect, useState } from 'react'

function Billing({ onNavigate }) {
  const [billing, setBilling] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Razorpay / payment states
  const [paymentLoading, setPaymentLoading] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(null)

  // --------------------------------
  // Razorpay Upgrade
  // --------------------------------

  const handleUpgrade = async (planName) => {
    try {
      setPaymentLoading(true)

      // Create Razorpay order
      const response = await fetch(
        'http://localhost:5000/api/payment/create-order',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            plan: planName,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.error || 'Unable to create payment order'
        )
      }

      console.log('Razorpay order created:', data)

      // Razorpay checkout options
      const options = {
        key: 'rzp_test_TOAarLLImu64LT',

        amount: data.amount,

        currency: data.currency,

        name: 'CloudStack Pro',

        description: `${data.plan} Plan`,

        order_id: data.orderId,

        handler: async function (razorpayResponse) {
          try {
            console.log(
              'Razorpay payment response:',
              razorpayResponse
            )

            // Verify payment on backend
            const verifyResponse = await fetch(
              'http://localhost:5000/api/payment/verify',
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  razorpay_order_id:
                    razorpayResponse.razorpay_order_id,

                  razorpay_payment_id:
                    razorpayResponse.razorpay_payment_id,

                  razorpay_signature:
                    razorpayResponse.razorpay_signature,
                }),
              }
            )

            const verifyData = await verifyResponse.json()

            console.log(
              'Payment verification result:',
              verifyData
            )

            if (!verifyResponse.ok || !verifyData.success) {
              throw new Error(
                verifyData.error ||
                  'Payment verification failed'
              )
            }

            // --------------------------------
            // Payment successfully verified
            // --------------------------------

            setPaymentSuccess({
              plan: data.plan,
              paymentId:
                razorpayResponse.razorpay_payment_id,
              orderId:
                razorpayResponse.razorpay_order_id,
            })

          } catch (error) {
            console.error(
              'Payment verification error:',
              error
            )

            alert(error.message)
          } finally {
            setPaymentLoading(false)
          }
        },

        modal: {
          ondismiss: function () {
            console.log('Razorpay checkout closed')
            setPaymentLoading(false)
          },
        },

        theme: {
          color: '#2563eb',
        },
      }

      // Check Razorpay loaded
      if (!window.Razorpay) {
        throw new Error(
          'Razorpay checkout is not loaded. Please check app/index.html.'
        )
      }

      const razorpay = new window.Razorpay(options)

      razorpay.on('payment.failed', function (response) {
        console.error(
          'Razorpay payment failed:',
          response.error
        )

        setPaymentLoading(false)

        alert(
          response.error?.description ||
            'Payment failed. Please try again.'
        )
      })

      razorpay.open()

    } catch (error) {
      console.error('Payment error:', error)

      setPaymentLoading(false)

      alert(error.message)
    }
  }

  // --------------------------------
  // Get Billing Data
  // --------------------------------

  useEffect(() => {
    const fetchBilling = async () => {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(
          'http://localhost:5000/api/billing'
        )

        if (!response.ok) {
          throw new Error('Failed to fetch billing data')
        }

        const data = await response.json()

        if (!data.success) {
          throw new Error(
            data.message || 'Failed to load billing'
          )
        }

        setBilling(data.billing)
      } catch (err) {
        console.error('Billing API error:', err)

        setError(
          'Unable to load billing information.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchBilling()
  }, [])

  // --------------------------------
  // Loading
  // --------------------------------

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="text-center">

          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-700 border-t-blue-500" />

          <p className="mt-4 text-sm text-slate-400">
            Loading billing information...
          </p>

        </div>
      </div>
    )
  }

  // --------------------------------
  // Error
  // --------------------------------

  if (error || !billing) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">

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

        <main className="flex items-center justify-center p-6">

          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center">

            <p className="text-sm font-semibold text-red-400">
              Billing unavailable
            </p>

            <p className="mt-2 text-sm text-slate-500">
              {error ||
                'Unable to load billing information.'}
            </p>

            <button
              onClick={() => window.location.reload()}
              className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold transition hover:bg-blue-500"
            >
              Try Again
            </button>

          </div>

        </main>

      </div>
    )
  }

  const {
    plan,
    usage,
    cloudCost,
    paymentMethod,
    billingHistory,
  } = billing

  const cloudResourcesPercentage = Math.round(
    (usage.cloudResources.used /
      usage.cloudResources.limit) *
      100
  )

  const teamMembersPercentage = Math.round(
    (usage.teamMembers.used /
      usage.teamMembers.limit) *
      100
  )

  const apiRequestsPercentage = Math.round(
    (usage.apiRequests.used /
      usage.apiRequests.limit) *
      100
  )

  const aiRequestsPercentage = Math.round(
    (usage.aiRequests.used /
      usage.aiRequests.limit) *
      100
  )

  const cloudCostPercentage =
    cloudCost.budget > 0
      ? Math.round(
          (cloudCost.current /
            cloudCost.budget) *
            100
        )
      : 0

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

          {/* Current Plan */}

          <div className="grid gap-6 lg:grid-cols-3">

            <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-purple-600/10 p-6 lg:col-span-2">

              <div className="flex flex-col justify-between gap-5 sm:flex-row">

                <div>

                  <div className="flex items-center gap-3">

                    <h3 className="text-xl font-bold">
                      {plan.name}
                    </h3>

                    <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                      {plan.status === 'current'
                        ? 'Current Plan'
                        : plan.status}
                    </span>

                  </div>

                  <p className="mt-2 text-sm text-slate-400">
                    Get started with CloudStack Pro and manage your
                    infrastructure from one workspace.
                  </p>

                </div>

                <div className="text-left sm:text-right">

                  <p className="text-3xl font-bold">
                    ${plan.price}
                  </p>

                  <p className="text-xs text-slate-500">
                    per {plan.interval}
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
                onClick={() => handleUpgrade('Starter')}
                disabled={paymentLoading}
                className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {paymentLoading
                  ? 'Processing...'
                  : 'Upgrade Plan'}
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
                value={usage.cloudResources.used}
                limit={usage.cloudResources.limit}
                percentage={cloudResourcesPercentage}
              />

              <UsageCard
                title="Team Members"
                value={usage.teamMembers.used}
                limit={usage.teamMembers.limit}
                percentage={teamMembersPercentage}
              />

              <UsageCard
                title="API Requests"
                value={usage.apiRequests.used.toLocaleString()}
                limit={usage.apiRequests.limit.toLocaleString()}
                percentage={apiRequestsPercentage}
              />

              <UsageCard
                title="AI Requests"
                value={usage.aiRequests.used}
                limit={usage.aiRequests.limit}
                percentage={aiRequestsPercentage}
              />

            </div>

          </div>

          {/* Cost */}

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
                ${cloudCost.current.toFixed(2)}
              </p>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-800">

                <div
                  className="h-full rounded-full bg-blue-500"
                  style={{
                    width: `${cloudCostPercentage}%`,
                  }}
                />

              </div>

              <div className="mt-2 flex justify-between text-xs text-slate-500">

                <span>
                  ${cloudCost.current} used
                </span>

                <span>
                  ${cloudCost.budget} budget
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
                  {paymentMethod.status}
                </span>

              </div>

              <div className="mt-6 rounded-xl border border-dashed border-slate-700 p-5 text-center">

                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800">
                  $
                </div>

                <p className="mt-3 text-sm font-medium">
                  {paymentMethod.added
                    ? 'Payment method added'
                    : 'No payment method'}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {paymentMethod.added
                    ? 'Your payment method is ready for billing.'
                    : 'Add a payment method when you upgrade your plan.'}
                </p>

              </div>

            </div>

          </div>

          {/* Billing History */}

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

              {billingHistory.length === 0 ? (

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

              ) : (

                <div className="space-y-3">

                  {billingHistory.map((invoice) => (

                    <div
                      key={invoice.id}
                      className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/50 p-4"
                    >

                      <div>

                        <p className="text-sm font-medium">
                          {invoice.description || 'Invoice'}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {invoice.date}
                        </p>

                      </div>

                      <p className="text-sm font-semibold">
                        ${invoice.amount}
                      </p>

                    </div>

                  ))}

                </div>

              )}

            </div>

          </div>

          {/* Razorpay Notice */}

          <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">

            <div className="flex gap-3">

              <div className="text-amber-400">
                ⚡
              </div>

              <div>

                <p className="text-sm font-semibold">
                  Secure payments
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Payments are securely processed and verified
                  using Razorpay.
                </p>

              </div>

            </div>

          </div>

        </div>

      </main>

      {/* ========================================
          PAYMENT SUCCESS MODAL
          ======================================== */}

      {paymentSuccess && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">

          <div className="relative w-full max-w-md rounded-2xl border border-slate-700 bg-white p-6 text-slate-900 shadow-2xl">

            {/* Close */}

            <button
              onClick={() => setPaymentSuccess(null)}
              className="absolute right-5 top-5 text-xl text-slate-500 transition hover:text-slate-900"
            >
              ×
            </button>

            {/* Success */}

            <div className="text-center">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-3xl font-bold text-white">
                  ✓
                </div>

              </div>

              <h2 className="mt-5 text-3xl font-extrabold text-emerald-600">
                SUCCESS
              </h2>

              <h3 className="mt-4 text-2xl font-bold text-slate-800">
                Payment Successful
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Your payment has been verified successfully.
                <br />
                Thank you for choosing CloudStack Pro.
              </p>

            </div>

            {/* Payment Details */}

            <div className="mt-6 rounded-xl bg-slate-50 p-4">

              <div className="flex items-center justify-between border-b border-slate-200 py-3">

                <span className="text-sm text-slate-600">
                  Plan
                </span>

                <span className="text-sm font-bold text-slate-800">
                  {paymentSuccess.plan}
                </span>

              </div>

              <div className="flex items-center justify-between border-b border-slate-200 py-3">

                <span className="text-sm text-slate-600">
                  Payment ID
                </span>

                <span className="max-w-[190px] truncate text-sm font-bold text-slate-800">
                  {paymentSuccess.paymentId}
                </span>

              </div>

              <div className="flex items-center justify-between py-3">

                <span className="text-sm text-slate-600">
                  Order ID
                </span>

                <span className="max-w-[190px] truncate text-sm font-bold text-slate-800">
                  {paymentSuccess.orderId}
                </span>

              </div>

            </div>

            {/* Continue */}

            <button
              onClick={() => setPaymentSuccess(null)}
              className="mt-5 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Continue
            </button>

          </div>

        </div>

      )}

    </div>
  )
}

// --------------------------------
// Usage Card
// --------------------------------

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
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

      <p className="mt-2 text-xs text-slate-500">
        {percentage}% used
      </p>

    </div>
  )
}

export default Billing