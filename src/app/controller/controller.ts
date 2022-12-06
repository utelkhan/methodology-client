import {Injectable} from '@angular/core';
import {RowClient} from '../model/mymodels/row-client';
import {Client} from '../model/mymodels/client';
import {CHARM_DATA, CLIENT_DATA} from '../../services/client/test.data';

@Injectable({
  providedIn: 'root'
})

export class Controller {
  private clients!: Client[];
  private charms = CHARM_DATA;
  private data!: RowClient[];
  private counterForCharm = 0;

  constructor() {
    this.fillClients();
    this.fillDataForTable();
  }

  private fillClients() {
    this.clients = CLIENT_DATA.reverse();
  }

  private calculateAge(birthDate: Date) {
    return Math.floor((Math.abs(Date.now() - new Date(birthDate).getTime())) / (1000 * 3600 * 24) / 365.25);

    // //Used Math.floor instead of Math.ceil
    // //so 26 years and 140 days would be considered as 26, not 27.
    // this.age = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
  }

  private clientToData(client: Client) {
    const rowDataForTable = new RowClient();
    rowDataForTable.id = client.id;
    if (client.patronymic === null || client.patronymic === undefined) {
      rowDataForTable.fullName = client.surname + ' ' + client.name;
    } else {
      rowDataForTable.fullName = client.surname + ' ' + client.name + ' ' + client.patronymic;
    }
    rowDataForTable.age = this.calculateAge(client.birthDate);

    rowDataForTable.charmName = client.charm.name;
    this.counterForCharm++;

    if (this.counterForCharm > 3) {
      this.counterForCharm = 0;
    }

    rowDataForTable.totalAccountBalance = 0;
    rowDataForTable.minimumBalance = 0;
    rowDataForTable.maximumBalance = 0;
    return rowDataForTable;
  }

  private fillDataForTable() {
    this.data = [];
    for (let i = 0; i < this.clients.length.valueOf(); i++) {
      this.data.push(this.clientToData(this.clients[i]));
    }
    this.counterForCharm = 0;
  }

  public getCharms() {
    return this.charms;
  }

  public getDataForTable() {
    return this.data;
  }

  public getClientById(id: string) {
    return this.clients.find((c) => {
      if (c.id === id) {
        return c;
      }
    });
  }

  public createClient(client: Client) {
    client.id = String(this.clients.length + 1);
    client.phones.forEach((phone) => {
      phone.client = client.id;
    });

    client.factAddress.client = client.id;
    client.regAddress.client = client.id;

    this.clients.unshift(client);
    this.data.unshift(this.clientToData(client));
  }

  public updateClient(client: Client) {
    const index = this.clients.findIndex((c) => c.id === client.id);
    this.clients[index] = client;
    this.data[index] = this.clientToData(client);
  }

  public deleteClientById(id: string): void {
    this.clients.forEach((client, index) => {
      if (client.id === id) {
        this.clients.splice(index, 1);
      }
    });
    this.data.forEach((row, index) => {
      if (row.id === id) {
        this.data.splice(index, 1);
      }
    });
  }
}
