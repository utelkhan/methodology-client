import {ClientGender} from './enums/client-gender';
import {ClientAddr} from './client-addr';
import {ClientPhone} from './client-phone';

export interface Client {
  id: string;
  surname: string;
  name: string;
  patronymic?: string;
  gender: ClientGender;
  birthDate: string;
  charmId: string;
  regAddress: ClientAddr;
  factAddress?: ClientAddr;
  phones: ClientPhone[];
}
