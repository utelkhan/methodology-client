import {Injectable} from '@angular/core';
import {of} from 'rxjs';
import {Client} from '../../app/model/mymodels/client';
import {Controller} from '../../app/controller/controller';


@Injectable({providedIn: 'root'})

export class ClientService {


  constructor(private controller: Controller) {
  }

  public getDataForTable() {
    return of(this.controller.getDataForTable());
  }

  public getCharms() {
    return of(this.controller.getCharms());
  }

  public deleteClientById(id: string) {
    this.controller.deleteClientById(id);
  }

  public getClientByID(id: string) {
    return of(this.controller.getClientById(id));
  }

  public createClient(client: Client) {
    this.controller.createClient(client);
  }

  public updateClient(client: Client) {
    this.controller.updateClient(client);
  }
}

