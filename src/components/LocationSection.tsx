import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  Copy,
  Check,
  Truck,
  ShieldCheck,
  Calendar,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/initialData';

interface LocationSectionProps {
  onOpenReservation: () => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ onOpenReservation }) => {
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const exactAddress = RESTAURANT_INFO.address;
  const phoneNumber = RESTAURANT_INFO.phone;

  const handleCopyAddress = () => {
    navigator.clipboard?.writeText(exactAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard?.writeText(phoneNumber);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  // Google Maps directions search URL
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    exactAddress
  )}`;

  // Google Maps embed URL for DHA Phase 2 Islamabad / Sector G Central Park
  const embedMapsUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    'Casa Rica Restaurant Central park DHA Roundabout Sector G DHA Phase II Islamabad Pakistan'
  )}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="location-section" className="py-20 bg-[#0B0B0B] relative overflow-hidden border-t border-[#C5A059]/20">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#181818] border border-[#C5A059]/30 mb-4">
            <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="text-xs font-semibold tracking-[0.2em] text-[#F3E5C8] uppercase">
              VISIT CASA RICA & DELIVERY
            </span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F9F9F7] leading-tight">
            LOCATION, HOURS & <br />
            <span className="gold-text-gradient">EXPRESS DELIVERY</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#A8A69E] mt-3 max-w-2xl mx-auto font-light leading-relaxed">
            Located at the prestigious Central Park, DHA Roundabout in DHA Phase II, Islamabad. Join us for an unforgettable fine dining experience or order directly to your doorstep.
          </p>
        </div>

        {/* Main Grid: Location Info Card + Interactive Google Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Address, Phone, Hours, Delivery & CTAs (7 cols on lg) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            {/* Primary Address Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#141414] border border-[#C5A059]/30 shadow-xl space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start space-x-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-[#1C1C1C] border border-[#C5A059]/40 flex items-center justify-center shrink-0 shadow-md">
                    <MapPin className="w-5 h-5 text-[#C5A059]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold tracking-[0.2em] text-[#C5A059] uppercase block mb-1">
                      EXACT RESTAURANT ADDRESS
                    </span>
                    <p className="text-sm sm:text-base font-semibold text-[#F9F9F7] leading-relaxed">
                      {exactAddress}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="p-2.5 rounded-xl bg-[#1C1C1C] border border-[#262626] text-[#A8A69E] hover:text-[#F9F9F7] hover:border-[#C5A059]/50 transition-colors shrink-0 cursor-pointer"
                  title="Copy full address"
                  aria-label="Copy full address"
                >
                  {copiedAddress ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {copiedAddress && (
                <div className="text-xs text-emerald-400 font-medium pl-1">
                  ✓ Address copied to clipboard!
                </div>
              )}

              {/* Action Buttons for Location: Get Directions + Google Maps */}
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#F3E5C8] via-[#C5A059] to-[#9E7D38] text-black font-extrabold text-xs uppercase tracking-wider hover:shadow-[0_0_20px_rgba(197,160,89,0.4)] transition-all cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions in Google Maps</span>
                  <ExternalLink className="w-3 h-3 ml-1 opacity-75" />
                </a>
              </div>
            </div>

            {/* Contact & Hours Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone Card */}
              <div className="p-5 rounded-2xl bg-[#141414] border border-[#262626] space-y-3">
                <div className="flex items-center space-x-2.5">
                  <Phone className="w-4 h-4 text-[#C5A059]" />
                  <span className="text-xs font-bold text-[#F3E5C8] uppercase tracking-wider">
                    Direct Phone Line
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <a
                    href={`tel:${phoneNumber}`}
                    className="font-cinzel text-lg sm:text-xl font-black text-[#F9F9F7] hover:text-[#C5A059] transition-colors"
                  >
                    {phoneNumber}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    className="p-1.5 rounded-lg bg-[#1C1C1C] hover:bg-[#262626] text-[#A8A69E] hover:text-[#F9F9F7] transition-colors cursor-pointer"
                    title="Copy Phone Number"
                    aria-label="Copy Phone Number"
                  >
                    {copiedPhone ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <a
                  href={`tel:${phoneNumber}`}
                  className="block text-center py-2 rounded-xl bg-[#1C1C1C] hover:bg-[#262626] border border-[#C5A059]/40 text-xs font-bold uppercase tracking-wider text-[#F9F9F7] transition-colors"
                >
                  Call Now
                </a>
              </div>

              {/* Dining Hours Card */}
              <div className="p-5 rounded-2xl bg-[#141414] border border-[#262626] space-y-3">
                <div className="flex items-center space-x-2.5">
                  <Clock className="w-4 h-4 text-[#C5A059]" />
                  <span className="text-xs font-bold text-[#F3E5C8] uppercase tracking-wider">
                    Operating Hours
                  </span>
                </div>
                <div className="text-sm font-semibold text-[#F9F9F7]">
                  {RESTAURANT_INFO.hours}
                </div>
                <div className="text-[11px] text-[#A8A69E] pt-1">
                  Dine-in • Takeaway • Late Night Delivery
                </div>
              </div>
            </div>

            {/* Delivery Assurance Strip */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#181818] to-[#121212] border border-[#C5A059]/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-[#C5A059]/15 flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4 text-[#C5A059]" />
                </div>
                <div>
                  <span className="font-bold text-[#F9F9F7] block">
                    Rs. 300 Flat Express Delivery
                  </span>
                  <span className="text-[11px] text-[#A8A69E]">
                    Cash on Delivery (COD) accepted across Islamabad & surrounding areas
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  type="button"
                  onClick={onOpenReservation}
                  className="px-3.5 py-2 rounded-xl bg-[#1C1C1C] hover:bg-[#262626] border border-[#C5A059]/50 text-xs font-bold uppercase tracking-wider text-[#F3E5C8] transition-colors flex items-center space-x-1.5 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Reserve Table</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Google Maps Interactive Embed (6 cols on lg) */}
          <div className="lg:col-span-6 flex flex-col min-h-[380px] lg:min-h-[440px]">
            <div className="relative w-full h-full rounded-3xl overflow-hidden border border-[#C5A059]/35 bg-[#141414] shadow-2xl flex flex-col">
              {/* Map Title Header */}
              <div className="p-3.5 px-5 bg-[#181818] border-b border-[#262626] flex items-center justify-between z-10">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold tracking-wider text-[#F9F9F7]">
                    GOOGLE MAPS • LIVE RESTAURANT LOCATION
                  </span>
                </div>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-semibold text-[#C5A059] hover:underline flex items-center space-x-1"
                >
                  <span>Open Full Map</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Live Google Maps Iframe */}
              <div className="relative flex-1 w-full min-h-[320px]">
                <iframe
                  title="Casa Rica Restaurant Islamabad Google Map Location"
                  src={embedMapsUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full"
                />

                {/* Subtle map overlay badge */}
                <div className="absolute bottom-4 left-4 z-10 p-3 rounded-2xl bg-[#0F0F0F]/90 backdrop-blur-md border border-[#C5A059]/40 shadow-xl max-w-xs pointer-events-none">
                  <div className="text-xs font-bold text-[#F3E5C8] font-cinzel">CASA RICA RESTAURANT</div>
                  <div className="text-[10px] text-[#A8A69E] mt-0.5 leading-tight">
                    Central Park, DHA Roundabout, Sector G DHA Phase II, Islamabad
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
