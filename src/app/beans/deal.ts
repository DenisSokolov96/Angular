import {Box} from './box';
import {Role} from './role';

export interface Deal {
  id: number;
  box: Box;
  status: boolean;
  dateTime: string;
  login: string;
  role: Role;
}
