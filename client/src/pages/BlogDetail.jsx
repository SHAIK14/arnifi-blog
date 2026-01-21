import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBlogById, deleteBlog } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';

const BlogDetail = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await getBlogById(id);
      setBlog(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch blog');
      navigate('/blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigate(`/edit-blog/${blog._id}`);
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this blog?')) {
      return;
    }

    try {
      await deleteBlog(blog._id);
      toast.success('Blog deleted successfully!');
      navigate('/my-blogs');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete blog');
    }
  };

  const isOwner = blog && user && (
    typeof blog.userId === 'object' 
      ? blog.userId._id === user._id 
      : blog.userId === user._id
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <p className="text-center text-slate-600">Loading blog...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <p className="text-center text-slate-600">Blog not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-sm text-slate-600 hover:text-slate-900"
        >
          ← Back
        </button>

        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
          {blog.image && (
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-96 object-cover"
            />
          )}

          <div className="p-8">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 text-sm font-medium text-slate-700 bg-slate-100 rounded-full">
                {blog.category}
              </span>
            </div>

            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              {blog.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-slate-600 mb-8 pb-8 border-b border-slate-200">
              <span>By {blog.author}</span>
              <span>•</span>
              <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>

            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-700 whitespace-pre-wrap leading-relaxed">
                {blog.content}
              </p>
            </div>

            {isOwner && (
              <div className="flex gap-4 mt-8 pt-8 border-t border-slate-200">
                <button
                  onClick={handleEdit}
                  className="px-6 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200"
                >
                  Edit Blog
                </button>
                <button
                  onClick={handleDelete}
                  className="px-6 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                >
                  Delete Blog
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
