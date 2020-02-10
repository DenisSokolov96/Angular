import {Account} from './account';
import {Deal} from './deal';
import {Box} from './box';

export interface Payment {
  id: number;
  account: Account;
  date: string;
  deal: Deal;
  description: string;
  money: number;
  type: string;
}
