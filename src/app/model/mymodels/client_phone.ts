import {PhoneType} from '../phone-type';

export interface Client_phone {
  client: number; // client id
  number: string;
  type: PhoneType;
}
