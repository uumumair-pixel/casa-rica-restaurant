import React from 'react';
import { motion } from 'motion/react';
import { Plus, Minus, Check, Clock, Sparkles, Flame, Leaf, Eye, ShoppingBag } from 'lucide-react';
import { MenuItem } from '../types';
import { RotatableFoodImage } from './RotatableFoodImage';

interface FoodCardProps {
  item: MenuItem;
  cartQuantity: number;
  onAddToCart: (item: MenuItem) => void;
  onUpdateQuantity: (menuItemId: string, newQty: number) => void;
  onOpenDetail: (item: MenuItem) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({
  item,
  cartQuantity,
  onAddToCart,
  onUpdateQuantity,
  onOpenDetail,
}) => {
  const [isJustAdded, setIsJustAdded] = React.useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!item.isAvailable) return;
    onAddToCart(item);
    setIsJustAdded(true);
    setTimeout(() => setIsJustAdded(false), 900);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdateQuantity(item.id, cartQuantity + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdateQuantity(item.id, cartQuantity - 1);
  };

  return (
    <motion.div
      id={`food-card-${item.id}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
      onClick={() => onOpenDetail(item)}
      className={`group relative rounded-2xl overflow-hidden bg-[#141414] border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
        !item.isAvailable
          ? 'opacity-65 border-white/5 grayscale-[40%]'
          : 'border-[#262626] hover:border-[#C5A059]/50 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.9),0_0_25px_rgba(197,160,89,0.12)]'
      }`}
    >
      {/* Top Image Section */}
      <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-black/50">
        <RotatableFoodImage
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
        />
        
        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/40 pointer-events-none" />

        {/* Status Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {item.isChefSpecial && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-gradient-to-r from-[#F3E5C8] to-[#C5A059] text-black shadow-lg">
              <Sparkles className="w-3 h-3" />
              <span>Chef's Choice</span>
            </span>
          )}

          {item.isSpicy && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-600/90 text-white backdrop-blur-sm shadow-md">
              <Flame className="w-3 h-3" />
              <span>Spicy</span>
            </span>
          )}

          {item.isVegetarian && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-600/90 text-white backdrop-blur-sm shadow-md">
              <Leaf className="w-3 h-3" />
              <span>Veg</span>
            </span>
          )}
        </div>

        {/* Out of Stock Overlay */}
        {!item.isAvailable && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center z-20">
            <span className="px-4 py-1.5 rounded-full bg-red-950/90 border border-red-500/50 text-red-300 font-bold text-xs tracking-widest uppercase shadow-xl">
              Currently Unavailable
            </span>
          </div>
        )}

        {/* Quick View Hover Trigger */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button
            id={`food-card-quickview-${item.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetail(item);
            }}
            className="p-2 rounded-full bg-black/80 hover:bg-[#C5A059] text-[#F9F9F7] hover:text-black border border-white/20 transition-all shadow-lg"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Preparation Time / Portion Pill */}
        {(item.prepTime || item.portionSize) && (
          <div className="absolute bottom-2.5 left-3 z-10 flex items-center space-x-2">
            {item.prepTime && (
              <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-[#0F0F0F]/85 backdrop-blur-sm border border-[#262626] text-[10px] text-[#D8D3C7]">
                <Clock className="w-2.5 h-2.5 text-[#C5A059]" />
                <span>{item.prepTime}</span>
              </span>
            )}
            {item.portionSize && (
              <span className="px-2 py-0.5 rounded-md bg-[#0F0F0F]/85 backdrop-blur-sm border border-[#262626] text-[10px] text-[#A8A69E]">
                {item.portionSize}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Card Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category Subhead */}
          <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#C5A059]/90 mb-1">
            {item.categoryName}
          </div>

          {/* Dish Name */}
          <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#F9F9F7] group-hover:text-[#F3E5C8] transition-colors leading-snug mb-2 line-clamp-1">
            {item.name}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-[#A8A69E] line-clamp-2 leading-relaxed mb-4 font-light">
            {item.description}
          </p>
        </div>

        {/* Bottom Price & Add Action Row */}
        <div className="pt-3 border-t border-[#262626] flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-[#6E6C65] block font-medium uppercase tracking-wider">PRICE</span>
            <span className="text-lg sm:text-xl font-extrabold text-[#F3E5C8] tracking-tight font-cinzel">
              Rs. {item.price.toLocaleString()}
            </span>
          </div>

          {/* Add / Quantity Control */}
          <div onClick={(e) => e.stopPropagation()}>
            {!item.isAvailable ? (
              <button
                disabled
                className="px-3.5 py-2 rounded-xl bg-[#1C1C1C] text-[#6E6C65] text-xs font-semibold uppercase tracking-wider cursor-not-allowed border border-[#262626]"
              >
                Sold Out
              </button>
            ) : cartQuantity > 0 ? (
              <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-[#1C1C1C] border border-[#C5A059]/50 shadow-inner">
                <button
                  id={`food-card-dec-${item.id}`}
                  onClick={handleDecrement}
                  className="w-7 h-7 rounded-lg bg-[#262626] hover:bg-[#333333] text-[#F9F9F7] flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Decrease Quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center text-xs font-extrabold text-[#F3E5C8]">
                  {cartQuantity}
                </span>
                <button
                  id={`food-card-inc-${item.id}`}
                  onClick={handleIncrement}
                  className="w-7 h-7 rounded-lg bg-[#C5A059] hover:bg-[#D4AF37] text-black flex items-center justify-center transition-colors cursor-pointer font-bold"
                  aria-label="Increase Quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                id={`food-card-add-${item.id}`}
                onClick={handleAdd}
                className={`relative px-4 py-2 rounded-xl text-xs font-extrabold tracking-wider uppercase transition-all duration-300 flex items-center space-x-1.5 cursor-pointer shadow-md ${
                  isJustAdded
                    ? 'bg-emerald-500 text-black scale-105'
                    : 'bg-gradient-to-r from-[#F3E5C8] via-[#C5A059] to-[#9E7D38] hover:from-[#FFF0D4] hover:to-[#C5A059] text-black hover:shadow-[0_0_15px_rgba(197,160,89,0.4)]'
                }`}
              >
                {isJustAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>ADDED</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>ADD</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
