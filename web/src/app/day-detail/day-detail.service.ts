import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { logger } from '../../utils/logger';

export class DayDetail {
  private id: number;
  private title: string;
  private type: string;
  private summary: string;
  private content: string;
}

@Injectable()
export class DayDetailService {
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

  getDetail(eventId: number) {
    return this.http
      .get(`${this.baseUrl}/events/${eventId}/`)
      .map(this.extractData)
      .catch(this.handleError);
  }
}
