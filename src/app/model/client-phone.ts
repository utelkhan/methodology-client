import {PhoneType} from './no-in-use/phone-type';

export interface ClientPhone {
  clientId: number; // client id
  number: string;
  type: PhoneType;
  required: boolean;
}
