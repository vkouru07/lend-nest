import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { User, PenTool as Tool, Calendar, MapPin, Mail, Clock, Wrench, UserPlus, AlertCircle, PlusCircle } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { currentUser, getUserReservations, getToolById } = useApp();
  
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center justify-center text-center">
            <AlertCircle size={48} className="text-blue-500 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Login Required</h2>
            <p className="text-gray-600 mb-4">
              You need to be logged in to view your profile. Please log in or create an account to continue.
            </p>
            <div className="flex space-x-4">
              <Link 
                to="/login"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Log In
              </Link>
              <Link 
                to="/signup"
                className="px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-50 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  const userReservations = getUserReservations(currentUser.id);
  const activeReservations = userReservations.filter(res => res.status === 'active' || res.status === 'pending');
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-6">
          <User size={24} className="text-green-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column - User Info */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-green-700 text-white p-6 flex flex-col items-center">
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name} 
                  className="w-24 h-24 rounded-full object-cover border-4 border-white mb-4"
                />
                <h2 className="text-xl font-bold">{currentUser.name}</h2>
                <p className="text-green-100">Member since {new Date(currentUser.memberSince).toLocaleDateString()}</p>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin size={18} className="mt-1 mr-3 text-gray-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Neighborhood</p>
                      <p className="font-medium text-gray-800">{currentUser.neighborhood}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail size={18} className="mt-1 mr-3 text-gray-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-800">{currentUser.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Tool size={18} className="mt-1 mr-3 text-gray-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Tools Contributed</p>
                      <p className="font-medium text-gray-800">{currentUser.toolsContributed}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Wrench size={18} className="mt-1 mr-3 text-gray-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Tools Borrowed</p>
                      <p className="font-medium text-gray-800">{currentUser.toolsBorrowed}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 space-y-3">
                  <button className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center justify-center">
                    <User size={16} className="mr-2" />
                    Edit Profile
                  </button>
                  <button className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center">
                    <UserPlus size={16} className="mr-2" />
                    Invite Neighbors
                  </button>
                </div>
              </div>
            </div>
            
            {/* User Stats Card */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Activity</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-700">{activeReservations.length}</div>
                  <div className="text-sm text-blue-600">Active Loans</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-700">{userReservations.length}</div>
                  <div className="text-sm text-green-600">Total Loans</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-yellow-700">8</div>
                  <div className="text-sm text-yellow-600">Neighbors Helped</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-700">14</div>
                  <div className="text-sm text-purple-600">Hours Saved</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Current Loans & History */}
          <div className="md:col-span-2">
            {/* Active Loans */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="bg-blue-50 p-4 border-b border-blue-100">
                <div className="flex items-center">
                  <Calendar size={20} className="text-blue-700 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-800">Currently Borrowed Tools</h3>
                </div>
              </div>
              
              <div className="p-4">
                {activeReservations.length > 0 ? (
                  <div className="space-y-4">
                    {activeReservations.map(reservation => {
                      const tool = getToolById(reservation.toolId);
                      if (!tool) return null;
                      
                      return (
                        <div key={reservation.id} className="flex border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                          <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                            <img src={tool.imageUrl} alt={tool.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="ml-4 flex-grow">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium text-gray-800">{tool.name}</h4>
                                <p className="text-sm text-gray-500 mt-1">
                                  {reservation.status === 'active' ? 'Currently Borrowed' : 'Pending Pickup'}
                                </p>
                              </div>
                              <Link 
                                to={`/tool/${tool.id}`}
                                className="text-sm text-blue-600 hover:text-blue-800"
                              >
                                View
                              </Link>
                            </div>
                            <div className="flex items-center mt-2 text-sm">
                              <Clock size={14} className="text-gray-500 mr-1" />
                              <span className="text-gray-600">
                                Due: {new Date(reservation.endDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-3">
                      <Calendar size={24} className="text-blue-500" />
                    </div>
                    <p className="text-gray-500 mb-4">You don't have any active loans.</p>
                    <Link 
                      to="/tools"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors inline-flex items-center"
                    >
                      <Tool size={16} className="mr-1" />
                      Browse Tools
                    </Link>
                  </div>
                )}
              </div>
            </div>
            
            {/* My Tools */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="bg-green-50 p-4 border-b border-green-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Tool size={20} className="text-green-700 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-800">My Shared Tools</h3>
                  </div>
                  <Link 
                    to="/add-tool"
                    className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 flex items-center"
                  >
                    <PlusCircle size={16} className="mr-1" />
                    Add Tool
                  </Link>
                </div>
              </div>
              
              <div className="p-4">
                {currentUser.toolsContributed > 0 ? (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-lg overflow-hidden flex">
                      <div className="w-1/3 aspect-square overflow-hidden">
                        <img 
                          src="https://images.pexels.com/photos/2820753/pexels-photo-2820753.jpeg" 
                          alt="Cordless Drill" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="w-2/3 p-3">
                        <h4 className="font-medium text-gray-800 mb-1">Cordless Drill</h4>
                        <div className="flex items-center text-xs text-gray-500 mb-2">
                          <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Available</span>
                          <span className="mx-2">•</span>
                          <span>Loaned 3 times</span>
                        </div>
                        <Link 
                          to="/tool/1"
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          Manage Tool
                        </Link>
                      </div>
                    </div>
                    <div className="border border-gray-200 rounded-lg overflow-hidden flex">
                      <div className="w-1/3 aspect-square overflow-hidden">
                        <img 
                          src="https://images.pexels.com/photos/4239146/pexels-photo-4239146.jpeg" 
                          alt="Pressure Washer" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="w-2/3 p-3">
                        <h4 className="font-medium text-gray-800 mb-1">Pressure Washer</h4>
                        <div className="flex items-center text-xs text-gray-500 mb-2">
                          <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Available</span>
                          <span className="mx-2">•</span>
                          <span>Loaned 1 time</span>
                        </div>
                        <Link 
                          to="/tool/7"
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          Manage Tool
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 mx-auto bg-green-50 rounded-full flex items-center justify-center mb-3">
                      <Tool size={24} className="text-green-500" />
                    </div>
                    <p className="text-gray-500 mb-4">You haven't shared any tools yet.</p>
                    <Link 
                      to="/add-tool"
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors inline-flex items-center"
                    >
                      <PlusCircle size={16} className="mr-1" />
                      Share a Tool
                    </Link>
                  </div>
                )}
              </div>
            </div>
            
            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-50 p-4 border-b border-gray-100">
                <div className="flex items-center">
                  <Clock size={20} className="text-gray-700 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
                </div>
              </div>
              
              <div className="p-4">
                <div className="space-y-4">
                  <div className="border-l-2 border-green-500 pl-4 pb-4">
                    <div className="text-sm text-gray-500">Today</div>
                    <p className="text-gray-800">You returned <span className="font-medium">Garden Hoe</span> to Sarah.</p>
                  </div>
                  
                  <div className="border-l-2 border-blue-500 pl-4 pb-4">
                    <div className="text-sm text-gray-500">Yesterday</div>
                    <p className="text-gray-800">You reserved <span className="font-medium">Tape Measure</span> for next week.</p>
                  </div>
                  
                  <div className="border-l-2 border-purple-500 pl-4 pb-4">
                    <div className="text-sm text-gray-500">June 5, 2024</div>
                    <p className="text-gray-800">Mike borrowed your <span className="font-medium">Cordless Drill</span>.</p>
                  </div>
                  
                  <div className="border-l-2 border-yellow-500 pl-4">
                    <div className="text-sm text-gray-500">June 1, 2024</div>
                    <p className="text-gray-800">You borrowed <span className="font-medium">Circular Saw</span> from Mike.</p>
                  </div>
                </div>
                
                <div className="text-center mt-6">
                  <Link 
                    to="/activity"
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View All Activity
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;