
// Global types for Smart UniHub

export type Role = 'student' | 'instructor' | 'mentor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}   
