import React from 'react';
import { Link } from 'react-router-dom';
import { ChartBarIcon, CurrencyDollarIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: ChartBarIcon,
    description: 'View your financial overview and analytics',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-600',
  },
  {
    name: 'Transactions',
    href: '/transactions',
    icon: CurrencyDollarIcon,
    description: 'Manage your income and expenses',
    bgColor: 'bg-green-100',
    textColor: 'text-green-600',
  },
  {
    name: 'Profile',
    href: '/profile',
    icon: UserCircleIcon,
    description: 'Update your account settings',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-600',
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Welcome to <span className="text-blue-600">MoneyMap</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Your Personal Budget & Expense Tracker
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Link
                key={feature.name}
                to={feature.href}
                className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
              >
                <div className="px-6 py-8 sm:p-10 sm:pb-6">
                  <div className={`${feature.bgColor} ${feature.textColor} flex items-center justify-center h-12 w-12 rounded-md`}>
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-gray-900">{feature.name}</h3>
                    <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                  </div>
                </div>
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <div className="text-sm font-medium text-blue-600 hover:text-blue-500">
                    Go to {feature.name} <span aria-hidden="true">&rarr;</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex rounded-md shadow">
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Get started
            </Link>
          </div>
          <p className="mt-3 text-base text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
