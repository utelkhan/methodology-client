import {Injectable} from '@angular/core';
import {of} from 'rxjs';
import {Client} from '../../app/model/mymodels/client';
import {Controller} from '../../app/controller/controller';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {RowClient} from '../../app/model/mymodels/row-client';
import {FilterModel} from '../../app/model/mymodels/filter/filter';


@Injectable({providedIn: 'root'})

export class ClientService {


  constructor(private controller: Controller, private http: HttpClient) {
  }

  public getDataForTable(filter: FilterModel): Observable<RowClient[]> {
    console.log('getClients with filter: ', filter);
    return this.http.post<RowClient[]>('http://localhost:1313/web/client/get-filtered-data', filter);
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

  getCountOfRows() {
    console.log('getCountOfRows');
    return this.http.get<number>('http://localhost:1313/web/client/get-count-of-actual-clients');
  }
}

