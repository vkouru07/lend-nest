import { Tool, Reservation, User, Category } from '../types';

export const categories: Category[] = [
  { id: '1', name: 'Power Tools', icon: 'drill', toolCount: 8 },
  { id: '2', name: 'Hand Tools', icon: 'hammer', toolCount: 12 },
  { id: '3', name: 'Garden Tools', icon: 'shovel', toolCount: 6 },
  { id: '4', name: 'Painting Supplies', icon: 'paintbrush', toolCount: 5 },
  { id: '5', name: 'Cleaning Equipment', icon: 'spray-bottle', toolCount: 4 },
  { id: '6', name: 'Ladders & Scaffolding', icon: 'ladder', toolCount: 3 },
  { id: '7', name: 'Measuring Tools', icon: 'ruler', toolCount: 7 },
  { id: '8', name: 'Woodworking', icon: 'saw', toolCount: 9 },
];

export const tools: Tool[] = [
  {
    id: '1',
    name: 'Cordless Drill',
    category: '1',
    description: 'DeWalt 20V MAX cordless drill with two batteries and charger.',
    imageUrl: 'https://images.pexels.com/photos/2820753/pexels-photo-2820753.jpeg',
    condition: 'excellent',
    available: true,
    owner: 'Jane Smith',
    addedDate: '2024-05-15',
    lastBorrowed: '2024-06-01',
    timesLoaned: 3
  },
  {
    id: '2',
    name: 'Circular Saw',
    category: '1',
    description: 'Makita 7-1/4" circular saw, perfect for cutting lumber and plywood.',
    imageUrl: 'https://images.pexels.com/photos/3845796/pexels-photo-3845796.jpeg',
    condition: 'good',
    available: false,
    owner: 'Mike Johnson',
    addedDate: '2024-04-20',
    lastBorrowed: '2024-06-05',
    timesLoaned: 2
  },
  {
    id: '3',
    name: 'Garden Hoe',
    category: '3',
    description: 'Standard garden hoe with wooden handle, great for weeding and cultivating soil.',
    imageUrl: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg',
    condition: 'good',
    available: true,
    owner: 'Sarah Williams',
    addedDate: '2024-03-10',
    lastBorrowed: '2024-05-20',
    timesLoaned: 1
  },
  {
    id: '4',
    name: 'Hammer',
    category: '2',
    description: 'Stanley 16oz claw hammer with fiberglass handle.',
    imageUrl: 'https://images.pexels.com/photos/209235/pexels-photo-209235.jpeg',
    condition: 'excellent',
    available: true,
    owner: 'David Brown',
    addedDate: '2024-02-15',
    timesLoaned: 5
  },
  {
    id: '5',
    name: 'Extension Ladder',
    category: '6',
    description: '24ft aluminum extension ladder, reaches up to 21ft. Good for two-story buildings.',
    imageUrl: 'https://images.pexels.com/photos/2253925/pexels-photo-2253925.jpeg',
    condition: 'good',
    available: true,
    owner: 'Mike Johnson',
    addedDate: '2023-12-10',
    lastBorrowed: '2024-04-15',
    timesLoaned: 4
  },
  {
    id: '6',
    name: 'Paint Roller Set',
    category: '4',
    description: 'Complete paint roller set with tray, two roller covers, and extension pole.',
    imageUrl: 'https://images.pexels.com/photos/8092509/pexels-photo-8092509.jpeg',
    condition: 'fair',
    available: false,
    owner: 'Lisa Chen',
    addedDate: '2024-01-20',
    lastBorrowed: '2024-06-07',
    timesLoaned: 3
  },
  {
    id: '7',
    name: 'Pressure Washer',
    category: '5',
    description: 'Electric pressure washer, 1800 PSI, perfect for cleaning decks, siding, and driveways.',
    imageUrl: 'https://images.pexels.com/photos/4239146/pexels-photo-4239146.jpeg',
    condition: 'excellent',
    available: true,
    owner: 'Jane Smith',
    addedDate: '2024-05-01',
    timesLoaned: 1
  },
  {
    id: '8',
    name: 'Tape Measure',
    category: '7',
    description: 'Stanley 25ft tape measure with auto-lock feature.',
    imageUrl: 'https://images.pexels.com/photos/5691614/pexels-photo-5691614.jpeg',
    condition: 'excellent',
    available: true,
    owner: 'David Brown',
    addedDate: '2024-03-05',
    timesLoaned: 7
  }
];

export const users: User[] = [
  {
    id: '1',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    neighborhood: 'Greenfield',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    toolsContributed: 2,
    toolsBorrowed: 3,
    memberSince: '2023-11-15'
  },
  {
    id: '2',
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    neighborhood: 'Greenfield',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
    toolsContributed: 2,
    toolsBorrowed: 5,
    memberSince: '2023-10-20'
  },
  {
    id: '3',
    name: 'Sarah Williams',
    email: 'sarah.williams@example.com',
    neighborhood: 'Greenfield',
    avatar: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg',
    toolsContributed: 1,
    toolsBorrowed: 2,
    memberSince: '2024-01-05'
  },
  {
    id: '4',
    name: 'David Brown',
    email: 'david.brown@example.com',
    neighborhood: 'Greenfield',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
    toolsContributed: 2,
    toolsBorrowed: 0,
    memberSince: '2023-12-10'
  },
  {
    id: '5',
    name: 'Lisa Chen',
    email: 'lisa.chen@example.com',
    neighborhood: 'Greenfield',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    toolsContributed: 1,
    toolsBorrowed: 4,
    memberSince: '2024-01-30'
  }
];

export const reservations: Reservation[] = [
  {
    id: '1',
    toolId: '2',
    userId: '1',
    startDate: '2024-06-05',
    endDate: '2024-06-12',
    status: 'active',
    created: '2024-06-04'
  },
  {
    id: '2',
    toolId: '6',
    userId: '2',
    startDate: '2024-06-07',
    endDate: '2024-06-14',
    status: 'active',
    created: '2024-06-06'
  },
  {
    id: '3',
    toolId: '1',
    userId: '3',
    startDate: '2024-05-25',
    endDate: '2024-06-01',
    status: 'completed',
    created: '2024-05-24'
  },
  {
    id: '4',
    toolId: '3',
    userId: '4',
    startDate: '2024-05-15',
    endDate: '2024-05-20',
    status: 'completed',
    created: '2024-05-14'
  },
  {
    id: '5',
    toolId: '5',
    userId: '5',
    startDate: '2024-04-10',
    endDate: '2024-04-15',
    status: 'completed',
    created: '2024-04-09'
  },
  {
    id: '6',
    toolId: '8',
    userId: '1',
    startDate: '2024-06-15',
    endDate: '2024-06-22',
    status: 'pending',
    created: '2024-06-10'
  }
];