
import { Service } from './types';

export const SERVICES: Service[] = [
  {
    id: '1',
    name: 'Corte Masculino',
    description: 'Corte tradicional ou degradê com acabamento impecável.',
    price: 'R$ 35,00',
    duration: '30 min'
  },
  {
    id: '2',
    name: 'Barba',
    description: 'Aparagem e modelagem completa com toalha quente.',
    price: 'R$ 25,00',
    duration: '20 min'
  },
  {
    id: '3',
    name: 'Sobrancelha',
    description: 'Design e limpeza das sobrancelhas.',
    price: 'R$ 10,00',
    duration: '10 min'
  },
  {
    id: '4',
    name: 'Bigode',
    description: 'Aparagem e contorno do bigode.',
    price: 'R$ 5,00',
    duration: '10 min'
  },
  {
    id: '5',
    name: 'Pezinho',
    description: 'Contorno e acabamento da nuca.',
    price: 'R$ 15,00',
    duration: '10 min'
  },
  {
    id: '6',
    name: 'Penteado',
    description: 'Estilização para eventos e ocasiões.',
    price: 'R$ 25,00',
    duration: '20 min'
  },
  {
    id: '7',
    name: 'Alisante',
    description: 'Tratamento para redução de volume.',
    price: 'R$ 30,00',
    duration: '45 min'
  },
  {
    id: '8',
    name: 'Progressiva',
    description: 'Tratamento para cabelos lisos e alinhados.',
    price: 'R$ 70,00',
    duration: '90 min'
  },
  {
    id: '9',
    name: 'Botox',
    description: 'Hidratação profunda e redução de frizz.',
    price: 'R$ 60,00',
    duration: '60 min'
  },
  {
    id: '10',
    name: 'Luzes',
    description: 'Mechas e reflexos para um visual moderno.',
    price: 'R$ 70,00',
    duration: '90 min'
  },
  {
    id: '11',
    name: 'Platinado',
    description: 'Descoloração total para tom platinado.',
    price: 'R$ 130,00',
    duration: '120 min'
  },
  {
    id: '12',
    name: 'Hidratação',
    description: 'Tratamento intensivo para a saúde dos fios.',
    price: 'R$ 20,00',
    duration: '30 min'
  },
  {
    id: '13',
    name: 'Pigmentação',
    description: 'Cobertura de falhas ou fios brancos.',
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
