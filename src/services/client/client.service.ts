import {Injectable} from '@angular/core';
import {of} from 'rxjs';
import {ControllerService} from '../../app/controller/controller.service';
import {Client} from '../../app/model/mymodels/client';


@Injectable({providedIn: 'root'})

export class ClientService {


  constructor(private controller: ControllerService) {
  }

  public getDataForTable() {
    return of(this.controller.getDataForTable());
  }

  public getCharms() {
    return of(this.controller.getCharms());
  }

  public deleteClientById(id: number) {
    this.controller.deleteClientById(id);
  }

  public getClientByID(id: number) {
    return of(this.controller.getClientById(id));
  }

  public createClient(client: Client) {
    this.controller.createClient(client);
  }

  public updateClient(client: Client) {
    this.controller.updateClient(client);
  }
}

