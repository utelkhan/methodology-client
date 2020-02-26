import {Injectable} from '@angular/core';
import {HttpService} from '../http/http.service';

@Injectable({providedIn: 'root'})
export class TestController {
  http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('test');
  }

  sayHello(hello: string): Promise<string> {
    return this.http.get<string>('/hello', {hello})
      .toPromise().then(x => x.body);
  }

}
