import { Component, inject, input, OnInit, signal } from '@angular/core';
import { IappointmentInfo } from '../../../interfaces/iappointment-info';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Idoctor } from '../../../interfaces/idoctor';
import { AppointmentService } from '../../../services/appointment.service';
import { DoctorService } from '../../../services/doctor.service';
import confirmDate from 'flatpickr/dist/plugins/confirmDate/confirmDate';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  FlatpickrOptions,
  NgxFlatpickrWrapperComponent,
} from 'ngx-flatpickr-wrapper';
import {
  heroUser,
  heroHeart,
  heroUserPlus,
  heroCalendar,
} from '@ng-icons/heroicons/outline';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-edit-form',
  standalone: true,
  imports: [
    NgxFlatpickrWrapperComponent,
    NgIconComponent,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './edit-form.component.html',
  styleUrl: './edit-form.component.scss',
  providers: [
    provideIcons({
      heroUser,
      heroHeart,
      heroUserPlus,
      heroCalendar,
    }),
  ],
})
export class EditFormComponent implements OnInit {
  id = input.required<string>();
  appointment = signal<IappointmentInfo | null>(null);
  doctors = signal<Idoctor[]>([]);
  router = inject(Router);
  toast = inject(HotToastService);

  fb = inject(NonNullableFormBuilder);

  appointmentService = inject(AppointmentService);
  doctorService = inject(DoctorService);

  appointmentForm = this.fb.group({
    doctorId: this.fb.control(''),
    reason: this.fb.control(''),
    appointmentDate: this.fb.control(''),
  });

  ngOnInit(): void {
    this.loadappointment(this.id());
    this.loadDoctors();
  }

  options: FlatpickrOptions = {
    enableTime: true,
    minDate: 'today',
    plugins: [confirmDate({})],
  };

  loadappointment(id: string) {
    this.appointmentService.getAppointment(id).subscribe({
      next: (appointment) => {
        this.appointment.set(appointment);
        this.appointmentForm.patchValue(appointment);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  loadDoctors() {
    this.doctorService.getDoctors().subscribe({
      next: (doctors) => {
        this.doctors.set(doctors);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onSubmit() {
    const data = this.appointmentForm.getRawValue();
    const oldDate = this.appointment()?.appointmentDate;
    const newDate = data.appointmentDate;
    const appointmentDate = newDate === oldDate ? oldDate : newDate[0];

    this.appointmentService
      .updateAppointment({ ...data, appointmentDate }, this.id())
      .pipe(
        this.toast.observe({
          loading: 'Updating appointment...',
          success: 'Appointment updated',
          error: 'Something went wrong',
        }),
      )
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/appointments');
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
