// src/data/productData.js

export const productData = {
  id: 1,
  name: 'NIKE AIR JORDAN 1 LOW',
  category: 'FOOTWEAR',
  description: 'The Nike Air Jordan 1 Low is a sneaker legend with a fresh new look. This edition features premium leather, a comfortable fit, and the iconic Air-Sole unit for ultimate comfort and style.',
  price: 130.00,
  oldPrice: 150.00,
  brand: 'Nike',
  rating: 4.8,
  reviews: 350,
  sku: 'AJ1-LOW-001',
  availability: 'In Stock',

  // Gambar utama untuk produk, sesuaikan dengan varian warna
  mainImages: [
    '/black&white.png', // Gambar Black/White
    '/red&black.png', // Gambar Red/Black
    'blue&white.png'  // Gambar Blue/White
  ],

  // Warna yang tersedia, dengan gambar spesifik
  colors: [
    { name: 'Black/White', hex: '#2C2C2C', imageUrl: '/black&white.png' },
    { name: 'Red/Black', hex: '#AF0404', imageUrl: '/red&black.png' },
    { name: 'Blue/White', hex: '#1657D9', imageUrl: '/blue&white.png' },
  ],
  sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
};

// Kosongkan relatedProducts karena fokus pada satu halaman detail
export const relatedProducts = [];