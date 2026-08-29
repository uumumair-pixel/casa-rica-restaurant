import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Calendar, ShieldCheck, Heart } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/initialData';

interface FooterProps {
  onOpenReservation: () => void;
  onOpenAdmin: () => void;
  onScrollToMenu: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenReservation,
  onOpenAdmin,
  onScrollToMenu,
}) => {
  return (
    <footer id="contact-section" className="bg-[#0B0B0B] border-t border-[#C5A059]/20 pt-16 pb-12 text-[#F9F9F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full border border-[#C5A059] bg-[#141414] flex items-center justify-center">
                <span className="font-cinzel text-lg font-bold text-[#C5A059]">CR</span>
              </div>
              <div>
                <span className="font-cinzel text-xl font-black tracking-widest text-[#F9F9F7] block leading-none">
                  CASA RICA
                </span>
                <span className="text-[10px] tracking-[0.25em] text-[#C5A059]/80 uppercase block mt-0.5 font-semibold">
                  RESTAURANT & GRILL
                </span>
              </div>
            </div>

            <p className="text-xs text-[#A8A69E] leading-relaxed font-light">
              Fine dining, charcoal flame steaks, wood-fired artisanal pizzas, and continental gourmet cuisine crafted with culinary passion.
            </p>

            <div className="pt-2 flex items-center space-x-3">
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-[#075e54] hover:bg-[#128c7e] text-white text-xs font-bold transition-all shadow-md"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-300" />
                <span>WhatsApp Order / Inquiry</span>
              </a>
            </div>
          </div>

          {/* Col 2: Contact & Location */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-sm font-bold text-[#C5A059] uppercase tracking-wider">
              Location & Contact
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A8A69E]">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address}</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-[#F3E5C8] transition-colors">
                  {RESTAURANT_INFO.phone}
                </a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-[#C5A059] shrink-0" />
                <a href={`mailto:${RESTAURANT_INFO.email}`} className="hover:text-[#F3E5C8] transition-colors">
                  {RESTAURANT_INFO.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Dining Hours & Delivery */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-sm font-bold text-[#C5A059] uppercase tracking-wider">
              Dining Hours & Delivery
            </h4>
            <div className="space-y-2 text-xs text-[#A8A69E]">
              <div className="flex items-start space-x-2.5">
                <Clock className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#F9F9F7] font-semibold block">Dine-in & Takeaway</span>
                  <span>{RESTAURANT_INFO.hours}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#141414] border border-[#262626] space-y-1">
                <span className="text-xs font-bold text-[#F3E5C8] block">Express Delivery Service</span>
                <p className="text-[11px] text-[#A8A69E]">
                  Flat Rs. 300 delivery fee throughout Islamabad & surrounding areas. Cash on delivery accepted.
                </p>
              </div>
            </div>
          </div>

          {/* Col 4: Quick Actions */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-sm font-bold text-[#C5A059] uppercase tracking-wider">
              Quick Reservations
            </h4>
            <p className="text-xs text-[#A8A69E]">
              Planning an evening or celebration? Guarantee your table with our instant reservation concierge.
            </p>

            <button
              id="footer-reserve-btn"
              onClick={onOpenReservation}
              className="w-full py-2.5 rounded-xl bg-[#1C1C1C] hover:bg-[#262626] border border-[#C5A059]/50 text-xs font-bold uppercase tracking-wider text-[#F3E5C8] transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-md"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Reserve a Table</span>
            </button>

            <button
              id="footer-explore-btn"
              onClick={onScrollToMenu}
              className="w-full py-2 rounded-xl text-xs text-[#A8A69E] hover:text-[#C5A059] transition-colors cursor-pointer"
            >
              Browse Full Restaurant Menu →
            </button>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-[#262626] flex flex-col sm:flex-row items-center justify-between text-xs text-[#6E6C65] gap-4">
          <div>
            © {new Date().getFullYear()} CASA RICA RESTAURANT. All rights reserved.
          </div>

          <div className="flex items-center space-x-6">
            <button
              id="footer-admin-portal-link"
              onClick={onOpenAdmin}
              className="flex items-center space-x-1 text-[#A8A69E] hover:text-[#C5A059] transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Staff Admin Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
