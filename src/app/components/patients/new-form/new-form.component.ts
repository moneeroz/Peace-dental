import { Component, inject, output } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroUser, heroPhone } from '@ng-icons/heroicons/outline';
import { IpatientInfo } from '../../../interfaces/ipatient-info';

@Component({
  selector: 'app-new-form',
  standalone: true,
  imports: [NgIconComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './new-form.component.html',
  styleUrl: './new-form.component.scss',
  providers: [provideIcons({ heroUser, heroPhone })],
})
export class NewFormComponent {
  fb = inject(NonNullableFormBuilder);
  patient = output<IpatientInfo>();

  patientForm = this.fb.group({
    name: this.fb.control('', {
      validators: [Validators.required, Validators.minLength(4)],
    }),
    phone: this.fb.control('', {
      validators: [Validators.required, Validators.minLength(4)],
    }),
  });

  onSubmit() {
    const { name, phone } = this.patientForm.getRawValue();
    this.patient.emit({ name, phone });
  }
}
