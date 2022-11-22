import {Client_gender} from './enums/client_gender';

export interface Client {
  id: number;
  surname: string;
  name: string;
  patronymic?: string;
  gender: Client_gender;
  birth_date: Date;
  charm: number;
}
