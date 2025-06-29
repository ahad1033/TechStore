# TechStore - Modern E-commerce Web Application

A modern, responsive e-commerce web application built with React 19, featuring a comprehensive public-facing site with authentication, product catalog, shopping cart, and more.

## 🚀 Features

### Public Site Features

- **Authentication System**: Login and signup pages with form validation
- **Responsive Navigation**: Sticky navbar with mega menu, search bar, and mobile hamburger menu
- **Landing Page**: 10+ sections including hero, categories, featured products, testimonials, and newsletter
- **Product Catalog**: Grid layout with filters, search, pagination, and view mode toggle
- **Product Details**: Image gallery, product information, reviews, and add to cart functionality
- **Shopping Cart**: Cart management with quantity updates, item removal, and checkout
- **Contact Page**: Contact form with validation and company information

### Technical Features

- **React 19** with Vite for fast development and building
- **React Router DOM v7+** for client-side routing
- **Tailwind CSS** with centralized theme configuration
- **ShadCN UI** components for consistent design
- **Redux Toolkit** for state management
- **React Hook Form + Yup** for form validation
- **Responsive Design** with mobile-first approach
- **Modern JavaScript** (ES6+) features

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router DOM v7+
- **Styling**: Tailwind CSS v4
- **UI Components**: ShadCN UI
- **State Management**: Redux Toolkit + React Redux
- **Form Handling**: React Hook Form + Yup
- **Icons**: Lucide React
- **Development**: ESLint, Hot Module Replacement

## 📁 Project Structure

```
src/
├── components/
│   ├── dashboard/          # Future admin dashboard components
│   ├── guard/             # Route protection components
│   ├── layouts/           # Layout components
│   │   └── main-layout.jsx
│   ├── sections/          # Home page sections
│   │   ├── hero-section.jsx
│   │   ├── product-categories.jsx
│   │   ├── featured-products.jsx
│   │   ├── testimonials.jsx
│   │   └── newsletter-signup.jsx
│   ├── shared/            # Shared components
│   │   ├── navbar.jsx
│   │   └── footer.jsx
│   └── ui/                # ShadCN UI components
│       ├── button.jsx
│       ├── card.jsx
│       ├── input.jsx
│       └── ...
├── pages/                 # Page components
│   ├── auth/
│   │   ├── login-page.jsx
│   │   └── signup-page.jsx
│   ├── home-page.jsx
│   ├── products-page.jsx
│   ├── product-detail-page.jsx
│   ├── cart-page.jsx
│   └── contact-page.jsx
├── routes/                # Route configuration
│   └── index.js
├── store/                 # Redux store
│   ├── index.js
│   └── slices/
│       ├── cartSlice.js
│       ├── authSlice.js
│       └── productsSlice.js
├── data/                  # Mock data
│   └── mockData.js
├── lib/                   # Utility functions
├── hooks/                 # Custom React hooks
├── assets/                # Static assets
├── App.jsx                # Main app component
├── main.jsx              # Entry point
└── index.css             # Global styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd TechStore
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Routes

### Public Routes

- `/` - Home page with landing sections
- `/products` - Product catalog with filters
- `/products/:id` - Product detail page
- `/cart` - Shopping cart
- `/contact` - Contact page
- `/login` - User login
- `/signup` - User registration

### Future Dashboard Routes (Commented)

- `/dashboard` - Admin dashboard
- `/dashboard/products` - Product management
- `/dashboard/orders` - Order management
- `/dashboard/users` - User management

## 🎨 Design System

### Theme Configuration

The application uses Tailwind CSS with a centralized theme configuration in `src/index.css`:

- **Primary Colors**: Blue-based color scheme
- **Typography**: Inter font family
- **Spacing**: Consistent 4px base unit
- **Border Radius**: 0.625rem (10px) base radius
- **Shadows**: Subtle elevation system

### Components

All UI components are built using ShadCN UI with consistent:

- Button variants (default, secondary, destructive, outline, ghost)
- Card layouts with proper spacing
- Form inputs with validation states
- Badge components for status indicators
- Avatar components for user profiles

## 🔧 Customization

### Adding New Products

1. Edit `src/data/mockData.js`
2. Add product objects to the `products` array
3. Include required fields: id, name, price, category, rating, etc.

### Modifying Categories

1. Update the `categories` array in `src/data/mockData.js`
2. Add corresponding category filters in the products page

### Styling Changes

1. Modify theme variables in `src/index.css`
2. Update component styles in respective files
3. Use Tailwind CSS classes for consistent styling

## 🚀 Build & Deploy

### Production Build

```bash
npm run build
```

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Deploy to Netlify

1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure build settings if needed

## 🧪 Testing

### Manual Testing Checklist

- [ ] Responsive design on all screen sizes
- [ ] Navigation functionality
- [ ] Product filtering and search
- [ ] Cart operations (add, remove, update)
- [ ] Form validation
- [ ] Authentication flows
- [ ] Cross-browser compatibility

### Future Testing Implementation

- Unit tests with Jest
- Component tests with React Testing Library
- E2E tests with Playwright or Cypress

## 🔮 Future Enhancements

### Planned Features

- **Admin Dashboard**: Product management, order processing, user management
- **User Dashboard**: Order history, profile management, wishlist
- **Payment Integration**: Stripe, PayPal integration
- **Real-time Features**: Live chat, stock notifications
- **Advanced Search**: Elasticsearch integration
- **PWA Features**: Offline support, push notifications
- **Multi-language Support**: Internationalization
- **Dark Mode**: Theme switching capability

### Technical Improvements

- **Performance**: Code splitting, lazy loading
- **SEO**: Meta tags, structured data
- **Accessibility**: ARIA labels, keyboard navigation
- **Security**: Input sanitization, CSRF protection
- **Analytics**: Google Analytics, user behavior tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

### Code Style

- Use consistent formatting with Prettier
- Follow ESLint rules
- Write meaningful commit messages
- Add comments for complex logic

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **ShadCN UI** for the component library
- **Tailwind CSS** for the utility-first CSS framework
- **Vite** for the fast build tool
- **React Team** for the amazing framework
- **Unsplash** for the placeholder images

## 📞 Support

For support and questions:

- Create an issue in the repository
- Contact: support@techstore.com
- Documentation: [Wiki](link-to-wiki)

---

**TechStore** - Your one-stop destination for the latest technology products.
