import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MomentModule } from 'angular2-moment';

import { HomeComponent } from './home.component';
import { HomeTodayComponent } from './home-today.component';
import { EventsService } from './events.service';

@NgModule({
  declarations: [
    HomeComponent,
    HomeTodayComponent
  ],
  imports: [
    CommonModule,
    MomentModule
  ],
  providers: [
    EventsService
  ]
})
export class HomeModule { }
