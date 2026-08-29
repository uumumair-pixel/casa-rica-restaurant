import React from 'react';
import { motion } from 'motion/react';
import { Flame, Sparkles, Award, Utensils, Wine, Clock } from 'lucide-react';

export const ExperienceStory: React.FC = () => {
  return (
    <section id="experience-section" className="py-24 bg-[#0F0F0F] relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-[#9E7D38]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#181818] border border-[#C5A059]/30 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="text-xs font-semibold tracking-[0.2em] text-[#F3E5C8] uppercase">
              THE CASA RICA PHILOSOPHY
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F9F9F7] leading-tight"
          >
            WHERE CULINARY ARTISTRY <br />
            <span className="gold-text-gradient">MEETS OPEN FIRE</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-[#A8A69E] mt-4 leading-relaxed font-light"
          >
            Born from a passion for honest ingredients and uncompromising gastronomic standards. At Casa Rica, every cut of beef is hand-selected, every sourdough is rested for 72 hours, and every sauce is simmered to perfection.
          </motion.p>
        </div>

        {/* 3-Column Pillar Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-3xl bg-[#141414] border border-[#C5A059]/15 hover:border-[#C5A059]/40 transition-all duration-300 group shadow-lg"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#1C1C1C] border border-[#C5A059]/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Flame className="w-7 h-7 text-[#C5A059]" />
            </div>
            <h3 className="font-cinzel text-xl font-bold text-[#F9F9F7] mb-3">
              Open Charcoal Hearth
            </h3>
            <p className="text-xs sm:text-sm text-[#A8A69E] leading-relaxed font-light">
              We sear our premium Australian tenderloins and prime ribeyes over natural hardwood charcoal at over 500°C, locking in succulent juices and infusing an unmistakable smoky aroma.
            </p>
          </motion.div>

          {/* Pillar 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="p-8 rounded-3xl bg-[#141414] border border-[#C5A059]/15 hover:border-[#C5A059]/40 transition-all duration-300 group shadow-lg"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#1C1C1C] border border-[#C5A059]/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Utensils className="w-7 h-7 text-[#C5A059]" />
            </div>
            <h3 className="font-cinzel text-xl font-bold text-[#F9F9F7] mb-3">
              Daily Handcrafted Pasta
            </h3>
            <p className="text-xs sm:text-sm text-[#A8A69E] leading-relaxed font-light">
              Using Italian Semolina di Grano Duro and farm-fresh organic yolks, our pasta chefs roll and extrude fresh tagliatelle, fettuccine, and ravioli daily for that authentic al dente bite.
            </p>
          </motion.div>

          {/* Pillar 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-8 rounded-3xl bg-[#141414] border border-[#C5A059]/15 hover:border-[#C5A059]/40 transition-all duration-300 group shadow-lg"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#1C1C1C] border border-[#C5A059]/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Wine className="w-7 h-7 text-[#C5A059]" />
            </div>
            <h3 className="font-cinzel text-xl font-bold text-[#F9F9F7] mb-3">
              Botanical Mixology
            </h3>
            <p className="text-xs sm:text-sm text-[#A8A69E] leading-relaxed font-light">
              Our signature zero-proof bar features smoked herbs, artisanal shrubs, freshly squeezed citrus oils, and sparkling infusions presented with theatrics and aromatic dry ice.
            </p>
          </motion.div>
        </div>

        {/* Atmosphere Highlight Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-16 rounded-3xl overflow-hidden relative border border-[#C5A059]/25 bg-[#141414] shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 sm:p-12 flex flex-col justify-center space-y-5">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A059]">
                PRIVATE DINING & CELEBRATIONS
              </span>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#F9F9F7]">
                Intimate Ambiance & Bespoke Hospitality
              </h3>
              <p className="text-xs sm:text-sm text-[#A8A69E] leading-relaxed font-light">
                Whether celebrating an anniversary, hosting a discreet business dinner, or sharing an evening with friends, our chandelier dining room and open-air rooftop terrace provide an unmatched ambiance.
              </p>
              <div className="flex items-center space-x-6 pt-2 text-xs text-[#E0DED9]">
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-[#C5A059]" />
                  <span>Michelin Standard Service</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-[#C5A059]" />
                  <span>Late Night Kitchen</span>
                </div>
              </div>
            </div>

            <div className="relative h-64 lg:h-auto min-h-[280px]">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
                alt="Casa Rica Luxury Restaurant Interior"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-transparent to-transparent hidden lg:block" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
