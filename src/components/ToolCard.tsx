import React from 'react';
import { Link } from 'react-router-dom';
import { PenTool as ToolIcon, Calendar, Info } from 'lucide-react';
import { Tool } from '../types';

interface ToolCardProps {
  tool: Tool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'fair': return 'bg-yellow-100 text-yellow-800';
      case 'needs repair': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={tool.imageUrl} 
          alt={tool.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-0 right-0 m-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${tool.available ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
            {tool.available ? 'Available' : 'Borrowed'}
          </span>
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold mb-1 text-gray-800">{tool.name}</h3>
        
        <div className="flex items-center space-x-2 mb-2">
          <span className={`text-xs px-2 py-0.5 rounded-full ${getConditionColor(tool.condition)}`}>
            {tool.condition.charAt(0).toUpperCase() + tool.condition.slice(1)}
          </span>
          <span className="text-xs text-gray-500">Added: {new Date(tool.addedDate).toLocaleDateString()}</span>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">{tool.description}</p>
        
        <div className="flex items-center text-gray-500 text-xs mb-4">
          <ToolIcon size={14} className="mr-1" />
          <span>Loaned {tool.timesLoaned} times</span>
        </div>
        
        <div className="mt-auto flex space-x-2">
          <Link 
            to={`/tool/${tool.id}`}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-md text-sm font-medium flex items-center justify-center transition-colors duration-200"
          >
            <Info size={16} className="mr-1" />
            Details
          </Link>
          {tool.available && (
            <Link 
              to={`/reserve/${tool.id}`}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-md text-sm font-medium flex items-center justify-center transition-colors duration-200"
            >
              <Calendar size={16} className="mr-1" />
              Reserve
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolCard;