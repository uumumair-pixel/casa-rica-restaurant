import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  INITIAL_CATEGORIES,
  INITIAL_MENU_ITEMS,
  RESTAURANT_INFO,
} from './data/initialData';
import { MenuItem, Category, CartItem, Order, Reservation, OrderStatus, ReservationStatus, ToastMessage } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryNav } from './components/CategoryNav';
import { FoodCard } from './components/FoodCard';
import { FoodDetailModal } from './components/FoodDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ReservationModal } from './components/ReservationModal';
import { AdminModal } from './components/AdminModal';
import { ExperienceStory } from './components/ExperienceStory';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';
import { HangingBurgerCursor } from './components/HangingBurgerCursor';
import { RotatableFoodImage } from './components/RotatableFoodImage';
import { ShoppingBag, ArrowRight, Sparkles, ChefHat, Flame, MessageCircle, Calendar } from 'lucide-react';

export default function App() {
  // 1. Persistent Menu Items State
  const [menuItems, setMenuItems] = React.useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('casarica_menu_items');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_MENU_ITEMS;
  });

  React.useEffect(() => {
    localStorage.setItem('casarica_menu_items', JSON.stringify(menuItems));
  }, [menuItems]);

  // 2. Categories
  const [categories] = React.useState<Category[]>(INITIAL_CATEGORIES);
  const [activeCategoryId, setActiveCategoryId] = React.useState<string>(INITIAL_CATEGORIES[0].id);

  // 3. Persistent Cart State
  const [cart, setCart] = React.useState<CartItem[]>(() => {
    const saved = localStorage.getItem('casarica_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  React.useEffect(() => {
    localStorage.setItem('casarica_cart', JSON.stringify(cart));
  }, [cart]);

  // 4. Persistent Real Orders State (Starts clean, real orders only)
  const [orders, setOrders] = React.useState<Order[]>(() => {
    const saved = localStorage.getItem('casarica_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  React.useEffect(() => {
    localStorage.setItem('casarica_orders', JSON.stringify(orders));
  }, [orders]);

  // 5. Persistent Real Reservations State
  const [reservations, setReservations] = React.useState<Reservation[]>(() => {
    const saved = localStorage.getItem('casarica_reservations');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  React.useEffect(() => {
    localStorage.setItem('casarica_reservations', JSON.stringify(reservations));
  }, [reservations]);

  // 6. UI Modals & Navigation State
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedFilter, setSelectedFilter] = React.useState('all');
  const [detailModalItem, setDetailModalItem] = React.useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false);
  const [isReservationOpen, setIsReservationOpen] = React.useState(false);
  const [isAdminOpen, setIsAdminOpen] = React.useState(false);
  const [toasts, setToasts] = React.useState<ToastMessage[]>([]);

  // Toast Helper
  const addToast = (title: string, description?: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `toast_${Date.now()}_${Math.random()}`;
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart Operations
  const handleAddToCart = (item: MenuItem, quantity: number = 1, instructions?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((ci) => ci.menuItem.id === item.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
          instructions: instructions || updated[existingIndex].instructions,
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            cartItemId: `ci_${Date.now()}_${Math.random()}`,
            menuItem: item,
            quantity,
            instructions,
          },
        ];
      }
    });

    addToast(
      `Added to Order: ${item.name}`,
      `Rs. ${(item.price * quantity).toLocaleString()} • ${quantity} ${quantity === 1 ? 'portion' : 'portions'}`,
      'success'
    );
  };

  const handleUpdateQuantity = (menuItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(menuItemId);
      return;
    }
    setCart((prev) =>
      prev.map((ci) =>
        ci.menuItem.id === menuItemId ? { ...ci, quantity: newQty } : ci
      )
    );
  };

  const handleRemoveFromCart = (menuItemId: string) => {
    const item = cart.find((ci) => ci.menuItem.id === menuItemId);
    setCart((prev) => prev.filter((ci) => ci.menuItem.id !== menuItemId));
    if (item) {
      addToast(`Removed from cart: ${item.menuItem.name}`, undefined, 'info');
    }
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Order placement handler
  const handlePlaceOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
    addToast(
      `Order Confirmed: ${order.orderNumber}`,
      `Total Rs. ${order.total.toLocaleString()} (Cash on Delivery). Preparing your feast!`,
      'success'
    );
  };

  // Reservation booking handler
  const handleBookReservation = (reservation: Reservation) => {
    setReservations((prev) => [reservation, ...prev]);
    addToast(
      `Table Reserved: ${reservation.reservationNumber}`,
      `Reserved for ${reservation.guests} guests on ${reservation.date} at ${reservation.time}`,
      'success'
    );
  };

  // Admin menu modifiers
  const handleAddMenuItem = (item: MenuItem) => {
    setMenuItems((prev) => [item, ...prev]);
    addToast(`New Menu Item Added: ${item.name}`, undefined, 'success');
  };

  const handleUpdateMenuItem = (updatedItem: MenuItem) => {
    setMenuItems((prev) =>
      prev.map((it) => (it.id === updatedItem.id ? updatedItem : it))
    );
    addToast(`Menu Item Updated: ${updatedItem.name}`, undefined, 'success');
  };

  const handleDeleteMenuItem = (itemId: string) => {
    const item = menuItems.find((i) => i.id === itemId);
    setMenuItems((prev) => prev.filter((it) => it.id !== itemId));
    setCart((prev) => prev.filter((ci) => ci.menuItem.id !== itemId));
    addToast(`Deleted: ${item?.name || 'Menu item'}`, undefined, 'info');
  };

  const handleToggleAvailability = (itemId: string) => {
    setMenuItems((prev) =>
      prev.map((it) => {
        if (it.id === itemId) {
          const nextState = !it.isAvailable;
          addToast(
            `${it.name} is now ${nextState ? 'Available in Stock' : 'Marked as Sold Out'}`,
            undefined,
            nextState ? 'success' : 'info'
          );
          return { ...it, isAvailable: nextState };
        }
        return it;
      })
    );
  };

  const handleResetMenuToDefault = () => {
    setMenuItems(INITIAL_MENU_ITEMS);
    localStorage.removeItem('casarica_menu_items');
    addToast('Menu catalog restored to Casa Rica defaults', undefined, 'info');
  };

  // Direct WhatsApp Quick Order
  const handleWhatsAppQuickOrder = () => {
    if (cart.length === 0) return;
    const subtotal = cart.reduce((acc, ci) => acc + ci.menuItem.price * ci.quantity, 0);
    const deliveryFee = RESTAURANT_INFO.deliveryFee;
    const grandTotal = subtotal + deliveryFee;

    const itemsSummary = cart
      .map(
        (ci) =>
          `• ${ci.quantity}x ${ci.menuItem.name} (Rs. ${ci.menuItem.price * ci.quantity})${
            ci.instructions ? ` [Note: ${ci.instructions}]` : ''
          }`
      )
      .join('\n');

    const message =
      `*DIRECT FOOD ORDER — CASA RICA*\n\n` +
      `Hello Casa Rica team, I would like to place an order for delivery:\n\n` +
      `*Selected Items:*\n${itemsSummary}\n\n` +
      `*Food Subtotal:* Rs. ${subtotal.toLocaleString()}\n` +
      `*Express Delivery:* Rs. ${deliveryFee.toLocaleString()}\n` +
      `*Grand Total (COD):* Rs. ${grandTotal.toLocaleString()}\n\n` +
      `Please reply to confirm delivery address and ETA. Thank you!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${encoded}`, '_blank');
  };

  // Ref to track programmatic scroll to avoid scroll-spy conflicts during click navigation
  const isProgrammaticScrollRef = React.useRef(false);
  const scrollTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Filtering Menu Items
  const filteredItems = React.useMemo(() => {
    return menuItems.filter((item) => {
      // Search filter
      const matchesSearch =
        searchQuery === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.categoryName.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      // Dietary filter
      if (selectedFilter === 'specials') return !!item.isChefSpecial;
      if (selectedFilter === 'spicy') return !!item.isSpicy;
      if (selectedFilter === 'veg') return !!item.isVegetarian;

      return true;
    });
  }, [menuItems, searchQuery, selectedFilter]);

  // Scroll-spy effect: highlights category pill in real time as the user scrolls through dishes
  React.useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (isProgrammaticScrollRef.current) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Dynamic calculation of trigger line based on sticky header elements
          const navbarEl = document.querySelector('header');
          const categoryNavEl = document.getElementById('menu-category-nav-bar');
          const navHeight = navbarEl ? navbarEl.offsetHeight : 68;
          const catNavHeight = categoryNavEl ? categoryNavEl.offsetHeight : 110;
          const triggerOffset = navHeight + catNavHeight + 40;

          // Find all available category sections in the DOM (respecting active filters)
          const visibleCategories = categories.filter((category) => {
            const hasItems = filteredItems.some((item) => item.categoryId === category.id);
            return hasItems || searchQuery === '';
          });

          if (visibleCategories.length === 0) {
            ticking = false;
            return;
          }

          // Check if user is scrolled to the bottom of the page
          const isAtBottom =
            window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight - 60;

          if (isAtBottom) {
            const lastCategory = visibleCategories[visibleCategories.length - 1];
            if (lastCategory && lastCategory.id !== activeCategoryId) {
              setActiveCategoryId(lastCategory.id);
            }
            ticking = false;
            return;
          }

          let matchedCategoryId = visibleCategories[0].id;

          for (let i = 0; i < visibleCategories.length; i++) {
            const cat = visibleCategories[i];
            const el = document.getElementById(`menu-category-section-${cat.id}`);
            if (el) {
              const rect = el.getBoundingClientRect();
              // If the section top is above or near the trigger offset line
              if (rect.top <= triggerOffset) {
                matchedCategoryId = cat.id;
              }
            }
          }

          if (matchedCategoryId && matchedCategoryId !== activeCategoryId) {
            setActiveCategoryId(matchedCategoryId);
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [categories, filteredItems, searchQuery, activeCategoryId]);

  // Scroll Navigators
  const scrollToMenuSection = (catId?: string) => {
    const targetId = catId ? `menu-category-section-${catId}` : 'menu-experience-section';
    const element = document.getElementById(targetId);
    if (element) {
      if (catId) {
        setActiveCategoryId(catId);
      }

      // Lock scroll-spy during smooth scroll
      isProgrammaticScrollRef.current = true;
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      const navbarEl = document.querySelector('header');
      const categoryNavEl = document.getElementById('menu-category-nav-bar');
      const navHeight = navbarEl ? navbarEl.offsetHeight : 68;
      const catNavHeight = categoryNavEl ? categoryNavEl.offsetHeight : 110;
      const totalOffset = navHeight + catNavHeight + 16;

      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - totalOffset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });

      // Unlock after smooth scroll completes
      scrollTimeoutRef.current = setTimeout(() => {
        isProgrammaticScrollRef.current = false;
      }, 800);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarEl = document.querySelector('header');
      const navHeight = navbarEl ? navbarEl.offsetHeight : 68;
      const navOffset = navHeight + 16;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });
    }
  };

  const totalCartCount = cart.reduce((acc, ci) => acc + ci.quantity, 0);
  const totalCartValue = cart.reduce((acc, ci) => acc + ci.menuItem.price * ci.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-[#F9F9F7] flex flex-col selection:bg-[#C5A059] selection:text-black">
      {/* 1. Fixed Luxury Top Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onScrollToMenu={() => scrollToSection('menu-experience-section')}
        onScrollToExperience={() => scrollToSection('experience-section')}
        onScrollToContact={() => scrollToSection('location-section')}
      />

      {/* 2. Cinematic Hero Section */}
      <Hero
        onExploreMenu={() => scrollToSection('menu-experience-section')}
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      {/* 3. Immersive Menu Category Navigator & Sticky Bar */}
      <main id="menu-experience-section" className="flex-1 pb-24 relative">
        <CategoryNav
          categories={categories}
          activeCategoryId={activeCategoryId}
          onSelectCategory={(catId) => {
            setActiveCategoryId(catId);
            scrollToMenuSection(catId);
          }}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedFilter={selectedFilter}
          onSelectFilter={setSelectedFilter}
        />

        {/* Menu Items Showcase Grouped by Category */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-20">
          {/* Active Category Sections */}
          {categories.map((category) => {
            const categoryItems = filteredItems.filter(
              (item) => item.categoryId === category.id
            );

            // If filtering and no items in this category, skip
            if (categoryItems.length === 0 && searchQuery !== '') return null;

            return (
              <section
                key={category.id}
                id={`menu-category-section-${category.id}`}
                className="scroll-mt-48"
              >
                {/* Large Cinematic Category Showcase Header */}
                <div className="relative rounded-3xl overflow-hidden mb-8 border border-[#C5A059]/20 bg-[#141414]">
                  <div className="relative h-44 sm:h-56 overflow-hidden">
                    <RotatableFoodImage
                      src={category.image}
                      alt={category.name}
                      loading="lazy"
                      variant="standard"
                      className="w-full h-full object-cover object-center scale-105 brightness-45"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/60 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/40 to-transparent" />

                    <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
                      <div className="flex items-center space-x-2 text-xs font-extrabold uppercase tracking-[0.25em] text-[#C5A059] mb-1">
                        <Flame className="w-3.5 h-3.5" />
                        <span>Casa Rica Collection</span>
                      </div>
                      <h2 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-[#F9F9F7] leading-tight">
                        {category.name}
                      </h2>
                      <p className="text-xs sm:text-sm text-[#A8A69E] max-w-2xl mt-1 line-clamp-2 font-light">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Food Cards Grid */}
                {categoryItems.length === 0 ? (
                  <div className="p-8 text-center rounded-2xl bg-[#141414] border border-[#262626] text-xs text-[#A8A69E]">
                    No dishes found matching current filters in this category.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {categoryItems.map((item) => {
                      const inCart = cart.find((ci) => ci.menuItem.id === item.id);
                      return (
                        <FoodCard
                          key={item.id}
                          item={item}
                          cartQuantity={inCart ? inCart.quantity : 0}
                          onAddToCart={(it) => handleAddToCart(it, 1)}
                          onUpdateQuantity={handleUpdateQuantity}
                          onOpenDetail={(it) => setDetailModalItem(it)}
                        />
                      );
                    })}
                  </div>
                )}
              </section>
            );
          })}

          {/* Empty search results fallback */}
          {filteredItems.length === 0 && (
            <div className="py-20 text-center space-y-4 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-[#181818] border border-[#C5A059]/30 mx-auto flex items-center justify-center">
                <ChefHat className="w-8 h-8 text-[#C5A059]" />
              </div>
              <h3 className="font-cinzel text-xl font-bold text-[#F9F9F7]">No Dishes Found</h3>
              <p className="text-xs text-[#A8A69E]">
                We couldn't find any dishes matching "{searchQuery}". Try searching for ribeye, pepperoni, burger, or mocktails.
              </p>
              <button
                id="reset-search-btn"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedFilter('all');
                }}
                className="px-6 py-2.5 rounded-full bg-[#C5A059] text-black font-extrabold text-xs uppercase tracking-wider cursor-pointer hover:bg-[#D4AF37] transition-colors"
              >
                View Full Menu
              </button>
            </div>
          )}
        </div>
      </main>

      {/* 4. The Story / Culinary Experience Section */}
      <ExperienceStory />

      {/* 5. Live Location, Google Maps & Express Delivery Section */}
      <LocationSection onOpenReservation={() => setIsReservationOpen(true)} />

      {/* 6. Footer */}
      <Footer
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onScrollToMenu={() => scrollToSection('menu-experience-section')}
      />

      {/* 6. Modals & Drawers */}
      <FoodDetailModal
        item={detailModalItem}
        isOpen={!!detailModalItem}
        onClose={() => setDetailModalItem(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onWhatsAppQuickOrder={handleWhatsAppQuickOrder}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        onPlaceOrder={handlePlaceOrder}
        onClearCart={handleClearCart}
      />

      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        onBookReservation={handleBookReservation}
      />

      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        menuItems={menuItems}
        categories={categories}
        orders={orders}
        reservations={reservations}
        onAddMenuItem={handleAddMenuItem}
        onUpdateMenuItem={handleUpdateMenuItem}
        onDeleteMenuItem={handleDeleteMenuItem}
        onToggleAvailability={handleToggleAvailability}
        onUpdateOrderStatus={(id, status) => {
          setOrders((prev) =>
            prev.map((o) => (o.id === id ? { ...o, status } : o))
          );
        }}
        onUpdateReservationStatus={(id, status) => {
          setReservations((prev) =>
            prev.map((r) => (r.id === id ? { ...r, status } : r))
          );
        }}
        onResetMenuToDefault={handleResetMenuToDefault}
      />

      {/* 7. Floating Quick Cart Floating Strip (When Cart has items) */}
      <AnimatePresence>
        {totalCartCount > 0 && !isCartOpen && !isCheckoutOpen && (
          <motion.div
            id="floating-cart-bar"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-lg"
          >
            <div
              onClick={() => setIsCartOpen(true)}
              className="p-3.5 sm:p-4 rounded-2xl bg-[#141414]/95 backdrop-blur-xl border border-[#C5A059]/60 shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_25px_rgba(197,160,89,0.25)] flex items-center justify-between cursor-pointer hover:border-[#C5A059] transition-all group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#C5A059] to-[#F3E5C8] text-black font-extrabold flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-[#F9F9F7]">
                      {totalCartCount} {totalCartCount === 1 ? 'Dish' : 'Dishes'} in Cart
                    </span>
                    <span className="text-[10px] text-[#A8A69E]">
                      (COD + Rs. 300 Delivery)
                    </span>
                  </div>
                  <div className="text-sm font-extrabold text-[#F3E5C8] font-cinzel">
                    Rs. {(totalCartValue + RESTAURANT_INFO.deliveryFee).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#C5A059] text-black text-xs font-extrabold uppercase tracking-wider hover:bg-[#D4AF37] transition-colors shadow-md">
                <span>VIEW ORDER</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 8. Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* 9. Interactive Hanging Burger Cursor (Desktop only) */}
      <HangingBurgerCursor />
    </div>
  );
}
