import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FilterModel} from '../app/model/filter/filter';
import {environment} from '../environments/environment';

@Injectable({providedIn: 'root'})

export class ReportController {
  private urlPrefix = environment.urlPrefix + 'report/';

  constructor(private http: HttpClient) {
  }

  public generateReport(filter: FilterModel, reportType: string) {
    return this.http.post(this.urlPrefix + reportType, filter, {responseType: 'blob'});
  }
}

