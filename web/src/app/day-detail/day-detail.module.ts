import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DayDetailComponent } from './day-detail.component';
import { DayDetailService } from './day-detail.service';

@NgModule({
  declarations: [
    DayDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [
    DayDetailService
  ]
})
export class DayDetailModule {

}
