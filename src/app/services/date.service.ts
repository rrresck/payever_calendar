import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelectedDayService {
  date$ = new BehaviorSubject<Date | null>(null);

  getDate() {
    return this.date$.getValue();
  }

  updateDate(date: Date): void {
    this.date$.next(date);
  }
}
