import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { DayDetailComponent } from './day-detail/day-detail.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'day-detail/:id', component: DayDetailComponent }
];

export const appRoutingProvders: any[] = [
  { provide: LocationStrategy, useClass: HashLocationStrategy }
];

export const AppRoutingModule: ModuleWithProviders =
  RouterModule.forRoot(appRoutes);
