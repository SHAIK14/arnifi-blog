import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/blogs" className="text-xl font-semibold text-slate-900">
            Arnifi Blog
          </Link>

          <div className="flex items-center gap-6">
            {user ? (
              <>
                <Link to="/blogs" className="text-sm text-slate-600 hover:text-slate-900">
                  All Blogs
                </Link>
                <Link to="/my-blogs" className="text-sm text-slate-600 hover:text-slate-900">
                  My Blogs
                </Link>
                <Link to="/create-blog" className="text-sm text-slate-600 hover:text-slate-900">
                  Create Blog
                </Link>
                <span className="text-sm text-slate-600">
                  {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-slate-700 border border-slate-300 rounded-md hover:bg-slate-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm text-slate-600 hover:text-slate-900">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-md hover:bg-slate-800"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
