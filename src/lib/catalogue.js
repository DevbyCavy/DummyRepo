import work from '../content/work.json';

// Catalogue display order; any category not listed here is appended at the end.
const ORDER = [
  'Living Rooms',
  'Bedrooms',
  'Wardrobes',
  'Kitchens & Dining',
  'Entryways',
  'Feature Mirrors',
  'Wall Panelling',
  'Ceilings',
  'Commercial',
  'Exterior Painting',
];

// Cover photo shown for each category on category cards.
const COVERS = {
  'Living Rooms': 'living-backlit-stone-tv-wall',
  Bedrooms: 'bedroom-carved-tufted-bed',
  Wardrobes: 'wardrobe-oak-walk-in',
  'Kitchens & Dining': 'kitchen-glass-display-unit',
  Entryways: 'entry-gold-arched-mirror',
  'Feature Mirrors': 'mirror-window-pane-lounge',
  'Wall Panelling': 'panelling-gallery-hallway',
  Ceilings: 'ceiling-curved-chandelier',
  Commercial: 'commercial-service-station',
  'Exterior Painting': 'exterior-portico-painting',
};

export const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export const workByName = (name) => work.find((w) => w.image === name);

export const CATEGORIES = [...new Set([...ORDER, ...work.map((w) => w.category)])]
  .map((title) => {
    const items = work.filter((w) => w.category === title);
    return {
      title,
      slug: slugify(title),
      items,
      cover: workByName(COVERS[title]) || items[0],
      href: `/catalogue?category=${slugify(title)}`,
    };
  })
  .filter((c) => c.items.length);

export const categoryByTitle = (title) => CATEGORIES.find((c) => c.title === title);
