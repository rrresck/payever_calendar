import { Component } from '@angular/core';
import { combineLatestWith, map } from 'rxjs';

import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppointmentService } from 'src/app/services/appointments.service';
import { SelectedDayService } from 'src/app/services/date.service';
import { IAppointment } from 'src/types/appointment.interface';
import { AppointmentComponent } from '../appointment/appointment.component';

@Component({
  standalone: true,
  imports: [CommonModule, DragDropModule, AppointmentComponent],
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss'],
})
export class DayComponent {
  appointmentsForDate: IAppointment[] = [];
  hoursToDisplay = Array(24)
    .fill(new Date(Date.now()))
    .map((value, index) => value.setHours(index));

  constructor(
    private allAppointments$: AppointmentService,
    private selectedDate$: SelectedDayService
  ) {
    this.allAppointments$.appointments$
      .pipe(
        combineLatestWith(this.selectedDate$.date$),
        map(([appointments, date]) => {
          const filteredAppointmentsForDate = appointments.filter(
            (appointment) => appointment.date.getDate() === date?.getDate()
          );

          return filteredAppointmentsForDate;
        })
      )
      .subscribe(
        (appointmentsForDate) =>
          (this.appointmentsForDate = appointmentsForDate)
      );
  }
}
