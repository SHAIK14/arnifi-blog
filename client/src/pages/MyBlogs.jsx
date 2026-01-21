import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllBlogs, deleteBlog } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import BlogCard from '../components/BlogCard';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  const fetchMyBlogs = async () => {
    try {
      setLoading(true);
      const response = await getAllBlogs();
      const myBlogs = response.data.filter(blog => {
        const blogUserId = typeof blog.userId === 'object' ? blog.userId._id : blog.userId;
        return blogUserId === user._id;
      });
      setBlogs(myBlogs);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blog) => {
    navigate(`/edit-blog/${blog._id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) {
      return;
    }

    try {
      await deleteBlog(id);
      toast.success('Blog deleted successfully!');
      setBlogs(blogs.filter(blog => blog._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete blog');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">My Blogs</h1>
          <button
            onClick={() => navigate('/create-blog')}
            className="px-4 py-2 bg-slate-900 text-white rounded-md font-medium hover:bg-slate-800"
          >
            Create New Blog
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-slate-600">Loading your blogs...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600 mb-4">You haven't created any blogs yet</p>
            <button
              onClick={() => navigate('/create-blog')}
              className="px-4 py-2 bg-slate-900 text-white rounded-md font-medium hover:bg-slate-800"
            >
              Create Your First Blog
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard
                key={blog._id}
                blog={blog}
                showActions={true}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBlogs;
