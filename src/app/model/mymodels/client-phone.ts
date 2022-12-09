import {PhoneType} from '../phone-type';

export interface ClientPhone {
  client: number; // client id
  number: string;
  type: PhoneType;
  required: boolean;
}
