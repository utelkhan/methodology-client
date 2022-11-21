import {Injectable} from '@angular/core';
import {Client} from '../../app/model/client';

const CLIENTS_DATA: Client[] = [
  {id: 1, fullName: 'Azamat Utelkhan', age: 20, grandTotalOfBalance: 1500, maximumBalance: 15000, minimumBalance: 150},
  {id: 2, fullName: 'Aidos Turar', age: 21, grandTotalOfBalance: 1500, maximumBalance: 15000, minimumBalance: 150},
  {id: 3, fullName: 'Yernan Meglibay', age: 19, grandTotalOfBalance: 1500, maximumBalance: 15000, minimumBalance: 150},
  {id: 4, fullName: 'Banu Bekmukhamed', age: 18, grandTotalOfBalance: 1500, maximumBalance: 15000, minimumBalance: 150},
];
@Injectable({providedIn: 'root'})
export class ClientService {
  private data = CLIENTS_DATA;
  constructor() {}
  public getClients() {
    return this.data;
  }
}
