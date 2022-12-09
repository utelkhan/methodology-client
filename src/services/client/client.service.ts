import {Injectable} from '@angular/core';
import {Client} from '../../app/model/mymodels/client';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {RowClient} from '../../app/model/mymodels/row-client';
import {FilterModel} from '../../app/model/mymodels/filter/filter';
import {Charm} from '../../app/model/mymodels/charm';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})

export class ClientService {
  private urlPrefix = environment.urlPrefix;

  constructor(private http: HttpClient) {
  }

  public getDataForTable(filter: FilterModel): Observable<RowClient[]> {
    return this.http.post<RowClient[]>(this.urlPrefix + '/client/get-filtered-data', filter);
  }

  public getCharms() {
    return this.http.get<Charm[]>(this.urlPrefix + '/charm/get-all');
  }

  public deleteClientById(id: string) {
    return this.http.delete<string>(this.urlPrefix + '/client/delete/' + id);
  }

  public getClientByID(id: string) {
    return this.http.get<Client>(this.urlPrefix + '/client/' + id);
  }

  public createClient(client: Client) {
    return this.http.post<string>(this.urlPrefix + '/client/create', client);
  }

  public updateClient(client: Client) {
    return this.http.put<string>(this.urlPrefix + '/client/update', client);
  }

  public getCountOfRows(searchValue: string) {
    return this.http.get<number>(this.urlPrefix + '/client/get-count-of-actual-clients/' + searchValue);
  }
}

