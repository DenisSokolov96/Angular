import {Role} from './role';

export interface Account {
  id: number;
  login: string;
  role: Role;
}
