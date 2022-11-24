import {Client_gender} from './enums/client_gender';
import {Charm} from './charm';
import {Client_addr} from './client_addr';
import {Client_phone} from './client_phone';

export interface Client {
  id: number;
  surname: string;
  name: string;
  patronymic?: string;
  gender: Client_gender;
  birth_date: Date;
  charm: Charm;
  regAddress: Client_addr;
  factAddress?: Client_addr;
  phones: Client_phone[];
}
