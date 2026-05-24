import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    name: 'Lámpara LED Portátil Aura',
    tagline: 'Luz ambiental que te acompaña.',
    description: 'Una luminaria de aluminio fundido a presión con atenuador táctil integrado de tres intensidades y carga inalámbrica. Su difusor de polímero sella la luz, recreando el suave resplandor del atardecer en cualquier rincón.',
    price: 129.00,
    category: 'iluminación',
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800&auto=format&fit=crop',
    features: [
      'Batería recargable USB-C de hasta 18 horas',
      'Protección contra exteriores e interior (IP54)',
      'Tres niveles de atenuación capacitiva táctil'
    ],
    dimensions: 'Ø 12 cm x Alto 24 cm',
    material: 'Aluminio anodizado mate & Difusor opal',
    rating: 4.9,
    reviewsCount: 42,
    featured: true
  },
  {
    id: 'prod-002',
    name: 'Vajilla Cerámica Orgánica Set',
    tagline: 'Tierra cocida de tacto primitivo.',
    description: 'Un set de tres piezas moldeadas y esmaltadas a mano en el norte de Portugal. Cada taza y cuenco presenta variaciones sutiles de color y forma, convirtiendo el desayuno en un ritual artesanal.',
    price: 64.00,
    category: 'hogar',
    imageUrl: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?q=80&w=800&auto=format&fit=crop',
    features: [
      'Gres de alta resistencia térmica',
      'Esmalte mate libre de plomo',
      'Apto para microondas y lavavajillas profesional'
    ],
    dimensions: 'Cuenco Ø 16cm, Taza Ø 8cm, Plato Ø 21cm',
    material: 'Cerámica gres esmaltada a alta temperatura',
    rating: 4.8,
    reviewsCount: 31,
    featured: true
  },
  {
    id: 'prod-003',
    name: 'Funda de Cojín de Lino Sólido',
    tagline: 'Texturas naturales para la calma diaria.',
    description: 'Tejido artesanalmente con hilos de lino 100% orgánico lavado a la piedra para una suavidad insuperable. Su cremallera oculta en la base conserva el aire rústico pero refinado.',
    price: 36.00,
    category: 'hogar',
    imageUrl: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=800&auto=format&fit=crop',
    features: [
      'Lino 100% cultivado de forma sostenible',
      'Lienzo transpirable y pre-encogido',
      'Cierre invisible YKK oculto'
    ],
    dimensions: '50 cm x 50 cm',
    material: 'Lino 100% natural prelavado',
    rating: 4.7,
    reviewsCount: 18
  },
  {
    id: 'prod-004',
    name: 'Reloj de Cemento Escandinavo',
    tagline: 'La eternidad del material en el tiempo.',
    description: 'Reloj de escritorio moldeado en concreto pulido con manecillas de madera de nogal americano. Una combinación de solidez mineral y calidez vegetal que define la puntualidad con serenidad.',
    price: 78.00,
    category: 'hogar',
    imageUrl: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=800&auto=format&fit=crop',
    features: [
      'Maquinaria de cuarzo alemana ultrasilenciosa',
      'Base nivelada con fieltro protector protector de superficies',
      'Cada pieza posee un patrón de burbujas de aire único'
    ],
    dimensions: 'Ø 15 cm x Profundidad 4.5 cm',
    material: 'Concreto pulido artesanal & Madera de Nogal',
    rating: 4.9,
    reviewsCount: 26,
    featured: true
  },
  {
    id: 'prod-005',
    name: 'Tetera Hervidor de Acero Matte',
    tagline: 'Geometría y funcionalidad al servir.',
    description: 'Un icono de la cocina reposada. Su cuello de cisne pulido está diseñado para ofrecer un control de flujo milimétrico, ideal para café de filtro e infusiones gourmet. Acabado en teflón negro mate.',
    price: 89.00,
    category: 'accesorios',
    imageUrl: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?q=80&w=800&auto=format&fit=crop',
    features: [
      'Boquilla cuello de cisne para vertido preciso',
      'Mango ergonómico de resina fría compensado en contrapeso',
      'Compatible con placas de inducción, gas y vitrocerámica'
    ],
    dimensions: 'Ancho 27 cm (con mango) x Alto 16 cm (1.2L)',
    material: 'Acero inoxidable 304 con revestimiento de Teflón',
    rating: 4.9,
    reviewsCount: 54,
    featured: true
  },
  {
    id: 'prod-006',
    name: 'Tarjetero de Cuero Curtido',
    tagline: 'La esencia de tus bolsillos, simplificada.',
    description: 'Cartera ultra-ajustada cosida a mano con hilos encerados de alta tensión. Confeccionada con cuero italiano curtido al extracto de mimosa, que envejecerá revelando una pátina única y brillante.',
    price: 55.00,
    category: 'accesorios',
    imageUrl: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?q=80&w=800&auto=format&fit=crop',
    features: [
      'Capacidad óptima para 4 tarjetas y billetes doblados',
      'Cosido artesanal con hilo de lino encerado a dos agujas',
      'Bordes bruñidos a mano con cera de abejas natural'
    ],
    dimensions: '10 cm x 7 cm x Espesor 0.4 cm',
    material: 'Cuero vacuno italiano de curtido vegetal',
    rating: 5.0,
    reviewsCount: 15
  },
  {
    id: 'prod-007',
    name: 'Difusor de Incienso Monolito',
    tagline: 'Refugio de aromas, escultural y pesado.',
    description: 'Un bloque macizo de esteatita labrada a mano para asentar tus varitas de incienso favoritas. Los residuos quedan recogidos en su canal superior pulido, dejando pasar el humo a través de su aire minimal.',
    price: 24.00,
    category: 'accesorios',
    imageUrl: 'https://images.unsplash.com/photo-1602872030219-cbf948a91018?q=80&w=800&auto=format&fit=crop',
    features: [
      'Esteatita natural resistente al calor extremo',
      'Canal de recogida tallado a máquina CNC de precisión',
      'Cojinete de silicona antideslizante en la base'
    ],
    dimensions: '18 cm x 3.5 cm x Alto 2.2 cm',
    material: 'Esteatita (piedra de jabón) maciza gris carbón',
    rating: 4.6,
    reviewsCount: 9
  },
  {
    id: 'prod-008',
    name: 'Colgante de Techo Silueta S',
    tagline: 'Corte puro en la oscuridad.',
    description: 'Una pantalla delgada cónica de acero hilado que proyecta una luz puntual suave y directa. Su cable recubierto de textil tejido añade una caída perfecta de peso que estiliza todo salón o comedor contemporáneo.',
    price: 195.00,
    category: 'iluminación',
    imageUrl: 'https://images.unsplash.com/photo-1565814636199-ae8133055c1c?q=80&w=800&auto=format&fit=crop',
    features: [
      'Cable textil ajustable de hasta 2 metros de longitud',
      'Rosetón de techo metálico lacado a tono',
      'Zócalo cerámico estándar E27'
    ],
    dimensions: 'Ø 30 cm x Alto 18 cm',
    material: 'Acero hilado recubierto en polvo microtexturizado',
    rating: 4.8,
    reviewsCount: 21
  }
];
