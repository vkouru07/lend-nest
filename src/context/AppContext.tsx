import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Tool, Reservation, User, Category } from '../types';
import { tools as initialTools, categories as initialCategories, users as initialUsers, reservations as initialReservations } from '../data/mockData';

interface AppContextProps {
  tools: Tool[];
  categories: Category[];
  users: User[];
  reservations: Reservation[];
  currentUser: User | null;
  filteredTools: Tool[];
  searchTerm: string;
  selectedCategory: string;
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (categoryId: string) => void;
  reserveTool: (toolId: string, startDate: string, endDate: string) => void;
  logIn: (userId: string) => void;
  logOut: () => void;
  addTool: (tool: Omit<Tool, 'id' | 'addedDate' | 'timesLoaned'>) => void;
  getToolById: (id: string) => Tool | undefined;
  getUserReservations: (userId: string) => Reservation[];
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tools, setTools] = useState<Tool[]>(initialTools);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredTools, setFilteredTools] = useState<Tool[]>(tools);

  // Auto-login for demo purposes
  useEffect(() => {
    logIn('1');
  }, []);

  // Filter tools when search terms or category changes
  useEffect(() => {
    let result = [...tools];
    
    if (selectedCategory) {
      result = result.filter(tool => tool.category === selectedCategory);
    }
    
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      result = result.filter(tool => 
        tool.name.toLowerCase().includes(lowerCaseSearchTerm) || 
        tool.description.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }
    
    setFilteredTools(result);
  }, [tools, searchTerm, selectedCategory]);

  const reserveTool = (toolId: string, startDate: string, endDate: string) => {
    if (!currentUser) return;
    
    // Create new reservation
    const newReservation: Reservation = {
      id: Date.now().toString(),
      toolId,
      userId: currentUser.id,
      startDate,
      endDate,
      status: 'pending',
      created: new Date().toISOString().split('T')[0]
    };
    
    // Update tool availability
    setTools(prevTools => 
      prevTools.map(tool => 
        tool.id === toolId 
          ? { ...tool, available: false } 
          : tool
      )
    );
    
    // Add the reservation
    setReservations(prev => [...prev, newReservation]);
  };

  const logIn = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
    }
  };

  const logOut = () => {
    setCurrentUser(null);
  };

  const addTool = (tool: Omit<Tool, 'id' | 'addedDate' | 'timesLoaned'>) => {
    if (!currentUser) return;
    
    const newTool: Tool = {
      ...tool,
      id: Date.now().toString(),
      addedDate: new Date().toISOString().split('T')[0],
      timesLoaned: 0,
      owner: currentUser.name
    };
    
    setTools(prev => [...prev, newTool]);
    
    // Update category count
    setCategories(prev => 
      prev.map(category => 
        category.id === tool.category 
          ? { ...category, toolCount: category.toolCount + 1 } 
          : category
      )
    );
    
    // Update user's contributed tools count
    setUsers(prev => 
      prev.map(user => 
        user.id === currentUser.id 
          ? { ...user, toolsContributed: user.toolsContributed + 1 } 
          : user
      )
    );
  };

  const getToolById = (id: string) => {
    return tools.find(tool => tool.id === id);
  };

  const getUserReservations = (userId: string) => {
    return reservations.filter(reservation => reservation.userId === userId);
  };

  return (
    <AppContext.Provider value={{
      tools,
      categories,
      users,
      reservations,
      currentUser,
      filteredTools,
      searchTerm,
      selectedCategory,
      setSearchTerm,
      setSelectedCategory,
      reserveTool,
      logIn,
      logOut,
      addTool,
      getToolById,
      getUserReservations
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};