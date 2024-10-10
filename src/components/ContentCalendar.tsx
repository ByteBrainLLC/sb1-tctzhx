import React, { useState, useEffect } from 'react'
import { Plus, Hash, Edit, Trash2, X, Check, Calendar } from 'lucide-react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

interface Post {
  id: string;
  title: string;
  date: string;
  platform: string;
  content: string;
}

const ContentCalendar: React.FC = () => {
  const [upcomingPosts, setUpcomingPosts] = useState<Post[]>([
    { id: '1', title: 'Product Launch Post', date: '2023-06-15', platform: 'Instagram', content: 'Exciting new product launch!' },
    { id: '2', title: 'Weekly Tips Thread', date: '2023-06-18', platform: 'Twitter', content: 'Here are this week\'s top tips...' },
  ])
  const [pastPosts, setPastPosts] = useState<Post[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [newPost, setNewPost] = useState<Post>({ id: '', title: '', date: '', platform: 'Instagram', content: '' })

  useEffect(() => {
    // In a real application, fetch past posts from an API
    const mockPastPosts: Post[] = [
      { id: '3', title: 'Memorial Day Sale', date: '2023-05-29', platform: 'Facebook', content: 'Don\'t miss our Memorial Day sale!' },
      { id: '4', title: 'Customer Spotlight', date: '2023-06-05', platform: 'LinkedIn', content: 'Meet our satisfied customer, John Doe...' },
    ]
    setPastPosts(mockPastPosts)
  }, [])

  const onDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(upcomingPosts)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setUpcomingPosts(items)
  }

  const handleAddPost = () => {
    if (editingPost) {
      setUpcomingPosts(upcomingPosts.map(post => post.id === editingPost.id ? newPost : post))
    } else {
      setUpcomingPosts([...upcomingPosts, { ...newPost, id: Date.now().toString() }])
    }
    setShowModal(false)
    setEditingPost(null)
    setNewPost({ id: '', title: '', date: '', platform: 'Instagram', content: '' })
  }

  const handleEditPost = (post: Post) => {
    setEditingPost(post)
    setNewPost(post)
    setShowModal(true)
  }

  const handleDeletePost = (id: string) => {
    setUpcomingPosts(upcomingPosts.filter(post => post.id !== id))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Content Calendar</h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Upcoming Posts</h2>
          <button 
            onClick={() => setShowModal(true)} 
            className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Post
          </button>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="posts">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                {upcomingPosts.map((post, index) => (
                  <Draggable key={post.id} draggableId={post.id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md flex justify-between items-center"
                      >
                        <div>
                          <h3 className="font-semibold">{post.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{post.date}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">{post.content}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs font-semibold px-2.5 py-0.5 rounded">
                            {post.platform}
                          </span>
                          <button onClick={() => handleEditPost(post)} className="text-yellow-500 hover:text-yellow-600">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDeletePost(post.id)} className="text-red-500 hover:text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Past Posts (Last 30 Days)</h2>
        <ul className="space-y-4">
          {pastPosts.map((post) => (
            <li key={post.id} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{post.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{post.date}</p>
                <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">{post.content}</p>
              </div>
              <div className="flex items-center">
                <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs font-semibold px-2.5 py-0.5 rounded">
                  {post.platform}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{editingPost ? 'Edit Post' : 'Add New Post'}</h3>
              <button onClick={() => {setShowModal(false); setEditingPost(null);}} className="text-gray-500">
                <X className="w-6 h-6" />
              </button>
            </div>
            <input
              type="text"
              placeholder="Post Title"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:border-gray-600"
            />
            <input
              type="date"
              value={newPost.date}
              onChange={(e) => setNewPost({ ...newPost, date: e.target.value })}
              className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:border-gray-600"
            />
            <select
              value={newPost.platform}
              onChange={(e) => setNewPost({ ...newPost, platform: e.target.value })}
              className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="Instagram">Instagram</option>
              <option value="Twitter">Twitter</option>
              <option value="Facebook">Facebook</option>
              <option value="LinkedIn">LinkedIn</option>
            </select>
            <textarea
              placeholder="Post Content"
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:border-gray-600"
              rows={4}
            />
            <button
              onClick={handleAddPost}
              className="w-full bg-green-500 text-white px-4 py-2 rounded-md flex items-center justify-center"
            >
              <Check className="w-4 h-4 mr-2" />
              {editingPost ? 'Update Post' : 'Add Post'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ContentCalendar