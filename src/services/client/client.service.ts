import {Injectable} from '@angular/core';
import {Client} from '../../app/model/mymodels/client';
import {of} from 'rxjs';
import {CHARM_DATA, CLIENT_DATA} from './test.data';

@Injectable({providedIn: 'root'})
export class ClientService {
  private clients = CLIENT_DATA;
  private charms = CHARM_DATA;

  constructor() {
  }

  public getClients() {
    return of(this.clients);
  }

  public addClient(client: Client) {
    client.id = this.clients.length + 1;
    console.log('CLIENT_SERVICE.addCLIENT: trying to add client', client);
    client.phones.forEach((phone) => {
      phone.client = client.id;
    });

    client.factAddress.client = client.id;
    client.regAddress.client = client.id;

    this.clients.push(client);
    console.log('CLIENT_SERVICE.addCLIENT: clients successfully added');
    return of(this.clients);
  }

  public editClient(client: Client) {
    console.log('CLIENT_SERVICE.editCLIENT: trying to edit client', client);
    const index = this.clients.findIndex((c) => c.id === client.id);
    this.clients[index] = client;
    console.log('CLIENT_SERVICE.addCLIENT: clients successfully edited');
    return of(this.clients);
  }

  public getCharms() {
    return of(this.charms);
  }


  public removeClientById(id: number): void {
    this.clients = this.clients.filter((client) => {
      return client.id !== id;
    });
  }
}
