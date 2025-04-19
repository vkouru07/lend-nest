import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Calendar, CheckCircle, AlertCircle } from 'lucide-react';

const ReservationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getToolById, reserveTool, currentUser } = useApp();
  const navigate = useNavigate();
  
  const tool = getToolById(id || '');
  
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  
  if (!tool) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center justify-center text-center">
            <AlertCircle size={48} className="text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Tool Not Found</h2>
            <p className="text-gray-600 mb-4">
              The tool you're trying to reserve doesn't exist or has been removed.
            </p>
            <Link 
              to="/tools"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Browse All Tools
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  if (!tool.available) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center justify-center text-center">
            <AlertCircle size={48} className="text-orange-500 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Tool Unavailable</h2>
            <p className="text-gray-600 mb-4">
              This tool is currently borrowed by another member. Please check back later or browse other available tools.
            </p>
            <Link 
              to="/tools"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Browse Available Tools
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center justify-center text-center">
            <AlertCircle size={48} className="text-blue-500 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Login Required</h2>
            <p className="text-gray-600 mb-4">
              You need to be logged in to reserve tools. Please log in or create an account to continue.
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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    // Validation
    if (!startDate || !endDate) {
      setErrorMessage('Please select both pickup and return dates');
      return;
    }
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (start < today) {
      setErrorMessage('Pickup date cannot be in the past');
      return;
    }
    
    if (end <= start) {
      setErrorMessage('Return date must be after pickup date');
      return;
    }
    
    const daysDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
    
    if (daysDiff > 14) {
      setErrorMessage('Maximum loan period is 14 days');
      return;
    }
    
    // Process reservation
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      reserveTool(tool.id, startDate, endDate);
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Redirect after success
      setTimeout(() => {
        navigate('/reservations');
      }, 2000);
    }, 1000);
  };
  
  // Get min date (today) and max date (today + 3 months) for date picker
  const today = new Date();
  const minDate = today.toISOString().split('T')[0];
  today.setMonth(today.getMonth() + 3);
  const maxDate = today.toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center text-sm text-gray-500">
            <Link to={`/tool/${tool.id}`} className="hover:text-green-600 flex items-center">
              <ArrowLeft size={16} className="mr-1" />
              Back to Tool
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">Reserve</span>
          </nav>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {isSuccess ? (
            <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center justify-center text-center">
              <CheckCircle size={64} className="text-green-500 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Reservation Successful!</h2>
              <p className="text-gray-600 mb-6">
                Your reservation for <span className="font-semibold">{tool.name}</span> has been confirmed.
                You will be redirected to your reservations page.
              </p>
              <div className="w-full max-w-md py-4 px-6 bg-green-50 rounded-lg border border-green-100 mb-4">
                <div className="text-sm text-gray-600">
                  <p className="font-medium text-green-800 mb-2">Reservation Details:</p>
                  <div className="grid grid-cols-2 gap-y-2">
                    <span>Tool:</span>
                    <span className="text-right font-medium">{tool.name}</span>
                    <span>Pickup Date:</span>
                    <span className="text-right font-medium">{new Date(startDate).toLocaleDateString()}</span>
                    <span>Return Date:</span>
                    <span className="text-right font-medium">{new Date(endDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <Link 
                to="/reservations"
                className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                View My Reservations
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="md:flex">
                {/* Tool Image & Info */}
                <div className="md:w-2/5 p-4 bg-gray-50">
                  <div className="aspect-square max-w-[250px] mx-auto overflow-hidden rounded-md mb-4">
                    <img 
                      src={tool.imageUrl} 
                      alt={tool.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{tool.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-4">{tool.description}</p>
                  <div className="text-sm text-gray-500">
                    <p>Owner: {tool.owner}</p>
                    <p>Condition: {tool.condition.charAt(0).toUpperCase() + tool.condition.slice(1)}</p>
                  </div>
                </div>
                
                {/* Reservation Form */}
                <div className="md:w-3/5 p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                    <Calendar size={20} className="mr-2 text-green-600" />
                    Reserve This Tool
                  </h2>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4 mb-6">
                      <div>
                        <label htmlFor="pickup-date" className="block text-sm font-medium text-gray-700 mb-1">
                          Pickup Date
                        </label>
                        <input
                          type="date"
                          id="pickup-date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          min={minDate}
                          max={maxDate}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="return-date" className="block text-sm font-medium text-gray-700 mb-1">
                          Return Date
                        </label>
                        <input
                          type="date"
                          id="return-date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          min={startDate || minDate}
                          max={maxDate}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          required
                        />
                      </div>
                      
                      <div className="bg-blue-50 p-4 rounded-md text-sm text-blue-800 border border-blue-100">
                        <p className="font-medium mb-1">Reservation Guidelines:</p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Maximum borrowing period is 14 days</li>
                          <li>Please pick up and return the tool on time</li>
                          <li>Treat the tool with care and respect</li>
                          <li>Clean the tool before returning</li>
                        </ul>
                      </div>
                    </div>
                    
                    {errorMessage && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                        {errorMessage}
                      </div>
                    )}
                    
                    <div className="flex flex-col-reverse sm:flex-row justify-between sm:space-x-4">
                      <Link 
                        to={`/tool/${tool.id}`}
                        className="py-2 px-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-center mt-3 sm:mt-0"
                      >
                        Cancel
                      </Link>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`py-2 px-4 rounded-md font-medium text-white ${
                          isSubmitting 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-green-600 hover:bg-green-700'
                        } transition-colors flex items-center justify-center`}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          'Confirm Reservation'
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;