import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Onboarding from './components/Onboarding'
import Dashboard from './components/Dashboard'
import ContentCalendar from './components/ContentCalendar'
import PostGenerator from './components/PostGenerator'
import AnalyticsDashboard from './components/AnalyticsDashboard'
import SubscriptionManagement from './components/SubscriptionManagement'
import FeedbackAnalytics from './components/FeedbackAnalytics'
import VideoGenerator from './components/VideoGenerator'
import CompetitorAnalysis from './components/CompetitorAnalysis'
import BrandProfiles from './components/BrandProfiles'
import Header from './components/Header'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import ErrorBoundary from './components/ErrorBoundary'

const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { user } = useAuth()
  return user ? element : <Navigate to="/login" replace />
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ThemeProvider>
          <Router>
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
              <Header />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/onboarding" element={<PrivateRoute element={<Onboarding />} />} />
                <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
                <Route path="/calendar" element={<PrivateRoute element={<ContentCalendar />} />} />
                <Route path="/generate" element={<PrivateRoute element={<PostGenerator />} />} />
                <Route path="/analytics" element={<PrivateRoute element={<AnalyticsDashboard />} />} />
                <Route path="/subscription" element={<PrivateRoute element={<SubscriptionManagement />} />} />
                <Route path="/feedback" element={<PrivateRoute element={<FeedbackAnalytics />} />} />
                <Route path="/video-generator" element={<PrivateRoute element={<VideoGenerator />} />} />
                <Route path="/competitor-analysis" element={<PrivateRoute element={<CompetitorAnalysis />} />} />
                <Route path="/brand-profiles" element={<PrivateRoute element={<BrandProfiles />} />} />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </div>
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App