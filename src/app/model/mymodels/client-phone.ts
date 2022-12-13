import {PhoneType} from '../phone-type';

export interface ClientPhone {
  clientId: number; // client id
  number: string;
  type: PhoneType;
  required: boolean;
}
