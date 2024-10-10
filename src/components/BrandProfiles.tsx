import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Plus, Edit, Trash2 } from 'lucide-react'

interface BrandProfile {
  id: string;
  name: string;
  industry: string;
  color: string;
  font: string;
  tone: string;
}

const BrandProfiles: React.FC = () => {
  const { user, updateUserProfile } = useAuth()
  const [profiles, setProfiles] = useState<BrandProfile[]>([])
  const [showForm, setShowForm] = useState(false)
  const [currentProfile, setCurrentProfile] = useState<BrandProfile | null>(null)

  useEffect(() => {
    // In a real app, you'd fetch this from your backend
    const mockProfiles: BrandProfile[] = user?.brandProfiles || []
    setProfiles(mockProfiles)
  }, [user])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newProfile: BrandProfile = {
      id: currentProfile?.id || Date.now().toString(),
      name: formData.get('name') as string,
      industry: formData.get('industry') as string,
      color: formData.get('color') as string,
      font: formData.get('font') as string,
      tone: formData.get('tone') as string,
    }

    if (currentProfile) {
      setProfiles(profiles.map(p => p.id === currentProfile.id ? newProfile : p))
    } else {
      setProfiles([...profiles, newProfile])
    }

    updateUserProfile({ brandProfiles: [...profiles, newProfile] })
    setShowForm(false)
    setCurrentProfile(null)
  }

  const handleEdit = (profile: BrandProfile) => {
    setCurrentProfile(profile)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    const updatedProfiles = profiles.filter(p => p.id !== id)
    setProfiles(updatedProfiles)
    updateUserProfile({ brandProfiles: updatedProfiles })
  }

  if (user?.subscriptionTier !== 'Pro' && user?.subscriptionTier !== 'Advanced') {
    return (
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mt-6" role="alert">
        <p className="font-bold">Upgrade Required</p>
        <p>Multiple brand profiles are available for Pro and Advanced tier users. Please upgrade your plan to access this feature.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Brand Profiles</h1>
      <button
        onClick={() => setShowForm(true)}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add New Brand Profile
      </button>
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">{currentProfile ? 'Edit' : 'Add'} Brand Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" defaultValue={currentProfile?.name} placeholder="Brand Name" required className="p-2 border rounded" />
            <input name="industry" defaultValue={currentProfile?.industry} placeholder="Industry" required className="p-2 border rounded" />
            <input name="color" defaultValue={currentProfile?.color} type="color" required className="p-2 border rounded" />
            <input name="font" defaultValue={currentProfile?.font} placeholder="Brand Font" required className="p-2 border rounded" />
            <select name="tone" defaultValue={currentProfile?.tone} required className="p-2 border rounded">
              <option value="">Select Tone</option>
              <option value="professional">Professional</option>
              <option value="friendly">Friendly</option>
              <option value="casual">Casual</option>
              <option value="humorous">Humorous</option>
            </select>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
          </div>
        </form>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map(profile => (
          <div key={profile.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{profile.name}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">Industry: {profile.industry}</p>
            <div className="flex items-center mb-2">
              <span className="mr-2">Brand Color:</span>
              <div className="w-6 h-6 rounded-full" style={{ backgroundColor: profile.color }}></div>
            </div>
            <p className="mb-2">Font: {profile.font}</p>
            <p className="mb-4">Tone: {profile.tone}</p>
            <div className="flex justify-end space-x-2">
              <button onClick={() => handleEdit(profile)} className="p-2 bg-yellow-500 text-white rounded">
                <Edit className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(profile.id)} className="p-2 bg-red-500 text-white rounded">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BrandProfiles