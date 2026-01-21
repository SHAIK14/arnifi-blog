import { useState, useEffect } from 'react';
import { getAllBlogs } from '../services/api';
import BlogCard from '../components/BlogCard';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');

  const categories = ['All', 'Career', 'Finance', 'Travel', 'Technology', 'Lifestyle', 'Health', 'Food', 'Other'];

  useEffect(() => {
    fetchBlogs();
  }, [category, author]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const params = {};
      if (category && category !== 'All') params.category = category;
      if (author) params.author = author;

      const response = await getAllBlogs(params);
      setBlogs(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (cat) => {
    setCategory(cat);
  };

  const handleAuthorSearch = (e) => {
    setAuthor(e.target.value);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">All Blogs</h1>

        <div className="mb-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Filter by Category
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat === 'All' ? '' : cat)}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    (cat === 'All' && !category) || category === cat
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Search by Author
            </label>
            <input
              type="text"
              value={author}
              onChange={handleAuthorSearch}
              placeholder="Enter author name..."
              className="w-full max-w-md px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-slate-600">Loading blogs...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600">No blogs found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} showActions={false} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
