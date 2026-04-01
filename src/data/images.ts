export const siteImages = {
  heroHome:
    'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1800&q=80',
  aboutInna:
    'https://images.unsplash.com/photo-1647381518264-97ff1835026f?auto=format&fit=crop&w=1200&q=80',
  cleanKitchen:
    'https://images.unsplash.com/photo-1610276173132-c47d148ab626?auto=format&fit=crop&w=1400&q=80',
  cleanKitchenMoody:
    'https://images.unsplash.com/photo-1681395565141-7fef718af7e0?auto=format&fit=crop&w=1400&q=80',
  cleanSupplies:
    'https://images.unsplash.com/photo-1620563923430-f5845a5ddfb8?auto=format&fit=crop&w=1200&q=80',
  livingRoom:
    'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1200&q=80',
  bathroom:
    'https://images.unsplash.com/photo-1661107259637-4e1c55462428?auto=format&fit=crop&w=1200&q=80',
  bathroomVanity:
    'https://images.unsplash.com/photo-1759691337823-5b348f5fd98d?auto=format&fit=crop&w=1200&q=80',
} as const;

export const serviceImages = {
  standard: siteImages.livingRoom,
  deep: siteImages.cleanKitchen,
  move: siteImages.cleanKitchenMoody,
  airbnb: siteImages.bathroom,
} as const;

export const galleryImages = [
  siteImages.cleanKitchen,
  siteImages.bathroom,
  siteImages.livingRoom,
  siteImages.cleanKitchenMoody,
  siteImages.bathroomVanity,
  siteImages.cleanSupplies,
] as const;
