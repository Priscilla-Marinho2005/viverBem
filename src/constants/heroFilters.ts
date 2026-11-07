import type { FilterOption } from '../components/HeroFilterSelect'

export const CITY_OPTIONS: FilterOption[] = [
  { value: '', label: 'Todas as cidades' },
  { value: 'recife', label: 'Recife' },
  { value: 'olinda', label: 'Olinda' },
  { value: 'jaboatao', label: 'Jaboatão dos Guararapes' },
  { value: 'paulista', label: 'Paulista' },
  { value: 'cabo', label: 'Cabo de Santo Agostinho' },
  { value: 'camaragibe', label: 'Camaragibe' },
  { value: 'garanhuns', label: 'Garanhuns' },
]

export const AREA_OPTIONS: FilterOption[] = [
  { value: '', label: 'Qualquer metragem' },
  { value: 'ate-80', label: 'Até 80 m²' },
  { value: '80-150', label: '80 m² a 150 m²' },
  { value: '150-250', label: '150 m² a 250 m²' },
  { value: '250+', label: 'Acima de 250 m²' },
]

export const BEDROOM_OPTIONS: FilterOption[] = [
  { value: '', label: 'Qualquer quantidade' },
  { value: '1', label: '1 quarto' },
  { value: '2', label: '2 quartos' },
  { value: '3', label: '3 quartos' },
  { value: '4', label: '4 quartos' },
  { value: '5+', label: '5 ou mais' },
]
