import {Role} from './role';
import {Auto} from './auto';

export interface PersonData {
  id: number;
  name: string;
  surname: string;
  role;
  roleObj: Role;
  auto: Auto;
}
