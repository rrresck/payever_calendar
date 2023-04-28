import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { IAppointment } from 'src/types/appointment.interface';
import { AppointmentService } from 'src/app/services/appointments.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

interface DialogData {
  appointment: IAppointment;
}

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],

  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  hoursToDisplay = Array(24)
    .fill(0)
    .map((_, index) => index);

  addNewAppointment = new FormGroup({
    title: new FormControl<string | null>(null),
    date: new FormControl<string | null>(null),
    hour: new FormControl<number | null>(null),
  });

  buttonActionText: string = 'Save';

  constructor(
    private formBuilder: FormBuilder,
    private appointments$: AppointmentService,
    @Inject(MAT_DIALOG_DATA) public editableData: DialogData
  ) {
    this.addNewAppointment = this.formBuilder.group({
      title: ['', [Validators.required]],
      date: ['', [Validators.required]],
      hour: 0,
    });
  }

  ngOnInit(): void {
    if (this.editableData) {
      this.buttonActionText = 'Update';

      this.addNewAppointment.controls['title'].setValue(
        this.editableData.appointment.title
      );

      const newDate =
        this.editableData.appointment.date.getFullYear() +
        '-' +
        (this.editableData.appointment.date.getMonth() + 1) +
        '-' +
        this.editableData.appointment.date.getDate();

      this.addNewAppointment.controls['date'].setValue(newDate);

      this.addNewAppointment.controls['hour'].setValue(
        this.editableData.appointment.date.getHours()
      );
    }
  }

  submit() {
    let appointmentId: number;

    const date = new Date(this.addNewAppointment.value.date!).setHours(
      this.addNewAppointment.value.hour! || 0
    );

    if (this.editableData) {
      appointmentId = this.editableData.appointment.id;
    } else {
      appointmentId =
        this.appointments$.getAppointments().slice(-1)[0]?.id + 1 || 0;
    }
    const newAppointment = {
      title: this.addNewAppointment.value.title!,
      date: new Date(date!),
      id: appointmentId,
    };

    if (this.editableData) {
      this.appointments$.updateAppointment(newAppointment);
    } else {
      this.appointments$.addAppointment(newAppointment);
    }
  }
}
