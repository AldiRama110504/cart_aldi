// src/components/NotificationPopup.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

const NotificationPopup = ({ isVisible, message }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="fixed top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-xl shadow-lg border border-gray-700 z-50 flex items-center gap-3"
        >
          <FaCheckCircle className="text-green-500 text-2xl" />
          <span className="text-lg font-bold">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationPopup;