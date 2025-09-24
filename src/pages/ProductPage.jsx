// src/pages/ProductPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { productData } from '../data/productData';
import { FaHeart, FaShareAlt, FaStar, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import NotificationPopup from '../components/NotificationPopup';

const ProductPage = () => {
  const [selectedColor, setSelectedColor] = useState(productData.colors[0]);
  const [selectedSize, setSelectedSize] = useState(productData.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [showNotification, setShowNotification] = useState(false);

  // Ambil URL gambar yang benar
  const mainImage = selectedColor.imageUrl;

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleAddToCart = () => {
    addToCart(productData, selectedColor, selectedSize, quantity);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black min-h-screen text-gray-200 p-4 lg:p-12 font-sans antialiased">
      <NotificationPopup
        isVisible={showNotification}
        message={`${quantity} item(s) ditambahkan ke keranjang!`}
      />
      <div className="container mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center py-4 mb-8">
            <div className="text-3xl font-extrabold text-red-500">
                <img src="/logo.png" alt="Nike Logo" className="h-12 w-auto" />
            </div>
            <nav className="hidden md:flex gap-6 text-lg font-bold">
                <a href="#" className="hover:text-red-500 transition-colors">CLOTHING</a>
                <a href="#" className="hover:text-red-500 transition-colors">ACCESSORIES</a>
                <a href="#" className="hover:text-red-500 transition-colors">FOOTWEAR</a>
            </nav>
            <div className="flex gap-4 items-center">
                <FaHeart className="text-xl cursor-pointer hover:text-red-500" />
                <Link to="/cart">
                    <FaShoppingCart className="text-xl cursor-pointer hover:text-red-500" />
                </Link>
                <button className="text-xl font-bold text-red-500 hover:text-red-400">Search</button>
            </div>
        </header>

        {/* Breadcrumbs dan Share */}
        <div className="flex justify-between items-center mb-8 text-gray-400 text-sm">
            <span>Home / {productData.category} / <span className="font-semibold text-white">{productData.name}</span></span>
            <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 hover:text-red-500 transition-colors"><FaHeart /> Add to Wishlist</button>
                <button className="flex items-center gap-2 hover:text-red-500 transition-colors"><FaShareAlt /> Share</button>
            </div>
        </div>

        {/* Konten Utama Produk */}
        <div className="grid lg:grid-cols-2 gap-12 bg-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-700">
          {/* Bagian Galeri Gambar */}
          <div className="flex flex-col-reverse lg:flex-row gap-4">
            <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible p-2">
              {productData.colors.map((color, index) => (
                <img
                  key={index}
                  src={color.imageUrl}
                  alt={`${productData.name} - ${color.name}`}
                  // Ukuran thumbnail yang lebih konsisten
                  className={`w-28 h-28 object-contain rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 border-2 ${
                    selectedColor.name === color.name ? 'border-red-500 shadow-md' : 'border-gray-700 hover:border-red-400'
                  }`}
                  onClick={() => handleColorSelect(color)}
                />
              ))}
            </div>
            <div className="flex-1 relative bg-gray-800 rounded-xl p-4">
              <AnimatePresence mode="wait">
                <motion.img
                  key={mainImage}
                  src={mainImage}
                  alt={productData.name}
                  // Ukuran gambar utama dan animasi yang lebih keren
                  className="w-full h-full object-contain"
                  initial={{ opacity: 0, x: -50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 50, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Bagian Detail Produk */}
          <div className="flex flex-col">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 leading-tight">{productData.name}</h1>
            <div className="flex items-center gap-2 mb-4 text-yellow-400">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar className="text-gray-600" />
                <span className="text-gray-400 ml-2 text-sm">({productData.reviews} reviews)</span>
            </div>
            
            {productData.oldPrice && (
                <p className="text-gray-500 line-through text-lg mb-1">${productData.oldPrice.toFixed(2)}</p>
            )}
            <p className="text-4xl font-extrabold text-red-500 mb-6">${productData.price.toFixed(2)}</p>
            <p className="text-gray-300 leading-relaxed mb-6">{productData.description}</p>

            {/* Pemilihan Warna */}
            <div className="mb-6">
              <p className="font-bold text-gray-300 mb-2">Color: <span className="font-normal text-gray-400">{selectedColor.name}</span></p>
              <div className="flex gap-3">
                {productData.colors.map((color, index) => (
                  <div
                    key={index}
                    className={`w-9 h-9 rounded-full border-2 border-transparent cursor-pointer transition-all duration-300 transform hover:scale-110 ${selectedColor.name === color.name ? 'ring-2 ring-red-500 ring-offset-2 ring-offset-gray-900' : 'hover:border-gray-500'}`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => handleColorSelect(color)}
                  ></div>
                ))}
              </div>
            </div>

            {/* Pemilihan Ukuran */}
            <div className="mb-6">
              <p className="font-bold text-gray-300 mb-2">Select Size</p>
              <div className="flex gap-2">
                {productData.sizes.map((size, index) => (
                  <button
                    key={index}
                    className={`w-14 h-14 flex items-center justify-center border rounded-lg text-lg font-bold transition-all duration-300 transform hover:scale-105 ${
                      selectedSize === size
                        ? 'bg-red-600 text-white border-red-600 shadow-md'
                        : 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Kuantitas */}
            <div className="mb-8">
              <p className="font-bold text-gray-300 mb-2">Quantity</p>
              <div className="flex items-center border border-gray-700 rounded-lg overflow-hidden w-36 bg-gray-800">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-12 flex items-center justify-center text-xl font-medium text-gray-400 hover:bg-gray-700 transition-colors"
                >
                  -
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-full h-12 text-center text-xl font-medium text-white bg-transparent focus:outline-none"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-12 flex items-center justify-center text-xl font-medium text-gray-400 hover:bg-gray-700 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Tombol Tambah ke Keranjang */}
            <button
                onClick={handleAddToCart}
                className="w-full bg-red-600 text-white font-extrabold py-4 rounded-lg text-lg shadow-lg hover:bg-red-700 transition-colors text-center block"
            >
              <FaShoppingCart className="inline-block mr-2" /> ADD TO BASKET
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;