import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ToolCard from '../components/ToolCard';
import { ArrowRight, PenTool as ToolIcon, Users, Calendar, Map } from 'lucide-react';

const HomePage: React.FC = () => {
  const { tools, categories } = useApp();
  
  // Get recently added tools (last 4)
  const recentTools = [...tools]
    .sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime())
    .slice(0, 4);
  
  // Get most popular tools (most loaned)
  const popularTools = [...tools]
    .sort((a, b) => b.timesLoaned - a.timesLoaned)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-green-700 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg" 
            alt="Tools background" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Borrow tools from your neighbors in Greenfield
            </h1>
            <p className="text-xl mb-8 text-green-100">
              Access the tools you need without buying them. Share resources, 
              build community, and get your projects done.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/tools" 
                className="bg-white text-green-700 hover:bg-green-100 transition-colors px-6 py-3 rounded-lg font-semibold flex items-center"
              >
                <ToolIcon size={20} className="mr-2" />
                Browse Tools
              </Link>
              <Link 
                to="/add-tool" 
                className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-green-700 transition-colors px-6 py-3 rounded-lg font-semibold"
              >
                Share Your Tools
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Users size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Join Your Neighborhood</h3>
              <p className="text-gray-600">
                Create an account and join the Greenfield tool sharing community. Connect with neighbors who love to share.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <ToolIcon size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Find or Share Tools</h3>
              <p className="text-gray-600">
                Browse available tools or add your own to share. From power drills to ladders, find what you need.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Calendar size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Reserve & Borrow</h3>
              <p className="text-gray-600">
                Reserve the tools you need for your project with just a few clicks. Pick up from your neighbor and return when done.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Recent Tools */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Recently Added Tools</h2>
            <Link 
              to="/tools" 
              className="text-green-600 hover:text-green-700 font-medium flex items-center"
            >
              View All Tools <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Popular Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Popular Categories</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.slice(0, 8).map(category => (
              <Link 
                key={category.id}
                to={`/tools?category=${category.id}`}
                className="bg-gray-50 hover:bg-green-50 transition-colors p-6 rounded-lg text-center group"
              >
                <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                  {/* Replace with appropriate category icons */}
                  <ToolIcon size={24} className="text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{category.name}</h3>
                <p className="text-gray-500 text-sm">{category.toolCount} tool{category.toolCount !== 1 ? 's' : ''}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Popular Tools */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Most Popular Tools</h2>
            <Link 
              to="/tools" 
              className="text-green-600 hover:text-green-700 font-medium flex items-center"
            >
              View All Tools <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Community */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-xl mb-8 text-green-100">
              Become part of the Greenfield neighborhood tool sharing community today. 
              Save money, reduce waste, and meet your neighbors.
            </p>
            <div className="flex justify-center flex-wrap gap-4">
              <Link 
                to="/signup" 
                className="bg-white text-green-700 hover:bg-green-100 transition-colors px-6 py-3 rounded-lg font-semibold flex items-center"
              >
                <Users size={20} className="mr-2" />
                Sign Up Now
              </Link>
              <Link 
                to="/about" 
                className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-green-700 transition-colors px-6 py-3 rounded-lg font-semibold"
              >
                Learn More
              </Link>
            </div>
            
            <div className="mt-12 flex items-center justify-center space-x-6">
              <div className="text-center">
                <div className="text-4xl font-bold">48</div>
                <div className="text-green-100">Tools Shared</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">32</div>
                <div className="text-green-100">Members</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">127</div>
                <div className="text-green-100">Loans Completed</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Neighborhood Map (Placeholder) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Serving the Greenfield Neighborhood</h2>
              <p className="text-gray-600 mb-4">
                Our tool library serves the entire Greenfield neighborhood. Find tools near you and 
                arrange convenient pickups and returns with neighbors just around the corner.
              </p>
              <div className="flex items-center space-x-1 text-green-600 font-medium">
                <Map size={20} />
                <span>Centered around Greenfield Community Center</span>
              </div>
            </div>
            <div className="md:w-1/2 bg-gray-200 rounded-lg overflow-hidden aspect-video">
              {/* Placeholder for a map */}
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <Map size={48} className="mx-auto mb-2" />
                  <p>Neighborhood Map</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;