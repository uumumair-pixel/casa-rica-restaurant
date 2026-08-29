import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Phone, Clock, MapPin, Sparkles, Check, Copy, MessageCircle } from 'lucide-react';
import { Reservation } from '../types';
import { RESTAURANT_INFO } from '../data/initialData';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookReservation?: (reservation: Reservation) => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const phoneNumber = '03253632223';

  if (!isOpen) return null;

  const handleCopyNumber = () => {
    navigator.clipboard?.writeText(phoneNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div
        id="reservation-modal-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          id="reservation-modal-content"
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg bg-[#141414] border border-[#C5A059]/40 rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(197,160,89,0.15)] text-[#F9F9F7]"
        >
          {/* Subtle Ambient Gold Glow in Modal */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            id="reservation-close-btn"
            onClick={onClose}
            className="absolute top-5 right-5 z-10 p-2.5 rounded-full bg-[#1C1C1C] border border-[#262626] text-[#A8A69E] hover:text-[#F9F9F7] hover:border-[#C5A059]/50 transition-colors cursor-pointer"
            aria-label="Close reservation modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Content Body */}
          <div className="p-8 sm:p-10 text-center space-y-7 relative">
            {/* Top Emblem */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#1C1C1C] to-[#262626] border border-[#C5A059]/40 mx-auto flex items-center justify-center shadow-lg group"
            >
              <Phone className="w-7 h-7 text-[#C5A059] animate-pulse" />
            </motion.div>

            {/* Heading & Intro */}
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#1C1C1C] border border-[#C5A059]/30">
                <Sparkles className="w-3 h-3 text-[#C5A059]" />
                <span className="text-[10px] font-bold tracking-[0.25em] text-[#F3E5C8] uppercase">
                  CASA RICA CONCIERGE
                </span>
              </div>

              <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-[#F9F9F7] tracking-wider leading-tight">
                RESERVE A TABLE
              </h2>

              <p className="text-sm sm:text-base text-[#A8A69E] max-w-sm mx-auto font-light leading-relaxed">
                For table reservations and pricing details, please call us.
              </p>
            </div>

            {/* Main Callout Box */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="p-6 rounded-2xl bg-gradient-to-b from-[#1A1A1A] to-[#121212] border border-[#C5A059]/35 shadow-inner space-y-4"
            >
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-[#C5A059] block">
                CALL FOR RESERVATION & PRICING
              </span>

              {/* Clickable Call Button */}
              <a
                id="call-now-action-btn"
                href={`tel:${phoneNumber}`}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#F3E5C8] via-[#C5A059] to-[#9E7D38] text-black font-extrabold text-sm sm:text-base uppercase tracking-wider flex items-center justify-center space-x-2.5 shadow-[0_8px_20px_rgba(197,160,89,0.3)] hover:shadow-[0_12px_28px_rgba(197,160,89,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group"
              >
                <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>CALL NOW</span>
              </a>

              {/* Display Phone Number as Text */}
              <div className="pt-1 flex items-center justify-center space-x-2">
                <a
                  href={`tel:${phoneNumber}`}
                  className="font-cinzel text-2xl sm:text-3xl font-black tracking-widest text-[#F9F9F7] hover:text-[#C5A059] transition-colors"
                >
                  {phoneNumber}
                </a>
                <button
                  type="button"
                  onClick={handleCopyNumber}
                  className="p-1.5 rounded-lg bg-[#262626] hover:bg-[#333333] text-[#A8A69E] hover:text-[#F9F9F7] transition-colors cursor-pointer"
                  title="Copy Phone Number"
                  aria-label="Copy Phone Number"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {copied && (
                <span className="text-[11px] text-emerald-400 block font-medium">
                  Phone number copied to clipboard!
                </span>
              )}
            </motion.div>

            {/* Quick Restaurant Details */}
            <div className="pt-1 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left text-xs text-[#A8A69E]">
              <div className="flex items-start space-x-2.5 p-3 rounded-xl bg-[#181818] border border-[#262626]">
                <Clock className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#F9F9F7] font-semibold block">Dining Hours</span>
                  <span className="text-[11px] text-[#8F8A7E]">{RESTAURANT_INFO.hours}</span>
                </div>
              </div>

              <div className="flex items-start space-x-2.5 p-3 rounded-xl bg-[#181818] border border-[#262626]">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#F9F9F7] font-semibold block">Location</span>
                  <span className="text-[11px] text-[#8F8A7E]">Sector G DHA Phase II, Islamabad</span>
                </div>
              </div>
            </div>

            {/* Secondary WhatsApp Assistance */}
            <div className="pt-2">
              <a
                id="reservation-whatsapp-direct-link"
                href={`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${encodeURIComponent('Hello Casa Rica Concierge, I would like to inquire about table reservations and pricing.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-xs text-[#A8A69E] hover:text-[#25D366] transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Or message us directly on WhatsApp</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
