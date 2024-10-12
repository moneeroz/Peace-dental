import {
  Component,
  ChangeDetectionStrategy,
  inject,
  OnInit,
} from '@angular/core';
import { isSameDay, isSameMonth, addHours, toDate, formatISO } from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView,
  CalendarModule,
} from 'angular-calendar';
import { NgSwitch, NgSwitchCase } from '@angular/common';
import { OverviewService } from '../../../services/overview.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroTrash,
  heroPencil,
  heroArrowLeft,
  heroArrowRight,
} from '@ng-icons/heroicons/outline';

export const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calender',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CalendarModule, NgSwitch, NgSwitchCase, NgIconComponent],
  templateUrl: './calender.component.html',
  styleUrl: './calender.component.scss',
  providers: [
    provideIcons({ heroTrash, heroPencil, heroArrowLeft, heroArrowRight }),
  ],
})
export class CalenderComponent implements OnInit {
  overviewService = inject(OverviewService);

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  ngOnInit(): void {
    this.loadCalenderData();
  }

  refresh = new Subject<void>();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = false;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    if (event.id === undefined) {
      return;
    }

    this.overviewService
      .updateDate({
        appointmentDate: newStart,
        id: event.id.toString(),
      })
      .subscribe();

    this.events = this.events?.map((iEvent) => {
      if (iEvent === event) {
        console.log(formatISO(newStart));
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events?.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  loadCalenderData() {
    this.overviewService.getData().subscribe({
      next: (data) => {
        this.events = data.map((event) => {
          return {
            id: event.id,
            start: toDate(event.appointmentDate),
            end: toDate(addHours(event.appointmentDate, 2)),
            title: `${event.reason} - ${event.patientName}`,
            color: event.doctorName == 'Asmaa' ? colors.yellow : colors.blue,
            draggable: true,
          };
        });
        this.refresh.next();
      },
      error: (error) => {
        console.error('Error loading calender data', error);
      },
    });
  }
}
