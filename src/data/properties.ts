export type PropertyTechnicalItem = {
  label: string
  value: string
}

export type PropertyFloorPlan = {
  label: string
  image: string
}

export type Property = {
  id: string
  title: string
  city: string
  price: string
  bedrooms: number
  bathrooms: number
  parking: number
  areaSqm: number
  image: string
  images: string[]
  description: string
  technicalSheet: PropertyTechnicalItem[]
  floorPlans: PropertyFloorPlan[]
}

const FLOOR_PLAN_A =
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80'
const FLOOR_PLAN_B =
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80'

type PropertySeed = Omit<
  Property,
  'images' | 'description' | 'technicalSheet' | 'floorPlans'
> & {
  type: string
  condoFee?: string
  iptu?: string
  extraImages: string[]
  floorPlanLabels?: [string, string]
}

function buildProperty(seed: PropertySeed): Property {
  const floorLabels = seed.floorPlanLabels ?? ['Planta térrea', 'Planta superior']

  return {
    id: seed.id,
    title: seed.title,
    city: seed.city,
    price: seed.price,
    bedrooms: seed.bedrooms,
    bathrooms: seed.bathrooms,
    parking: seed.parking,
    areaSqm: seed.areaSqm,
    image: seed.image,
    images: [seed.image, ...seed.extraImages],
    description: `${seed.title} em ${seed.city}. Imóvel ${seed.type.toLowerCase()} com ${seed.bedrooms} quartos, ${seed.bathrooms} banheiros, ${seed.parking} vagas e ${seed.areaSqm} m² de área. Consulte condições e disponibilidade com nossa equipe.`,
    technicalSheet: [
      { label: 'Nome', value: seed.title },
      { label: 'Localização', value: seed.city },
      { label: 'Tipo', value: seed.type },
      { label: 'Quartos', value: String(seed.bedrooms) },
      { label: 'Banheiros', value: String(seed.bathrooms) },
      { label: 'Vagas', value: String(seed.parking) },
      { label: 'Metragem', value: `${seed.areaSqm} m²` },
      { label: 'Valor', value: `A partir de ${seed.price}` },
      ...(seed.condoFee
        ? [{ label: 'Condomínio', value: seed.condoFee }]
        : []),
      ...(seed.iptu ? [{ label: 'IPTU', value: seed.iptu }] : []),
      { label: 'Situação', value: 'Disponível para consulta' },
    ],
    floorPlans: [
      { label: floorLabels[0], image: FLOOR_PLAN_A },
      { label: floorLabels[1], image: FLOOR_PLAN_B },
    ],
  }
}

export const PROPERTIES: Property[] = [
  buildProperty({
    id: '1',
    title: 'Casa com área gourmet e piscina',
    city: 'Florianópolis, SC',
    price: 'R$ 1.850.000',
    bedrooms: 4,
    bathrooms: 3,
    parking: 2,
    areaSqm: 280,
    type: 'Casa',
    condoFee: 'R$ 850/mês',
    iptu: 'R$ 4.200/ano',
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    extraImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80',
    ],
    floorPlanLabels: ['Planta térrea', 'Área gourmet e piscina'],
  }),
  buildProperty({
    id: '2',
    title: 'Apartamento alto padrão frente mar',
    city: 'Balneário Camboriú, SC',
    price: 'R$ 2.420.000',
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    areaSqm: 145,
    type: 'Apartamento',
    condoFee: 'R$ 1.650/mês',
    iptu: 'R$ 5.800/ano',
    image:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    extraImages: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    ],
  }),
  buildProperty({
    id: '3',
    title: 'Cobertura com vista panorâmica',
    city: 'São José, SC',
    price: 'R$ 1.290.000',
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    areaSqm: 198,
    type: 'Cobertura',
    condoFee: 'R$ 1.120/mês',
    iptu: 'R$ 3.900/ano',
    image:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
    extraImages: [
      'https://images.unsplash.com/photo-1600047509808-ba888f28d66c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600210492493-0946911128ea?auto=format&fit=crop&w=800&q=80',
    ],
  }),
  buildProperty({
    id: '4',
    title: 'Sobrado em condomínio fechado',
    city: 'Palhoça, SC',
    price: 'R$ 980.000',
    bedrooms: 4,
    bathrooms: 3,
    parking: 3,
    areaSqm: 220,
    type: 'Sobrado',
    condoFee: 'R$ 620/mês',
    iptu: 'R$ 2.800/ano',
    image:
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
    extraImages: [
      'https://images.unsplash.com/photo-1600573472550-8090b5e0845b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
    ],
  }),
  buildProperty({
    id: '5',
    title: 'Apartamento garden com deck',
    city: 'Biguaçu, SC',
    price: 'R$ 760.000',
    bedrooms: 2,
    bathrooms: 2,
    parking: 2,
    areaSqm: 112,
    type: 'Apartamento garden',
    condoFee: 'R$ 490/mês',
    iptu: 'R$ 1.950/ano',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    extraImages: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80',
    ],
  }),
  buildProperty({
    id: '6',
    title: 'Casa térrea com quintal amplo',
    city: 'Santo Amaro da Imperatriz, SC',
    price: 'R$ 690.000',
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    areaSqm: 165,
    type: 'Casa térrea',
    iptu: 'R$ 1.400/ano',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    extraImages: [
      'https://images.unsplash.com/photo-1600047509773-0b25df891304?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80',
    ],
  }),
  buildProperty({
    id: '7',
    title: 'Loft moderno no centro',
    city: 'Florianópolis, SC',
    price: 'R$ 820.000',
    bedrooms: 2,
    bathrooms: 1,
    parking: 1,
    areaSqm: 95,
    type: 'Loft',
    condoFee: 'R$ 780/mês',
    iptu: 'R$ 2.100/ano',
    image:
      'https://images.unsplash.com/photo-1600047509808-ba888f28d66c?auto=format&fit=crop&w=800&q=80',
    extraImages: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c68fb0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    ],
  }),
  buildProperty({
    id: '8',
    title: 'Mansão com vista para o mar',
    city: 'Garopaba, SC',
    price: 'R$ 3.200.000',
    bedrooms: 5,
    bathrooms: 4,
    parking: 4,
    areaSqm: 420,
    type: 'Casa de alto padrão',
    condoFee: 'R$ 0',
    iptu: 'R$ 9.500/ano',
    image:
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
    extraImages: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
    ],
    floorPlanLabels: ['Pavimento social', 'Suítes e área íntima'],
  }),
]

export function getPropertyById(id: string): Property | undefined {
  return PROPERTIES.find((p) => p.id === id)
}
