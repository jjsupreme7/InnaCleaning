import { Service } from '@/types';

export const services: Service[] = [
  {
    id: 'standard',
    title: 'Standard Cleaning',
    description: 'A thorough cleaning of your entire home, perfect for regular upkeep and maintaining a fresh, tidy space.',
    includes: [
      'Dusting all surfaces (furniture, shelves, baseboards, décor)',
      'Vacuuming floors and carpets',
      'Mopping all hard floors',
      'Kitchen cleaning (countertops, exterior of appliances, sink, stovetop, microwave outside/inside light clean)',
      'Bathroom cleaning (toilets, showers, tubs, sinks, mirrors)',
      'Wiping mirrors and glass surfaces',
      'Trash removal',
      'Light organizing (tidying up surfaces)',
      'Spot cleaning doors, handles, and light switches',
    ],
    startingPrice: 80,
    icon: 'Sparkles',
  },
  {
    id: 'deep',
    title: 'Deep Cleaning',
    description: 'An intensive, top-to-bottom cleaning that reaches every corner. Ideal for homes that need extra attention.',
    includes: [
      'Detailed dusting of all surfaces including baseboards, window sills, blinds, and décor',
      'Cleaning behind and under accessible furniture',
      'Deep vacuuming of carpets and rugs (including edges and corners)',
      'Thorough mopping of all floors',
    ],
    startingPrice: 120,
    icon: 'Paintbrush',
  },
  {
    id: 'move',
    title: 'Move-In / Move-Out',
    description: 'Complete cleaning of all empty spaces — get your home spotless for new tenants or leave it pristine when you move.',
    includes: [
      'Complete cleaning of all empty spaces',
      'Detailed dust removal from all surfaces, baseboards, window sills, and edges',
      'Cleaning inside closets, shelves, and storage areas',
      'Vacuuming and mopping all floors',
      'Removing dust, debris, and buildup left from moving',
    ],
    startingPrice: 140,
    icon: 'PackageOpen',
  },
  {
    id: 'airbnb',
    title: 'Airbnb / Short-Term Rental',
    description: 'Full cleaning and reset of the property between guests. Keep your ratings high with a consistently spotless space.',
    includes: [
      'Full cleaning and reset of the property between guests',
      'Dusting all surfaces, furniture, and décor',
      'Vacuuming and mopping all floors',
      'Cleaning and sanitizing high-touch areas',
      'Trash removal and replacement of liners',
    ],
    startingPrice: 100,
    icon: 'Home',
  },
];
