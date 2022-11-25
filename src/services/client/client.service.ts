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

  // todo: у тебя удаление клиента возвращает весь список клиентов
  //  Метод должен исполнять свою роль, то есть он должен удалить клиента, и возвращать список клиентов не должен
  public removeClientById(id: number) {
    this.clients = this.clients.filter((client) => {
      return client.id !== id;
    });
    return of(this.clients);
  }

  // todo: Лишние комментарии убрать
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
