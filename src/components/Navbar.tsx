import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, UtensilsCrossed, Calendar, Phone, ShieldCheck, Menu, X } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/initialData';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
  onOpenAdmin: () => void;
  onScrollToMenu: () => void;
  onScrollToExperience: () => void;
  onScrollToContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenReservation,
  onOpenAdmin,
  onScrollToMenu,
  onScrollToExperience,
  onScrollToContact,
}) => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0F0F0F]/95 backdrop-blur-md border-b border-[#C5A059]/20 py-3.5 shadow-2xl shadow-black/80'
          : 'bg-gradient-to-b from-[#0F0F0F]/95 via-[#0F0F0F]/70 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Identity */}
          <a
            href="#"
            className="flex items-center space-x-3.5 group"
            id="brand-logo-btn"
          >
            <div className="w-10 h-10 rounded-full border border-[#C5A059] bg-[#141414] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
              <span className="font-cinzel text-lg font-bold text-[#C5A059]">CR</span>
            </div>
            <div>
              <span className="font-cinzel text-xl sm:text-2xl font-black tracking-[0.15em] text-[#F9F9F7] block leading-none group-hover:text-[#C5A059] transition-colors">
                CASA RICA
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#C5A059]/90 uppercase font-medium block mt-1">
                Fine Dining & Continental
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-xs font-semibold tracking-[0.18em]">
            <button
              id="nav-menu-link"
              onClick={onScrollToMenu}
              className="text-[#D8D3C7] hover:text-[#C5A059] transition-colors cursor-pointer py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#C5A059] hover:after:w-full after:transition-all"
            >
              MENU
            </button>
            <button
              id="nav-experience-link"
              onClick={onScrollToExperience}
              className="text-[#D8D3C7] hover:text-[#C5A059] transition-colors cursor-pointer py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#C5A059] hover:after:w-full after:transition-all"
            >
              OUR STORY
            </button>
            <button
              id="nav-reservation-link"
              onClick={onOpenReservation}
              className="text-[#D8D3C7] hover:text-[#C5A059] transition-colors cursor-pointer py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#C5A059] hover:after:w-full after:transition-all"
            >
              RESERVATIONS
            </button>
            <button
              id="nav-contact-link"
              onClick={onScrollToContact}
              className="text-[#D8D3C7] hover:text-[#C5A059] transition-colors cursor-pointer py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#C5A059] hover:after:w-full after:transition-all"
            >
              LOCATION & HOURS
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Table Reservation Button */}
            <button
              id="nav-book-table-btn"
              onClick={onOpenReservation}
              className="hidden lg:flex items-center space-x-2 px-4 py-2 rounded-full border border-[#C5A059]/60 text-xs font-semibold tracking-wider text-[#F3E5C8] hover:bg-[#C5A059] hover:text-black transition-all duration-300 shadow-md cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C5A059] group-hover:text-black" />
              <span>BOOK A TABLE</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              id="nav-cart-btn"
              onClick={onOpenCart}
              className="relative flex items-center space-x-2.5 px-3.5 sm:px-4 py-2 rounded-full bg-[#141414] border border-[#C5A059]/40 hover:border-[#C5A059] text-[#F9F9F7] hover:text-[#C5A059] transition-all duration-300 shadow-lg cursor-pointer group"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#C5A059] group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold tracking-wide hidden sm:inline">CART</span>
              <AnimatePresence mode="wait">
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    className="flex items-center justify-center min-w-[20px] h-5 px-1 text-[11px] font-extrabold text-black bg-gradient-to-r from-[#F3E5C8] to-[#C5A059] rounded-full shadow-md"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Admin Management Portal Lock Icon */}
            <button
              id="nav-admin-btn"
              onClick={onOpenAdmin}
              title="Admin Portal (Staff Only)"
              className="p-2 rounded-full bg-[#141414] text-[#A8A69E] hover:text-[#C5A059] hover:bg-[#1C1C1C] border border-[#262626] hover:border-[#C5A059]/40 transition-colors cursor-pointer"
              aria-label="Admin Login"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              id="nav-mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#F9F9F7] hover:text-[#C5A059] bg-[#141414] border border-[#262626] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#0F0F0F] border-b border-[#C5A059]/20 px-6 py-5 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col space-y-4">
              <button
                id="mobile-nav-menu-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onScrollToMenu();
                }}
                className="flex items-center space-x-3 text-left text-xs font-semibold tracking-widest text-[#D8D3C7] hover:text-[#C5A059] py-2 border-b border-white/5 uppercase"
              >
                <UtensilsCrossed className="w-4 h-4 text-[#C5A059]" />
                <span>EXPLORE MENU</span>
              </button>

              <button
                id="mobile-nav-reserve-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="flex items-center space-x-3 text-left text-xs font-semibold tracking-widest text-[#D8D3C7] hover:text-[#C5A059] py-2 border-b border-white/5 uppercase"
              >
                <Calendar className="w-4 h-4 text-[#C5A059]" />
                <span>RESERVE TABLE</span>
              </button>

              <button
                id="mobile-nav-story-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onScrollToExperience();
                }}
                className="flex items-center space-x-3 text-left text-xs font-semibold tracking-widest text-[#D8D3C7] hover:text-[#C5A059] py-2 border-b border-white/5 uppercase"
              >
                <span>OUR STORY & PHILOSOPHY</span>
              </button>

              <button
                id="mobile-nav-contact-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onScrollToContact();
                }}
                className="flex items-center space-x-3 text-left text-xs font-semibold tracking-widest text-[#D8D3C7] hover:text-[#C5A059] py-2 border-b border-white/5 uppercase"
              >
                <Phone className="w-4 h-4 text-[#C5A059]" />
                <span>CONTACT & LOCATION</span>
              </button>

              <div className="pt-2 flex items-center justify-between text-xs text-[#8F8A7E]">
                <span>Delivery: Rs. {RESTAURANT_INFO.deliveryFee} Flat</span>
                <span>{RESTAURANT_INFO.hours}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
