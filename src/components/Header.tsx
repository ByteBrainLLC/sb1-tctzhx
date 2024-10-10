import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { LogOut, BarChart, Video, Sun, Moon, Users, Briefcase } from 'lucide-react'

const Header: React.FC = () => {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">SocialGen</Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100">Dashboard</Link>
              <Link to="/calendar" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100">Calendar</Link>
              <Link to="/generate" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100">Generate</Link>
              <Link to="/analytics" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 flex items-center">
                <BarChart className="w-4 h-4 mr-1" />
                Analytics
              </Link>
              {(user.subscriptionTier === 'Pro' || user.subscriptionTier === 'Advanced') && (
                <>
                  <Link to="/competitor-analysis" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    Competitors
                  </Link>
                  <Link to="/brand-profiles" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 flex items-center">
                    <Briefcase className="w-4 h-4 mr-1" />
                    Brands
                  </Link>
                </>
              )}
              {user.subscriptionTier === 'Advanced' && (
                <Link to="/video-generator" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 flex items-center">
                  <Video className="w-4 h-4 mr-1" />
                  Video
                </Link>
              )}
              <button onClick={logout} className="flex items-center text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300">
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">Login</Link>
          )}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Header