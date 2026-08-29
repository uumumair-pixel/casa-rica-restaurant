export interface MenuItem {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  price: number; // in PKR Rs.
  description: string;
  image: string;
  isAvailable: boolean;
  isChefSpecial?: boolean;
  isPopular?: boolean;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  prepTime?: string;
  portionSize?: string;
  tags?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  description: string;
  image: string;
  itemCount?: number;
}

export interface CartItem {
  cartItemId: string;
  menuItem: MenuItem;
  quantity: number;
  instructions?: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'cooking' | 'out_for_delivery' | 'delivered' | 'cancelled';

export interface OrderItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  instructions?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryAddress: string;
  deliveryArea?: string;
  landmark?: string;
  city: string;
  orderType: 'delivery' | 'pickup';
  paymentMethod: 'Cash on Delivery' | 'WhatsApp Direct';
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number; // Rs. 300
  total: number;
  notes?: string;
  status: OrderStatus;
  createdAt: string;
}

export type ReservationStatus = 'pending' | 'confirmed' | 'seated' | 'cancelled';

export interface Reservation {
  id: string;
  reservationNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  guests: number;
  date: string;
  time: string;
  seatingPreference: 'Indoor Luxury Hall' | 'Rooftop Terrace' | 'VIP Private Dining' | 'Courtyard Garden';
  occasion?: string;
  specialRequests?: string;
  status: ReservationStatus;
  createdAt: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'error' | 'info';
}
