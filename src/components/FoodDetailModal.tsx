import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Clock, Sparkles, Flame, Leaf, ShoppingBag, Check } from 'lucide-react';
import { MenuItem } from '../types';
import { RotatableFoodImage } from './RotatableFoodImage';

interface FoodDetailModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number, instructions?: string) => void;
}

export const FoodDetailModal: React.FC<FoodDetailModalProps> = ({
  item,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = React.useState(1);
  const [instructions, setInstructions] = React.useState('');
  const [isAdded, setIsAdded] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setInstructions('');
      setIsAdded(false);
    }
  }, [isOpen, item]);

  if (!isOpen || !item) return null;

  const totalPrice = item.price * quantity;

  const handleAdd = () => {
    if (!item.isAvailable) return;
    onAddToCart(item, quantity, instructions.trim() || undefined);
    setIsAdded(true);
    setTimeout(() => {
      onClose();
    }, 600);
  };

  return (
    <AnimatePresence>
      <div
        id="food-detail-modal-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          id="food-detail-modal-content"
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl bg-[#141414] border border-[#C5A059]/30 rounded-3xl overflow-hidden shadow-2xl my-8 text-[#F9F9F7]"
        >
          {/* Close Button */}
          <button
            id="food-detail-close-btn"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/70 hover:bg-[#C5A059] text-white hover:text-black border border-white/20 transition-all cursor-pointer shadow-lg"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Large Hero Image Section */}
          <div className="relative w-full h-72 sm:h-80 overflow-hidden bg-black">
            <RotatableFoodImage
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/40 pointer-events-none" />

            {/* Badges */}
            <div className="absolute bottom-4 left-6 flex flex-wrap gap-2 z-10">
              {item.isChefSpecial && (
                <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-gradient-to-r from-[#F3E5C8] to-[#C5A059] text-black shadow-lg">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Chef's Choice</span>
                </span>
              )}
              {item.isSpicy && (
                <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-600/90 text-white shadow-md">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Spicy & Smoky</span>
                </span>
              )}
              {item.isVegetarian && (
                <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-600/90 text-white shadow-md">
                  <Leaf className="w-3.5 h-3.5" />
                  <span>Pure Vegetarian</span>
                </span>
              )}
            </div>
          </div>

          {/* Details Body */}
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <div className="text-xs uppercase font-bold tracking-[0.2em] text-[#C5A059] mb-1.5">
                {item.categoryName}
              </div>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#F9F9F7] leading-snug">
                {item.name}
              </h2>
              <div className="text-2xl font-black text-[#F3E5C8] font-cinzel mt-2">
                Rs. {item.price.toLocaleString()}
              </div>
            </div>

            <p className="text-sm sm:text-base text-[#A8A69E] leading-relaxed font-light">
              {item.description}
            </p>

            {/* Preparation / Portion Information */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {item.prepTime && (
                <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#1C1C1C] border border-[#262626] text-xs text-[#D8D3C7]">
                  <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Prep time: {item.prepTime}</span>
                </div>
              )}
              {item.portionSize && (
                <div className="px-3 py-1.5 rounded-xl bg-[#1C1C1C] border border-[#262626] text-xs text-[#D8D3C7]">
                  Portion: {item.portionSize}
                </div>
              )}
              {item.tags?.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-[#1C1C1C] text-[11px] text-[#A8A69E] border border-[#262626]"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Special Instructions Note Input */}
            <div className="space-y-2 pt-2">
              <label
                htmlFor="food-detail-instructions"
                className="block text-xs font-bold uppercase tracking-wider text-[#A8A69E]"
              >
                Special Requests or Dietary Notes (Optional)
              </label>
              <textarea
                id="food-detail-instructions"
                rows={2}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="e.g. Medium rare steak, extra spicy, no onions, cutlery needed..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#1C1C1C] border border-[#262626] text-sm text-[#F9F9F7] placeholder-[#6E6C65] focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]"
              />
            </div>

            {/* Quantity Selector and Add Button Action Footer */}
            <div className="pt-4 border-t border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Quantity Controls */}
              <div className="flex items-center space-x-3 w-full sm:w-auto justify-center">
                <span className="text-xs font-bold uppercase text-[#A8A69E]">Quantity:</span>
                <div className="flex items-center space-x-2 p-1.5 rounded-2xl bg-[#1C1C1C] border border-[#C5A059]/40">
                  <button
                    id="modal-dec-qty-btn"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-xl bg-[#262626] hover:bg-[#333333] text-[#F9F9F7] flex items-center justify-center cursor-pointer transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center text-sm font-extrabold text-[#F3E5C8]">
                    {quantity}
                  </span>
                  <button
                    id="modal-inc-qty-btn"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-xl bg-[#C5A059] hover:bg-[#D4AF37] text-black flex items-center justify-center cursor-pointer transition-colors font-bold"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Submit Add to Cart Button */}
              <button
                id="modal-add-to-cart-submit"
                onClick={handleAdd}
                disabled={!item.isAvailable}
                className={`w-full sm:w-auto px-8 py-3.5 rounded-full font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center space-x-3 transition-all duration-300 shadow-xl cursor-pointer ${
                  !item.isAvailable
                    ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                    : isAdded
                    ? 'bg-emerald-500 text-black scale-105'
                    : 'bg-gradient-to-r from-[#F3E5C8] via-[#C5A059] to-[#9E7D38] text-black hover:shadow-[0_0_25px_rgba(197,160,89,0.4)]'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>ADDED TO ORDER</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>ADD TO CART • Rs. {totalPrice.toLocaleString()}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
