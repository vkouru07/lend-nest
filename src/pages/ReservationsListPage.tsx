import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ReservationItem from '../components/ReservationItem';
import { Calendar, PlusCircle, Search, AlertCircle } from 'lucide-react';

const ReservationsListPage: React.FC = () => {
  const { reservations, getToolById, currentUser } = useApp();
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center justify-center text-center">
            <AlertCircle size={48} className="text-blue-500 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Login Required</h2>
            <p className="text-gray-600 mb-4">
              You need to be logged in to view your reservations. Please log in or create an account to continue.
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
  
  // Filter reservations based on status and search query
  const userReservations = reservations.filter(res => res.userId === currentUser.id);
  
  const filteredReservations = userReservations.filter(res => {
    const tool = getToolById(res.toolId);
    const matchesSearch = !searchQuery || (tool && tool.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (filter === 'all') return matchesSearch;
    return res.status === filter && matchesSearch;
  });
  
  // Sort reservations: active first, then pending, then completed, then cancelled
  const sortedReservations = [...filteredReservations].sort((a, b) => {
    const statusOrder: Record<string, number> = {
      active: 0,
      pending: 1,
      completed: 2,
      cancelled: 3
    };
    
    // First sort by status
    if (statusOrder[a.status] !== statusOrder[b.status]) {
      return statusOrder[a.status] - statusOrder[b.status];
    }
    
    // Then by date (newer first)
    return new Date(b.created).getTime() - new Date(a.created).getTime();
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Calendar size={24} className="text-green-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-800">My Reservations</h1>
          </div>
          <Link 
            to="/tools"
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <PlusCircle size={18} className="mr-1" />
            Reserve a Tool
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Box */}
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search reservations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              />
            </div>
            
            {/* Filter Tabs */}
            <div className="flex space-x-1">
              <button 
                onClick={() => setFilter('all')}
                className={`px-4 py-2 text-sm rounded-md transition-colors ${
                  filter === 'all' 
                    ? 'bg-green-100 text-green-800 font-medium' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                All
              </button>
              <button 
                onClick={() => setFilter('active')}
                className={`px-4 py-2 text-sm rounded-md transition-colors ${
                  filter === 'active' 
                    ? 'bg-green-100 text-green-800 font-medium' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Active
              </button>
              <button 
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 text-sm rounded-md transition-colors ${
                  filter === 'pending' 
                    ? 'bg-yellow-100 text-yellow-800 font-medium' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Pending
              </button>
              <button 
                onClick={() => setFilter('completed')}
                className={`px-4 py-2 text-sm rounded-md transition-colors ${
                  filter === 'completed' 
                    ? 'bg-blue-100 text-blue-800 font-medium' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Completed
              </button>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          {sortedReservations.length > 0 ? (
            sortedReservations.map(reservation => (
              <ReservationItem 
                key={reservation.id} 
                reservation={reservation} 
                tool={getToolById(reservation.toolId)} 
              />
            ))
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center justify-center text-center">
              <Calendar size={48} className="text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold text-gray-700 mb-2">No Reservations Found</h2>
              <p className="text-gray-600 mb-4">
                {searchQuery 
                  ? "No reservations match your search criteria." 
                  : filter !== 'all' 
                    ? `You don't have any ${filter} reservations.` 
                    : "You haven't reserved any tools yet."}
              </p>
              <Link 
                to="/tools"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Browse Tools
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationsListPage;