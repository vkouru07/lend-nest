import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Clock, 
  Clipboard,
  Tag,
  AlertCircle
} from 'lucide-react';

const ToolDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { tools, categories, getToolById } = useApp();
  const navigate = useNavigate();
  
  const tool = getToolById(id || '');
  const category = tool ? categories.find(c => c.id === tool.category) : null;
  
  const [selectedImage, setSelectedImage] = useState<string | undefined>(tool?.imageUrl);
  
  if (!tool) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center justify-center text-center">
            <AlertCircle size={48} className="text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Tool Not Found</h2>
            <p className="text-gray-600 mb-4">
              The tool you're looking for doesn't exist or has been removed.
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

  // Mock similar tools
  const similarTools = tools
    .filter(t => t.category === tool.category && t.id !== tool.id)
    .slice(0, 3);

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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center text-sm text-gray-500">
            <Link to="/tools" className="hover:text-green-600 flex items-center">
              <ArrowLeft size={16} className="mr-1" />
              Back to Tools
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">{tool.name}</span>
          </nav>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Image Gallery */}
            <div className="md:w-1/2 p-4">
              <div className="aspect-video overflow-hidden rounded-lg mb-4">
                <img 
                  src={selectedImage || tool.imageUrl} 
                  alt={tool.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Thumbnail gallery - for demo we just use the same image */}
              <div className="flex space-x-2">
                {[tool.imageUrl, tool.imageUrl, tool.imageUrl].map((img, index) => (
                  <button 
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 rounded-md overflow-hidden ${selectedImage === img ? 'ring-2 ring-green-500' : ''}`}
                  >
                    <img src={img} alt={`${tool.name} view ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Tool Details */}
            <div className="md:w-1/2 p-6">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-2xl font-bold text-gray-800">{tool.name}</h1>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${tool.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {tool.available ? 'Available' : 'Currently Borrowed'}
                </span>
              </div>
              
              <div className="flex items-center space-x-3 mb-4">
                <span className={`px-2 py-0.5 text-sm rounded-full ${getConditionColor(tool.condition)}`}>
                  {tool.condition.charAt(0).toUpperCase() + tool.condition.slice(1)} Condition
                </span>
                {category && (
                  <Link 
                    to={`/tools?category=${category.id}`}
                    className="flex items-center text-sm text-gray-600 hover:text-green-600"
                  >
                    <Tag size={14} className="mr-1" />
                    {category.name}
                  </Link>
                )}
              </div>
              
              <p className="text-gray-700 mb-6">{tool.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-start">
                  <User size={18} className="mt-1 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Owner</p>
                    <p className="font-medium">{tool.owner}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar size={18} className="mt-1 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Added</p>
                    <p className="font-medium">{new Date(tool.addedDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock size={18} className="mt-1 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Last Borrowed</p>
                    <p className="font-medium">
                      {tool.lastBorrowed ? new Date(tool.lastBorrowed).toLocaleDateString() : 'Never'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clipboard size={18} className="mt-1 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Times Loaned</p>
                    <p className="font-medium">{tool.timesLoaned} time{tool.timesLoaned !== 1 ? 's' : ''}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 mb-4">
                {tool.available ? (
                  <button 
                    onClick={() => navigate(`/reserve/${tool.id}`)}
                    className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold flex items-center justify-center transition-colors"
                  >
                    <Calendar size={20} className="mr-2" />
                    Reserve This Tool
                  </button>
                ) : (
                  <button 
                    disabled
                    className="w-full py-3 bg-gray-300 text-gray-600 rounded-lg font-semibold flex items-center justify-center cursor-not-allowed"
                  >
                    <AlertCircle size={20} className="mr-2" />
                    Currently Unavailable
                  </button>
                )}
                
                <button className="w-full py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-semibold transition-colors">
                  Ask a Question
                </button>
              </div>
              
              <div className="text-sm text-gray-500">
                Tool ID: #{tool.id}
              </div>
            </div>
          </div>
        </div>
        
        {/* Similar Tools */}
        {similarTools.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Similar Tools You Might Like</h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarTools.map(similarTool => (
                <div 
                  key={similarTool.id} 
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={similarTool.imageUrl} 
                      alt={similarTool.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">{similarTool.name}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{similarTool.description}</p>
                    <Link 
                      to={`/tool/${similarTool.id}`}
                      className="text-green-600 hover:text-green-700 font-medium text-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolDetailPage;