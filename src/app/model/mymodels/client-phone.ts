import {PhoneType} from '../phone-type';

export interface ClientPhone {
  client: string; // client id
  number: string;
  type: PhoneType;
}
