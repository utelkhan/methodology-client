import {AddrType} from './enums/addr-type';

export interface ClientAddr {
  client: string; // client id
  type: AddrType;
  street: string;
  house: string;
  flat: string;
}
