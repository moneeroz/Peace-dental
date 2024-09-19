import { Component, inject, input, OnInit, signal } from '@angular/core';
import { IpatientInfo } from '../../../interfaces/ipatient-info';
import { Router, RouterLink } from '@angular/router';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroUser, heroPhone } from '@ng-icons/heroicons/outline';
import { CommonModule } from '@angular/common';
import { PatientService } from '../../../services/patient.service';

@Component({
  selector: 'app-edit-form',
  standalone: true,
  imports: [NgIconComponent, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './edit-form.component.html',
  styleUrl: './edit-form.component.scss',
  providers: [provideIcons({ heroUser, heroPhone })],
})
export class EditFormComponent implements OnInit {
  id = input.required<string>();
  patient = signal<IpatientInfo | null>(null);

  router = inject(Router);
  fb = inject(NonNullableFormBuilder);
  patientService = inject(PatientService);

  patientForm = this.fb.group({
    name: this.fb.control('', {
      validators: [Validators.required],
    }),
    phone: this.fb.control(''),
  });

  ngOnInit(): void {
    this.loadPaitent(this.id());
  }

  loadPaitent(id: string) {
    this.patientService.getPatient(id).subscribe({
      next: (patient) => {
        this.patient.set(patient);

        this.patientForm.patchValue(patient);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onSubmit() {
    const { name, phone } = this.patientForm.getRawValue();
    this.patientService
      .updatePatient({ id: this.id(), name, phone })
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/patients');
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
