import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Charm} from '../app/model/charm';
import {environment} from '../environments/environment';

@Injectable({providedIn: 'root'})

export class CharmController {
  private urlPrefix = environment.urlPrefix + 'charm/';

  constructor(private http: HttpClient) {
  }

  public getCharms() {
    return this.http.get<Charm[]>(this.urlPrefix + 'get-all');
  }
}

