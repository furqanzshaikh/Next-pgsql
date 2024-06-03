'use client'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
const UpdateBlog = () => {
    const {id} = useParams()
    const [singleBlog,setSingleBlog]=useState([])
    const [title,setTitle]=useState('')
    const [content,setContent]=useState('')
    const [description,setDescription]=useState('')
    const router = useRouter()
useEffect(() => {
  const fetchBlog = async ()=>{
    const response = await axios.get(`/api/blogs/single/${id}`)
    setSingleBlog(response.data.existingBlog)
    setContent(response.data.existingBlog.content)
    setTitle(response.data.existingBlog.title)
    setDescription(response.data.existingBlog.description)
}
  fetchBlog()
}, [])
const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`/api/blogs/edit/${singleBlog.id}`, {
        title,
        description,
        content,
      });
      alert('Blog updated successfully');
      console.log('Blog updated successfully:', response.data);
      router.push('/');
    } catch (error) {
      console.error('Error updating blog:', error);
      alert('Error updating blog');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <form onSubmit={handleUpdate} className="bg-base-100 p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Update Blog</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter title"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter description"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="textarea textarea-bordered w-full"
            placeholder="Enter content"
            required
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button type="submit" className="btn btn-primary px-8">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default UpdateBlog