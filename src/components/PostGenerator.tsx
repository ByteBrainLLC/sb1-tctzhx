import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { createApi } from 'unsplash-js'
import { Send, Loader, Image as ImageIcon, Upload, Hash, Calendar, Smile, Wand2 } from 'lucide-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const unsplash = createApi({
  accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY || 'YOUR_DEFAULT_UNSPLASH_ACCESS_KEY',
})

const PostGenerator: React.FC = () => {
  const { user } = useAuth()
  const [topic, setTopic] = useState('')
  const [platform, setPlatform] = useState('Instagram')
  const [contentType, setContentType] = useState('promotional')
  const [tone, setTone] = useState('casual')
  const [isLoading, setIsLoading] = useState(false)
  const [generatedContent, setGeneratedContent] = useState('')
  const [suggestedImages, setSuggestedImages] = useState<any[]>([])
  const [selectedImage, setSelectedImage] = useState<any>(null)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [scheduleDate, setScheduleDate] = useState<Date | null>(null)
  const [useEmojis, setUseEmojis] = useState(true)
  const [selectedBrand, setSelectedBrand] = useState('')

  useEffect(() => {
    if (user?.brandProfiles && user.brandProfiles.length > 0) {
      setSelectedBrand(user.brandProfiles[0].id)
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call to generate content
    setTimeout(() => {
      setGeneratedContent(`Sample ${platform} post about ${topic} for ${selectedBrand}. This is where the AI-generated content would appear.`)
      setIsLoading(false)
    }, 2000)

    // Fetch images from Unsplash
    try {
      const results = await unsplash.search.getPhotos({
        query: topic,
        page: 1,
        perPage: 5,
      })
      setSuggestedImages(results.response?.results || [])
    } catch (error) {
      console.error('Error fetching images:', error)
    }
  }

  const handleImageSelect = (image: any) => {
    setSelectedImage(image)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Generate Social Media Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="brand" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Brand</label>
          <select
            id="brand"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            {user?.brandProfiles?.map((brand) => (
              <option key={brand.id} value={brand.id}>{brand.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Topic</label>
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="platform" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Platform</label>
          <select
            id="platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="Instagram">Instagram</option>
            <option value="Twitter">Twitter</option>
            <option value="Facebook">Facebook</option>
            <option value="LinkedIn">LinkedIn</option>
          </select>
        </div>
        <div>
          <label htmlFor="contentType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Content Type</label>
          <select
            id="contentType"
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="promotional">Promotional</option>
            <option value="informative">Informative</option>
            <option value="entertaining">Entertaining</option>
          </select>
        </div>
        <div>
          <label htmlFor="tone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tone</label>
          <select
            id="tone"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="casual">Casual</option>
            <option value="formal">Formal</option>
            <option value="humorous">Humorous</option>
            <option value="serious">Serious</option>
          </select>
        </div>
        <div className="flex items-center">
          <input
            id="useEmojis"
            type="checkbox"
            checked={useEmojis}
            onChange={(e) => setUseEmojis(e.target.checked)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="useEmojis" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
            Include emojis
          </label>
        </div>
        <div>
          <label htmlFor="scheduleDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Schedule Post</label>
          <DatePicker
            id="scheduleDate"
            selected={scheduleDate}
            onChange={(date: Date) => setScheduleDate(date)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholderText="Select date and time"
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </div>
        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          {isLoading ? <Loader className="w-5 h-5 mr-2 animate-spin" /> : <Send className="w-5 h-5 mr-2" />}
          Generate Post
        </button>
      </form>
      {generatedContent && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Generated Content:</h2>
          <p className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">{generatedContent}</p>
        </div>
      )}
      {suggestedImages.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Suggested Images:</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {suggestedImages.map((image) => (
              <img
                key={image.id}
                src={image.urls.small}
                alt={image.alt_description}
                className={`w-full h-32 object-cover rounded-md cursor-pointer ${selectedImage === image ? 'border-4 border-indigo-500' : ''}`}
                onClick={() => handleImageSelect(image)}
              />
            ))}
          </div>
        </div>
      )}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Upload Image:</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
        {uploadedImage && (
          <img src={uploadedImage} alt="Uploaded" className="mt-4 w-full max-w-md h-auto rounded-md" />
        )}
      </div>
    </div>
  )
}

export default PostGenerator