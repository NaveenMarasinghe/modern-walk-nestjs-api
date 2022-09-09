export enum Role {
  User = 'user',
  Admin = 'admin',
}
export interface IUser {
  name: string;
  email: string;
  password: string;
  id: number;
  roles: string[];
}
