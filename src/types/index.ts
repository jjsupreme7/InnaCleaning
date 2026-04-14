export type HomeSize = 'studio' | '1bed' | '2bed' | '3bed' | '4bed_plus';
export type CleaningType = 'standard' | 'deep' | 'move_in_out' | 'airbnb';
export type Condition = 'light' | 'medium' | 'heavy';
export type Frequency = 'one_time' | 'weekly' | 'biweekly' | 'monthly';

export interface Addons {
  fridge: boolean;
  oven: boolean;
  windows: boolean;
  laundry: boolean;
  petHair: boolean;
}

export interface QuoteState {
  step: number;
  homeSize: HomeSize | null;
  cleaningType: CleaningType | null;
  condition: Condition | null;
  addons: Addons;
  frequency: Frequency | null;
  name: string;
  email: string;
}

export interface PriceBreakdown {
  basePrice: number;
  afterType: number;
  afterCondition: number;
  addonsTotal: number;
  subtotal: number;
  discount: number;
  total: number;
}

export type ServiceId = 'kitchen' | 'bathrooms' | 'bedrooms' | 'livingAreas' | 'airbnb' | 'additional';

export interface ServiceMeta {
  id: ServiceId;
  startingPrice: number;
  icon: 'ChefHat' | 'Bath' | 'Bed' | 'Sofa' | 'Home' | 'Sparkles';
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  service: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

// CRM types
export type LeadStatus = 'new_lead' | 'contacted' | 'quote_sent' | 'follow_up' | 'booked' | 'lost';
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'canceled';
export type NoteType = 'note' | 'call' | 'email';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  source: string;
  status: LeadStatus;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface LeadNote {
  id: string;
  lead_id: string;
  content: string;
  type: NoteType;
  created_at: string;
}
