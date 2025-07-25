import React, { useState, useEffect, Fragment } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const Settings = () => {
  const { user, logout } = useAuth();
  const [settings, setSettings] = useState({
    theme: 'light',
    currency: 'USD',
    notifications: true
  });

  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: '',
    email: user?.email || '',
    phone: '',
    location: '',
    bio: '',
    joinDate: new Date().toISOString().split('T')[0] // Current date as join date
  });
  
  const [passwordForm, setPasswordForm] = useState({
    current: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) setSettings(JSON.parse(savedSettings));
    
    // Load profile data from localStorage if available
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile));
    } else {
      // Initialize with user email if available
      if (user?.email) {
        const defaultName = user.email.split('@')[0];
        setProfileData(prev => ({
          ...prev,
          name: defaultName.charAt(0).toUpperCase() + defaultName.slice(1),
          email: user.email
        }));
      }
    }
  }, [user]);

  const handleSettingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const saveSettings = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('appSettings', JSON.stringify(settings));
      setSaveStatus('Settings saved!');
      setIsSaving(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSaveStatus(''), 3000);
    }, 1000);
  };
  
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const saveProfile = (e) => {
    e?.preventDefault();
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('userProfile', JSON.stringify(profileData));
      setSaveStatus('Profile updated!');
      setIsEditingProfile(false);
      setIsSaving(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSaveStatus(''), 3000);
    }, 1000);
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setSaveStatus('Passwords do not match');
      return;
    }
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveStatus('Password changed successfully');
      setIsPasswordModalOpen(false);
      setPasswordForm({ current: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setSaveStatus(''), 3000);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
      
      <div className="mt-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {['profile', 'preferences', 'security'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${activeTab === tab ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {saveStatus && (
        <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-md">
          {saveStatus}
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Profile Information</h3>
                <p className="mt-1 text-sm text-gray-500">Personal details and account information.</p>
              </div>
              {!isEditingProfile && (
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(true)}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
          
          {isEditingProfile ? (
            <form onSubmit={saveProfile} className="px-4 py-5 sm:p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={profileData.name}
                        onChange={handleProfileChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone number
                    </label>
                    <div className="mt-1">
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={profileData.phone}
                        onChange={handleProfileChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                      Location
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="location"
                        id="location"
                        value={profileData.location}
                        onChange={handleProfileChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="City, Country"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                      Bio
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="bio"
                        name="bio"
                        rows={3}
                        value={profileData.bio}
                        onChange={handleProfileChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="Tell us a little about yourself..."
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">Brief description for your profile.</p>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(false)}
                    className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="px-4 py-5 sm:px-6">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-2xl font-medium text-blue-600">
                    {profileData.name ? profileData.name.charAt(0).toUpperCase() : 'U'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-semibold text-gray-900">{profileData.name || 'User'}</h2>
                  <p className="text-sm text-gray-500">{profileData.email}</p>
                  
                  <div className="mt-4 grid grid-cols-1 gap-y-2 sm:grid-cols-2 sm:gap-x-6">
                    {profileData.phone && (
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="flex-shrink-0 mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        {profileData.phone}
                      </div>
                    )}
                    {profileData.location && (
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="flex-shrink-0 mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {profileData.location}
                      </div>
                    )}
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="flex-shrink-0 mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      Member since {formatDate(profileData.joinDate)}
                    </div>
                  </div>
                  
                  {profileData.bio && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-900">About</h4>
                      <p className="mt-1 text-sm text-gray-600 whitespace-pre-line">{profileData.bio}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'preferences' && (
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium text-gray-900">Preferences</h3>
          </div>
          <div className="px-4 py-5 sm:p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Theme</label>
              <select
                name="theme"
                value={settings.theme}
                onChange={handleSettingChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Currency</label>
              <select
                name="currency"
                value={settings.currency}
                onChange={handleSettingChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="INR">INR (₹)</option>
              </select>
            </div>

            <div className="flex items-center">
              <input
                id="notifications"
                name="notifications"
                type="checkbox"
                checked={settings.notifications}
                onChange={handleSettingChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="notifications" className="ml-2 block text-sm text-gray-700">
                Email notifications
              </label>
            </div>

            <div className="pt-4">
              <button
                onClick={saveSettings}
                disabled={isSaving}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : 'Save Preferences'}
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium text-gray-900">Security</h3>
          </div>
          <div className="px-4 py-5 sm:p-6 space-y-6">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Change Password</h4>
              <p className="mt-1 text-sm text-gray-500">Update your password regularly to keep your account secure.</p>
              <button 
                onClick={() => setIsPasswordModalOpen(true)}
                className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-none"
              >
                Change password
              </button>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-900">Sign out of all devices</h4>
              <p className="mt-1 text-sm text-gray-500">Sign out of all other devices where you're currently signed in.</p>
              <button 
                onClick={() => setIsSignOutModalOpen(true)}
                className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-none"
              >
                Sign out everywhere
              </button>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <button
                onClick={logout}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      <Transition appear show={isPasswordModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsPasswordModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-between items-center">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      Change Password
                    </Dialog.Title>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-500"
                      onClick={() => setIsPasswordModalOpen(false)}
                    >
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  
                  <form onSubmit={handlePasswordSubmit} className="mt-4 space-y-4">
                    <div>
                      <label htmlFor="current" className="block text-sm font-medium text-gray-700">
                        Current Password
                      </label>
                      <input
                        type="password"
                        name="current"
                        id="current"
                        value={passwordForm.current}
                        onChange={handlePasswordChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                        New Password
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        value={passwordForm.newPassword}
                        onChange={handlePasswordChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={passwordForm.confirmPassword}
                        onChange={handlePasswordChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        required
                      />
                    </div>
                    
                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setIsPasswordModalOpen(false)}
                        className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                      >
                        {isSaving ? 'Saving...' : 'Change Password'}
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Sign Out Everywhere Modal */}
      <Transition appear show={isSignOutModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => !isSaving && setIsSignOutModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-between items-center">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      Sign Out Everywhere
                    </Dialog.Title>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-500"
                      onClick={() => !isSaving && setIsSignOutModalOpen(false)}
                      disabled={isSaving}
                    >
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">
                      This will sign you out of all devices where you're currently signed in. You'll need to sign in again on all devices.
                    </p>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsSignOutModalOpen(false)}
                      disabled={isSaving}
                      className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSaving(true);
                        // In a real app, you would invalidate all sessions here
                        setTimeout(() => {
                          setIsSaving(false);
                          setIsSignOutModalOpen(false);
                          logout();
                        }, 1000);
                      }}
                      disabled={isSaving}
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                      {isSaving ? 'Signing out...' : 'Sign out everywhere'}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Settings;
