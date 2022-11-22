import {Addr_type} from './enums/addr_type';

export interface Client_addr {
  client: number; // client id
  type: Addr_type;
  street: string;
  house: string;
  flat: string;
}
