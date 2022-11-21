import {Injectable} from '@angular/core';
import {Client} from '../../app/model/client';
import {of} from 'rxjs';

const CLIENTS_DATA: Client[] = [
  {id: 1, fullName: 'Azamat Utelkhan', age: 20, grandTotalOfBalance: 1500, maximumBalance: 15000, minimumBalance: 150},
  {id: 2, fullName: 'Aidos Turar', age: 21, grandTotalOfBalance: 1500, maximumBalance: 15000, minimumBalance: 150},
  {id: 3, fullName: 'Yernan Meglibay', age: 19, grandTotalOfBalance: 1500, maximumBalance: 15000, minimumBalance: 150},
  {id: 4, fullName: 'Aibek Ualkhan', age: 18, grandTotalOfBalance: 1500, maximumBalance: 15000, minimumBalance: 150},
  {id: 5, fullName: 'Alua Berkin', age: 18, grandTotalOfBalance: 1500, maximumBalance: 15000, minimumBalance: 150},
  {id: 6, fullName: 'Adinur Orazbaev', age: 18, grandTotalOfBalance: 1500, maximumBalance: 15000, minimumBalance: 150},
  {id: 7, fullName: 'Margulan Amanbek', age: 18, grandTotalOfBalance: 1500, maximumBalance: 15000, minimumBalance: 150},
  {id: 8, fullName: 'Meirber Kazakbaev', age: 18, grandTotalOfBalance: 1500, maximumBalance: 15000, minimumBalance: 150},
];
@Injectable({providedIn: 'root'})
export class ClientService {
  private clients = CLIENTS_DATA;
  constructor() {}
  public getClients() {
    return of(this.clients);
  }
}
