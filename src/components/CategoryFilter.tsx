import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Drill, 
  Hammer, 
  Shovel, 
  Paintbrush, 
  Droplet, 
  Scaling, 
  Ruler, 
  Axe,
  X 
} from 'lucide-react';

const CategoryFilter: React.FC = () => {
  const { categories, selectedCategory, setSelectedCategory } = useApp();

  const getCategoryIcon = (iconName: string, size = 18) => {
    switch (iconName) {
      case 'drill': return <Drill size={size} />;
      case 'hammer': return <Hammer size={size} />;
      case 'shovel': return <Shovel size={size} />;
      case 'paintbrush': return <Paintbrush size={size} />;
      case 'spray-bottle': return <Droplet size={size} />;
      case 'ladder': return <Scaling size={size} />;
      case 'ruler': return <Ruler size={size} />;
      case 'saw': return <Axe size={size} />;
      default: return <Hammer size={size} />;
    }
  };
  
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Categories</h2>
      
      <div className="flex flex-wrap gap-2">
        {selectedCategory && (
          <button
            onClick={() => setSelectedCategory('')}
            className="flex items-center py-1 px-3 bg-green-100 text-green-800 rounded-full text-sm hover:bg-green-200 transition-colors duration-200"
          >
            <X size={16} className="mr-1" />
            Clear Filter
          </button>
        )}
        
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(selectedCategory === category.id ? '' : category.id)}
            className={`flex items-center py-1 px-3 rounded-full text-sm transition-colors duration-200 ${
              selectedCategory === category.id
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="mr-1">{getCategoryIcon(category.icon, 16)}</span>
            {category.name}
            <span className="ml-1 text-xs">({category.toolCount})</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;