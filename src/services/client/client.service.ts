import {Injectable} from '@angular/core';
import {Client} from '../../app/model/mymodels/client';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {RowClient} from '../../app/model/mymodels/row-client';
import {FilterModel} from '../../app/model/mymodels/filter/filter';
import {Charm} from '../../app/model/mymodels/charm';


@Injectable({providedIn: 'root'})

export class ClientService {


  constructor(private http: HttpClient) {
  }

  public getDataForTable(filter: FilterModel): Observable<RowClient[]> {
    console.log('getDataForTable: ', filter);
    return this.http.post<RowClient[]>('http://localhost:1313/web/client/get-filtered-data', filter);
  }

  public getCharms() {
    console.log('getCharms');
    return this.http.get<Charm[]>('http://localhost:1313/web/charm/get-all');
  }

  public deleteClientById(id: string) {
    console.log('deleteClientById: ', id);
    const url = 'http://localhost:1313/web/client/delete/' + id;
    console.log(url);
    return this.http.delete<string>(url);
  }

  public getClientByID(id: string) {
    console.log('getClientByID: ', id);
    const url = 'http://localhost:1313/web/client/' + id;
    console.log(url);
    return this.http.get<Client>(url);
  }

  public createClient(client: Client) {
    console.log('createClient: ', client);
    return this.http.post<string>('http://localhost:1313/web/client/create', client);
  }

  public updateClient(client: Client) {
    console.log('updateClient: ', client);
    return this.http.put<string>('http://localhost:1313/web/client/update', client);
  }

  public getCountOfRows(searchValue: string) {
    console.log('getCountOfRows: ', searchValue);
    return this.http.get<number>('http://localhost:1313/web/client/get-count-of-actual-clients/' + searchValue);
  }
}

