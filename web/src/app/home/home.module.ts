import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { HomeTodayComponent } from './home-today.component';
import { EventsService } from './events.service';
import { TodayEventService } from './today-event.service';

@NgModule({
  declarations: [
    HomeComponent,
    HomeTodayComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [
    EventsService,
    TodayEventService
  ]
})
export class HomeModule { }
