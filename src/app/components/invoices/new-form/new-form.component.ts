import { Component, inject, OnInit, output, signal } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IinvoiceInfo } from '../../../interfaces/iinvoice-info';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { PatientService } from '../../../services/patient.service';
import { DoctorService } from '../../../services/doctor.service';
import { Idoctor } from '../../../interfaces/idoctor';
import { IpatientInfo } from '../../../interfaces/ipatient-info';
import {
  NgLabelTemplateDirective,
  NgOptionTemplateDirective,
  NgSelectComponent,
  NgOptionComponent,
} from '@ng-select/ng-select';
import {
  heroUser,
  heroCurrencyDollar,
  heroCheck,
  heroClock,
  heroHeart,
  heroUserPlus,
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-new-form',
  standalone: true,
  imports: [
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
      heroCurrencyDollar,
      heroCheck,
      heroClock,
      heroHeart,
      heroUserPlus,
    }),
  ],
})
export class NewFormComponent implements OnInit {
  fb = inject(NonNullableFormBuilder);
  invoice = output<IinvoiceInfo>();
  patients = signal<IpatientInfo[]>([]);
  doctors = signal<Idoctor[]>([]);

  patientService = inject(PatientService);
  doctorService = inject(DoctorService);

  invoiceForm = this.fb.group({
    patientId: this.fb.control('', { validators: [Validators.required] }),
    doctorId: this.fb.control('', { validators: [Validators.required] }),
    reason: this.fb.control('', {
      validators: [Validators.required, Validators.minLength(4)],
    }),
    amount: this.fb.control('', { validators: [Validators.required] }),
    status: this.fb.control(0, { validators: [Validators.required] }),
  });

  ngOnInit() {
    this.loadPatients();
    this.loadDoctors();
  }

  onSubmit() {
    const data = this.invoiceForm.getRawValue();

    this.invoice.emit(data);
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
