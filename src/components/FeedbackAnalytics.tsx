import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface FeedbackData {
  rating: number;
  count: number;
}

const FeedbackAnalytics: React.FC = () => {
  const { user } = useAuth()
  const [feedbackData, setFeedbackData] = useState<FeedbackData[]>([])

  useEffect(() => {
    // Fetch feedback data from API
    // This is a placeholder, replace with actual API call
    const mockData: FeedbackData[] = [
      { rating: 1, count: 5 },
      { rating: 2, count: 10 },
      { rating: 3, count: 20 },
      { rating: 4, count: 30 },
      { rating: 5, count: 35 },
    ]
    setFeedbackData(mockData)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Feedback Analytics</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={feedbackData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="rating" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default FeedbackAnalytics