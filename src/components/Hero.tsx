import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowDown, Calendar, ShoppingBag, Flame, Clock, Truck, ShieldCheck } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/initialData';

interface HeroProps {
  onExploreMenu: () => void;
  onOpenReservation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onOpenReservation }) => {
  return (
    <section
      id="hero-section"
      className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Background Image with Cinematic Dark Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2000&q=85"
          alt="Casa Rica Flame Grill Atmosphere"
          decoding="async"
          className="w-full h-full object-cover object-center brightness-30 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/80 to-[#0F0F0F]/45" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-950/20 via-black/50 to-black/90" />
      </div>

      {/* Decorative Golden Accent Lines */}
      <div className="absolute top-1/4 left-8 w-24 h-[1px] bg-gradient-to-r from-transparent to-[#C5A059]/40 hidden lg:block" />
      <div className="absolute top-1/4 right-8 w-24 h-[1px] bg-gradient-to-l from-transparent to-[#C5A059]/40 hidden lg:block" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtitle Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#141414]/90 border border-[#C5A059]/40 backdrop-blur-md mb-6 shadow-xl"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#F3E5C8] uppercase">
            Artisanal Culinary Excellence • DHA Phase II, Islamabad
          </span>
        </motion.div>

        {/* Hero Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
          className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#F9F9F7] leading-[1.1] mb-6 drop-shadow-2xl"
        >
          AN UNFORGETTABLE <br className="hidden sm:inline" />
          <span className="gold-text-gradient font-black">FINE DINING</span> JOURNEY
        </motion.h1>

        {/* Paragraph Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="text-base sm:text-lg md:text-xl text-[#A8A69E] font-light max-w-3xl mx-auto leading-relaxed mb-10"
        >
          Welcome to <strong className="text-[#F9F9F7] font-semibold">Casa Rica</strong>. Savor prime dry-aged steaks seared over glowing charcoal embers, 72-hour fermented wood-fired pizzas, handmade pastas, and curated botanical mocktails.
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-14"
        >
          {/* Explore Menu & Order */}
          <button
            id="hero-explore-menu-btn"
            onClick={onExploreMenu}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#F3E5C8] via-[#C5A059] to-[#9E7D38] text-black font-extrabold text-xs sm:text-sm tracking-[0.2em] uppercase hover:shadow-[0_0_35px_rgba(197,160,89,0.45)] hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 cursor-pointer group"
          >
            <ShoppingBag className="w-4 h-4 text-black group-hover:rotate-12 transition-transform" />
            <span>EXPLORE MENU & ORDER</span>
          </button>

          {/* Table Reservation */}
          <button
            id="hero-reserve-btn"
            onClick={onOpenReservation}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#141414]/90 hover:bg-[#1F1F1F] border border-[#C5A059]/60 hover:border-[#C5A059] text-[#F9F9F7] hover:text-[#F3E5C8] font-bold text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center space-x-3 cursor-pointer shadow-lg"
          >
            <Calendar className="w-4 h-4 text-[#C5A059]" />
            <span>RESERVE A TABLE</span>
          </button>
        </motion.div>

        {/* Trust & Feature Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-6 border-t border-[#C5A059]/15"
        >
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-[#141414]/90 border border-[#262626] backdrop-blur-sm text-left">
            <div className="w-8 h-8 rounded-lg bg-[#C5A059]/10 flex items-center justify-center shrink-0">
              <Truck className="w-4 h-4 text-[#C5A059]" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#F9F9F7]">Rs. 300 Delivery</div>
              <div className="text-[10px] text-[#A8A69E]">Fast & Hot Express</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 rounded-xl bg-[#141414]/90 border border-[#262626] backdrop-blur-sm text-left">
            <div className="w-8 h-8 rounded-lg bg-[#C5A059]/10 flex items-center justify-center shrink-0">
              <Flame className="w-4 h-4 text-[#C5A059]" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#F9F9F7]">Charcoal Flame</div>
              <div className="text-[10px] text-[#A8A69E]">Open Kitchen Seared</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 rounded-xl bg-[#141414]/90 border border-[#262626] backdrop-blur-sm text-left">
            <div className="w-8 h-8 rounded-lg bg-[#C5A059]/10 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#F9F9F7]">Cash on Delivery</div>
              <div className="text-[10px] text-[#A8A69E]">Pay At Your Doorstep</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 rounded-xl bg-[#141414]/90 border border-[#262626] backdrop-blur-sm text-left">
            <div className="w-8 h-8 rounded-lg bg-[#C5A059]/10 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-[#C5A059]" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#F9F9F7]">12:30 PM – 1:00 AM</div>
              <div className="text-[10px] text-[#A8A69E]">Open Everyday</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Down Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
        <button
          id="hero-scroll-indicator-btn"
          onClick={onExploreMenu}
          className="text-[#C5A059]/70 hover:text-[#C5A059] transition-colors flex flex-col items-center group cursor-pointer"
          aria-label="Scroll to Menu"
        >
          <span className="text-[10px] tracking-[0.25em] font-semibold uppercase mb-1 opacity-75 group-hover:opacity-100">
            EXPLORE MENU
          </span>
          <ArrowDown className="w-4 h-4 animate-bounce text-[#C5A059]" />
        </button>
      </div>
    </section>
  );
};
