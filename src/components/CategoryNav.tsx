import React from 'react';
import { motion } from 'motion/react';
import { Search, X, Sparkles, Flame, Leaf, Filter } from 'lucide-react';
import { Category } from '../types';

interface CategoryNavProps {
  categories: Category[];
  activeCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedFilter: string;
  onSelectFilter: (filter: string) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  categories,
  activeCategoryId,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  selectedFilter,
  onSelectFilter,
}) => {
  const pillsContainerRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll the horizontal category pill container to center the active category
  React.useEffect(() => {
    const container = pillsContainerRef.current;
    if (!container) return;

    const activeButton = container.querySelector(
      `[data-category-id="${activeCategoryId}"]`
    ) as HTMLElement | null;

    if (activeButton) {
      const containerWidth = container.offsetWidth;
      const buttonLeft = activeButton.offsetLeft;
      const buttonWidth = activeButton.offsetWidth;
      const targetScrollLeft = buttonLeft - containerWidth / 2 + buttonWidth / 2;

      container.scrollTo({
        left: Math.max(0, targetScrollLeft),
        behavior: 'smooth',
      });
    }
  }, [activeCategoryId]);

  return (
    <div
      id="menu-category-nav-bar"
      className="sticky top-[60px] sm:top-[68px] z-30 bg-[#0F0F0F]/95 backdrop-blur-xl border-y border-[#C5A059]/20 py-3.5 shadow-xl transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3.5">
        {/* Top Line: Search Bar + Quick Dietary Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Search Field */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5A059]" />
            <input
              id="menu-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search steaks, pizzas, mocktails..."
              className="w-full pl-10 pr-9 py-2 rounded-full bg-[#141414] border border-[#262626] text-xs sm:text-sm text-[#F9F9F7] placeholder-[#6E6C65] focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-all"
            />
            {searchQuery && (
              <button
                id="menu-search-clear-btn"
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6E6C65] hover:text-[#C5A059] cursor-pointer"
                aria-label="Clear Search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Dietary Filters */}
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-1 md:pb-0">
            <button
              id="filter-all-btn"
              onClick={() => onSelectFilter('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase shrink-0 transition-all cursor-pointer flex items-center space-x-1.5 ${
                selectedFilter === 'all'
                  ? 'bg-[#C5A059] text-black shadow-md font-bold'
                  : 'bg-[#141414] text-[#A8A69E] hover:text-[#F9F9F7] border border-[#262626]'
              }`}
            >
              <Filter className="w-3 h-3" />
              <span>All Dishes</span>
            </button>

            <button
              id="filter-specials-btn"
              onClick={() => onSelectFilter('specials')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase shrink-0 transition-all cursor-pointer flex items-center space-x-1.5 ${
                selectedFilter === 'specials'
                  ? 'bg-[#C5A059] text-black shadow-md font-bold'
                  : 'bg-[#141414] text-[#A8A69E] hover:text-[#F9F9F7] border border-[#262626]'
              }`}
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Chef Specials</span>
            </button>

            <button
              id="filter-spicy-btn"
              onClick={() => onSelectFilter('spicy')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase shrink-0 transition-all cursor-pointer flex items-center space-x-1.5 ${
                selectedFilter === 'spicy'
                  ? 'bg-[#C5A059] text-black shadow-md font-bold'
                  : 'bg-[#141414] text-[#A8A69E] hover:text-[#F9F9F7] border border-[#262626]'
              }`}
            >
              <Flame className="w-3 h-3 text-rose-400" />
              <span>Spicy & Grilled</span>
            </button>

            <button
              id="filter-veg-btn"
              onClick={() => onSelectFilter('veg')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase shrink-0 transition-all cursor-pointer flex items-center space-x-1.5 ${
                selectedFilter === 'veg'
                  ? 'bg-[#C5A059] text-black shadow-md font-bold'
                  : 'bg-[#141414] text-[#A8A69E] hover:text-[#F9F9F7] border border-[#262626]'
              }`}
            >
              <Leaf className="w-3 h-3 text-emerald-400" />
              <span>Vegetarian</span>
            </button>
          </div>
        </div>

        {/* Bottom Line: Category Scroll Pills */}
        <div
          ref={pillsContainerRef}
          className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1 scroll-smooth"
        >
          {categories.map((category) => {
            const isActive = activeCategoryId === category.id;
            return (
              <button
                key={category.id}
                id={`category-tab-${category.slug}`}
                data-category-id={category.id}
                onClick={() => onSelectCategory(category.id)}
                className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap shrink-0 transition-all duration-300 cursor-pointer flex items-center space-x-2 ${
                  isActive
                    ? 'text-black font-bold'
                    : 'text-[#A8A69E] hover:text-[#F3E5C8] bg-[#141414] hover:bg-[#1C1C1C] border border-[#262626]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryHighlight"
                    className="absolute inset-0 bg-gradient-to-r from-[#F3E5C8] via-[#C5A059] to-[#9E7D38] rounded-xl shadow-lg"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
