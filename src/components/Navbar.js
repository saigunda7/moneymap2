import React, { useState, Fragment } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { 
  Bars3Icon, 
  XMarkIcon, 
  UserCircleIcon,
  ChartBarIcon, 
  CurrencyDollarIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  UserIcon,
  HomeIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon, current: location.pathname === '/dashboard', protected: true },
    { name: 'Transactions', href: '/transactions', icon: CurrencyDollarIcon, current: location.pathname === '/transactions', protected: true },
  ];

  const userNavigation = [
    { name: 'Your Profile', href: '/profile', icon: UserIcon },
    { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
    { 
      name: 'Sign out', 
      href: '#', 
      icon: ArrowRightOnRectangleIcon, 
      onClick: async (e) => { 
        e.preventDefault(); 
        try {
          await logout();
          navigate('/login');
        } catch (error) {
          console.error('Failed to log out:', error);
        }
      } 
    },
  ];

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and desktop nav */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-md">
                <CurrencyDollarIcon className="h-5 w-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                MoneyMap
              </span>
            </Link>
            
            {/* Desktop navigation */}
            <div className="hidden md:ml-8 md:flex md:space-x-6">
              {navigation
                .filter(item => !item.protected || isAuthenticated)
                .map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      item.current
                        ? 'text-blue-600 font-medium'
                        : 'text-gray-600 hover:text-gray-900'
                    } inline-flex items-center px-1 pt-1 text-sm transition-colors duration-200`}
                  >
                    <item.icon className="h-5 w-5 mr-1.5" />
                    {item.name}
                  </Link>
                ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Right side items */}
          <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
            {isAuthenticated ? (
              <Menu as="div" className="ml-3 relative">
                <div>
                  <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    <span className="sr-only">Open user menu</span>
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center border border-blue-100">
                        <UserCircleIcon className="h-5 w-5 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{user?.email}</span>
                    </div>
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-4 py-3">
                      <p className="text-sm text-gray-900">{user?.name || 'User'}</p>
                      <p className="truncate text-sm text-gray-500">{user?.email}</p>
                    </div>
                    <div className="py-1">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <button
                              onClick={item.onClick || (() => navigate(item.href))}
                              className={`${
                                active ? 'bg-gray-50 text-gray-900' : 'text-gray-700'
                              } group flex w-full items-center px-4 py-2 text-sm`}
                            >
                              <item.icon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                              {item.name}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-150"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-br from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
                >
                  Get started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="pt-2 pb-3 space-y-1">
          {isAuthenticated ? (
            <>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`${
                    item.current
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                      : 'text-gray-600 hover:bg-gray-50 hover:border-l-4 hover:border-gray-200'
                  } block pl-3 pr-4 py-2 text-base font-medium`}
                >
                  <div className="flex items-center">
                    <item.icon className="h-5 w-5 mr-2" />
                    {item.name}
                  </div>
                </Link>
              ))}
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-4">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center border border-blue-100">
                    <UserCircleIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{user?.name || 'User'}</div>
                    <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  {userNavigation.map((item) => (
                    <button
                      key={item.name}
                      onClick={(e) => {
                        if (item.onClick) item.onClick(e);
                        else navigate(item.href);
                        setIsOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 flex items-center"
                    >
                      <item.icon className="h-5 w-5 mr-3 text-gray-400" />
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="px-2 pt-2 pb-3 space-y-2">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block w-full px-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors duration-150"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="block w-full px-4 py-2 text-base font-medium text-center text-white bg-gradient-to-br from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 rounded-lg shadow-sm transition-colors duration-150"
              >
                Get started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
