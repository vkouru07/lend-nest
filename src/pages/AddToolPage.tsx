import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { PlusCircle, PenTool as ToolIcon, ArrowLeft, Image, AlertCircle } from 'lucide-react';

const AddToolPage: React.FC = () => {
  const { categories, addTool, currentUser } = useApp();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    imageUrl: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg',
    condition: 'good' as 'excellent' | 'good' | 'fair' | 'needs repair',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center justify-center text-center">
            <AlertCircle size={48} className="text-blue-500 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Login Required</h2>
            <p className="text-gray-600 mb-4">
              You need to be logged in to add tools. Please log in or create an account to continue.
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
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear the error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Tool name is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }
    
    if (!formData.condition) {
      newErrors.condition = 'Condition is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      addTool({
        ...formData,
        available: true,
      });
      
      setIsSubmitting(false);
      navigate('/profile');
    }, 1000);
  };
  
  // Sample image URLs for demo purposes
  const sampleImages = [
    'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg',
    'https://images.pexels.com/photos/209235/pexels-photo-209235.jpeg',
    'https://images.pexels.com/photos/5691614/pexels-photo-5691614.jpeg',
    'https://images.pexels.com/photos/175039/pexels-photo-175039.jpeg',
    'https://images.pexels.com/photos/220639/pexels-photo-220639.jpeg',
    'https://images.pexels.com/photos/1078879/pexels-photo-1078879.jpeg',
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center text-sm text-gray-500">
            <Link to="/profile" className="hover:text-green-600 flex items-center">
              <ArrowLeft size={16} className="mr-1" />
              Back to Profile
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">Add Tool</span>
          </nav>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-6">
            <PlusCircle size={24} className="text-green-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">Share a Tool</h1>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <p className="text-gray-600 mb-6">
                Share your tools with your neighbors and help build a more resourceful community. 
                Please provide accurate information about your tool.
              </p>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  {/* Tool Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Tool Name*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g., Cordless Drill, Garden Hoe, Ladder"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                        errors.name 
                          ? 'border-red-300 focus:ring-red-200 focus:border-red-500' 
                          : 'border-gray-300 focus:ring-green-200 focus:border-green-500'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>
                  
                  {/* Category */}
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                      Category*
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                        errors.category 
                          ? 'border-red-300 focus:ring-red-200 focus:border-red-500' 
                          : 'border-gray-300 focus:ring-green-200 focus:border-green-500'
                      }`}
                    >
                      <option value="">Select a category</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                    )}
                  </div>
                  
                  {/* Description */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description*
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Describe your tool, including brand, model, specifications, and any special features or instructions."
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                        errors.description 
                          ? 'border-red-300 focus:ring-red-200 focus:border-red-500' 
                          : 'border-gray-300 focus:ring-green-200 focus:border-green-500'
                      }`}
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                    )}
                  </div>
                  
                  {/* Condition */}
                  <div>
                    <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
                      Condition*
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {['excellent', 'good', 'fair', 'needs repair'].map((condition) => (
                        <div key={condition}>
                          <input
                            type="radio"
                            id={condition}
                            name="condition"
                            value={condition}
                            checked={formData.condition === condition}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <label
                            htmlFor={condition}
                            className={`block w-full text-center px-3 py-2 border rounded-md cursor-pointer transition-colors ${
                              formData.condition === condition
                                ? 'bg-green-50 border-green-500 text-green-700'
                                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {condition.charAt(0).toUpperCase() + condition.slice(1)}
                          </label>
                        </div>
                      ))}
                    </div>
                    {errors.condition && (
                      <p className="mt-1 text-sm text-red-600">{errors.condition}</p>
                    )}
                  </div>
                  
                  {/* Tool Image */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tool Image
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
                      {sampleImages.map((url, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setFormData({ ...formData, imageUrl: url })}
                          className={`aspect-square border rounded-md overflow-hidden ${
                            formData.imageUrl === url ? 'ring-2 ring-green-500' : 'hover:opacity-80'
                          }`}
                        >
                          <img 
                            src={url} 
                            alt={`Sample tool ${index + 1}`} 
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500">Or upload your own photo (coming soon)</p>
                      <button
                        type="button"
                        disabled
                        className="flex items-center text-sm text-gray-400 cursor-not-allowed"
                      >
                        <Image size={16} className="mr-1" />
                        Upload
                      </button>
                    </div>
                  </div>
                  
                  {/* Submit Button */}
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex flex-col-reverse sm:flex-row justify-between sm:space-x-4">
                      <Link 
                        to="/profile"
                        className="mt-3 sm:mt-0 py-2 px-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-center"
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
                            Sharing Tool...
                          </>
                        ) : (
                          <>
                            <ToolIcon size={18} className="mr-2" />
                            Share Tool
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          
          {/* Tip Box */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-2 flex items-center">
              <ToolIcon size={18} className="mr-2" />
              Tips for Sharing Tools
            </h3>
            <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
              <li>Add clear photos that show the condition of your tool</li>
              <li>Include brand information and specific model details</li>
              <li>Be honest about the condition of your tool</li>
              <li>Describe any special instructions or limitations for use</li>
              <li>If your tool requires consumables (e.g., drill bits), mention if they're included</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToolPage;