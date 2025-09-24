// src/pages/CartPage.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { FaShoppingCart, FaTrashAlt, FaPlus, FaMinus, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  
  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) newQuantity = 1;
    updateQuantity(item.id, item.color, item.size, newQuantity);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 15.00;
  const total = subtotal + shipping;

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black min-h-screen text-gray-200 p-4 lg:p-12 font-sans antialiased">
      <div className="container mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center py-4 mb-8 border-b border-gray-800">
            {/* Ganti teks saleor dengan logo Nike */}
            <div className="text-3xl font-extrabold text-red-500">
                <img src="/logo.png" alt="Nike Logo" className="h-12 w-auto" />
            </div>
            <div className="flex gap-4 items-center">
                {/* Tombol Kembali */}
                <Link to="/">
                    <FaArrowLeft className="text-xl cursor-pointer hover:text-red-500 transition-colors" />
                </Link>
                <Link to="/cart">
                    <FaShoppingCart className="text-xl cursor-pointer text-red-500" />
                </Link>
            </div>
        </header>

        {/* Judul Halaman */}
        <h1 className="text-4xl font-extrabold text-white mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Bagian Daftar Produk di Keranjang */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-700">
              <AnimatePresence>
                {cartItems.length === 0 ? (
                    <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-gray-400 text-lg py-12"
                    >
                        Keranjang Anda kosong.
                    </motion.div>
                ) : (
                    cartItems.map((item) => (
                        <motion.div
                            key={`${item.id}-${item.color}-${item.size}`}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ duration: 0.5 }}
                            className="flex items-center gap-6 p-4 border-b border-gray-800 last:border-b-0"
                        >
                            <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="w-24 h-24 object-cover rounded-xl border border-gray-700"
                            />
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-white">{item.name}</h3>
                                <p className="text-sm text-gray-400">Color: {item.color} | Size: {item.size}</p>
                                <p className="text-lg font-bold text-red-500 mt-2">${item.price.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-gray-700 rounded-lg overflow-hidden bg-gray-800">
                                    <button
                                        onClick={() => handleQuantityChange(item, item.quantity - 1)}
                                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-gray-700 transition-colors"
                                    >
                                        <FaMinus size={12} />
                                    </button>
                                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange(item, item.quantity + 1)}
                                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-gray-700 transition-colors"
                                    >
                                        <FaPlus size={12} />
                                    </button>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id, item.color, item.size)}
                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    <FaTrashAlt />
                                </button>
                            </div>
                        </motion.div>
                    ))
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Bagian Ringkasan Pesanan */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-700 sticky top-12">
              <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Order Summary</h2>
              <div className="flex justify-between items-center text-lg mb-2">
                <span className="text-gray-400">Subtotal</span>
                <span className="font-bold text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-lg mb-6">
                <span className="text-gray-400">Shipping</span>
                <span className="font-bold text-white">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-2xl font-extrabold border-t border-gray-700 pt-6 mt-6">
                <span className="text-white">Total</span>
                <span className="text-red-500">${total.toFixed(2)}</span>
              </div>
              <button className="mt-8 w-full bg-red-600 text-white font-bold py-4 rounded-lg text-lg shadow-lg hover:bg-red-700 transition-colors">
                CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;