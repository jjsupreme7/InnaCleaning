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

export interface Service {
  id: string;
  title: string;
  description: string;
  includes: string[];
  startingPrice: number;
  icon: string;
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
