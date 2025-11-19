const products = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    category: "men",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop",
    description: "Premium cotton t-shirt with a comfortable fit. Perfect for everyday wear.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    featured: true
  },
  {
    id: 2,
    name: "Slim Fit Denim Jeans",
    category: "men",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop",
    description: "Modern slim fit jeans with stretch denim for ultimate comfort.",
    sizes: ["28", "30", "32", "34", "36"],
    featured: true
  },
  {
    id: 3,
    name: "Elegant Summer Dress",
    category: "women",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop",
    description: "Flowing summer dress with floral patterns. Perfect for any occasion.",
    sizes: ["XS", "S", "M", "L", "XL"],
    featured: true
  },
  {
    id: 4,
    name: "Leather Crossbody Bag",
    category: "accessories",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&h=600&fit=crop",
    description: "Genuine leather crossbody bag with adjustable strap.",
    sizes: ["One Size"],
    featured: true
  },
  {
    id: 5,
    name: "Casual Hoodie",
    category: "men",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop",
    description: "Comfortable cotton blend hoodie with kangaroo pocket.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    featured: false
  },
  {
    id: 6,
    name: "High-Waisted Yoga Pants",
    category: "women",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500&h=600&fit=crop",
    description: "Stretchy and breathable yoga pants for active lifestyle.",
    sizes: ["XS", "S", "M", "L", "XL"],
    featured: false
  },
  {
    id: 7,
    name: "Classic Leather Belt",
    category: "accessories",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1624222247344-550fb60583c2?w=500&h=600&fit=crop",
    description: "Timeless leather belt with silver buckle.",
    sizes: ["S", "M", "L", "XL"],
    featured: false
  },
  {
    id: 8,
    name: "Striped Button-Down Shirt",
    category: "men",
    price: 54.99,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=600&fit=crop",
    description: "Classic striped shirt perfect for office or casual wear.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    featured: false
  },
  {
    id: 9,
    name: "Knit Sweater",
    category: "women",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&h=600&fit=crop",
    description: "Cozy knit sweater for chilly days. Soft and warm.",
    sizes: ["XS", "S", "M", "L", "XL"],
    featured: true
  },
  {
    id: 10,
    name: "Designer Sunglasses",
    category: "accessories",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=600&fit=crop",
    description: "UV protection sunglasses with polarized lenses.",
    sizes: ["One Size"],
    featured: false
  },
  {
    id: 11,
    name: "Athletic Shorts",
    category: "men",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&h=600&fit=crop",
    description: "Lightweight athletic shorts with moisture-wicking fabric.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    featured: false
  },
  {
    id: 12,
    name: "Floral Blouse",
    category: "women",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1564257577-d18b7c3a5b0f?w=500&h=600&fit=crop",
    description: "Elegant floral blouse with button details.",
    sizes: ["XS", "S", "M", "L", "XL"],
    featured: false
  },
  {
    id: 13,
    name: "Canvas Sneakers",
    category: "accessories",
    price: 64.99,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&h=600&fit=crop",
    description: "Classic canvas sneakers for everyday comfort.",
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    featured: false
  },
  {
    id: 14,
    name: "Bomber Jacket",
    category: "men",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=600&fit=crop",
    description: "Stylish bomber jacket with ribbed cuffs and hem.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    featured: true
  },
  {
    id: 15,
    name: "Maxi Skirt",
    category: "women",
    price: 54.99,
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500&h=600&fit=crop",
    description: "Flowing maxi skirt with elastic waistband.",
    sizes: ["XS", "S", "M", "L", "XL"],
    featured: false
  },
  {
    id: 16,
    name: "Wool Scarf",
    category: "accessories",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=500&h=600&fit=crop",
    description: "Soft wool scarf to keep you warm in style.",
    sizes: ["One Size"],
    featured: false
  }
];
