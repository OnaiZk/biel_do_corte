
import { Service } from './types';

export const SERVICES: Service[] = [
  {
    id: '1',
    name: 'Corte Masculino',
    description: 'Corte tradicional masculino com acabamento profissional.',
    price: 'R$ 35,00',
    duration: '30 min'
  },
  {
    id: '2',
    name: 'Barba',
    description: 'Modelagem e aparagem de barba com toalha quente.',
    price: 'R$ 25,00',
    duration: '20 min'
  },
  {
    id: '3',
    name: 'Sobrancelha',
    description: 'Design e aparagem de sobrancelhas masculinas.',
    price: 'R$ 10,00',
    duration: '10 min'
  },
  {
    id: '4',
    name: 'Bigode',
    description: 'Aparagem e modelagem de bigode.',
    price: 'R$ 5,00',
    duration: '10 min'
  },
  {
    id: '5',
    name: 'Pezinho',
    description: 'Acabamento na nuca e contorno.',
    price: 'R$ 15,00',
    duration: '10 min'
  },
  {
    id: '6',
    name: 'Penteado',
    description: 'Penteado para eventos e ocasiões especiais.',
    price: 'R$ 25,00',
    duration: '20 min'
  },
  {
    id: '7',
    name: 'Alisante',
    description: 'Tratamento de alisamento capilar.',
    price: 'R$ 30,00',
    duration: '45 min'
  },
  {
    id: '8',
    name: 'Progressiva',
    description: 'Escova progressiva para cabelos lisos e alinhados.',
    price: 'R$ 70,00',
    duration: '90 min'
  },
  {
    id: '9',
    name: 'Botox',
    description: 'Tratamento de botox capilar para hidratação profunda.',
    price: 'R$ 60,00',
    duration: '60 min'
  },
  {
    id: '10',
    name: 'Luzes',
    description: 'Mechas e luzes para um visual moderno.',
    price: 'R$ 70,00',
    duration: '90 min'
  },
  {
    id: '11',
    name: 'Platinado',
    description: 'Descoloração completa para cabelo platinado.',
    price: 'R$ 130,00',
    duration: '120 min'
  },
  {
    id: '12',
    name: 'Hidratação',
    description: 'Tratamento de hidratação para cabelos saudáveis.',
    price: 'R$ 20,00',
    duration: '30 min'
  },
  {
    id: '13',
    name: 'Pigmentação',
    description: 'Pigmentação capilar para cobertura de fios brancos.',
    price: 'R$ 20,00',
    duration: '30 min'
  }
];

export const BARBERS = [
  {
    id: '1',
    name: 'Biel',
    role: 'Master Barber',
    specialty: 'Degradê & Platinado',
    experience: '8 anos',
    image: '/barbeiro.jpg'
  }
];
