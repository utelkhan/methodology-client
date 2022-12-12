import {ClientGender} from './enums/client-gender';
import {ClientAddr} from './client-addr';
import {ClientPhone} from './client-phone';

export interface Client {
  id: number;
  surname: string;
  name: string;
  patronymic?: string;
  gender: ClientGender;
  birthDate: Date;
  charmId: number;
  regAddress: ClientAddr;
  factAddress?: ClientAddr;
  phones: ClientPhone[];
}
