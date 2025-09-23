"use client"
import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  Calendar,
  Edit3,
  Camera,
  Save,
  X
} from 'lucide-react';

const Index = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    memberSince: 'January 2022',
    totalOrders: 24,
    totalSpent: 2847.99,
    loyaltyPoints: 1250
  });


  const handleSave = () => {
    setIsEditing(false);
  };


  return (
    <div className="p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Personal details</h2>
      </div>

      <div className="p-4 sm:p-6 bg-gray-50 mb-6 rounded-lg">
        <div className="flex flex-col sm:flex-row items-center space-x-4 space-y-4 sm:space-y-0">
          <div className="relative">
            <div className="w-16 h-16 bg-black/10 rounded-full flex items-center justify-center">
              <User className="h-8 w-8" />
            </div>
            <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-white text-gray-600 rounded-full flex items-center justify-center shadow-sm border border-gray-200 hover:bg-gray-100 transition-colors">
              <Camera className="h-3 w-3" />
            </button>
          </div>
          <div className='text-center sm:text-left'>
            <h3 className="font-semibold text-base sm:text-lg">{profileData.name}</h3>
            <p className="text-black/80 text-xs sm:text-sm">{profileData.email}</p>
          </div>
        </div>
      </div>

      <div>
        <div className="space-y-4">
          <div className='flex items-center justify-between border-b border-gray-200 pb-2'>
            <h3 className="text-sm sm:text-lg font-medium text-gray-900">Personal Information</h3>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center space-x-2 px-2 py-2 text-blue-600 hover:underline rounded-lg transition-colors cursor-pointer"
            >
              {isEditing ? <X className="h-3.5 w-3.5" /> : <Edit3 className="h-3.5 w-3.5" />}
              <span className='text-xs sm:text-sm'>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
            </button>
          </div>

          <div className="space-y-6 sm:space-y-8 mt-4">
            <div className="flex items-center space-x-3">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-gray-900 text-sm sm:text-base">Member since {profileData.memberSince}</span>
            </div>

            <div className="flex items-center space-x-3">
              <User className="h-4 w-4 text-gray-400" />
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="flex-1 border border-gray-300 rounded-md px-2 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                />
              ) : (
                <span className="text-gray-900 text-sm sm:text-base">{profileData.name}</span>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <Mail className="h-4 w-4 text-gray-400" />
              {isEditing ? (
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="flex-1 border border-gray-300 rounded-md px-2 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                />
              ) : (
                <span className="text-gray-900 text-sm sm:text-base">{profileData.email}</span>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="h-4 w-4 text-gray-400" />
              {isEditing ? (
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  className="flex-1 border border-gray-300 rounded-md px-2 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                />
              ) : (
                <span className="text-gray-900 text-sm sm:text-base">{profileData.phone}</span>
              )}
            </div>


          </div>

          <div className='flex justify-end'>
            {isEditing && (
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 bg-blue-600 text-white px-2 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="h-3.5 w-3.5" />
                <span className='text-xs sm:text-sm'>Save Changes</span>
              </button> 
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;