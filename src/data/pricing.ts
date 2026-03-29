import { HomeSize, CleaningType, Condition, Frequency } from '@/types';

export const BASE_PRICES: Record<HomeSize, number> = {
  studio: 80,
  '1bed': 100,
  '2bed': 130,
  '3bed': 170,
  '4bed_plus': 220,
};

export const HOME_SIZE_LABELS: Record<HomeSize, string> = {
  studio: 'Studio',
  '1bed': '1 Bedroom',
  '2bed': '2 Bedrooms',
  '3bed': '3 Bedrooms',
  '4bed_plus': '4+ Bedrooms',
};

export const TYPE_MULTIPLIERS: Record<CleaningType, number> = {
  standard: 1.0,
  deep: 1.5,
  move_in_out: 1.75,
  airbnb: 1.25,
};

export const CLEANING_TYPE_LABELS: Record<CleaningType, string> = {
  standard: 'Standard Cleaning',
  deep: 'Deep Cleaning',
  move_in_out: 'Move-In / Move-Out',
  airbnb: 'Airbnb / Short-Term Rental',
};

export const CONDITION_MULTIPLIERS: Record<Condition, number> = {
  light: 1.0,
  medium: 1.2,
  heavy: 1.5,
};

export const CONDITION_LABELS: Record<Condition, string> = {
  light: 'Light (Already Clean)',
  medium: 'Medium',
  heavy: 'Heavy (Very Dirty)',
};

export const ADDON_PRICES = {
  fridge: 20,
  oven: 25,
  windows: 30,
  laundry: 15,
  petHair: 20,
} as const;

export const ADDON_LABELS: Record<keyof typeof ADDON_PRICES, string> = {
  fridge: 'Inside Fridge',
  oven: 'Inside Oven',
  windows: 'Windows',
  laundry: 'Laundry',
  petHair: 'Pet Hair Removal',
};

export const FREQUENCY_DISCOUNTS: Record<Frequency, number> = {
  one_time: 0,
  weekly: 0.10,
  biweekly: 0.05,
  monthly: 0,
};

export const FREQUENCY_LABELS: Record<Frequency, string> = {
  one_time: 'One-Time',
  weekly: 'Weekly (10% off)',
  biweekly: 'Bi-Weekly (5% off)',
  monthly: 'Monthly',
};
