export interface Room {
  id: string;
  name: string;
  roomNumber: string;
  type: 'Single' | 'Double' | 'Suite' | 'Deluxe';
  pricePerNight: number;
  description: string;
  amenities: string[];
  imageUrl: string;
  status: 'Available' | 'Occupied' | 'Maintenance';
  capacity: number;
}

export interface Booking {
  id: string;
  roomId: string;
  clientId: string;
  checkInDate: string; // ISO Date string
  checkOutDate: string; // ISO Date string
  numberOfGuests: number;
  status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';
  totalAmount: number;
  notes?: string;
  createdAt: string; // ISO Date string
}

export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  nationality?: string;
  dateOfBirth?: string; // ISO Date string
  preferences?: string[];
  totalSpent?: number;
  loyaltyTier?: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  createdAt: string; // ISO Date string
}

export interface User { // Employee User
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Receptionist' | 'Housekeeping';
  phone?: string;
  isActive: boolean;
  lastLogin?: string; // ISO Date string
  createdAt: string; // ISO Date string
}

export interface Invoice {
  id: string;
  bookingId: string;
  clientId: string;
  issueDate: string; // ISO Date string
  dueDate: string; // ISO Date string
  amountDue: number;
  amountPaid: number;
  status: 'Draft' | 'Sent' | 'Paid' | 'Overdue' | 'Void';
  items: InvoiceItem[];
  notes?: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface HotelStats {
  totalRooms: number;
  occupiedRooms: number;
  availableRooms: number;
  occupancyRate: number;
  upcomingCheckIns: number;
  upcomingCheckOuts: number;
  totalRevenueMonth: number;
  averageRoomRate: number;
}
