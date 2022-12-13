import {AddrType} from './enums/addr-type';

export interface ClientAddr {
  clientId: number; // client id
  type: AddrType;
  street: string;
  house: string;
  flat: string;
}
