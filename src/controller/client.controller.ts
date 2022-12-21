import {Injectable} from '@angular/core';
import {Client} from '../app/model/client';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {RowClient} from '../app/model/row-client';
import {FilterModel} from '../app/model/filter/filter';
import {environment} from '../environments/environment';

@Injectable({providedIn: 'root'})

export class ClientController {
  private urlPrefix = environment.urlPrefix + 'client/';

  constructor(private http: HttpClient) {
  }

  public getDataForTable(filter: FilterModel): Observable<RowClient[]> {
    return this.http.post<RowClient[]>(this.urlPrefix + 'get-filtered-data', filter);
  }

  public deleteClientById(id: string) {
    return this.http.delete<void>(this.urlPrefix + 'delete/' + id);
  }

  public getClientByID(id: string) {
    return this.http.get<Client>(this.urlPrefix + id);
  }

  public createClient(client: Client) {
    return this.http.post<void>(this.urlPrefix + 'create', client);
  }

  public updateClient(client: Client) {
    return this.http.put<void>(this.urlPrefix + 'update', client);
  }

  public getCountOfRows(searchValue: string) {
    return this.http.get<number>(this.urlPrefix + 'get-count-of-actual-clients/' + searchValue);
  }

}

