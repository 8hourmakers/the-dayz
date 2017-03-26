import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { HomeTodayComponent } from './home-today.component';

@NgModule({
  declarations: [
    HomeComponent,
    HomeTodayComponent
  ],
  imports: [
    CommonModule
  ],
  providers: []
})
export class HomeModule { }
