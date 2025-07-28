# Kaira Theme - React TypeScript Conversion

This is a complete conversion of the original Kaira Bootstrap theme to React, TypeScript, and Tailwind CSS.

## 🎨 Components Overview

### Core Components

1. **Header** (`components/ThemeComponents/Header.tsx`)
   - Responsive navigation with mobile menu
   - Search and cart toggle functionality
   - Logo and user actions

2. **SearchPopup** (`components/ThemeComponents/SearchPopup.tsx`)
   - Full-screen search overlay
   - Category browsing
   - Search form with suggestions

3. **CartSidebar** (`components/ThemeComponents/CartSidebar.tsx`)
   - Slide-out cart panel
   - Product list with quantities
   - Checkout functionality

4. **HeroSection** (`components/ThemeComponents/HeroSection.tsx`)
   - Auto-rotating slider
   - Call-to-action buttons
   - Video player integration

5. **ProductCard** (`components/ThemeComponents/ProductCard.tsx`)
   - Product display with hover effects
   - Wishlist functionality
   - Rating system
   - Sale badges

6. **Footer** (`components/ThemeComponents/Footer.tsx`)
   - Newsletter subscription
   - Social media links
   - Payment method icons

7. **Preloader** (`components/ThemeComponents/Preloader.tsx`)
   - Loading animation
   - Smooth transitions

## 🚀 Features

### Responsive Design
- Mobile-first approach
- Breakpoint-specific layouts
- Touch-friendly interactions

### Animations & Effects
- Smooth hover transitions
- Image zoom effects
- Staggered animations
- Custom CSS animations

### Interactive Elements
- Wishlist functionality
- Shopping cart management
- Search with categories
- Newsletter signup

### Modern UI/UX
- Clean, minimalist design
- Consistent spacing and typography
- Accessible color scheme
- Smooth scrolling

## 🛠️ Technical Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Custom CSS** for animations
- **Responsive design** principles

## 📁 File Structure

```
src/
├── components/
│   └── ThemeComponents/
│       ├── Header.tsx
│       ├── SearchPopup.tsx
│       ├── CartSidebar.tsx
│       ├── HeroSection.tsx
│       ├── ProductCard.tsx
│       ├── Footer.tsx
│       └── Preloader.tsx
├── pages/
│   └── ThemePage.tsx
├── styles/
│   └── theme.css
└── main.tsx
```

## 🎯 Usage

### Basic Setup

1. Import the theme components:
```tsx
import Header from './components/ThemeComponents/Header';
import HeroSection from './components/ThemeComponents/HeroSection';
import ProductCard from './components/ThemeComponents/ProductCard';
import Footer from './components/ThemeComponents/Footer';
```

2. Use in your component:
```tsx
const MyPage = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);

  return (
    <div>
      <Header 
        onSearchToggle={() => setIsSearchVisible(true)}
        onCartToggle={() => setIsCartVisible(true)}
      />
      <HeroSection />
      <ProductCard {...productData} />
      <Footer />
    </div>
  );
};
```

### Product Data Structure

```tsx
interface ProductData {
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
```

### Customization

#### Colors
The theme uses a consistent color palette:
- Primary: `#8C907E` (Sage Green)
- Secondary: `#5e624e` (Dark Green)
- Text: `#111` (Dark Gray)
- Background: `#F1F1F0` (Light Gray)

#### Typography
- Headings: Marcellus font family
- Body: Jost font family
- Responsive font sizes

#### Animations
Custom CSS animations are available:
- `.animate-fade-in`
- `.animate-slide-up`
- `.animate-scale-in`
- `.card-hover`

## 🎨 Design System

### Color Palette
```css
--primary: #8C907E;
--secondary: #5e624e;
--text-dark: #111;
--text-light: #8f8f8f;
--background: #F1F1F0;
```

### Spacing
- Consistent 8px grid system
- Responsive padding and margins
- Component-specific spacing

### Typography Scale
- H1: 4.5rem (72px)
- H2: 3.6rem (57.6px)
- H3: 2.8rem (44.8px)
- H4: 1.8rem (28.8px)
- H5: 1.4rem (22.4px)
- H6: 1rem (16px)

## 🔧 Development

### Adding New Components
1. Create component in `components/ThemeComponents/`
2. Use TypeScript interfaces for props
3. Follow Tailwind CSS naming conventions
4. Add custom animations to `styles/theme.css`

### Styling Guidelines
- Use Tailwind CSS classes primarily
- Add custom CSS only for complex animations
- Maintain responsive design principles
- Follow accessibility guidelines

### Performance
- Lazy load images
- Use React.memo for static components
- Optimize bundle size with tree shaking
- Implement proper loading states

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🎯 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

This theme conversion maintains the original design while modernizing the technology stack for better performance and maintainability.

## 🤝 Contributing

1. Follow TypeScript best practices
2. Use consistent naming conventions
3. Add proper TypeScript interfaces
4. Test responsive behavior
5. Ensure accessibility compliance

---

**Note**: This is a complete conversion of the original Bootstrap theme to modern React/TypeScript/Tailwind CSS stack, maintaining the original design while improving performance and developer experience. 