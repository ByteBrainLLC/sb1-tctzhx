import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Onboarding: React.FC = () => {
  const [step, setStep] = useState(1)
  const [brandColor, setBrandColor] = useState('#000000')
  const [brandFont, setBrandFont] = useState('')
  const [brandTone, setBrandTone] = useState('')
  const [industry, setIndustry] = useState('')
  const { updateUserProfile } = useAuth()
  const navigate = useNavigate()

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    try {
      await updateUserProfile({
        brandGuidelines: {
          color: brandColor,
          font: brandFont,
          tone: brandTone,
        },
        industry,
      })
      navigate('/dashboard')
    } catch (error) {
      console.error('Failed to update user profile:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to SocialGen!</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Step 1: Brand Guidelines</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="brandColor" className="block text-sm font-medium text-gray-700">Brand Color</label>
                <input
                  type="color"
                  id="brandColor"
                  value={brandColor}
                  onChange={(e) => setBrandColor(e.target.value)}
                  className="mt-1 block w-full"
                />
              </div>
              <div>
                <label htmlFor="brandFont" className="block text-sm font-medium text-gray-700">Brand Font</label>
                <input
                  type="text"
                  id="brandFont"
                  value={brandFont}
                  onChange={(e) => setBrandFont(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="e.g., Arial, Helvetica, sans-serif"
                />
              </div>
              <div>
                <label htmlFor="brandTone" className="block text-sm font-medium text-gray-700">Brand Tone</label>
                <select
                  id="brandTone"
                  value={brandTone}
                  onChange={(e) => setBrandTone(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="">Select a tone</option>
                  <option value="professional">Professional</option>
                  <option value="friendly">Friendly</option>
                  <option value="casual">Casual</option>
                  <option value="humorous">Humorous</option>
                </select>
              </div>
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Step 2: Industry/Niche</h2>
            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-gray-700">Select your industry</label>
              <select
                id="industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="">Select an industry</option>
                <option value="technology">Technology</option>
                <option value="finance">Finance</option>
                <option value="healthcare">Healthcare</option>
                <option value="education">Education</option>
                <option value="ecommerce">E-commerce</option>
                <option value="travel">Travel</option>
                <option value="food">Food & Beverage</option>
              </select>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Step 3: Confirm Your Settings</h2>
            <div className="space-y-2">
              <p><strong>Brand Color:</strong> <span style={{color: brandColor}}>{brandColor}</span></p>
              <p><strong>Brand Font:</strong> {brandFont}</p>
              <p><strong>Brand Tone:</strong> {brandTone}</p>
              <p><strong>Industry:</strong> {industry}</p>
            </div>
          </div>
        )}
        <button
          onClick={handleNext}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {step < 3 ? 'Next' : 'Finish'}
        </button>
      </div>
    </div>
  )
}

export default Onboarding