import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Calendar, PenTool, CreditCard, BarChart2, Users, SplitSquareVertical, MessageCircle, TrendingUp, ThumbsUp, Video } from 'lucide-react'

const Dashboard: React.FC = () => {
  const { user } = useAuth()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user?.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/calendar" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <Calendar className="w-12 h-12 text-blue-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Content Calendar</h2>
          <p className="text-gray-600">Plan and schedule your social media posts</p>
        </Link>
        <Link to="/generate" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <PenTool className="w-12 h-12 text-green-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Generate Posts</h2>
          <p className="text-gray-600">Create engaging content for your social media</p>
        </Link>
        <Link to="/analytics" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <BarChart2 className="w-12 h-12 text-purple-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Analytics</h2>
          <p className="text-gray-600">Track your social media performance</p>
        </Link>
        {user?.subscriptionTier === 'Pro' && (
          <Link to="/competitor-analysis" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Users className="w-12 h-12 text-indigo-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Competitor Analysis</h2>
            <p className="text-gray-600">Analyze your competitors' strategies</p>
          </Link>
        )}
        {user?.subscriptionTier === 'Advanced' && (
          <>
            <Link to="/ab-testing" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <SplitSquareVertical className="w-12 h-12 text-orange-500 mb-4" />
              <h2 className="text-xl font-semibold mb-2">A/B Testing</h2>
              <p className="text-gray-600">Optimize your content with A/B tests</p>
            </Link>
            <Link to="/audience-segmentation" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Users className="w-12 h-12 text-teal-500 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Audience Segmentation</h2>
              <p className="text-gray-600">Personalize content for different audience groups</p>
            </Link>
            <Link to="/customer-interaction" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <MessageCircle className="w-12 h-12 text-pink-500 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Customer Interaction</h2>
              <p className="text-gray-600">Manage and automate customer interactions</p>
            </Link>
          </>
        )}
        <Link to="/subscription" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <CreditCard className="w-12 h-12 text-gray-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Subscription</h2>
          <p className="text-gray-600">Manage your subscription plan</p>
          <p className="mt-2 font-semibold text-blue-600">Current Plan: {user?.subscriptionTier}</p>
        </Link>
      </div>
    </div>
  )
}

export default Dashboard