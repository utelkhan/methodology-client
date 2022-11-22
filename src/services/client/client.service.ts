import {Injectable} from '@angular/core';
import {Client} from '../../app/model/mymodels/client';
import {of} from 'rxjs';
import {CHARM_DATA, CLIENT_ADDR_DATA, CLIENT_DATA, CLIENT_PHONE_DATA} from './test.data';
import {Client_addr} from '../../app/model/mymodels/client_addr';
import {Client_phone} from '../../app/model/mymodels/client_phone';

@Injectable({providedIn: 'root'})
export class ClientService {
  private clients = CLIENT_DATA;
  private addresses = CLIENT_ADDR_DATA;
  private phones = CLIENT_PHONE_DATA;
  private charms = CHARM_DATA;
  constructor() {}

  public getClients() {
    return of(this.clients);
  }
  public getLastId() {
    return this.clients.length;
  }
  public addClient(client: Client) {
    client.charm = this.charms.find((c) => client.charm.toString() === c.name).id;
    client.id = this.clients.length + 1;
    console.log('CLIENT_SERVICE.addCLIENT: trying to add client', client);
    this.clients.push(client);
    console.log('CLIENT_SERVICE.addCLIENT: clients successfully added');
    return of(this.clients);
  }

  public getAddresses() {
    return of(this.addresses);
  }
  public addAddresses(clientId: number, address: Client_addr) {
    address.type = Number(address.type);
    address.client = clientId;
    console.log('CLIENT_SERVICE.addAddresses: trying to add address', address);
    this.addresses.push(address);
    console.log('CLIENT_SERVICE.addAddresses: address successfully added');
    return of(this.addresses);
  }

  public getPhones() {
    return of(this.phones);
  }
  public addPhones(clientId: number, phone: Client_phone) {
    phone.client = clientId;
    console.log('CLIENT_SERVICE.addPhones: trying to add phone', phone);
    this.phones.push(phone);
    console.log('CLIENT_SERVICE.addPhones: phone successfully added');
    return of(this.phones);
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
