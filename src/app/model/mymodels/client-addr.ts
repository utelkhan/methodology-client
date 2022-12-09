import {AddrType} from './enums/addr-type';

export interface ClientAddr {
  client: number; // client id
  type: AddrType;
  street: string;
  house: string;
  flat: string;
}
