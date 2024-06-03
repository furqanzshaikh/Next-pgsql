'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

const SingleBlog = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchBlog = async () => {
      if (id) {
        try {
          const res = await axios.get(`/api/blogs/single/${id}`);
         
          setBlog(res.data.existingBlog);
          console.log(res.data.existingBlog)
          setLoading(false);
        } catch (error) {
          console.error('Error fetching blog:', error);
          setLoading(false);
        }
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!blog) return <div className="text-center mt-10">Blog not found</div>;

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/blogs/delete/${blog.id}`);
      alert('Blog deleted successfully');
      console.log("Blog deleted successfully:", response.data);
      router.push('/');
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-base-100 rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-primary mb-4">{blog.title}</h1>
        <h4 className="text-base-content mb-4">{blog.description}</h4>
        <p className="text-base-content mb-6">{blog.content}</p>
        <div className="flex space-x-4 mb-6">
          <Link className="btn btn-primary" href={`/update/${blog.id}`}>
            Edit
          </Link>
          <button
            className="btn btn-error"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
        <Link className="text-info hover:underline" href="/">
          Go back to all blogs
        </Link>
      </div>
    </div>
  );
};

export default SingleBlog;
