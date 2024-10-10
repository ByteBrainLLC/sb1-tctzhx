import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'

const Login: React.FC = () => {
  const { loginWithOAuth } = useAuth()
  const navigate = useNavigate()

  const handleOAuthLogin = async (provider: string) => {
    try {
      await loginWithOAuth(provider)
      navigate('/dashboard')
    } catch (error) {
      console.error(`${provider} login failed:`, error)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="px-8 py-6 mt-4 text-left bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white">Login to SocialGen</h3>
        <div className="mt-4 space-y-4">
          <button
            onClick={() => handleOAuthLogin('facebook')}
            className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline flex items-center justify-center"
          >
            <Facebook className="w-5 h-5 mr-2" />
            Login with Facebook
          </button>
          <button
            onClick={() => handleOAuthLogin('instagram')}
            className="w-full px-4 py-2 font-bold text-white bg-pink-600 rounded-full hover:bg-pink-700 focus:outline-none focus:shadow-outline flex items-center justify-center"
          >
            <Instagram className="w-5 h-5 mr-2" />
            Login with Instagram
          </button>
          <button
            onClick={() => handleOAuthLogin('linkedin')}
            className="w-full px-4 py-2 font-bold text-white bg-blue-800 rounded-full hover:bg-blue-900 focus:outline-none focus:shadow-outline flex items-center justify-center"
          >
            <Linkedin className="w-5 h-5 mr-2" />
            Login with LinkedIn
          </button>
          <button
            onClick={() => handleOAuthLogin('twitter')}
            className="w-full px-4 py-2 font-bold text-white bg-blue-400 rounded-full hover:bg-blue-500 focus:outline-none focus:shadow-outline flex items-center justify-center"
          >
            <Twitter className="w-5 h-5 mr-2" />
            Login with Twitter
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login