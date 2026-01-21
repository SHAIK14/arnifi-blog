import { Link } from 'react-router-dom';

const BlogCard = ({ blog, showActions, onEdit, onDelete }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition">
      <Link to={`/blog/${blog._id}`}>
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
        )}
        
        <div className="mb-2">
          <span className="inline-block px-3 py-1 text-xs font-medium text-slate-700 bg-slate-100 rounded-full">
            {blog.category}
          </span>
        </div>
        
        <h3 className="text-xl font-semibold text-slate-900 mb-2 hover:text-slate-700">
          {blog.title}
        </h3>
        
        <p className="text-slate-600 mb-4 line-clamp-3">
          {blog.content}
        </p>
        
        <div className="flex justify-between items-center text-sm text-slate-500 mb-4">
          <span>By {blog.author}</span>
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>
      </Link>

      {showActions && (
        <div className="flex gap-2 pt-4 border-t border-slate-200">
          <button
            onClick={() => onEdit(blog)}
            className="flex-1 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(blog._id)}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogCard;
