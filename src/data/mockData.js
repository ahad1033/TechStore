export const categories = [
  {
    id: 1,
    name: "Electronics",
    icon: "Smartphone",
    description: "Latest smartphones and mobile devices",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    name: "Audio",
    icon: "Headphones",
    description: "Premium audio equipment and accessories",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Gaming",
    icon: "Gamepad2",
    description: "Gaming consoles and accessories",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    name: "Photography",
    icon: "Camera",
    description: "Professional cameras and lenses",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop",
  },
  {
    id: 5,
    name: "Computers",
    icon: "Laptop",
    description: "Laptops, desktops and accessories",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
  },
  {
    id: 6,
    name: "Wearables",
    icon: "Watch",
    description: "Smartwatches and fitness trackers",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
  },
];

export const products = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: 1199.99,
    originalPrice: 1299.99,
    category: "Electronics",
    rating: 4.8,
    reviewCount: 1247,
    image:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    ],
    description:
      "The most advanced iPhone ever with A17 Pro chip, titanium design, and pro camera system.",
    features: [
      "A17 Pro chip with 6-core GPU",
      "Titanium design with Ceramic Shield",
      "Pro camera system with 48MP Main",
      "Action button for quick access",
      "USB-C connector",
    ],
    specifications: {
      Display: "6.7-inch Super Retina XDR OLED",
      Storage: "256GB, 512GB, 1TB",
      Camera: "48MP Main, 12MP Ultra Wide, 12MP Telephoto",
      Battery: "Up to 29 hours video playback",
      Colors: "Natural Titanium, Blue Titanium, White Titanium, Black Titanium",
    },
    inStock: true,
    featured: true,
  },
  {
    id: 2,
    name: "Sony WH-1000XM5",
    price: 349.99,
    originalPrice: 399.99,
    category: "Audio",
    rating: 4.9,
    reviewCount: 892,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    ],
    description:
      "Industry-leading noise canceling wireless headphones with exceptional sound quality.",
    features: [
      "Industry-leading noise canceling",
      "30-hour battery life",
      "Quick Charge (3 min charge = 3 hours playback)",
      "Touch controls",
      "Speak-to-Chat technology",
    ],
    specifications: {
      "Driver Unit": "30mm",
      "Frequency Response": "4Hz-40,000Hz",
      "Battery Life": "Up to 30 hours",
      Weight: "250g",
      Connectivity: "Bluetooth 5.2, NFC",
    },
    inStock: true,
    featured: true,
  },
  {
    id: 3,
    name: "MacBook Pro 16-inch",
    price: 2499.99,
    originalPrice: 2699.99,
    category: "Computers",
    rating: 4.7,
    reviewCount: 567,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop",
    ],
    description:
      "The most powerful MacBook Pro ever with M3 Pro or M3 Max chip.",
    features: [
      "M3 Pro or M3 Max chip",
      "16-inch Liquid Retina XDR display",
      "Up to 22-core GPU",
      "Up to 128GB unified memory",
      "Up to 8TB SSD storage",
    ],
    specifications: {
      Processor: "M3 Pro or M3 Max",
      Memory: "18GB, 36GB, 96GB, or 128GB unified memory",
      Storage: "512GB, 1TB, 2TB, 4TB, or 8TB SSD",
      Display: "16-inch Liquid Retina XDR display",
      Battery: "Up to 22 hours",
    },
    inStock: true,
    featured: true,
  },
  {
    id: 4,
    name: "Sony A7 IV",
    price: 2499.99,
    originalPrice: 2699.99,
    category: "Photography",
    rating: 4.8,
    reviewCount: 423,
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop",
    ],
    description:
      "Full-frame mirrorless camera with 33MP sensor and advanced autofocus.",
    features: [
      "33MP full-frame Exmor R CMOS sensor",
      "Real-time Eye AF for humans and animals",
      "4K 60p video recording",
      "5-axis in-body image stabilization",
      "Dual card slots",
    ],
    specifications: {
      Sensor: "33MP full-frame Exmor R CMOS",
      ISO: "100-51200 (expandable to 50-204800)",
      Autofocus: "759 phase-detection AF points",
      Video: "4K 60p, Full HD 120p",
      Battery: "NP-FZ100 (580 shots)",
    },
    inStock: true,
    featured: false,
  },
  {
    id: 5,
    name: "PlayStation 5",
    price: 499.99,
    originalPrice: 499.99,
    category: "Gaming",
    rating: 4.6,
    reviewCount: 2156,
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=400&fit=crop",
    ],
    description:
      "Next-gen gaming console with lightning-fast loading and stunning graphics.",
    features: [
      "Lightning-fast loading with SSD",
      "Stunning graphics with ray tracing",
      "Haptic feedback with DualSense controller",
      "3D audio with Tempest Engine",
      "Backward compatibility with PS4 games",
    ],
    specifications: {
      CPU: "AMD Zen 2 8-core",
      GPU: "AMD RDNA 2 10.28 TFLOPs",
      Memory: "16GB GDDR6",
      Storage: "825GB SSD",
      Resolution: "Up to 8K",
    },
    inStock: true,
    featured: true,
  },
  {
    id: 6,
    name: "Apple Watch Series 9",
    price: 399.99,
    originalPrice: 449.99,
    category: "Wearables",
    rating: 4.7,
    reviewCount: 892,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    ],
    description:
      "The most advanced Apple Watch with new S9 chip and Double Tap gesture.",
    features: [
      "S9 chip with 4-core neural engine",
      "Double Tap gesture control",
      "Always-On Retina display",
      "Heart rate monitoring",
      "GPS and cellular options",
    ],
    specifications: {
      Display: "Always-On Retina LTPO OLED",
      Battery: "Up to 18 hours",
      "Water Resistance": "50m",
      Sizes: "41mm, 45mm",
      Connectivity: "GPS, GPS + Cellular",
    },
    inStock: true,
    featured: false,
  },
  {
    id: 7,
    name: "Samsung Galaxy S24 Ultra",
    price: 1199.99,
    originalPrice: 1299.99,
    category: "Electronics",
    rating: 4.5,
    reviewCount: 678,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    ],
    description: "The most powerful Galaxy with S Pen and AI features.",
    features: [
      "S Pen built-in",
      "200MP camera system",
      "AI-powered features",
      "Titanium frame",
      "5000mAh battery",
    ],
    specifications: {
      Display: "6.8-inch Dynamic AMOLED 2X",
      Processor: "Snapdragon 8 Gen 3",
      Storage: "256GB, 512GB, 1TB",
      Camera: "200MP Main, 12MP Ultra Wide, 50MP Telephoto",
      Battery: "5000mAh",
    },
    inStock: true,
    featured: false,
  },
  {
    id: 8,
    name: "AirPods Pro 2nd Gen",
    price: 249.99,
    originalPrice: 279.99,
    category: "Audio",
    rating: 4.6,
    reviewCount: 1245,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    ],
    description:
      "Active noise cancellation with spatial audio and sweat resistance.",
    features: [
      "Active noise cancellation",
      "Adaptive transparency",
      "Spatial audio with dynamic head tracking",
      "Sweat and water resistant",
      "Up to 6 hours listening time",
    ],
    specifications: {
      Driver: "Custom high-excursion Apple driver",
      Battery: "Up to 6 hours (ANC on)",
      "Case Battery": "Up to 30 hours total",
      Connectivity: "Bluetooth 5.0",
      "Water Resistance": "IPX4",
    },
    inStock: true,
    featured: false,
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Tech Enthusiast",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    content:
      "TechStore has the best selection of electronics I've ever seen. Fast shipping and excellent customer service!",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Professional Photographer",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    content:
      "I bought my Sony A7 IV here and couldn't be happier. The camera quality is outstanding and the price was unbeatable.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Gaming Streamer",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    rating: 4,
    content:
      "Great selection of gaming gear. The PlayStation 5 I ordered arrived in perfect condition and works flawlessly.",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Software Developer",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    content:
      "TechStore is my go-to for all things tech. Their MacBook Pro selection is excellent and the prices are competitive.",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Music Producer",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    content:
      "The audio equipment selection is incredible. My Sony headphones are perfect for studio work and daily use.",
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Fitness Trainer",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    rating: 4,
    content:
      "Love my Apple Watch from TechStore. Great for tracking workouts and the health features are invaluable.",
  },
];

export const blogPosts = [
  {
    id: 1,
    title: "The Future of Smartphone Photography",
    excerpt:
      "Discover how AI is revolutionizing mobile photography and what to expect in the next generation of smartphones.",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=250&fit=crop",
    author: "TechStore Team",
    date: "2024-01-15",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Choosing the Right Gaming Headset",
    excerpt:
      "A comprehensive guide to selecting the perfect gaming headset for your setup and gaming style.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=250&fit=crop",
    author: "Gaming Expert",
    date: "2024-01-12",
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "MacBook vs Windows Laptop: Which is Right for You?",
    excerpt:
      "Compare the pros and cons of MacBook and Windows laptops to make an informed decision for your next purchase.",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=250&fit=crop",
    author: "Tech Reviewer",
    date: "2024-01-10",
    readTime: "8 min read",
  },
];
