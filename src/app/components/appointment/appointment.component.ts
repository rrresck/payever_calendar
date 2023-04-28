import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { AppointmentService } from 'src/app/services/appointments.service';
import { IAppointment } from 'src/types/appointment.interface';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  standalone: true,
  imports: [CommonModule, MatIconModule, DragDropModule, MatButtonModule],
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
})
export class AppointmentComponent {
  @Input() appointment: IAppointment | undefined;
  constructor(
    private dialog: MatDialog,
    private appointments$: AppointmentService
  ) {}

  drop(event: CdkDragDrop<number>) {
    const newHour = event.container.data;
    this.appointment?.date?.setHours(newHour);
    this.appointments$.updateAppointment(this.appointment!);
  }

  deleteConfirmation(id: number) {
    this.appointments$.deleteAppointment(id);
  }

  openEditDialog(appointment: IAppointment) {
    this.dialog.open(DialogComponent, {
      minWidth: 'fit-content',
      data: {
        appointment,
      },
    });
  }
}
