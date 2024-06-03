'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/blogs/create', { title, description, content });
      if (response.status === 200) {
        alert('Form submitted successfully');
        setTitle('');
        setDescription('');
        setContent('');
        router.push('/');
      } else {
        console.log('Submission failed');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-400">
      <form onSubmit={handleSubmit} className="bg-base-300 p-8 rounded shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Add a New Blog</h2>
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
  );
};

export default CreateBlog;