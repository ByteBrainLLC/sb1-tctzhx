import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

interface ABTest {
  id: string;
  postA: string;
  postB: string;
  platform: string;
  startDate: string;
  endDate: string;
  resultsA: { impressions: number; engagements: number; clicks: number };
  resultsB: { impressions: number; engagements: number; clicks: number };
  winner: 'A' | 'B' | null;
}

const ABTesting: React.FC = () => {
  const { user } = useAuth()
  const [tests, setTests] = useState<ABTest[]>([])
  const [newTest, setNewTest] = useState({
    postA: '',
    postB: '',
    platform: 'Instagram',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  })

  const handleCreateTest = () => {
    const newABTest: ABTest = {
      id: (tests.length + 1).toString(),
      postA: newTest.postA,
      postB: newTest.postB,
      platform: newTest.platform,
      startDate: newTest.startDate,
      endDate: newTest.endDate,
      resultsA: { impressions: 0, engagements: 0, clicks: 0 },
      resultsB: { impressions: 0, engagements: 0, clicks: 0 },
      winner: null
    }
    setTests([...tests, newABTest])
    setNewTest({
      postA: '',
      postB: '',
      platform: 'Instagram',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    })
  }

  if (user?.subscriptionTier !== 'Advanced') {
    return (
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
        <p className="font-bold">Upgrade Required</p>
        <p>A/B Testing is an advanced feature. Please upgrade your plan to access this feature.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">A/B Testing</h2>
      {/* Form to create new A/B test */}
      {/* List of ongoing and completed A/B tests */}
    </div>
  )
}

export default ABTesting