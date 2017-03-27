import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { DayDetail, DayDetailService } from './day-detail.service';

@Injectable()
export class DayDetailGuardService implements Resolve<DayDetail> {
  constructor(private ds: DayDetailService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.params['id'];

    return new Promise((resolve) => {
      this.ds
        .getDetail(id)
        .subscribe()
    });
  }
}

