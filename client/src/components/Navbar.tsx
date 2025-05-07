import { useState } from "react";
import {
  Menu,
  X,
  Search,
  User,
  Bell,
  MessageSquare,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-900 fixed w-full z-50 shadow-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center hover:cursor-pointer" onClick={() => navigate("/")}>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">
              GymBuddy
            </span>
          </div>

          {/* Desktop Menu Items */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="p-2">
              <MessageSquare className="h-5 w-5 text-gray-300" />
            </Button>
            <Button variant="ghost" className="p-2">
              <Bell className="h-5 w-5 text-gray-300" />
            </Button>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-2 text-gray-300 hover:bg-gray-800 p-2 rounded-lg transition-colors duration-200">
                  <img
                    className="h-8 w-8 rounded-full ring-2 ring-indigo-500"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
                    alt="Profile"
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-gray-800 border-gray-700"
              >
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="h-4 w-4 mr-2" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-400">
                  <LogOut className="h-4 w-4 mr-2" /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              className="p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-300" />
              ) : (
                <Menu className="h-6 w-6 text-gray-300" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Search..."
              />
            </div>
            <a
              href="#messages"
              className="flex items-center px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700"
            >
              <MessageSquare className="h-5 w-5 mr-2" /> Messages
            </a>
            <a
              href="#notifications"
              className="flex items-center px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700"
            >
              <Bell className="h-5 w-5 mr-2" /> Notifications
            </a>
            <a
              href="#profile"
              className="flex items-center px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700"
            >
              <User className="h-5 w-5 mr-2" /> Profile
            </a>
            <a
              href="#logout"
              className="flex items-center px-3 py-2 rounded-lg text-red-400 hover:bg-gray-700"
            >
              <LogOut className="h-5 w-5 mr-2" /> Sign out
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Main;
