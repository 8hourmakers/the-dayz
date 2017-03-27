import { Component, OnInit } from '@angular/core';

import { TodayEventService } from './today-event.service';

const ONE_DAY_MS: number = 1000 * 60 * 60 * 24;

interface EventType {
  id: number;
  date: Date;
  content: string;
  title: string;
  type: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private todayEvent: EventType = {
    id: NaN,
    date: new Date(),
    content: '',
    title: '',
    type: ''
  };
  private hasDayLeft = true;
  private dayLeft = 0;
  private hasInitialized = false;
  private errorMessage = null;

  constructor(private todayEventService: TodayEventService) {}

  ngOnInit() {
    this.todayEventService
      .getTodayEvent()
      .subscribe(
        (data: EventType) => {
          this.todayEvent = {
            id: data.id,
            date: new Date(data.date),
            title: data.title,
            content: data.content,
            type: data.type
          };

          const month = this.todayEvent.date.getMonth() + 1;
          const date = this.todayEvent.date.getDate();

          const todayTime: number = new Date().getTime();
          const eventTime: number = new Date(`${new Date().getFullYear()}-${month}-${date}`).getTime();

          const diff: number = Math.floor((eventTime - todayTime) / ONE_DAY_MS);
          this.dayLeft = diff;

          if (diff === 0) {
            this.hasDayLeft = false;
          }

          this.hasInitialized = true;
        },
        error =>  this.errorMessage = <any>error
      );
  }
}
