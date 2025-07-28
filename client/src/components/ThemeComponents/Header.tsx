import React, { useState } from "react";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";

interface HeaderProps {
    onSearchToggle: () => void;
    onCartToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearchToggle, onCartToggle }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-gray-50 text-gray-800 uppercase text-sm p-3 border-b border-gray-200">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a href="/" className="text-white">
                            <svg
                                width="112"
                                height="45"
                                viewBox="0 0 112 45"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#111"
                            >
                                <path d="M2.51367 34.9297C2.58398 34.6836 2.64844 34.3789 2.70703 34.0156C2.77734 33.6523 2.83594 33.2012 2.88281 32.6621C2.92969 32.123 2.96484 31.4844 2.98828 30.7461C3.01172 29.9961 3.02344 29.123 3.02344 28.127V16.6836C3.02344 15.6875 3.01172 14.8203 2.98828 14.082C2.96484 13.332 2.92969 12.6875 2.88281 12.1484C2.83594 11.5977 2.77734 11.1406 2.70703 10.7773C2.64844 10.4141 2.58398 10.1094 2.51367 9.86328V9.79297H6.73242V9.86328C6.66211 10.1094 6.5918 10.4141 6.52148 10.7773C6.46289 11.1406 6.41016 11.5977 6.36328 12.1484C6.32812 12.6875 6.29297 13.332 6.25781 14.082C6.23438 14.8203 6.22266 15.6875 6.22266 16.6836V20.6035L16.4883 12.2188C17.6367 11.2813 18.2109 10.4727 18.2109 9.79297H23.1504V9.86328C22.459 10.0273 21.7559 10.3437 21.041 10.8125C20.3379 11.2695 19.5879 11.832 18.791 12.5L9.7207 20.0938L20.6367 32.082C21.0938 32.5508 21.4805 32.9434 21.7969 33.2598C22.125 33.5645 22.4121 33.8223 22.6582 34.0332C22.9043 34.2324 23.127 34.4023 23.3262 34.543C23.5371 34.6719 23.7539 34.8008 23.9766 34.9297V35H18.8262C18.7793 34.8945 18.6973 34.7598 18.5801 34.5957C18.4746 34.4316 18.3457 34.2617 18.1934 34.0859C18.0527 33.9102 17.8945 33.7285 17.7188 33.541C17.5547 33.3535 17.3965 33.1777 17.2441 33.0137L6.22266 20.9199V28.127C6.22266 29.123 6.23438 29.9961 6.25781 30.7461C6.29297 31.4844 6.32812 32.123 6.36328 32.6621C6.41016 33.2012 6.46289 33.6523 6.52148 34.0156C6.5918 34.3789 6.66211 34.6836 6.73242 34.9297V35H2.51367V34.9297Z" />
                            </svg>
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-800 hover:text-gray-600"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        <div className="flex items-center space-x-6">
                            <a
                                href="#"
                                className="text-gray-800 hover:text-gray-600 transition-colors"
                            >
                                Wishlist{" "}
                                <span className="text-gray-500">(0)</span>
                            </a>
                            <button
                                onClick={onSearchToggle}
                                className="text-gray-800 hover:text-gray-600 transition-colors"
                            >
                                <Search size={20} />
                            </button>
                            <button
                                onClick={onCartToggle}
                                className="text-gray-800 hover:text-gray-600 transition-colors relative"
                            >
                                <ShoppingBag size={20} />
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    3
                                </span>
                            </button>
                            <a
                                href="#"
                                className="text-gray-800 hover:text-gray-600 transition-colors"
                            >
                                <User size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
                        <div className="flex flex-col space-y-4 pt-4">
                            <a
                                href="#"
                                className="text-gray-800 hover:text-gray-600 transition-colors"
                            >
                                Wishlist{" "}
                                <span className="text-gray-500">(0)</span>
                            </a>
                            <button
                                onClick={onSearchToggle}
                                className="text-gray-800 hover:text-gray-600 transition-colors text-left"
                            >
                                Search
                            </button>
                            <button
                                onClick={onCartToggle}
                                className="text-gray-800 hover:text-gray-600 transition-colors text-left"
                            >
                                Cart (3)
                            </button>
                            <a
                                href="#"
                                className="text-gray-800 hover:text-gray-600 transition-colors"
                            >
                                Account
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Header;
