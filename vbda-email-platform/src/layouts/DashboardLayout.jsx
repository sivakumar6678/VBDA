import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FiHome, 
  FiEdit, 
  FiRepeat, 
  FiBarChart2, 
  FiSettings, 
  FiBell, 
  FiMenu, 
  FiX, 
  FiUser,
  FiChevronDown
} from 'react-icons/fi';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <FiHome className="w-5 h-5" /> },
    { name: 'Compose', path: '/compose', icon: <FiEdit className="w-5 h-5" /> },
    { name: 'Follow-Ups', path: '/follow-ups', icon: <FiRepeat className="w-5 h-5" /> },
    { name: 'Analytics', path: '/analytics', icon: <FiBarChart2 className="w-5 h-5" /> },
    { name: 'Settings', path: '/settings', icon: <FiSettings className="w-5 h-5" /> },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar for mobile */}
      <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`} aria-hidden="true">
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={toggleSidebar}></div>
        <div className="relative flex flex-col flex-1 w-full max-w-xs bg-white">
          <div className="absolute top-0 right-0 pt-2 -mr-12">
            <button
              className="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={toggleSidebar}
            >
              <span className="sr-only">Close sidebar</span>
              <FiX className="w-6 h-6 text-white" />
            </button>
          </div>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <Link to="/" className="text-xl font-bold text-blue-600">VBDA 2025</Link>
            </div>
            <nav className="px-2 mt-5 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                    location.pathname === item.path
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col flex-1 min-h-0 bg-white border-r border-gray-200">
            <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <Link to="/" className="text-xl font-bold text-blue-600">VBDA 2025</Link>
              </div>
              <nav className="flex-1 px-2 mt-5 space-y-1 bg-white">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      location.pathname === item.path
                        ? 'bg-blue-100 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    {item.icon}
                    <span className="ml-3">{item.name}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Top navbar */}
        <div className="flex flex-shrink-0 h-16 bg-white border-b border-gray-200">
          <button
            className="px-4 text-gray-500 border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
            onClick={toggleSidebar}
          >
            <span className="sr-only">Open sidebar</span>
            <FiMenu className="w-6 h-6" />
          </button>
          <div className="flex justify-between flex-1 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-1">
              <h1 className="flex items-center text-xl font-semibold text-gray-900">
                {navItems.find(item => item.path === location.pathname)?.name || 'Dashboard'}
              </h1>
            </div>
            <div className="flex items-center ml-4 md:ml-6">
              {/* Notification button */}
              <button className="p-1 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <span className="sr-only">View notifications</span>
                <FiBell className="w-6 h-6" />
              </button>

              {/* Profile dropdown */}
              <div className="relative ml-3">
                <div>
                  <button
                    className="flex items-center max-w-xs text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={toggleProfileDropdown}
                  >
                    <span className="sr-only">Open user menu</span>
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                        <FiUser className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="hidden ml-2 text-sm font-medium text-gray-700 md:block">Admin User</span>
                      <FiChevronDown className="w-4 h-4 ml-1 text-gray-400" />
                    </div>
                  </button>
                </div>
                {profileDropdownOpen && (
                  <div className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Your Profile
                    </Link>
                    <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Settings
                    </Link>
                    <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Sign out
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;