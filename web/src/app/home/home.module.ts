import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { HomeTodayComponent } from './home-today.component';
import { EventsService } from './events.service';

@NgModule({
  declarations: [
    HomeComponent,
    HomeTodayComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    EventsService
  ]
})
export class HomeModule { }
