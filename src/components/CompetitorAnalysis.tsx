import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { ArrowUpRight, Lightbulb } from 'lucide-react'

interface Competitor {
  name: string;
  followers: number;
  engagement: number;
  postFrequency: number;
}

const CompetitorAnalysis: React.FC = () => {
  const { user } = useAuth()
  const [competitors, setCompetitors] = useState<Competitor[]>([])
  const [insights, setInsights] = useState<string[]>([])

  useEffect(() => {
    // Fetch competitor data and insights
    // This is a mock implementation. In a real app, you'd fetch this data from your backend
    const mockCompetitors: Competitor[] = [
      { name: 'Competitor A', followers: 50000, engagement: 3.5, postFrequency: 2.1 },
      { name: 'Competitor B', followers: 75000, engagement: 4.2, postFrequency: 1.8 },
      { name: 'Competitor C', followers: 30000, engagement: 5.1, postFrequency: 3.2 },
    ]
    setCompetitors(mockCompetitors)

    const mockInsights = [
      'Competitor B has 25% more followers but only 10% higher engagement. Focus on increasing engagement with your current followers.',
      'Competitor C posts 52% more frequently than you. Consider increasing your posting frequency to match.',
      'Your engagement rate is 15% higher than Competitor A. Analyze your best-performing content to understand why.',
    ]
    setInsights(mockInsights)
  }, [])

  if (user?.subscriptionTier !== 'Pro' && user?.subscriptionTier !== 'Advanced') {
    return (
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mt-6" role="alert">
        <p className="font-bold">Upgrade Required</p>
        <p>Competitor Analysis is available for Pro and Advanced tier users. Please upgrade your plan to access this feature.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Competitor Analysis</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Competitor Metrics</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="px-4 py-2 text-left">Competitor</th>
                  <th className="px-4 py-2 text-left">Followers</th>
                  <th className="px-4 py-2 text-left">Engagement Rate</th>
                  <th className="px-4 py-2 text-left">Post Frequency</th>
                </tr>
              </thead>
              <tbody>
                {competitors.map((competitor) => (
                  <tr key={competitor.name} className="border-b dark:border-gray-600">
                    <td className="px-4 py-2">{competitor.name}</td>
                    <td className="px-4 py-2">{competitor.followers.toLocaleString()}</td>
                    <td className="px-4 py-2">{competitor.engagement.toFixed(1)}%</td>
                    <td className="px-4 py-2">{competitor.postFrequency.toFixed(1)}/day</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Insights</h2>
          <ul className="space-y-4">
            {insights.map((insight, index) => (
              <li key={index} className="flex items-start">
                <Lightbulb className="w-6 h-6 text-yellow-500 mr-2 flex-shrink-0 mt-1" />
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CompetitorAnalysis