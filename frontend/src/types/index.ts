export interface Tool {
  id: string;
  name: string;
  category: string;
  description: string;
  imageUrl: string;
  condition: 'excellent' | 'good' | 'fair' | 'needs repair';
  available: boolean;
  owner: string;
  addedDate: string;
  lastBorrowed?: string;
  timesLoaned: number;
}

export interface Reservation {
  id: string;
  toolId: string;
  userId: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  created: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  neighborhood: string;
  avatar?: string;
  toolsContributed: number;
  toolsBorrowed: number;
  memberSince: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  toolCount: number;
}