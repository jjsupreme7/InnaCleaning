export interface ServiceArea {
  city: string;
  zips: string[];
}

export const serviceAreas: ServiceArea[] = [
  {
    city: 'Seattle',
    zips: [
      '98101', '98102', '98103', '98104', '98105', '98106', '98107', '98108',
      '98109', '98112', '98115', '98116', '98117', '98118', '98119', '98121',
      '98122', '98125', '98126', '98133', '98134', '98136', '98144', '98146',
      '98154', '98164', '98166', '98168', '98174', '98177', '98178', '98195',
      '98199',
    ],
  },
  {
    city: 'Tacoma',
    zips: [
      '98402', '98403', '98404', '98405', '98406', '98407', '98408', '98409',
      '98418', '98421', '98422', '98424', '98443', '98444', '98445', '98446',
      '98465', '98466', '98467',
    ],
  },
  {
    city: 'Kent',
    zips: ['98030', '98031', '98032', '98042'],
  },
  {
    city: 'Federal Way',
    zips: ['98003', '98023', '98063', '98093'],
  },
  {
    city: 'Puyallup',
    zips: ['98371', '98372', '98373', '98374', '98375'],
  },
  {
    city: 'Bonney Lake',
    zips: ['98391'],
  },
  {
    city: 'Maple Valley',
    zips: ['98038'],
  },
  {
    city: 'Graham',
    zips: ['98338'],
  },
  {
    city: 'Sumner',
    zips: ['98352', '98390'],
  },
  {
    city: 'Spanaway',
    zips: ['98387'],
  },
];

export function findServiceAreaByZip(zip: string): ServiceArea | null {
  const normalized = zip.trim();
  if (!/^\d{5}$/.test(normalized)) return null;
  return serviceAreas.find((area) => area.zips.includes(normalized)) ?? null;
}
