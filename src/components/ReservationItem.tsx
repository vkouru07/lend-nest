import React from 'react';
import { Reservation, Tool } from '../types';
import { CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';

interface ReservationItemProps {
  reservation: Reservation;
  tool: Tool | undefined;
}

const ReservationItem: React.FC<ReservationItemProps> = ({ reservation, tool }) => {
  if (!tool) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={20} className="text-yellow-500" />;
      case 'active':
        return <CheckCircle size={20} className="text-green-500" />;
      case 'completed':
        return <CheckCircle size={20} className="text-blue-500" />;
      case 'cancelled':
        return <XCircle size={20} className="text-red-500" />;
      default:
        return <AlertCircle size={20} className="text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending Pickup';
      case 'active':
        return 'Currently Borrowed';
      case 'completed':
        return 'Returned';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const daysLeft = () => {
    if (reservation.status !== 'active') return null;
    
    const today = new Date();
    const endDate = new Date(reservation.endDate);
    const timeDiff = endDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    if (daysDiff < 0) {
      return <span className="text-red-600 font-medium">Overdue by {Math.abs(daysDiff)} day(s)</span>;
    } else if (daysDiff === 0) {
      return <span className="text-orange-600 font-medium">Due today</span>;
    } else {
      return <span className="text-gray-600">{daysDiff} day(s) remaining</span>;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 aspect-video md:aspect-square overflow-hidden">
          <img
            src={tool.imageUrl}
            alt={tool.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-4 flex-grow">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-800">{tool.name}</h3>
            <div className="flex items-center mt-1 md:mt-0">
              {getStatusIcon(reservation.status)}
              <span className="ml-1 text-sm font-medium">{getStatusText(reservation.status)}</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{tool.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
            <div>
              <span className="text-gray-500">Reservation Date:</span>
              <div className="font-medium">{formatDate(reservation.created)}</div>
            </div>
            
            <div>
              <span className="text-gray-500">Pickup Date:</span>
              <div className="font-medium">{formatDate(reservation.startDate)}</div>
            </div>
            
            <div>
              <span className="text-gray-500">Return Date:</span>
              <div className="font-medium">{formatDate(reservation.endDate)}</div>
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            {daysLeft()}
            
            <div className="flex space-x-2">
              {reservation.status === 'pending' && (
                <button className="py-1 px-3 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors text-sm">
                  Cancel
                </button>
              )}
              {reservation.status === 'active' && (
                <button className="py-1 px-3 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors text-sm">
                  Mark Returned
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationItem;