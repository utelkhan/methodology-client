import {Injectable} from '@angular/core';
import {Client} from '../../app/model/mymodels/client';
import {of} from 'rxjs';
import {CHARM_DATA, CLIENT_DATA} from './test.data';

@Injectable({providedIn: 'root'})
export class ClientService {
  private clients = CLIENT_DATA;
  private charms = CHARM_DATA;
  private newClient!: Client;

  constructor() {}

  public getClients() {
    return of(this.clients);
  }
  public addClient(client: Client) {
    console.log(this.newClient.id);
    this.newClient.surname = client.surname;
    this.newClient.name = client.name;
    this.newClient.patronymic = client.patronymic;
    this.newClient.gender = client.gender;
    this.newClient.charm = client.charm;
    this.newClient.birth_date = client.birth_date;
    this.clients.push(this.newClient);
    console.log('CLIENT_SERVICE.addCLIENT: trying to add client', client);
    this.clients.push(client);
    console.log('CLIENT_SERVICE.addCLIENT: clients successfully added');
    return of(this.clients);
  }
  public getCharms() {
    return of(this.charms);
  }
  // public getClients() {
  //   return of(this.clients);
  // }
  //
  // public addClient(client: Client) {
  //   console.log('add client: ', client);
  //   this.clients.push(client);
  //   const index = this.clients.findIndex((c) => c.id === client.id);
  //   console.log('index of client: ', index);
  //   return of(this.clients);
  // }
  //
  // public deleteClient(id: number) {
  //   console.log('delete client: ', this.clients[id - 1]);
  //   this.clients = this.clients.filter((client) => {
  //     return client.id !== id;
  //   });
  //   return of(this.clients);
  // }
  //
  // public updateClient(client: Client) {
  //   console.log('update client: ', client);
  //   const index = this.clients.findIndex((c) => c.id === client.id);
  //   console.log('index of client: ', index);
  //
  //   this.clients[index].id = client.id;
  //   this.clients[index].surname = client.surname;
  //   this.clients[index].name = client.name;
  //   this.clients[index].patronymic = client.patronymic;
  //   this.clients[index].gender = client.gender;
  //   this.clients[index].birth_date = client.birth_date;
  //   this.clients[index].charm = client.charm;
  //   return of(this.clients);
  // }
}
