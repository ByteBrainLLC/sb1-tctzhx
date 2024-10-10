import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { CheckCircle } from 'lucide-react'

// Replace with your actual Stripe publishable key
const stripePromise = loadStripe('pk_test_your_publishable_key')

const SubscriptionPlan: React.FC<{
  name: string;
  price: number;
  features: string[];
  current: boolean;
  onSelect: () => void;
}> = ({ name, price, features, current, onSelect }) => (
  <div className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md ${current ? 'border-2 border-blue-500' : ''}`}>
    <h3 className="text-xl font-semibold mb-2">{name}</h3>
    <p className="text-2xl font-bold mb-4">${price}/month</p>
    <ul className="mb-4">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center mb-2">
          <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
          {feature}
        </li>
      ))}
    </ul>
    <button
      onClick={onSelect}
      className={`w-full py-2 px-4 rounded ${
        current
          ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
          : 'bg-blue-500 text-white hover:bg-blue-600'
      }`}
      disabled={current}
    >
      {current ? 'Current Plan' : 'Select Plan'}
    </button>
  </div>
)

const CheckoutForm: React.FC<{ plan: string; onSuccess: () => void; onCancel: () => void }> = ({ plan, onSuccess, onCancel }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!stripe || !elements) return

    setProcessing(true)
    setError(null)

    const cardElement = elements.getElement(CardElement)
    if (!cardElement) return

    // Here you would typically create a payment intent on your server and return the client secret
    // For this example, we'll simulate a successful payment
    setTimeout(() => {
      setProcessing(false)
      onSuccess()
    }, 2000)
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-4">
        <label htmlFor="card-element" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Credit or debit card
        </label>
        <div className="bg-white dark:bg-gray-700 p-3 rounded-md shadow-sm">
          <CardElement id="card-element" options={{style: {base: {fontSize: '16px'}}}} />
        </div>
      </div>
      {error && <div className="text-red-500 mt-2">{error}</div>}
      <div className="mt-4 flex justify-between">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || processing}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {processing ? 'Processing...' : `Subscribe to ${plan}`}
        </button>
      </div>
    </form>
  )
}

const SubscriptionManagement: React.FC = () => {
  const { user, updateUserProfile } = useAuth()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [showCheckout, setShowCheckout] = useState(false)

  const plans = [
    {
      name: 'Basic',
      price: 9.99,
      features: [
        'Post scheduling',
        'Basic analytics',
        'Up to 5 social accounts',
        '1 brand profile'
      ]
    },
    {
      name: 'Pro',
      price: 19.99,
      features: [
        'All Basic features',
        'Advanced analytics',
        'Up to 15 social accounts',
        'Competitor analysis',
        'Up to 3 brand profiles'
      ]
    },
    {
      name: 'Advanced',
      price: 39.99,
      features: [
        'All Pro features',
        'Unlimited social accounts',
        'AI-powered content suggestions',
        'Video content generation',
        'Unlimited brand profiles'
      ]
    }
  ]

  const handlePlanSelect = (planName: string) => {
    setSelectedPlan(planName)
    setShowCheckout(true)
  }

  const handleSubscriptionSuccess = async () => {
    if (selectedPlan) {
      await updateUserProfile({ subscriptionTier: selectedPlan })
      setShowCheckout(false)
      setSelectedPlan(null)
    }
  }

  const handleCancelCheckout = () => {
    setShowCheckout(false)
    setSelectedPlan(null)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Subscription Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {plans.map((plan) => (
          <SubscriptionPlan
            key={plan.name}
            name={plan.name}
            price={plan.price}
            features={plan.features}
            current={user?.subscriptionTier === plan.name}
            onSelect={() => handlePlanSelect(plan.name)}
          />
        ))}
      </div>
      {showCheckout && selectedPlan && (
        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Complete your subscription to {selectedPlan}</h2>
          <Elements stripe={stripePromise}>
            <CheckoutForm 
              plan={selectedPlan} 
              onSuccess={handleSubscriptionSuccess} 
              onCancel={handleCancelCheckout}
            />
          </Elements>
        </div>
      )}
    </div>
  )
}

export default SubscriptionManagement