import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from '../../../services/appointment.service';
import { IappointmentInfo } from '../../../interfaces/iappointment-info';
import { NewFormComponent } from '../../../components/appointments/new-form/new-form.component';

@Component({
  selector: 'app-new-appointment',
  standalone: true,
  imports: [NewFormComponent],
  templateUrl: './new-appointment.component.html',
  styleUrl: './new-appointment.component.scss',
})
export class NewAppointmentComponent {
  router = inject(Router);
  appointmentService = inject(AppointmentService);

  onSubmit(appointment: IappointmentInfo) {
    this.appointmentService.addAppointment(appointment).subscribe({
      next: () => this.router.navigateByUrl('/appointments'),
      error: (err) => console.log(err),
    });
  }
}
