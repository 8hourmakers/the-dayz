import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DayDetailComponent } from './day-detail/day-detail.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'day-detail/:id', component: DayDetailComponent }
];

export const AppRoutingModule: ModuleWithProviders =
  RouterModule.forRoot(appRoutes);
