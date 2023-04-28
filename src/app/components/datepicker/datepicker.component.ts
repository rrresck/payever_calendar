import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { SelectedDayService } from 'src/app/services/date.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent implements OnInit {
  selected: Date | null = null;
  dateFromUrl: Date | null = null;

  constructor(
    private selectedDate$: SelectedDayService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.dateFromUrl = this.location.path()
      ? new Date(this.location.path().split('/').splice(-3).join('-'))
      : null;

    if (
      (!this.selected && !this.dateFromUrl) ||
      isNaN(this.dateFromUrl!.valueOf())
    ) {
      this.selected = new Date(Date.now());
    } else {
      this.selected = this.dateFromUrl;
    }

    this.handleSelected();
  }

  handleSelected() {
    this.selectedDate$.updateDate(this.selected!);

    const route = `/calendar/${this.selected?.getFullYear()}/${
      this.selected?.getMonth()! + 1
    }`;

    const params = this.selected?.getDate();

    this.router.navigate([route, params]);
  }
}
