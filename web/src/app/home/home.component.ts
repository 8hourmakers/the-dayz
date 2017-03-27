import { Component, OnInit } from '@angular/core';

import { EventsService } from './events.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private events = [];
  private todayEvent = {};
  private hasDayLeft = true;
  private dayLeft = 0;
  private errorMessage = null;

  constructor(private eventsService: EventsService) {}

  ngOnInit() {
    this.eventsService
      .getEvents()
      .subscribe(
        data => {
          this.events = data;
          this.parseTodayEvent(this.events[0]);
        },
        error =>  this.errorMessage = <any>error
      );
  }

  parseTodayEvent(todayEvent) {
  }
}
