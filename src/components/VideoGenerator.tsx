import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Video, Loader, Download } from 'lucide-react'

interface VideoGenerationResult {
  id: string
  url: string
  thumbnail: string
}

const VideoGenerator: React.FC = () => {
  const { user } = useAuth()
  const [postContent, setPostContent] = useState('')
  const [duration, setDuration] = useState(15)
  const [style, setStyle] = useState('promotional')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [generatedVideo, setGeneratedVideo] = useState<VideoGenerationResult | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setGeneratedVideo(null)

    try {
      // In a real application, this would be an API call to your backend,
      // which would then interact with the AI video generation service (e.g., RunwayML)
      await new Promise(resolve => setTimeout(resolve, 3000)) // Simulate API delay
      
      // Mock response from the video generation service
      const mockVideoResult: VideoGenerationResult = {
        id: 'video-' + Date.now(),
        url: 'https://example.com/generated-video.mp4',
        thumbnail: 'https://example.com/video-thumbnail.jpg'
      }
      
      setGeneratedVideo(mockVideoResult)
    } catch (err) {
      setError('Failed to generate video. Please try again.')
      console.error('Error generating video:', err)
    } finally {
      setLoading(false)
    }
  }

  if (user?.subscriptionTier !== 'Advanced') {
    return (
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mt-6" role="alert">
        <p className="font-bold">Upgrade Required</p>
        <p>AI-Generated Video Content is an add-on feature available for Advanced tier users. Upgrade your plan to access this feature.</p>
      </div>
    )
  }

  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">AI-Generated Video Content</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="postContent" className="block text-sm font-medium text-gray-700">Post Content</label>
          <textarea
            id="postContent"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            rows={3}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Video Duration (seconds)</label>
          <input
            type="number"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            min={5}
            max={60}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label htmlFor="style" className="block text-sm font-medium text-gray-700">Video Style</label>
          <select
            id="style"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="promotional">Promotional</option>
            <option value="explainer">Explainer</option>
            <option value="storytelling">Storytelling</option>
            <option value="product-showcase">Product Showcase</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? (
            <>
              <Loader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
              Generating Video...
            </>
          ) : (
            <>
              <Video className="-ml-1 mr-3 h-5 w-5 text-white" />
              Generate Video
            </>
          )}
        </button>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {generatedVideo && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Generated Video</h3>
          <div className="aspect-w-16 aspect-h-9">
            <video
              src={generatedVideo.url}
              poster={generatedVideo.thumbnail}
              controls
              className="w-full h-full object-cover rounded-md"
            >
              Your browser does not support the video tag.
            </video>
          </div>
          <a
            href={generatedVideo.url}
            download
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Download className="-ml-1 mr-2 h-5 w-5" />
            Download Video
          </a>
        </div>
      )}
    </div>
  )
}

export default VideoGenerator