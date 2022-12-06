import {Injectable} from '@angular/core';
import {of} from 'rxjs';
import {Client} from '../../app/model/mymodels/client';
import {Controller} from '../../app/controller/controller';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {RowClient} from '../../app/model/mymodels/row-client';
import {FilterModel} from '../../app/model/mymodels/filter/filter';
import {Charm} from '../../app/model/mymodels/charm';


@Injectable({providedIn: 'root'})

export class ClientService {


  constructor(private controller: Controller, private http: HttpClient) {
  }

  public getDataForTable(filter: FilterModel): Observable<RowClient[]> {
    console.log('getClients with filter: ', filter);
    return this.http.post<RowClient[]>('http://localhost:1313/web/client/get-filtered-data', filter);
  }

  public getCharms() {
    return this.http.get<Charm[]>('http://localhost:1313/web/charm/get-all');
  }

  public deleteClientById(id: string) {
    this.controller.deleteClientById(id);
  }

  public getClientByID(id: string) {
    return this.http.get<Client>('http://localhost:1313/web/client/' + id);
  }

  public createClient(client: Client) {
    this.controller.createClient(client);
  }

  public updateClient(client: Client) {
    this.controller.updateClient(client);
  }

  public getCountOfRows(searchValue: string) {
    return this.http.get<number>('http://localhost:1313/web/client/get-count-of-actual-clients/' + searchValue + '/');
  }
}

