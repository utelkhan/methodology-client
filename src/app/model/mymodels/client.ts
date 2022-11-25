import {Charm} from './charm';
import {ClientGender} from './enums/client_gender';
import {ClientAddr} from './client_addr';
import {ClientPhone} from './client_phone';

export interface Client {
  id: number;
  surname: string;
  name: string;
  patronymic?: string;
  gender: ClientGender;
  birthDate: Date;
  charm: Charm;
  regAddress: ClientAddr;
  factAddress?: ClientAddr;
  phones: ClientPhone[];
}
