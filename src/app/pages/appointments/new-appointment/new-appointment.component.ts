import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from '../../../services/appointment.service';
import { IappointmentInfo } from '../../../interfaces/iappointment-info';
import { NewFormComponent } from '../../../components/appointments/new-form/new-form.component';
import {
  Breadcrumb,
  BreadcrumbsComponent,
} from '../../../components/common/breadcrumbs/breadcrumbs.component';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-new-appointment',
  standalone: true,
  imports: [NewFormComponent, BreadcrumbsComponent],
  templateUrl: './new-appointment.component.html',
  styleUrl: './new-appointment.component.scss',
})
export class NewAppointmentComponent {
  router = inject(Router);
  appointmentService = inject(AppointmentService);
  toast = inject(HotToastService);

  breadcrumbs: Breadcrumb[] = [
    { label: 'Appointments', url: '/appointments' },
    {
      label: 'New Appointment',
      url: `/appointments/new`,
      active: true,
    },
  ];

  onSubmit(appointment: IappointmentInfo) {
    this.appointmentService
      .addAppointment(appointment)
      .pipe(
        this.toast.observe({
          loading: 'Creating appointment...',
          success: 'Appointment created',
          error: 'Something went wrong',
        }),
      )
      .subscribe({
        next: () => this.router.navigateByUrl('/appointments'),
        error: (err) => console.log(err),
      });
  }
}
