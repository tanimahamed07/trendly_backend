export interface TUser {
  name: string;
  email: string;
  password?: string;
  role: 'user' | 'admin';
  avatar: string;
  createdAt?: Date;
  updatedAt?: Date;
}