import { Component, inject, output, signal } from '@angular/core';
import { IappointmentInfo } from '../../../interfaces/iappointment-info';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IpatientInfo } from '../../../interfaces/ipatient-info';
import { Idoctor } from '../../../interfaces/idoctor';
import { PatientService } from '../../../services/patient.service';
import { DoctorService } from '../../../services/doctor.service';
import {
  FlatpickrOptions,
  NgxFlatpickrWrapperComponent,
} from 'ngx-flatpickr-wrapper';
import confirmDate from 'flatpickr/dist/plugins/confirmDate/confirmDate';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  NgLabelTemplateDirective,
  NgOptionTemplateDirective,
  NgSelectComponent,
  NgOptionComponent,
} from '@ng-select/ng-select';
import {
  heroUser,
  heroHeart,
  heroUserPlus,
  heroCalendar,
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-new-form',
  standalone: true,
  imports: [
    NgxFlatpickrWrapperComponent,
    NgIconComponent,
    ReactiveFormsModule,
    RouterLink,
    NgLabelTemplateDirective,
    NgOptionTemplateDirective,
    NgSelectComponent,
    NgOptionComponent,
  ],
  templateUrl: './new-form.component.html',
  styleUrl: './new-form.component.scss',
  providers: [
    provideIcons({
      heroUser,
      heroHeart,
      heroUserPlus,
      heroCalendar,
    }),
  ],
})
export class NewFormComponent {
  appointment = output<IappointmentInfo>();
  fb = inject(NonNullableFormBuilder);
  patients = signal<IpatientInfo[]>([]);
  doctors = signal<Idoctor[]>([]);

  patientService = inject(PatientService);
  doctorService = inject(DoctorService);

  appointmentForm = this.fb.group({
    patientId: this.fb.control(''),
    doctorId: this.fb.control(''),
    reason: this.fb.control(''),
    appointmentDate: this.fb.control(''),
  });

  options: FlatpickrOptions = {
    enableTime: true,
    minDate: 'today',
    plugins: [confirmDate({})],
  };

  ngOnInit() {
    this.loadPatients();
    this.loadDoctors();
  }

  onSubmit() {
    const data = this.appointmentForm.getRawValue();
    const appointmentDate = data.appointmentDate[0];
    this.appointment.emit({ ...data, appointmentDate });
  }

  loadPatients() {
    this.patientService.getAllPatients().subscribe({
      next: (patients) => {
        this.patients.set(patients);
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
}
