import React, { useState } from 'react';
import Header from '../components/ThemeComponents/Header';
import SearchPopup from '../components/ThemeComponents/SearchPopup';
import CartSidebar from '../components/ThemeComponents/CartSidebar';
import HeroSection from '../components/ThemeComponents/HeroSection';
import ProductCard from '../components/ThemeComponents/ProductCard';
import Footer from '../components/ThemeComponents/Footer';

const ThemePage: React.FC = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);

  const sampleProducts = [
    {
      id: 1,
      name: 'Classic White T-Shirt',
      price: 29.99,
      originalPrice: 39.99,
      image: '/images/product-item-1.jpg',
      category: 'T-Shirts',
      rating: 4.5,
      isNew: true,
      isSale: true,
      discount: 25
    },
    {
      id: 2,
      name: 'Denim Jacket',
      price: 89.99,
      image: '/images/product-item-2.jpg',
      category: 'Jackets',
      rating: 4.8,
      isNew: false,
      isSale: false
    },
    {
      id: 3,
      name: 'Leather Handbag',
      price: 129.99,
      originalPrice: 159.99,
      image: '/images/product-item-3.jpg',
      category: 'Handbags',
      rating: 4.6,
      isNew: false,
      isSale: true,
      discount: 20
    },
    {
      id: 4,
      name: 'Summer Dress',
      price: 59.99,
      image: '/images/product-item-4.jpg',
      category: 'Dresses',
      rating: 4.7,
      isNew: true,
      isSale: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header 
        onSearchToggle={() => setIsSearchVisible(true)}
        onCartToggle={() => setIsCartVisible(true)}
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif mb-4">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our carefully curated collection of premium products designed for modern lifestyles.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sampleProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif mb-4">Shop by Category</h2>
            <p className="text-gray-600">
              Explore our diverse range of categories
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative overflow-hidden group">
              <img 
                src="/images/cat-item1.jpg" 
                alt="Women's Fashion"
                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-serif mb-2">Women's Fashion</h3>
                  <a href="/category/women" className="inline-block bg-white text-gray-800 px-6 py-2 hover:bg-gray-100 transition-colors">
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
            
            <div className="relative overflow-hidden group">
              <img 
                src="/images/cat-item2.jpg" 
                alt="Men's Fashion"
                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-serif mb-2">Men's Fashion</h3>
                  <a href="/category/men" className="inline-block bg-white text-gray-800 px-6 py-2 hover:bg-gray-100 transition-colors">
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
            
            <div className="relative overflow-hidden group">
              <img 
                src="/images/cat-item3.jpg" 
                alt="Accessories"
                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-serif mb-2">Accessories</h3>
                  <a href="/category/accessories" className="inline-block bg-white text-gray-800 px-6 py-2 hover:bg-gray-100 transition-colors">
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new collections, exclusive offers, and fashion tips.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-800"
            />
            <button className="bg-gray-800 text-white px-6 py-3 hover:bg-gray-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <SearchPopup 
        isVisible={isSearchVisible}
        onClose={() => setIsSearchVisible(false)}
      />
      
      <CartSidebar 
        isVisible={isCartVisible}
        onClose={() => setIsCartVisible(false)}
      />
    </div>
  );
};

export default ThemePage; 