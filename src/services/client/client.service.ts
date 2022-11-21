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
  public addClient(client: Client) {
    console.log('add client: ', client);
    this.clients.push(client);
    const index = this.clients.findIndex((c) => c.id === client.id);
    console.log('index of client: ', index);
    return of(this.clients);
  }
  public deleteClient(id: number) {
    console.log('delete client: ', this.clients[id - 1]);
    const index = this.clients.findIndex((c) => c.id === id);
    this.clients = this.clients.filter((client) => {
      return client.id !== id;
    });
    console.log('index of client: ', index);
    return of(this.clients);
  }
  public updateClient(client: Client) {
    console.log('update client: ', client);
    const index = this.clients.findIndex((c) => c.id === client.id);
    console.log('index of client: ', index);
    this.clients[index].id = client.id;
    this.clients[index].fullName = client.fullName;
    this.clients[index].age = client.age;
    this.clients[index].grandTotalOfBalance = client.grandTotalOfBalance;
    this.clients[index].maximumBalance = client.maximumBalance;
    this.clients[index].minimumBalance = client.minimumBalance;
    return of(this.clients);
  }
}
