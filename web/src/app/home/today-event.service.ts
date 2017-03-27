import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { logger } from '../../utils/logger';

@Injectable()
export class TodayEventService {
  private baseUrl = '/api';

  constructor(private http: Http) {}

  private extractData(res: Response) {
    return res.json();
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    logger.error(errMsg);
    return Observable.throw(errMsg);
  }

  getTodayEvent() {
    return this.http
      .get(`${this.baseUrl}/events/near/`)
      .map(this.extractData)
      .catch(this.handleError);
  }
}
