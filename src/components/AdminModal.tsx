import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Lock,
  Plus,
  Edit2,
  Trash2,
  Check,
  ToggleLeft,
  ToggleRight,
  ShoppingBag,
  Calendar,
  Utensils,
  DollarSign,
  Phone,
  MessageCircle,
  Clock,
  Sparkles,
  Search,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { MenuItem, Category, Order, Reservation, OrderStatus, ReservationStatus } from '../types';
import { RotatableFoodImage } from './RotatableFoodImage';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  categories: Category[];
  orders: Order[];
  reservations: Reservation[];
  onAddMenuItem: (item: MenuItem) => void;
  onUpdateMenuItem: (item: MenuItem) => void;
  onDeleteMenuItem: (itemId: string) => void;
  onToggleAvailability: (itemId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
  onUpdateReservationStatus: (resId: string, status: ReservationStatus) => void;
  onResetMenuToDefault: () => void;
}

const PRESET_FOOD_IMAGES = [
  { name: 'Prime Ribeye Steak', url: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80' },
  { name: 'Tenderloin Medallion', url: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80' },
  { name: 'Lamb Cutlets', url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80' },
  { name: 'Dynamite Shrimp', url: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=800&q=80' },
  { name: 'Burrata Pizza', url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80' },
  { name: 'Hot Pepperoni Pizza', url: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80' },
  { name: 'Crown Angus Burger', url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80' },
  { name: 'Truffle Fettuccine', url: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281290?auto=format&fit=crop&w=800&q=80' },
  { name: 'Smoked Berry Mocktail', url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80' },
  { name: 'Molten Lava Cake', url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80' },
];

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  menuItems,
  categories,
  orders,
  reservations,
  onAddMenuItem,
  onUpdateMenuItem,
  onDeleteMenuItem,
  onToggleAvailability,
  onUpdateOrderStatus,
  onUpdateReservationStatus,
  onResetMenuToDefault,
}) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [passwordInput, setPasswordInput] = React.useState('');
  const [authError, setAuthError] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<'orders' | 'reservations' | 'menu' | 'stats'>('orders');

  // Menu item add / edit state
  const [editingItem, setEditingItem] = React.useState<MenuItem | null>(null);
  const [isCreatingNew, setIsCreatingNew] = React.useState(false);
  const [formName, setFormName] = React.useState('');
  const [formCategory, setFormCategory] = React.useState(categories[0]?.id || 'steaks-grills');
  const [formPrice, setFormPrice] = React.useState('');
  const [formDescription, setFormDescription] = React.useState('');
  const [formImage, setFormImage] = React.useState('');
  const [formIsAvailable, setFormIsAvailable] = React.useState(true);
  const [formIsChefSpecial, setFormIsChefSpecial] = React.useState(false);
  const [formIsSpicy, setFormIsSpicy] = React.useState(false);
  const [formIsVegetarian, setFormIsVegetarian] = React.useState(false);
  const [formPrepTime, setFormPrepTime] = React.useState('20 mins');
  const [formPortionSize, setFormPortionSize] = React.useState('');

  const [menuSearch, setMenuSearch] = React.useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === '123321') {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleOpenEdit = (item: MenuItem) => {
    setEditingItem(item);
    setIsCreatingNew(false);
    setFormName(item.name);
    setFormCategory(item.categoryId);
    setFormPrice(item.price.toString());
    setFormDescription(item.description);
    setFormImage(item.image);
    setFormIsAvailable(item.isAvailable);
    setFormIsChefSpecial(!!item.isChefSpecial);
    setFormIsSpicy(!!item.isSpicy);
    setFormIsVegetarian(!!item.isVegetarian);
    setFormPrepTime(item.prepTime || '20 mins');
    setFormPortionSize(item.portionSize || '');
  };

  const handleOpenCreate = () => {
    setEditingItem(null);
    setIsCreatingNew(true);
    setFormName('');
    setFormCategory(categories[0]?.id || 'steaks-grills');
    setFormPrice('1800');
    setFormDescription('');
    setFormImage(PRESET_FOOD_IMAGES[0].url);
    setFormIsAvailable(true);
    setFormIsChefSpecial(false);
    setFormIsSpicy(false);
    setFormIsVegetarian(false);
    setFormPrepTime('15-20 mins');
    setFormPortionSize('Standard Portion');
  };

  const handleSaveMenuItem = (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = parseFloat(formPrice);
    if (isNaN(priceNum) || priceNum <= 0) {
      alert('Please enter a valid price in Rs.');
      return;
    }

    const selectedCat = categories.find((c) => c.id === formCategory) || categories[0];

    if (editingItem) {
      const updated: MenuItem = {
        ...editingItem,
        name: formName.trim(),
        categoryId: selectedCat.id,
        categoryName: selectedCat.name,
        price: priceNum,
        description: formDescription.trim(),
        image: formImage.trim(),
        isAvailable: formIsAvailable,
        isChefSpecial: formIsChefSpecial,
        isSpicy: formIsSpicy,
        isVegetarian: formIsVegetarian,
        prepTime: formPrepTime.trim(),
        portionSize: formPortionSize.trim(),
      };
      onUpdateMenuItem(updated);
    } else {
      const newItem: MenuItem = {
        id: `item_${Date.now()}`,
        name: formName.trim(),
        categoryId: selectedCat.id,
        categoryName: selectedCat.name,
        price: priceNum,
        description: formDescription.trim(),
        image: formImage.trim(),
        isAvailable: formIsAvailable,
        isChefSpecial: formIsChefSpecial,
        isSpicy: formIsSpicy,
        isVegetarian: formIsVegetarian,
        prepTime: formPrepTime.trim(),
        portionSize: formPortionSize.trim(),
      };
      onAddMenuItem(newItem);
    }

    setEditingItem(null);
    setIsCreatingNew(false);
  };

  const totalRevenue = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((acc, o) => acc + o.total, 0);

  const filteredMenuItems = menuItems.filter(
    (it) =>
      it.name.toLowerCase().includes(menuSearch.toLowerCase()) ||
      it.categoryName.toLowerCase().includes(menuSearch.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        id="admin-modal-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          id="admin-modal-content"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl bg-[#141414] border border-[#C5A059]/40 rounded-3xl overflow-hidden shadow-2xl my-4 text-[#F9F9F7] flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[#262626] flex items-center justify-between bg-[#181818]">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/50 flex items-center justify-center">
                <Lock className="w-5 h-5 text-[#C5A059]" />
              </div>
              <div>
                <h2 className="font-cinzel text-lg sm:text-xl font-bold text-[#F9F9F7]">
                  CASA RICA RESTAURANT CONTROL PANEL
                </h2>
                <p className="text-xs text-[#A8A69E]">
                  {isAuthenticated
                    ? 'Staff Administration & Live Order Management'
                    : 'Authorized Personnel Only'}
                </p>
              </div>
            </div>

            <button
              id="admin-close-btn"
              onClick={onClose}
              className="p-2 rounded-full bg-[#1C1C1C] text-[#A8A69E] hover:text-[#C5A059] transition-colors cursor-pointer border border-[#262626]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          {!isAuthenticated ? (
            /* Passcode Screen */
            <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#181818] border border-[#C5A059]/30 flex items-center justify-center">
                <Lock className="w-8 h-8 text-[#C5A059]" />
              </div>

              <div>
                <h3 className="font-cinzel text-2xl font-bold text-[#F9F9F7]">Admin Login</h3>
              </div>

              <form onSubmit={handleLogin} className="w-full max-w-xs space-y-3">
                <input
                  id="admin-passcode-input"
                  type="password"
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setAuthError(false);
                  }}
                  placeholder="Enter Password"
                  className="w-full px-4 py-3 rounded-xl bg-[#1C1C1C] border border-[#C5A059]/30 text-center tracking-[0.3em] font-mono text-lg text-[#F3E5C8] focus:outline-none focus:border-[#C5A059]"
                  autoFocus
                />

                {authError && (
                  <p className="text-xs text-rose-400 font-medium">
                    Incorrect password. Please try again.
                  </p>
                )}

                <button
                  id="admin-passcode-submit"
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#C5A059] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#D8B46E] transition-colors cursor-pointer shadow-lg"
                >
                  LOGIN
                </button>
              </form>
            </div>
          ) : (
            /* Authenticated Admin Dashboard */
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
              {/* Tab Navigation */}
              <div className="px-5 sm:px-6 pt-3 border-b border-[#262626] bg-[#161616] flex items-center space-x-2 sm:space-x-4 overflow-x-auto no-scrollbar">
                <button
                  id="admin-tab-orders"
                  onClick={() => setActiveTab('orders')}
                  className={`pb-3 px-3 text-xs font-bold uppercase tracking-wider flex items-center space-x-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'orders'
                      ? 'border-[#C5A059] text-[#F3E5C8]'
                      : 'border-transparent text-[#A8A69E] hover:text-[#F9F9F7]'
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Real Orders ({orders.length})</span>
                </button>

                <button
                  id="admin-tab-reservations"
                  onClick={() => setActiveTab('reservations')}
                  className={`pb-3 px-3 text-xs font-bold uppercase tracking-wider flex items-center space-x-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'reservations'
                      ? 'border-[#C5A059] text-[#F3E5C8]'
                      : 'border-transparent text-[#A8A69E] hover:text-[#F9F9F7]'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Reservations ({reservations.length})</span>
                </button>

                <button
                  id="admin-tab-menu"
                  onClick={() => setActiveTab('menu')}
                  className={`pb-3 px-3 text-xs font-bold uppercase tracking-wider flex items-center space-x-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'menu'
                      ? 'border-[#C5A059] text-[#F3E5C8]'
                      : 'border-transparent text-[#A8A69E] hover:text-[#F9F9F7]'
                  }`}
                >
                  <Utensils className="w-3.5 h-3.5" />
                  <span>Menu Manager ({menuItems.length})</span>
                </button>

                <button
                  id="admin-tab-stats"
                  onClick={() => setActiveTab('stats')}
                  className={`pb-3 px-3 text-xs font-bold uppercase tracking-wider flex items-center space-x-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'stats'
                      ? 'border-[#C5A059] text-[#F3E5C8]'
                      : 'border-transparent text-[#A8A69E] hover:text-[#F9F9F7]'
                  }`}
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>Revenue & Summary</span>
                </button>
              </div>

              {/* Tab Contents */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
                {/* 1. ORDERS TAB */}
                {activeTab === 'orders' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-cinzel text-lg font-bold text-[#F9F9F7]">
                          Live Online Delivery Orders
                        </h3>
                        <p className="text-xs text-[#A8A69E]">
                          Real customer orders placed via the website with Cash on Delivery (COD) & Rs. 300 fee.
                        </p>
                      </div>
                    </div>

                    {orders.length === 0 ? (
                      <div className="p-12 text-center rounded-2xl bg-[#181818] border border-[#262626] space-y-2">
                        <ShoppingBag className="w-10 h-10 text-[#6E6C65] mx-auto" />
                        <h4 className="font-cinzel text-base font-bold text-[#A8A69E]">
                          No Real Orders Placed Yet
                        </h4>
                        <p className="text-xs text-[#6E6C65] max-w-sm mx-auto">
                          When customers add dishes to cart and complete checkout, their full order, address, and contact details will instantly appear here.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {orders.map((ord) => (
                          <div
                            key={ord.id}
                            id={`admin-order-card-${ord.id}`}
                            className="p-4 rounded-2xl bg-[#181818] border border-[#262626] space-y-3"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#262626] pb-2">
                              <div>
                                <div className="flex items-center space-x-2">
                                  <span className="font-mono text-sm font-extrabold text-[#F3E5C8]">
                                    {ord.orderNumber}
                                  </span>
                                  <span className="text-xs text-[#A8A69E]">
                                    {new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(ord.createdAt).toLocaleDateString()}
                                  </span>
                                </div>
                                <div className="text-sm font-bold text-[#F9F9F7] mt-0.5">
                                  {ord.customerName} —{' '}
                                  <a
                                    href={`tel:${ord.customerPhone}`}
                                    className="text-[#C5A059] hover:underline"
                                  >
                                    {ord.customerPhone}
                                  </a>
                                </div>
                              </div>

                              {/* Status Dropdown */}
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-[#A8A69E]">Status:</span>
                                <select
                                  value={ord.status}
                                  onChange={(e) =>
                                    onUpdateOrderStatus(ord.id, e.target.value as OrderStatus)
                                  }
                                  className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border ${
                                    ord.status === 'delivered'
                                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                                      : ord.status === 'out_for_delivery'
                                      ? 'bg-blue-950/80 text-blue-300 border-blue-500/40'
                                      : ord.status === 'cooking'
                                      ? 'bg-amber-950/80 text-amber-300 border-amber-500/40'
                                      : ord.status === 'confirmed'
                                      ? 'bg-purple-950/80 text-purple-300 border-purple-500/40'
                                      : ord.status === 'cancelled'
                                      ? 'bg-rose-950/80 text-rose-300 border-rose-500/40'
                                      : 'bg-zinc-800 text-zinc-300 border-zinc-600'
                                  }`}
                                >
                                  <option value="pending" className="bg-[#181818]">Pending</option>
                                  <option value="confirmed" className="bg-[#181818]">Confirmed</option>
                                  <option value="cooking" className="bg-[#181818]">Cooking in Kitchen</option>
                                  <option value="out_for_delivery" className="bg-[#181818]">Out for Delivery</option>
                                  <option value="delivered" className="bg-[#181818]">Delivered & Paid</option>
                                  <option value="cancelled" className="bg-[#181818]">Cancelled</option>
                                </select>
                              </div>
                            </div>

                            {/* Address and Items */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-[#A8A69E]">
                              <div>
                                <span className="font-semibold text-[#F9F9F7] block">
                                  Delivery Address:
                                </span>
                                <p className="text-[#E0DED9] mt-0.5">
                                  {ord.deliveryAddress}
                                  {ord.deliveryArea ? `, ${ord.deliveryArea}` : ''}
                                  {ord.landmark ? ` (Near ${ord.landmark})` : ''}, {ord.city}
                                </p>
                                {ord.notes && (
                                  <p className="mt-1 text-[#F3E5C8] italic">
                                    Note: {ord.notes}
                                  </p>
                                )}
                              </div>

                              <div className="space-y-1">
                                <span className="font-semibold text-[#F9F9F7] block">
                                  Items Ordered:
                                </span>
                                {ord.items.map((it, idx) => (
                                  <div key={idx} className="flex justify-between text-[#E0DED9]">
                                    <span>
                                      {it.quantity}x {it.name}{' '}
                                      {it.instructions && (
                                        <span className="text-[10px] text-amber-400">
                                          ({it.instructions})
                                        </span>
                                      )}
                                    </span>
                                    <span>Rs. {(it.price * it.quantity).toLocaleString()}</span>
                                  </div>
                                ))}
                                <div className="pt-1 border-t border-[#262626] flex justify-between font-bold text-[#F3E5C8]">
                                  <span>Total (Incl. Rs. 300 Delivery)</span>
                                  <span>Rs. {ord.total.toLocaleString()}</span>
                                </div>
                              </div>
                            </div>

                            {/* WhatsApp Direct Action */}
                            <div className="flex justify-end pt-1">
                              <a
                                href={`https://wa.me/${ord.customerPhone.replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#075e54] hover:bg-[#128c7e] text-white text-xs font-semibold"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span>WhatsApp Customer</span>
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* 2. RESERVATIONS TAB */}
                {activeTab === 'reservations' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-cinzel text-lg font-bold text-[#F9F9F7]">
                          Table Booking Requests
                        </h3>
                        <p className="text-xs text-[#A8A69E]">
                          Manage dining reservations, party sizes, and seating preferences.
                        </p>
                      </div>
                    </div>

                    {reservations.length === 0 ? (
                      <div className="p-12 text-center rounded-2xl bg-[#181818] border border-[#262626] space-y-2">
                        <Calendar className="w-10 h-10 text-[#6E6C65] mx-auto" />
                        <h4 className="font-cinzel text-base font-bold text-[#A8A69E]">
                          No Table Reservations Yet
                        </h4>
                        <p className="text-xs text-[#6E6C65] max-w-sm mx-auto">
                          When guests book a table for dining, their details, seating zone, and party size will appear here.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {reservations.map((res) => (
                          <div
                            key={res.id}
                            id={`admin-res-card-${res.id}`}
                            className="p-4 rounded-2xl bg-[#181818] border border-[#262626] space-y-3"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#262626] pb-2">
                              <div>
                                <div className="flex items-center space-x-2">
                                  <span className="font-mono text-sm font-extrabold text-[#C5A059]">
                                    {res.reservationNumber}
                                  </span>
                                  <span className="px-2 py-0.5 rounded-full bg-[#1C1C1C] border border-[#262626] text-[11px] font-bold text-[#F3E5C8]">
                                    {res.guests} Guests
                                  </span>
                                </div>
                                <div className="text-sm font-bold text-[#F9F9F7] mt-0.5">
                                  {res.customerName} •{' '}
                                  <a href={`tel:${res.customerPhone}`} className="text-[#C5A059]">
                                    {res.customerPhone}
                                  </a>
                                </div>
                              </div>

                              {/* Status */}
                              <select
                                value={res.status}
                                onChange={(e) =>
                                  onUpdateReservationStatus(
                                    res.id,
                                    e.target.value as ReservationStatus
                                  )
                                }
                                className="px-3 py-1.5 rounded-xl text-xs font-bold uppercase bg-[#1C1C1C] border border-[#C5A059]/30 text-[#F3E5C8]"
                              >
                                <option value="pending" className="bg-[#181818]">Pending</option>
                                <option value="confirmed" className="bg-[#181818]">Confirmed</option>
                                <option value="seated" className="bg-[#181818]">Guest Seated</option>
                                <option value="cancelled" className="bg-[#181818]">Cancelled</option>
                              </select>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-[#A8A69E]">
                              <div>
                                <span className="text-[#6E6C65] block">Date & Time:</span>
                                <span className="font-semibold text-[#F9F9F7]">
                                  {res.date} at {res.time}
                                </span>
                              </div>
                              <div>
                                <span className="text-[#6E6C65] block">Seating Zone:</span>
                                <span className="font-semibold text-[#C5A059]">
                                  {res.seatingPreference}
                                </span>
                              </div>
                              <div>
                                <span className="text-[#6E6C65] block">Occasion:</span>
                                <span className="font-semibold text-[#F9F9F7]">
                                  {res.occasion || 'Standard Dining'}
                                </span>
                              </div>
                              <div>
                                <span className="text-[#6E6C65] block">Special Note:</span>
                                <span className="italic text-[#E0DED9]">
                                  {res.specialRequests || 'None'}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* 3. MENU MANAGER TAB */}
                {activeTab === 'menu' && (
                  <div className="space-y-5">
                    {/* Add / Search Topbar */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div className="relative w-full sm:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8A69E]" />
                        <input
                          type="text"
                          value={menuSearch}
                          onChange={(e) => setMenuSearch(e.target.value)}
                          placeholder="Search menu items..."
                          className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#181818] border border-[#262626] text-xs text-[#F9F9F7] focus:outline-none focus:border-[#C5A059]"
                        />
                      </div>

                      <div className="flex items-center space-x-2 w-full sm:w-auto">
                        <button
                          id="admin-add-item-btn"
                          onClick={handleOpenCreate}
                          className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-[#C5A059] hover:bg-[#D8B46E] text-black font-extrabold text-xs tracking-wider uppercase flex items-center justify-center space-x-2 cursor-pointer shadow-md"
                        >
                          <Plus className="w-4 h-4" />
                          <span>ADD MENU ITEM</span>
                        </button>

                        <button
                          id="admin-reset-default-btn"
                          onClick={() => {
                            if (confirm('Reset menu items to default Casa Rica catalog?')) {
                              onResetMenuToDefault();
                            }
                          }}
                          className="px-3 py-2 rounded-xl bg-[#1C1C1C] hover:bg-[#262626] text-xs text-[#A8A69E] hover:text-[#F9F9F7] cursor-pointer border border-[#262626]"
                          title="Reset to initial catalog"
                        >
                          Reset Catalog
                        </button>
                      </div>
                    </div>

                    {/* Add/Edit Modal/Drawer if active */}
                    {(isCreatingNew || editingItem) && (
                      <div className="p-5 rounded-2xl bg-[#181818] border border-[#C5A059]/40 space-y-4">
                        <div className="flex items-center justify-between border-b border-[#262626] pb-3">
                          <h4 className="font-cinzel text-base font-bold text-[#F9F9F7]">
                            {editingItem ? `Edit Item: ${editingItem.name}` : 'Add New Culinary Creation'}
                          </h4>
                          <button
                            onClick={() => {
                              setIsCreatingNew(false);
                              setEditingItem(null);
                            }}
                            className="text-[#A8A69E] hover:text-white"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <form onSubmit={handleSaveMenuItem} className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <label className="block text-[11px] uppercase font-semibold text-[#A8A69E] mb-1">
                                Item Name *
                              </label>
                              <input
                                type="text"
                                required
                                value={formName}
                                onChange={(e) => setFormName(e.target.value)}
                                placeholder="e.g. Australian Wagyu Fillet"
                                className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-[#262626] text-xs text-[#F9F9F7] focus:outline-none focus:border-[#C5A059]"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] uppercase font-semibold text-[#A8A69E] mb-1">
                                Category *
                              </label>
                              <select
                                value={formCategory}
                                onChange={(e) => setFormCategory(e.target.value)}
                                className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-[#262626] text-xs text-[#F9F9F7] focus:outline-none focus:border-[#C5A059]"
                              >
                                {categories.map((c) => (
                                  <option key={c.id} value={c.id} className="bg-[#141414]">
                                    {c.name}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label className="block text-[11px] uppercase font-semibold text-[#A8A69E] mb-1">
                                Price in Rs. *
                              </label>
                              <input
                                type="number"
                                required
                                value={formPrice}
                                onChange={(e) => setFormPrice(e.target.value)}
                                placeholder="e.g. 2950"
                                className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-[#262626] text-xs text-[#F9F9F7] focus:outline-none focus:border-[#C5A059]"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] uppercase font-semibold text-[#A8A69E] mb-1">
                              Description & Ingredients
                            </label>
                            <textarea
                              rows={2}
                              value={formDescription}
                              onChange={(e) => setFormDescription(e.target.value)}
                              placeholder="Describe the dish flavors, cut, sauces, and cooking techniques..."
                              className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-[#262626] text-xs text-[#F9F9F7] focus:outline-none focus:border-[#C5A059]"
                            />
                          </div>

                          {/* Image URL & Preset Selection */}
                          <div className="space-y-2">
                            <label className="block text-[11px] uppercase font-semibold text-[#A8A69E]">
                              Food Image URL
                            </label>
                            <input
                              type="url"
                              required
                              value={formImage}
                              onChange={(e) => setFormImage(e.target.value)}
                              placeholder="https://..."
                              className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-[#262626] text-xs text-[#F9F9F7] focus:outline-none focus:border-[#C5A059]"
                            />

                            <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pt-1">
                              <span className="text-[10px] text-[#A8A69E] shrink-0">
                                Or Pick Preset:
                              </span>
                              {PRESET_FOOD_IMAGES.map((img, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => setFormImage(img.url)}
                                  className="px-2 py-1 rounded-md bg-[#141414] hover:bg-[#1C1C1C] text-[10px] text-[#A8A69E] border border-[#262626] shrink-0"
                                >
                                  {img.name}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Toggles */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                            <label className="flex items-center space-x-2 text-xs text-[#A8A69E] cursor-pointer">
                              <input
                                type="checkbox"
                                checked={formIsAvailable}
                                onChange={(e) => setFormIsAvailable(e.target.checked)}
                                className="rounded text-[#C5A059]"
                              />
                              <span>In Stock & Available</span>
                            </label>

                            <label className="flex items-center space-x-2 text-xs text-[#A8A69E] cursor-pointer">
                              <input
                                type="checkbox"
                                checked={formIsChefSpecial}
                                onChange={(e) => setFormIsChefSpecial(e.target.checked)}
                                className="rounded text-[#C5A059]"
                              />
                              <span>Chef's Choice</span>
                            </label>

                            <label className="flex items-center space-x-2 text-xs text-[#A8A69E] cursor-pointer">
                              <input
                                type="checkbox"
                                checked={formIsSpicy}
                                onChange={(e) => setFormIsSpicy(e.target.checked)}
                                className="rounded text-[#C5A059]"
                              />
                              <span>Spicy</span>
                            </label>

                            <label className="flex items-center space-x-2 text-xs text-[#A8A69E] cursor-pointer">
                              <input
                                type="checkbox"
                                checked={formIsVegetarian}
                                onChange={(e) => setFormIsVegetarian(e.target.checked)}
                                className="rounded text-[#C5A059]"
                              />
                              <span>Vegetarian</span>
                            </label>
                          </div>

                          {/* Submit Actions */}
                          <div className="flex justify-end space-x-2 pt-2">
                            <button
                              type="button"
                              onClick={() => {
                                setIsCreatingNew(false);
                                setEditingItem(null);
                              }}
                              className="px-4 py-2 rounded-xl bg-[#1C1C1C] text-xs font-semibold text-[#A8A69E] border border-[#262626]"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-6 py-2 rounded-xl bg-[#C5A059] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#D8B46E]"
                            >
                              {editingItem ? 'Save Changes' : 'Add Item to Menu'}
                            </button>
                          </div>
                        </form>
                      </div>
                    )}

                    {/* Menu Items Table / List */}
                    <div className="space-y-2">
                      {filteredMenuItems.map((item) => (
                        <div
                          key={item.id}
                          className="p-3 rounded-xl bg-[#181818] border border-[#262626] flex items-center justify-between gap-3 hover:border-[#C5A059]/30 transition-all"
                        >
                          <div className="flex items-center space-x-3 min-w-0">
                            <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-[#262626]">
                              <RotatableFoodImage
                                src={item.image}
                                alt={item.name}
                                variant="standard"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center space-x-2">
                                <h5 className="text-xs sm:text-sm font-bold text-[#F9F9F7] truncate">
                                  {item.name}
                                </h5>
                                {!item.isAvailable && (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-rose-950 text-rose-400 border border-rose-800/40">
                                    Sold Out
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-[#A8A69E]">
                                {item.categoryName} •{' '}
                                <strong className="text-[#F3E5C8]">
                                  Rs. {item.price.toLocaleString()}
                                </strong>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center space-x-2 shrink-0">
                            {/* In-Stock / Availability Toggle */}
                            <button
                              id={`admin-toggle-avail-${item.id}`}
                              onClick={() => onToggleAvailability(item.id)}
                              className={`p-1.5 rounded-lg text-xs font-semibold transition-colors ${
                                item.isAvailable
                                  ? 'text-emerald-400 bg-emerald-950/40 hover:bg-emerald-900/50'
                                  : 'text-zinc-500 bg-zinc-800 hover:bg-zinc-700'
                              }`}
                              title={item.isAvailable ? 'Mark as Sold Out' : 'Mark as Available'}
                            >
                              {item.isAvailable ? (
                                <ToggleRight className="w-5 h-5" />
                              ) : (
                                <ToggleLeft className="w-5 h-5" />
                              )}
                            </button>

                            {/* Edit */}
                            <button
                              id={`admin-edit-item-${item.id}`}
                              onClick={() => handleOpenEdit(item)}
                              className="p-1.5 rounded-lg bg-[#1C1C1C] hover:bg-[#262626] text-[#F3E5C8] border border-[#262626]"
                              title="Edit item details & price"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>

                            {/* Delete */}
                            <button
                              id={`admin-del-item-${item.id}`}
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete "${item.name}"?`)) {
                                  onDeleteMenuItem(item.id);
                                }
                              }}
                              className="p-1.5 rounded-lg bg-[#1C1C1C] hover:bg-rose-950 text-rose-400 border border-[#262626]"
                              title="Delete item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. REVENUE & STATS TAB */}
                {activeTab === 'stats' && (
                  <div className="space-y-6">
                    <h3 className="font-cinzel text-lg font-bold text-[#F9F9F7]">
                      Restaurant Performance Overview
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="p-4 rounded-2xl bg-[#181818] border border-[#C5A059]/20">
                        <span className="text-[11px] font-semibold text-[#A8A69E] uppercase">
                          Total Revenue (COD)
                        </span>
                        <div className="text-xl sm:text-2xl font-black text-[#F3E5C8] font-cinzel mt-1">
                          Rs. {totalRevenue.toLocaleString()}
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#181818] border border-[#262626]">
                        <span className="text-[11px] font-semibold text-[#A8A69E] uppercase">
                          Real Orders Placed
                        </span>
                        <div className="text-xl sm:text-2xl font-black text-[#F9F9F7] font-cinzel mt-1">
                          {orders.length}
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#181818] border border-[#262626]">
                        <span className="text-[11px] font-semibold text-[#A8A69E] uppercase">
                          Table Reservations
                        </span>
                        <div className="text-xl sm:text-2xl font-black text-[#F9F9F7] font-cinzel mt-1">
                          {reservations.length}
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#181818] border border-[#262626]">
                        <span className="text-[11px] font-semibold text-[#A8A69E] uppercase">
                          Active Menu Items
                        </span>
                        <div className="text-xl sm:text-2xl font-black text-[#F9F9F7] font-cinzel mt-1">
                          {menuItems.filter((m) => m.isAvailable).length} / {menuItems.length}
                        </div>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#181818] border border-[#262626] text-xs text-[#A8A69E] space-y-2">
                      <h4 className="font-bold text-[#F9F9F7] uppercase tracking-wider">
                        Operating Guidelines & Integrity
                      </h4>
                      <p>
                        • Fixed delivery rate of <strong className="text-[#F3E5C8]">Rs. 300</strong> is automatically applied to all online orders across Lahore.
                      </p>
                      <p>
                        • Customer details are stored locally and in-session. Orders and reservations are 100% genuine user submissions with zero synthetic dummy records.
                      </p>
                      <p>
                        • Availability toggles directly affect customer ordering in real time.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
