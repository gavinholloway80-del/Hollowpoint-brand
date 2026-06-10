export type Category =
  | 'Hoodies'
  | 'Tees'
  | 'Cargo'
  | 'Sneakers'
  | 'Accessories'

export interface Product {
  id: string
  name: string
  category: Category
  price: number
  compareAt?: number
  image: string
  hoverImage?: string
  badge?: 'New' | 'Best Seller' | 'Limited' | 'Sale'
  colors: string[]
  sizes: string[]
  description: string
  drop?: string
}

const img = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export const products: Product[] = [
  {
    id: 'hp-001',
    name: 'Nightshift Oversized Hoodie',
    category: 'Hoodies',
    price: 128,
    image: img('photo-1620799140408-edc6dcb6d633'),
    hoverImage: img('photo-1556821840-3a63f95609a7'),
    badge: 'Best Seller',
    colors: ['#0a0a0a', '#f5f5f0', '#ccff00'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description:
      'Heavyweight 480gsm fleece with a boxy drop-shoulder fit. Built oversized so it layers loud and lasts longer.',
    drop: 'Core',
  },
  {
    id: 'hp-002',
    name: 'Static Acid Graphic Tee',
    category: 'Tees',
    price: 54,
    compareAt: 72,
    image: img('photo-1521572163474-6864f9cf17ab'),
    hoverImage: img('photo-1503341504253-dff4815485f1'),
    badge: 'Sale',
    colors: ['#f5f5f0', '#0a0a0a', '#ff2db1'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description:
      'Premium combed cotton with a hand-screened acid graphic. Pre-washed for zero shrink and a vintage hand-feel.',
    drop: 'Core',
  },
  {
    id: 'hp-003',
    name: 'Tactical Utility Cargos',
    category: 'Cargo',
    price: 142,
    image: img('photo-1517445312882-bc9910d016b7'),
    hoverImage: img('photo-1473966968600-fa801b869a1a'),
    badge: 'New',
    colors: ['#0a0a0a', '#3a3a2a', '#5b5b4a'],
    sizes: ['28', '30', '32', '34', '36'],
    description:
      'Relaxed taper with eight functional pockets and adjustable ankle cinches. Ripstop cotton that takes a beating.',
    drop: 'Concrete',
  },
  {
    id: 'hp-004',
    name: 'Hollow Runner Low Sneaker',
    category: 'Sneakers',
    price: 165,
    image: img('photo-1542291026-7eec264c27ff'),
    hoverImage: img('photo-1606107557195-0e29a4b5b4aa'),
    badge: 'Limited',
    colors: ['#f5f5f0', '#0a0a0a', '#19e6ff'],
    sizes: ['7', '8', '9', '10', '11', '12'],
    description:
      'Sculpted low-top with a chunky cup sole and reflective heel pull. Premium leather and breathable mesh underlay.',
    drop: 'Velocity',
  },
  {
    id: 'hp-005',
    name: 'Voltage Beanie',
    category: 'Accessories',
    price: 38,
    image: img('photo-1576871337622-98d48d1cf531'),
    hoverImage: img('photo-1521369909029-2afed882baee'),
    badge: 'New',
    colors: ['#0a0a0a', '#ccff00', '#ff2db1'],
    sizes: ['One Size'],
    description:
      'Ribbed merino-blend cuff beanie with a rubberized wordmark tab. Warm, structured, and built to slouch right.',
    drop: 'Core',
  },
  {
    id: 'hp-006',
    name: 'Concrete Zip Hoodie',
    category: 'Hoodies',
    price: 136,
    image: img('photo-1591047139829-d91aecb6caea'),
    hoverImage: img('photo-1578768079052-aa76e52ff62e'),
    badge: 'Best Seller',
    colors: ['#5b5b4a', '#0a0a0a', '#f5f5f0'],
    sizes: ['S', 'M', 'L', 'XL'],
    description:
      'Full-zip with a double-layer hood and metal hardware. Garment-dyed for a worn-in concrete wash.',
    drop: 'Concrete',
  },
  {
    id: 'hp-007',
    name: 'Distortion Long Sleeve',
    category: 'Tees',
    price: 68,
    image: img('photo-1583743814966-8936f5b7be1a'),
    hoverImage: img('photo-1576566588028-4147f3842f27'),
    badge: 'New',
    colors: ['#0a0a0a', '#f5f5f0'],
    sizes: ['S', 'M', 'L', 'XL'],
    description:
      'Boxy long sleeve with sleeve-wrap glitch print. Mid-weight jersey that holds shape wash after wash.',
    drop: 'Velocity',
  },
  {
    id: 'hp-008',
    name: 'Grid Parachute Pants',
    category: 'Cargo',
    price: 158,
    image: img('photo-1594633312681-425c7b97ccd1'),
    hoverImage: img('photo-1551232864-3f0890e580d9'),
    badge: 'Limited',
    colors: ['#0a0a0a', '#5b5b4a'],
    sizes: ['28', '30', '32', '34', '36'],
    description:
      'Billowy parachute silhouette with bungee hems and a hidden zip stash. Wind-resistant tech nylon.',
    drop: 'Velocity',
  },
  {
    id: 'hp-009',
    name: 'Apex High-Top Sneaker',
    category: 'Sneakers',
    price: 188,
    image: img('photo-1556906781-9a412961c28c'),
    hoverImage: img('photo-1460353581641-37baddab0fa2'),
    badge: 'Limited',
    colors: ['#0a0a0a', '#f5f5f0', '#ccff00'],
    sizes: ['7', '8', '9', '10', '11', '12'],
    description:
      'Sculptural high-top with a padded collar and translucent acid outsole. A drop-only silhouette.',
    drop: 'Velocity',
  },
  {
    id: 'hp-010',
    name: 'Hardware Crossbody Bag',
    category: 'Accessories',
    price: 84,
    image: img('photo-1553062407-98eeb64c6a62'),
    hoverImage: img('photo-1547949003-9792a18a2601'),
    badge: 'Best Seller',
    colors: ['#0a0a0a', '#5b5b4a'],
    sizes: ['One Size'],
    description:
      'Water-resistant utility sling with magnetic buckle and webbing strap. Holds the essentials, hands free.',
    drop: 'Concrete',
  },
  {
    id: 'hp-011',
    name: 'Frequency Graphic Tee',
    category: 'Tees',
    price: 56,
    image: img('photo-1503342217505-b0a15ec3261c'),
    hoverImage: img('photo-1529374255404-311a2a4f1fd9'),
    badge: 'New',
    colors: ['#f5f5f0', '#0a0a0a'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description:
      'Oversized box-fit tee with a back-wide soundwave print. Heavy 240gsm cotton that drapes clean.',
    drop: 'Core',
  },
  {
    id: 'hp-012',
    name: 'Riot Cap',
    category: 'Accessories',
    price: 42,
    image: img('photo-1588850561407-ed78c282e89b'),
    hoverImage: img('photo-1521369909029-2afed882baee'),
    colors: ['#0a0a0a', '#ccff00', '#f5f5f0'],
    sizes: ['One Size'],
    description:
      'Unstructured 6-panel with a curved brim and embroidered wordmark. Adjustable strap-back fit.',
    drop: 'Core',
  },
]

export const categories: Category[] = [
  'Hoodies',
  'Tees',
  'Cargo',
  'Sneakers',
  'Accessories',
]

export const getProduct = (id: string) => products.find((p) => p.id === id)

export const newArrivals = products.filter((p) => p.badge === 'New')
export const bestSellers = products.filter((p) => p.badge === 'Best Seller')
export const limitedDrops = products.filter((p) => p.badge === 'Limited')

export interface Collection {
  slug: string
  name: string
  tagline: string
  description: string
  image: string
  items: number
}

export const collections: Collection[] = [
  {
    slug: 'concrete',
    name: 'Concrete',
    tagline: 'Washed tones. Heavy weights.',
    description:
      'Garment-dyed essentials built for the gray hours. Faded blacks, utility greens, and washed bones.',
    image: img('photo-1483985988355-763728e1935b', 1200),
    items: 18,
  },
  {
    slug: 'velocity',
    name: 'Velocity',
    tagline: 'Tech fabrics. Drop only.',
    description:
      'Performance nylons and sculpted silhouettes. Limited runs that move as fast as the city.',
    image: img('photo-1441986300917-64674bd600d8', 1200),
    items: 12,
  },
  {
    slug: 'core',
    name: 'Core',
    tagline: 'The everyday uniform.',
    description:
      'The pieces you reach for daily. Premium blanks, loud graphics, never out of rotation.',
    image: img('photo-1490481651871-ab68de25d43d', 1200),
    items: 24,
  },
]
