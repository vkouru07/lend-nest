import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ToolCard from '../components/ToolCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import { PenTool as ToolIcon, AlertCircle } from 'lucide-react';

const ToolsPage: React.FC = () => {
  const { filteredTools, setSelectedCategory } = useApp();
  const location = useLocation();
  
  // Parse category from URL query params if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [location, setSelectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-6">
          <ToolIcon size={24} className="text-green-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">Tool Catalog</h1>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar filters */}
          <div className="md:col-span-1">
            <div className="bg-white p-4 rounded-lg shadow-sm sticky top-20">
              <SearchBar />
              <CategoryFilter />
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Availability</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-gray-700">
                    <input type="checkbox" className="rounded text-green-600 focus:ring-green-500" defaultChecked />
                    <span>Available now</span>
                  </label>
                  <label className="flex items-center space-x-2 text-gray-700">
                    <input type="checkbox" className="rounded text-green-600 focus:ring-green-500" />
                    <span>Show all tools</span>
                  </label>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Condition</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-gray-700">
                    <input type="checkbox" className="rounded text-green-600 focus:ring-green-500" defaultChecked />
                    <span>Excellent</span>
                  </label>
                  <label className="flex items-center space-x-2 text-gray-700">
                    <input type="checkbox" className="rounded text-green-600 focus:ring-green-500" defaultChecked />
                    <span>Good</span>
                  </label>
                  <label className="flex items-center space-x-2 text-gray-700">
                    <input type="checkbox" className="rounded text-green-600 focus:ring-green-500" defaultChecked />
                    <span>Fair</span>
                  </label>
                  <label className="flex items-center space-x-2 text-gray-700">
                    <input type="checkbox" className="rounded text-green-600 focus:ring-green-500" />
                    <span>Needs Repair</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tool grid */}
          <div className="md:col-span-3">
            {filteredTools.length > 0 ? (
              <>
                <p className="text-gray-600 mb-4">
                  Showing {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'}
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTools.map(tool => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-sm flex flex-col items-center justify-center text-center">
                <AlertCircle size={48} className="text-gray-400 mb-4" />
                <h2 className="text-xl font-semibold text-gray-700 mb-2">No tools found</h2>
                <p className="text-gray-600 mb-4">
                  We couldn't find any tools matching your search criteria. 
                  Try adjusting your filters or search terms.
                </p>
                <button 
                  onClick={() => {
                    setSelectedCategory('');
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsPage;