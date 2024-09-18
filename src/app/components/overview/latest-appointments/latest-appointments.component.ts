import { DatePipe, NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroArrowPath } from '@ng-icons/heroicons/outline';
import { ILatestAppointment } from '../../../interfaces/ilatest-appointment';

@Component({
  selector: 'app-latest-appointments',
  standalone: true,
  imports: [DatePipe, NgIconComponent, NgClass],
  templateUrl: './latest-appointments.component.html',
  styleUrl: './latest-appointments.component.scss',
  providers: [provideIcons({ heroArrowPath })],
})
export class LatestAppointmentsComponent {
  latestAppointments = input.required<ILatestAppointment[] | undefined>();
}
