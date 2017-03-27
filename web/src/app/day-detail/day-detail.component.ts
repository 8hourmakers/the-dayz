import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DayDetailService } from './day-detail.service';

@Component({
  selector: 'app-day-detail',
  templateUrl: './day-detail.component.html',
  styleUrls: ['./day-detail.component.css']
})
export class DayDetailComponent implements OnInit {
  private data = {
    date: new Date()
  };
  private errorMessage = null;

  constructor(private ds: DayDetailService, private route: ActivatedRoute) {}

  ngOnInit() {
    const eventId = this.route.snapshot.params.id;

    this.ds
      .getDetail(eventId)
      .subscribe(
        data => this.data = data,
        error =>  this.errorMessage = <any>error
      );
  }
}
