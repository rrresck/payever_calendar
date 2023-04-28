import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AppointmentComponent } from './components/appointment/appointment.component';

// import { DatepickerComponent } from './components/datepicker/datepicker.component';
// import { DayComponent } from './components/day/day.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'calendar',
    pathMatch: 'full',
  },
  {
    path: 'calendar',
    children: [
      {
        path: '',
        outlet: 'datepicker',
        loadComponent: () =>
          import('./components/datepicker/datepicker.component').then(
            (mod) => mod.DatepickerComponent
          ),
      },
      {
        path: ':year/:month/:day',
        children: [
          {
            path: '',
            outlet: 'day',
            loadComponent: () =>
              import('./components/day/day.component').then(
                (mod) => mod.DayComponent
              ),
          },
          {
            path: '',
            loadComponent: () =>
              import('./components/appointment/appointment.component').then(
                (mod) => mod.AppointmentComponent
              ),
          },
        ],
      },
    ],
  },
  { path: '**', redirectTo: 'calendar' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
