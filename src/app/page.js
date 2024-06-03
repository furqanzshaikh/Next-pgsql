'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('/api/blogs');
        setBlogs(res.data.blogs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setError('Failed to fetch blogs');
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-wrap justify-start my-8">
      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog.id} className="w-full md:w-1/3 lg:w-1/3 p-4">
            <div className="card bg-base-200 shadow-lg rounded-lg">
              <div className="card-body">
                <h2 className="card-title text-lg font-semibold mb-2">{blog.title}</h2>
                <p className="text-sm text-gray-600 mb-4">{blog.description}</p>
                <p className="text-sm text-gray-600">{blog.content}</p>
              </div>
              <div className="card-actions flex justify-end mt-4">
                <Link href={`/singleblog/${blog.id}`}>
                  <button className="btn px-12 btn-primary">View</button>
                </Link>
              </div>
            </div>
          </div>
        ))
      )}
      <Link href={'/createblog'}><button>Create Blog</button></Link>
    </div>
    
  );
};

export default Blogs;
