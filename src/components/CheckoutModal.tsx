import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Truck, Phone, User, MapPin, MessageCircle, ShieldCheck, Clock, AlertCircle, ShoppingBag, Sparkles } from 'lucide-react';
import { CartItem, Order, OrderItem } from '../types';
import { RESTAURANT_INFO } from '../data/initialData';
import { CelebrationFireworks } from './CelebrationFireworks';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onPlaceOrder: (order: Order) => void;
  onClearCart: () => void;
}

interface ValidationErrors {
  name?: string;
  phone?: string;
  address?: string;
  area?: string;
}

const POPULAR_AREAS = [
  'DHA Phase 2',
  'Sector G (DHA II)',
  'Sector F (DHA II)',
  'DHA Phase 1',
  'Bahria Town',
  'Gulberg Greens',
  'PWD / Soan Garden',
];

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onPlaceOrder,
  onClearCart,
}) => {
  const [customerName, setCustomerName] = React.useState('');
  const [customerPhone, setCustomerPhone] = React.useState('');
  const [customerEmail, setCustomerEmail] = React.useState('');
  const [deliveryAddress, setDeliveryAddress] = React.useState('');
  const [deliveryArea, setDeliveryArea] = React.useState('DHA Phase 2');
  const [landmark, setLandmark] = React.useState('');
  const [city, setCity] = React.useState('Islamabad');
  const [notes, setNotes] = React.useState('');
  const [errors, setErrors] = React.useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [placedOrder, setPlacedOrder] = React.useState<Order | null>(null);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.menuItem.price * item.quantity,
    0
  );
  const deliveryFee = RESTAURANT_INFO.deliveryFee; // Rs. 300
  const grandTotal = subtotal + deliveryFee;

  if (!isOpen) return null;

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!customerName.trim()) {
      newErrors.name = 'Please enter your full name.';
    }

    if (!customerPhone.trim()) {
      newErrors.phone = 'Please enter your phone number.';
    } else if (customerPhone.trim().replace(/[\s-]/g, '').length < 8) {
      newErrors.phone = 'Please enter a valid phone number (e.g. 0300 1234567).';
    }

    if (!deliveryAddress.trim()) {
      newErrors.address = 'Please enter your delivery address.';
    }

    if (!deliveryArea.trim()) {
      newErrors.area = 'Please select or enter your delivery area.';
    }

    setErrors(newErrors);

    // Auto focus first invalid input
    if (newErrors.name) {
      document.getElementById('checkout-name')?.focus();
    } else if (newErrors.phone) {
      document.getElementById('checkout-phone')?.focus();
    } else if (newErrors.address) {
      document.getElementById('checkout-address')?.focus();
    } else if (newErrors.area) {
      document.getElementById('checkout-area')?.focus();
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const orderNumber = `CR-${Math.floor(10000 + Math.random() * 90000)}`;

    const orderItems: OrderItem[] = cartItems.map((ci) => ({
      menuItemId: ci.menuItem.id,
      name: ci.menuItem.name,
      price: ci.menuItem.price,
      quantity: ci.quantity,
      image: ci.menuItem.image,
      instructions: ci.instructions,
    }));

    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      orderNumber,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerEmail: customerEmail.trim() || undefined,
      deliveryAddress: deliveryAddress.trim(),
      deliveryArea: deliveryArea.trim(),
      landmark: landmark.trim() || undefined,
      city: city.trim() || 'Islamabad',
      orderType: 'delivery',
      paymentMethod: 'Cash on Delivery',
      items: orderItems,
      subtotal,
      deliveryFee,
      total: grandTotal,
      notes: notes.trim() || undefined,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    setTimeout(() => {
      onPlaceOrder(newOrder);
      setPlacedOrder(newOrder);
      setIsSubmitting(false);
      onClearCart();
    }, 300);
  };

  const handleSendWhatsAppConfirmation = () => {
    if (!placedOrder) return;
    const itemsList = placedOrder.items
      .map((it) => `• ${it.quantity}x ${it.name} (Rs. ${it.price * it.quantity})`)
      .join('\n');

    const areaText = placedOrder.deliveryArea ? `, ${placedOrder.deliveryArea}` : '';
    const landmarkText = placedOrder.landmark ? ` (Near ${placedOrder.landmark})` : '';

    const message = `*NEW ORDER CONFIRMATION — CASA RICA*\n\n` +
      `*Order Number:* #${placedOrder.orderNumber}\n` +
      `*Status:* Confirmed\n` +
      `*Customer:* ${placedOrder.customerName}\n` +
      `*Phone:* ${placedOrder.customerPhone}\n` +
      `*Address:* ${placedOrder.deliveryAddress}${areaText}${landmarkText}, ${placedOrder.city}\n\n` +
      `*Items Ordered:*\n${itemsList}\n\n` +
      `*Subtotal:* Rs. ${placedOrder.subtotal}\n` +
      `*Delivery Fee:* Rs. ${placedOrder.deliveryFee}\n` +
      `*Grand Total (Cash on Delivery):* Rs. ${placedOrder.total}\n\n` +
      `*Special Notes:* ${placedOrder.notes || 'None'}\n\n` +
      `Thank you for choosing CASA RICA! Please prepare and dispatch.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${encoded}`, '_blank');
  };

  const handleClose = () => {
    setPlacedOrder(null);
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      <div
        id="checkout-modal-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
        onClick={handleClose}
      >
        <motion.div
          id="checkout-modal-content"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl bg-[#141414] border border-[#C5A059]/35 rounded-3xl overflow-hidden shadow-2xl my-8 text-[#F9F9F7]"
        >
          {/* One-time celebration firework / patakha particles when order is confirmed */}
          {placedOrder && <CelebrationFireworks orderNumber={placedOrder.orderNumber} />}

          {/* Header */}
          <div className="p-6 border-b border-[#262626] flex items-center justify-between bg-[#181818] relative z-10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#C5A059]/15 flex items-center justify-center border border-[#C5A059]/30 shadow-[0_0_15px_rgba(197,160,89,0.2)]">
                {placedOrder ? (
                  <Sparkles className="w-5 h-5 text-[#C5A059]" />
                ) : (
                  <Truck className="w-5 h-5 text-[#C5A059]" />
                )}
              </div>
              <div>
                <h2 className="font-cinzel text-xl font-bold text-[#F9F9F7] tracking-wide">
                  {placedOrder ? 'CASA RICA ORDER CONFIRMED' : 'DELIVERY CHECKOUT'}
                </h2>
                <p className="text-xs text-[#A8A69E]">
                  {placedOrder
                    ? `Order Number #${placedOrder.orderNumber}`
                    : 'Cash on Delivery • Rs. 300 Flat Express Delivery'}
                </p>
              </div>
            </div>

            <button
              id="checkout-close-btn"
              onClick={handleClose}
              className="p-2 rounded-full bg-[#1C1C1C] text-[#A8A69E] hover:text-[#C5A059] transition-colors cursor-pointer border border-[#262626]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          {placedOrder ? (
            /* Premium Celebration Confirmation Screen */
            <div className="p-6 sm:p-8 space-y-6 relative z-10">
              {/* Hero Celebration Message */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center space-y-3"
              >
                {/* Glowing Success Badge */}
                <div className="relative inline-flex items-center justify-center">
                  <div className="absolute inset-0 w-20 h-20 rounded-full bg-[#C5A059]/25 blur-xl animate-pulse" />
                  <div className="w-20 h-20 rounded-full bg-gradient-to-b from-[#1C1C1C] to-[#0E0E0E] border-2 border-[#C5A059] flex items-center justify-center shadow-[0_0_30px_rgba(197,160,89,0.35)] relative z-10">
                    <CheckCircle2 className="w-10 h-10 text-[#F3E5C8]" />
                  </div>
                </div>

                {/* Primary Message */}
                <div className="space-y-1.5 pt-1">
                  <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#F9F9F7] tracking-wider leading-tight">
                    🎉 THANK YOU FOR YOUR ORDER!
                  </h3>
                  <p className="text-sm sm:text-base text-emerald-400 font-semibold tracking-wide">
                    Your order has been successfully confirmed.
                  </p>
                  <p className="text-xs sm:text-sm text-[#D4D2CD] max-w-md mx-auto font-light leading-relaxed">
                    We’re preparing your delicious meal.
                    <br />
                    <span className="text-[#C5A059] font-medium font-cinzel">
                      Thank you for choosing CASA RICA!
                    </span>
                  </p>
                </div>

                {/* Prominent Order Number Display */}
                <div className="pt-2">
                  <div className="inline-block px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#1E1E1E] via-[#242424] to-[#1E1E1E] border border-[#C5A059]/50 shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
                    <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#A8A69E] block mb-0.5">
                      ORDER NUMBER
                    </span>
                    <span className="font-mono text-xl sm:text-2xl font-black text-[#F3E5C8] tracking-wider">
                      #{placedOrder.orderNumber}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Status & Key Meta Card */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#181818] border border-[#262626] text-xs">
                <div>
                  <span className="text-[#8F8A7E] block text-[11px]">Order Reference</span>
                  <span className="font-mono font-bold text-[#F3E5C8] text-sm">
                    #{placedOrder.orderNumber}
                  </span>
                </div>
                <div>
                  <span className="text-[#8F8A7E] block text-[11px]">Status</span>
                  <span className="inline-flex items-center space-x-1 px-2 py-0.5 mt-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 text-[11px] font-extrabold uppercase tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Confirmed</span>
                  </span>
                </div>
                <div>
                  <span className="text-[#8F8A7E] block text-[11px]">Payment</span>
                  <span className="font-semibold text-[#F9F9F7]">
                    {placedOrder.paymentMethod}
                  </span>
                </div>
                <div>
                  <span className="text-[#8F8A7E] block text-[11px]">Est. Delivery</span>
                  <span className="font-semibold text-[#F3E5C8] flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>35–45 Mins</span>
                  </span>
                </div>
              </div>

              {/* Customer & Delivery Details Box */}
              <div className="p-4 rounded-2xl bg-[#181818] border border-[#262626] text-xs space-y-2">
                <span className="font-bold text-[#C5A059] uppercase tracking-wider text-[11px] block font-cinzel">
                  Customer & Delivery Details
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#E0DED9]">
                  <div>
                    <span className="text-[#8F8A7E] block text-[11px]">Customer Name:</span>
                    <span className="font-medium text-[#F9F9F7]">{placedOrder.customerName}</span>
                  </div>
                  <div>
                    <span className="text-[#8F8A7E] block text-[11px]">Phone Number:</span>
                    <span className="font-medium text-[#F9F9F7]">{placedOrder.customerPhone}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-[#8F8A7E] block text-[11px]">Delivery Address:</span>
                    <span className="font-medium text-[#F9F9F7]">
                      {placedOrder.deliveryAddress}
                      {placedOrder.deliveryArea ? `, ${placedOrder.deliveryArea}` : ''}
                      {placedOrder.landmark ? ` (Near ${placedOrder.landmark})` : ''}, {placedOrder.city}
                    </span>
                  </div>
                  {placedOrder.notes && (
                    <div className="sm:col-span-2">
                      <span className="text-[#8F8A7E] block text-[11px]">Special Instructions:</span>
                      <span className="text-[#F3E5C8] italic">{placedOrder.notes}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Ordered Items & Pricing Breakdown */}
              <div className="p-4 rounded-2xl bg-[#181818] border border-[#262626] text-xs space-y-3">
                <span className="font-bold text-[#C5A059] uppercase tracking-wider text-[11px] flex items-center space-x-1.5 font-cinzel">
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Ordered Items</span>
                </span>
                <div className="divide-y divide-[#262626] space-y-2">
                  {placedOrder.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between items-center pt-2 first:pt-0">
                      <div>
                        <span className="text-[#F9F9F7] font-semibold">
                          {it.quantity}x {it.name}
                        </span>
                        {it.instructions && (
                          <span className="block text-[10px] text-amber-400">
                            Note: {it.instructions}
                          </span>
                        )}
                      </div>
                      <span className="text-[#F3E5C8] font-mono">
                        Rs. {(it.price * it.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-[#262626] space-y-1.5">
                  <div className="flex justify-between text-[#8F8A7E]">
                    <span>Subtotal:</span>
                    <span className="text-[#F9F9F7] font-mono">
                      Rs. {placedOrder.subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#8F8A7E]">
                    <span>Express Delivery Charge:</span>
                    <span className="text-[#F9F9F7] font-mono">
                      Rs. {placedOrder.deliveryFee.toLocaleString()}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-[#262626] flex justify-between items-baseline font-bold text-sm text-[#F3E5C8]">
                    <span className="font-cinzel">Total (Cash on Delivery):</span>
                    <span className="font-cinzel text-lg text-[#F3E5C8] font-extrabold">
                      Rs. {placedOrder.total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  id="checkout-whatsapp-notify-btn"
                  onClick={handleSendWhatsAppConfirmation}
                  className="flex-1 py-3.5 rounded-2xl bg-[#075e54] hover:bg-[#128c7e] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg transition-all cursor-pointer border border-emerald-500/30 hover:shadow-[0_0_20px_rgba(18,140,126,0.4)]"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-300" />
                  <span>Send WhatsApp Receipt</span>
                </button>

                <button
                  id="checkout-done-btn"
                  onClick={handleClose}
                  className="flex-1 py-3.5 rounded-2xl bg-[#1C1C1C] hover:bg-[#262626] text-[#F9F9F7] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer border border-[#262626] hover:border-[#C5A059]/40"
                >
                  Back to Menu
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form View */
            <form noValidate onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
              {/* Customer Contact Details */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A059] flex items-center space-x-1.5 font-cinzel">
                  <User className="w-3.5 h-3.5" />
                  <span>Contact Information</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="checkout-name"
                      className="block text-[11px] font-semibold uppercase text-[#A8A69E] mb-1"
                    >
                      Full Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      id="checkout-name"
                      type="text"
                      value={customerName}
                      onChange={(e) => {
                        setCustomerName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      placeholder="e.g. Ahmed Raza"
                      className={`w-full px-3.5 py-2.5 rounded-xl text-sm text-[#F9F9F7] placeholder-[#6E6C65] transition-colors focus:outline-none ${
                        errors.name
                          ? 'bg-rose-950/20 border border-rose-500 focus:border-rose-400'
                          : 'bg-[#1C1C1C] border border-[#262626] focus:border-[#C5A059]'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-xs text-rose-400 font-medium mt-1.5 flex items-center space-x-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label
                      htmlFor="checkout-phone"
                      className="block text-[11px] font-semibold uppercase text-[#A8A69E] mb-1"
                    >
                      Phone Number <span className="text-rose-400">*</span>
                    </label>
                    <input
                      id="checkout-phone"
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => {
                        setCustomerPhone(e.target.value);
                        if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                      }}
                      placeholder="e.g. 0300 1234567"
                      className={`w-full px-3.5 py-2.5 rounded-xl text-sm text-[#F9F9F7] placeholder-[#6E6C65] transition-colors focus:outline-none ${
                        errors.phone
                          ? 'bg-rose-950/20 border border-rose-500 focus:border-rose-400'
                          : 'bg-[#1C1C1C] border border-[#262626] focus:border-[#C5A059]'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-xs text-rose-400 font-medium mt-1.5 flex items-center space-x-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Email (Optional) */}
                <div>
                  <label
                    htmlFor="checkout-email"
                    className="block text-[11px] font-semibold uppercase text-[#A8A69E] mb-1"
                  >
                    Email Address (Optional)
                  </label>
                  <input
                    id="checkout-email"
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="name@example.com (for digital receipt)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1C1C1C] border border-[#262626] text-sm text-[#F9F9F7] placeholder-[#6E6C65] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              {/* Delivery Address Details */}
              <div className="space-y-4 pt-2">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A059] flex items-center space-x-1.5 font-cinzel">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Delivery Address</span>
                </h3>

                {/* Street Address */}
                <div>
                  <label
                    htmlFor="checkout-address"
                    className="block text-[11px] font-semibold uppercase text-[#A8A69E] mb-1"
                  >
                    Complete Street / House Address <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="checkout-address"
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => {
                      setDeliveryAddress(e.target.value);
                      if (errors.address) setErrors((prev) => ({ ...prev, address: undefined }));
                    }}
                    placeholder="House / Flat #, Street #, Block / Lane"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-sm text-[#F9F9F7] placeholder-[#6E6C65] transition-colors focus:outline-none ${
                      errors.address
                        ? 'bg-rose-950/20 border border-rose-500 focus:border-rose-400'
                        : 'bg-[#1C1C1C] border border-[#262626] focus:border-[#C5A059]'
                    }`}
                  />
                  {errors.address && (
                    <p className="text-xs text-rose-400 font-medium mt-1.5 flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.address}</span>
                    </p>
                  )}
                </div>

                {/* Delivery Area & City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Delivery Area */}
                  <div>
                    <label
                      htmlFor="checkout-area"
                      className="block text-[11px] font-semibold uppercase text-[#A8A69E] mb-1"
                    >
                      Delivery Area / Sector <span className="text-rose-400">*</span>
                    </label>
                    <input
                      id="checkout-area"
                      type="text"
                      value={deliveryArea}
                      onChange={(e) => {
                        setDeliveryArea(e.target.value);
                        if (errors.area) setErrors((prev) => ({ ...prev, area: undefined }));
                      }}
                      placeholder="e.g. DHA Phase 2, Sector G"
                      className={`w-full px-3.5 py-2.5 rounded-xl text-sm text-[#F9F9F7] placeholder-[#6E6C65] transition-colors focus:outline-none ${
                        errors.area
                          ? 'bg-rose-950/20 border border-rose-500 focus:border-rose-400'
                          : 'bg-[#1C1C1C] border border-[#262626] focus:border-[#C5A059]'
                      }`}
                    />
                    {errors.area && (
                      <p className="text-xs text-rose-400 font-medium mt-1.5 flex items-center space-x-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.area}</span>
                      </p>
                    )}

                    {/* Quick Area Selector Chips */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {POPULAR_AREAS.map((area) => (
                        <button
                          key={area}
                          type="button"
                          onClick={() => {
                            setDeliveryArea(area);
                            if (errors.area) setErrors((prev) => ({ ...prev, area: undefined }));
                          }}
                          className={`px-2 py-0.5 rounded-md text-[10px] font-medium transition-colors cursor-pointer ${
                            deliveryArea === area
                              ? 'bg-[#C5A059] text-black font-bold'
                              : 'bg-[#1F1F1F] text-[#A8A69E] hover:text-[#F9F9F7] hover:bg-[#2A2A2A] border border-[#2B2B2B]'
                          }`}
                        >
                          {area}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* City & Landmark */}
                  <div className="space-y-3">
                    <div>
                      <label
                        htmlFor="checkout-city"
                        className="block text-[11px] font-semibold uppercase text-[#A8A69E] mb-1"
                      >
                        City
                      </label>
                      <input
                        id="checkout-city"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#1C1C1C] border border-[#262626] text-sm text-[#F9F9F7] focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="checkout-landmark"
                        className="block text-[11px] font-semibold uppercase text-[#A8A69E] mb-1"
                      >
                        Nearby Landmark (Optional)
                      </label>
                      <input
                        id="checkout-landmark"
                        type="text"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        placeholder="e.g. Near Central Park / Roundabout"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#1C1C1C] border border-[#262626] text-sm text-[#F9F9F7] placeholder-[#6E6C65] focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Rider Instructions */}
                <div>
                  <label
                    htmlFor="checkout-notes"
                    className="block text-[11px] font-semibold uppercase text-[#A8A69E] mb-1"
                  >
                    Additional Instructions / Order Notes (Optional)
                  </label>
                  <textarea
                    id="checkout-notes"
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Ring bell twice, deliver to 2nd floor, extra spicy, extra napkins..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1C1C1C] border border-[#262626] text-sm text-[#F9F9F7] placeholder-[#6E6C65] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              {/* Payment Method Selector (Cash on Delivery) */}
              <div className="p-4 rounded-2xl bg-[#181818] border border-[#C5A059]/30 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <ShieldCheck className="w-5 h-5 text-[#C5A059]" />
                    <div>
                      <span className="text-sm font-bold text-[#F9F9F7]">
                        Payment Method: Cash on Delivery (COD)
                      </span>
                      <p className="text-[11px] text-[#A8A69E]">
                        Pay cash directly to the delivery rider at your doorstep.
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#C5A059]/20 text-[#F3E5C8] text-[10px] font-extrabold uppercase tracking-wider">
                    Selected
                  </span>
                </div>
              </div>

              {/* Order Summary Recap */}
              <div className="p-4 rounded-2xl bg-[#181818] border border-[#262626] space-y-2 text-xs text-[#A8A69E]">
                <div className="flex justify-between">
                  <span>Food Items ({cartItems.length})</span>
                  <span className="text-[#F9F9F7] font-semibold">
                    Rs. {subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Flat Express Delivery Fee</span>
                  <span className="text-[#F9F9F7] font-semibold">
                    Rs. {deliveryFee.toLocaleString()}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#262626] flex justify-between items-baseline">
                  <span className="text-sm font-bold text-[#F9F9F7] font-cinzel">Total Payable</span>
                  <span className="text-xl font-black text-[#F3E5C8] font-cinzel">
                    Rs. {grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Direct Submit Button */}
              <button
                id="checkout-place-order-submit"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#F3E5C8] via-[#C5A059] to-[#9E7D38] text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center space-x-2 shadow-xl hover:shadow-[0_0_25px_rgba(197,160,89,0.45)] transition-all cursor-pointer disabled:opacity-50"
              >
                <span>
                  {isSubmitting ? 'PLACING YOUR ORDER...' : 'PLACE ORDER'}
                </span>
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
