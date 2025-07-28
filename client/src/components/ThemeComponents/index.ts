// Theme Components Index
export { default as Header } from './Header';
export { default as SearchPopup } from './SearchPopup';
export { default as CartSidebar } from './CartSidebar';
export { default as HeroSection } from './HeroSection';
export { default as ProductCard } from './ProductCard';
export { default as Footer } from './Footer';
export { default as Preloader } from './Preloader';

// Types
export interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating?: number;
  isNew?: boolean;
  isSale?: boolean;
  discount?: number;
}

export interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export interface HeaderProps {
  onSearchToggle: () => void;
  onCartToggle: () => void;
}

export interface SearchPopupProps {
  isVisible: boolean;
  onClose: () => void;
}

export interface CartSidebarProps {
  isVisible: boolean;
  onClose: () => void;
}

export interface PreloaderProps {
  isLoading: boolean;
}