import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageCircle, Truck } from 'lucide-react';
import { CartItem } from '../types';
import { RESTAURANT_INFO } from '../data/initialData';
import { RotatableFoodImage } from './RotatableFoodImage';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (menuItemId: string, newQty: number) => void;
  onRemoveItem: (menuItemId: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
  onWhatsAppQuickOrder: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  onWhatsAppQuickOrder,
}) => {
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.menuItem.price * item.quantity,
    0
  );
  const deliveryFee = cartItems.length > 0 ? RESTAURANT_INFO.deliveryFee : 0;
  const grandTotal = subtotal + deliveryFee;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        id="cart-drawer-backdrop"
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end"
        onClick={onClose}
      >
        <motion.div
          id="cart-drawer-panel"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md bg-[#121212] border-l border-[#C5A059]/25 h-full flex flex-col justify-between shadow-2xl text-[#F9F9F7]"
        >
          {/* Drawer Header */}
          <div className="p-5 border-b border-[#262626] flex items-center justify-between bg-[#141414]">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-[#C5A059]/15 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
              </div>
              <div>
                <h2 className="font-cinzel text-lg font-bold text-[#F9F9F7]">YOUR ORDER CART</h2>
                <p className="text-[11px] text-[#A8A69E]">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} selected
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {cartItems.length > 0 && (
                <button
                  id="cart-clear-all-btn"
                  onClick={onClearCart}
                  className="p-2 text-xs text-[#8F8A7E] hover:text-rose-400 transition-colors"
                  title="Clear entire cart"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                id="cart-close-drawer-btn"
                onClick={onClose}
                className="p-2 rounded-full bg-[#1C1C1C] hover:bg-[#262626] text-[#C5A059] transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Drawer Content / List of Items */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-full bg-[#181818] border border-[#262626] flex items-center justify-center">
                  <ShoppingBag className="w-9 h-9 text-[#6E6C65]" />
                </div>
                <div>
                  <h3 className="font-cinzel text-lg font-bold text-[#D8D3C7]">Your Cart is Empty</h3>
                  <p className="text-xs text-[#A8A69E] mt-1 max-w-xs leading-relaxed font-light">
                    Explore our artisanal charcoal steaks, gourmet burgers, and wood-fired pizzas to build your feast.
                  </p>
                </div>
                <button
                  id="cart-empty-browse-btn"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-[#C5A059] text-black font-extrabold text-xs tracking-wider uppercase cursor-pointer"
                >
                  EXPLORE MENU
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <motion.div
                  key={item.cartItemId}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="p-3.5 rounded-2xl bg-[#181818] border border-[#262626] flex items-center space-x-3 group"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/10">
                    <RotatableFoodImage
                      src={item.menuItem.image}
                      alt={item.menuItem.name}
                      variant="standard"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-[#F9F9F7] truncate">
                      {item.menuItem.name}
                    </h4>
                    <div className="text-xs font-bold text-[#F3E5C8] font-cinzel mt-0.5">
                      Rs. {(item.menuItem.price * item.quantity).toLocaleString()}
                    </div>
                    {item.instructions && (
                      <p className="text-[10px] text-[#A8A69E] italic line-clamp-1 mt-0.5">
                        Note: {item.instructions}
                      </p>
                    )}
                  </div>

                  {/* Quantity and Delete */}
                  <div className="flex items-center space-x-1.5 shrink-0">
                    <div className="flex items-center space-x-1 bg-[#121212] p-1 rounded-xl border border-[#262626]">
                      <button
                        id={`cart-item-dec-${item.menuItem.id}`}
                        onClick={() => onUpdateQuantity(item.menuItem.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-lg bg-[#262626] hover:bg-[#333333] text-[#F9F9F7] flex items-center justify-center transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-5 text-center text-xs font-bold text-[#F3E5C8]">
                        {item.quantity}
                      </span>
                      <button
                        id={`cart-item-inc-${item.menuItem.id}`}
                        onClick={() => onUpdateQuantity(item.menuItem.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-lg bg-[#C5A059] hover:bg-[#D4AF37] text-black flex items-center justify-center transition-colors cursor-pointer font-bold"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      id={`cart-item-remove-${item.menuItem.id}`}
                      onClick={() => onRemoveItem(item.menuItem.id)}
                      className="p-1.5 text-[#8F8A7E] hover:text-rose-400 transition-colors"
                      title="Remove item"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Actions */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-[#262626] bg-[#141414] space-y-4">
              {/* Delivery info banner */}
              <div className="flex items-center justify-between text-xs px-3 py-2 rounded-xl bg-[#1C1C1C] border border-[#C5A059]/20 text-[#D8D3C7]">
                <div className="flex items-center space-x-2">
                  <Truck className="w-4 h-4 text-[#C5A059]" />
                  <span>Express Delivery (Lahore)</span>
                </div>
                <span className="font-bold text-[#F3E5C8]">Rs. {RESTAURANT_INFO.deliveryFee}</span>
              </div>

              {/* Price Calculation Breakdown */}
              <div className="space-y-1.5 text-xs text-[#A8A69E]">
                <div className="flex justify-between">
                  <span>Food Subtotal</span>
                  <span className="text-[#F9F9F7] font-semibold">
                    Rs. {subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charge (Flat)</span>
                  <span className="text-[#F9F9F7] font-semibold">
                    Rs. {deliveryFee.toLocaleString()}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#262626] flex justify-between items-baseline">
                  <span className="text-sm font-bold text-[#F9F9F7] font-cinzel">Grand Total</span>
                  <span className="text-xl font-black text-[#F3E5C8] font-cinzel">
                    Rs. {grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Primary Action Buttons */}
              <div className="space-y-2.5 pt-1">
                {/* Cash on Delivery Online Checkout */}
                <button
                  id="cart-checkout-proceed-btn"
                  onClick={onProceedToCheckout}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#F3E5C8] via-[#C5A059] to-[#9E7D38] text-black font-extrabold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center space-x-2 hover:shadow-[0_0_25px_rgba(197,160,89,0.4)] transition-all cursor-pointer"
                >
                  <span>CHECKOUT (CASH ON DELIVERY)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Direct WhatsApp Ordering Option */}
                <button
                  id="cart-whatsapp-order-btn"
                  onClick={onWhatsAppQuickOrder}
                  className="w-full py-3 rounded-2xl bg-[#075e54]/90 hover:bg-[#128c7e] text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center space-x-2 border border-emerald-500/30 transition-all cursor-pointer shadow-md"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-300" />
                  <span>ORDER DIRECT VIA WHATSAPP</span>
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
