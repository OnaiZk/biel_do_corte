export interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
}

export interface Barber {
  id: string;
  name: string;
  role: string;
  experience: string;
  image: string;
  specialty: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export type PaymentStatus = 'pending' | 'paid';

export interface Appointment {
  _id: string;
  clientName: string;
  phone: string;
  serviceId: string;
  serviceName: string;
  servicePrice: string;
  date: string;
  time: string;
  userId?: string;
  paymentStatus: PaymentStatus;
  createdAt: number;
}
