export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role?: 'customer' | 'store-owner' | 'admin';
  storeId?: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  storeId: string;
  storeName: string;
  location: string;
  hourlyWage: number;
  workHours: string;
  requirements?: string;
  benefits?: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'inactive' | 'closed';
}

export interface Store {
  id: string;
  name: string;
  description: string;
  location: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}