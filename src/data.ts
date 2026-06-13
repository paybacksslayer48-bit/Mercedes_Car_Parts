import { Product } from './types';

export const COMPATIBLE_MODELS = [
  'C-Class (W205/W206)',
  'E-Class (W213/W214)',
  'S-Class (W222/W223)',
  'G-Wagon G63 (W463A)',
  'AMG GT (C190/C192)',
  'GLE Coupe (V167)',
  'CLS Coupe (C257)'
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    oemNumber: 'A2234011700',
    name: 'AMG Forged Cross-Spoke Turbine Wheel Set R21',
    nameRu: 'AMG Forged Cross-Spoke Turbine Wheel Set R21',
    category: 'wheels',
    description: 'Original lightweight forged Mercedes-AMG turbine styling rims in Matte Black with brushed silver outer lip. Extremely durable and dynamic design as seen on S63 and AMG GT Coupes.',
    descriptionRu: 'AMG Forged Cross-Spoke Turbine Wheel Set R21',
    priceEur: 3600,
    condition: 'refurbished',
    conditionRu: 'Refurbished',
    images: [
      'https://images.unsplash.com/photo-1611245801311-5a0248d28e78?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800'
    ],
    specs: {
      Size: '21 Inches (9.5J ET33 Front, 10.5J ET50 Rear)',
      BoltPattern: '5x112',
      Material: 'Forged Aluminum',
      Compatibility: 'S-Class W222/W223, E-Class W213, AMG GT 4-door'
    },
    specsRu: {
      Size: '21 Inches (9.5J ET33 Front, 10.5J ET50 Rear)',
      BoltPattern: '5x112',
      Material: 'Forged Aluminum',
      Compatibility: 'S-Class W222/W223, E-Class W213, AMG GT 4-door'
    },
    compatibleModels: ['S-Class (W222/W223)', 'E-Class (W213/W214)', 'AMG GT (C190/C192)'],
    inStock: true,
    isPinned: true
  },
  {
    id: 'prod-2',
    oemNumber: 'A1770104802',
    name: 'Mercedes-AMG 4.0L V8 Biturbo Engine M177',
    nameRu: 'Mercedes-AMG 4.0L V8 Biturbo Engine M177',
    category: 'engines',
    description: 'Iconic hand-assembled AMG V8 BiTurbo power unit. Includes the premium AMG red-accented carbon fiber engine cover, wiring harnesses, manifolds, and fuel pump assembly. Dyno-tested under 15,000 km.',
    descriptionRu: 'Mercedes-AMG 4.0L V8 Biturbo Engine M177',
    priceEur: 14500,
    condition: 'original-used',
    conditionRu: 'Original Used',
    images: [
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=800'
    ],
    specs: {
      Displacement: '3982 cc (V8 Twin-Scroll Turbo)',
      Power: '585 HP / 850 Nm',
      EngineCode: 'M177.980',
      Mileage: '14,300 km (Verified with document history)'
    },
    specsRu: {
      Displacement: '3982 cc (V8 Twin-Scroll Turbo)',
      Power: '585 HP / 850 Nm',
      EngineCode: 'M177.980',
      Mileage: '14,300 km (Verified with document history)'
    },
    compatibleModels: ['G-Wagon G63 (W463A)', 'E-Class (W213/W214)', 'AMG GT (C190/C192)'],
    inStock: true,
    isPinned: true
  },
  {
    id: 'prod-3',
    oemNumber: 'A0004603912',
    name: 'AMG Performance Carbon & Alcantara Steering Wheel',
    nameRu: 'AMG Performance Carbon & Alcantara Steering Wheel',
    category: 'interiors',
    description: 'Full custom upgrade kit: Genuine gloss carbon fiber, ultra-grip Alcantara sides, deep red 12 o\'clock racing ring, dynamic drive control OLED dials, and fully custom aluminum paddle shifters.',
    descriptionRu: 'AMG Performance Carbon & Alcantara Steering Wheel',
    priceEur: 1650,
    condition: 'new',
    conditionRu: 'New Genuine',
    images: [
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=800'
    ],
    specs: {
      Material: 'Carbon Fiber, Dynamic Alcantara',
      Stitching: 'Contrast red high-tension threads',
      ExtraFeatures: 'OLED steering controls, touch capacitive sensors'
    },
    specsRu: {
      Material: 'Carbon Fiber, Dynamic Alcantara',
      Stitching: 'Contrast red high-tension threads',
      ExtraFeatures: 'OLED steering controls, touch capacitive sensors'
    },
    compatibleModels: ['C-Class (W205/W206)', 'E-Class (W213/W214)', 'S-Class (W222/W223)', 'AMG GT (C190/C192)', 'GLE Coupe (V167)'],
    inStock: true,
    isPinned: true
  },
  {
    id: 'prod-4',
    oemNumber: 'A2229068004',
    name: 'Multibeam LED Intelligent Headlight Set',
    nameRu: 'Multibeam LED Intelligent Headlight Set',
    category: 'optics',
    description: 'Complete retrofit headlight kit including OEM driver control modules. Offers fully adaptive highlight patterns, beautiful Mercedes-blue starting illumination sweep, and exceptional nighttime range.',
    descriptionRu: 'Multibeam LED Intelligent Headlight Set',
    priceEur: 2400,
    condition: 'refurbished',
    conditionRu: 'Refurbished',
    images: [
      'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1549399542-7043b8e764d0?auto=format&fit=crop&q=80&w=800'
    ],
    specs: {
      Technology: 'Adaptive Multibeam LED Technology (84 individual LEDs)',
      Voltage: '12V OEM standard',
      Includes: 'Left and Right headlamps, 4x adaptive control modules'
    },
    specsRu: {
      Technology: 'Adaptive Multibeam LED Technology (84 individual LEDs)',
      Voltage: '12V OEM standard',
      Includes: 'Left and Right headlamps, 4x adaptive control modules'
    },
    compatibleModels: ['S-Class (W222/W223)', 'E-Class (W213/W214)'],
    inStock: true,
    isPinned: false
  },
  {
    id: 'prod-5',
    oemNumber: 'A2138855400',
    name: 'S63 / E63 AMG Carbon Fiber Aerodynamic Body Kit',
    nameRu: 'S63 / E63 AMG Carbon Fiber Aerodynamic Body Kit',
    category: 'bodykits',
    description: 'Exquisite custom racing body layout. Includes complete AMG-styled front bumper, customized GT Panamericana vertical grille, rear carbon fiber diffuser layout, and integrated gloss chrome dual Exhaust muffler tips.',
    descriptionRu: 'S63 / E63 AMG Carbon Fiber Aerodynamic Body Kit',
    priceEur: 4900,
    condition: 'new',
    conditionRu: 'New Genuine',
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=800'
    ],
    specs: {
      Material: 'Pre-preg Dry Carbon & High Impact Polypropylene (PP)',
      ExhaustTips: 'Chrome Quad Sport tips engraved with "AMG"',
      Installation: 'Direct clip mount to factory brackets'
    },
    specsRu: {
      Material: 'Pre-preg Dry Carbon & High Impact Polypropylene (PP)',
      ExhaustTips: 'Chrome Quad Sport tips engraved with "AMG"',
      Installation: 'Direct clip mount to factory brackets'
    },
    compatibleModels: ['S-Class (W222/W223)', 'E-Class (W213/W214)', 'CLS Coupe (C257)'],
    inStock: true,
    isPinned: false
  },
  {
    id: 'prod-6',
    oemNumber: 'A4639019902',
    name: 'Genuine Mercedes-AMG Engine ECU/DME Bosch Code',
    nameRu: 'Genuine Mercedes-AMG Engine ECU/DME Bosch Code',
    category: 'electronics',
    description: 'High-end engine management unit (Bosch/Mercedes-Benz OEM). Fully compatible with custom detailing tuning projects, software mapping, and ECU retrofits. Sold uncoded, ready for immediate VIN flashing.',
    descriptionRu: 'Genuine Mercedes-AMG Engine ECU/DME Bosch Code',
    priceEur: 990,
    condition: 'new',
    conditionRu: 'New Genuine',
    images: [
      'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800'
    ],
    specs: {
      Manufacturer: 'Bosch for Mercedes-Benz',
      Protocol: 'CAN-bus Standard High-Speed',
      ProgrammingStatus: 'Unlocked (Uncoded / Virgin status)'
    },
    specsRu: {
      Manufacturer: 'Bosch for Mercedes-Benz',
      Protocol: 'CAN-bus Standard High-Speed',
      ProgrammingStatus: 'Unlocked (Uncoded / Virgin status)'
    },
    compatibleModels: ['C-Class (W205/W206)', 'E-Class (W213/W214)', 'S-Class (W222/W223)', 'G-Wagon G63 (W463A)'],
    inStock: true,
    isPinned: false
  }
];
