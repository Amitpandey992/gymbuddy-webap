import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchPopupProps {
  isVisible: boolean;
  onClose: () => void;
}

const SearchPopup: React.FC<SearchPopupProps> = ({ isVisible, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'Jackets', 'T-shirts', 'Handbags', 'Accessories', 
    'Cosmetics', 'Dresses', 'Jumpsuits'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality
    console.log('Searching for:', searchQuery);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-4xl mx-4 p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="relative">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Type and press enter"
              className="w-full border-0 border-b-2 border-gray-300 focus:border-gray-800 outline-none text-lg py-2 pr-12"
            />
            <button
              type="submit"
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Search size={20} />
            </button>
          </div>
        </form>

        {/* Categories */}
        <div>
          <h5 className="text-lg font-semibold text-gray-800 mb-4">
            Browse Categories
          </h5>
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <li key={index} className="group">
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 transition-colors relative group-hover:after:content-[''] group-hover:after:absolute group-hover:after:bottom-0 group-hover:after:left-0 group-hover:after:w-full group-hover:after:h-0.5 group-hover:after:bg-gray-800"
                >
                  {category}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchPopup; 