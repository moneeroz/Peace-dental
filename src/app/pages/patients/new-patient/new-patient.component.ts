import { Component, inject } from '@angular/core';
import { NewFormComponent } from '../../../components/patients/new-form/new-form.component';
import { IpatientInfo } from '../../../interfaces/ipatient-info';
import { Router } from '@angular/router';
import { PatientService } from '../../../services/patient.service';
import {
  Breadcrumb,
  BreadcrumbsComponent,
} from '../../../components/common/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-new-patient',
  standalone: true,
  imports: [NewFormComponent, BreadcrumbsComponent],
  templateUrl: './new-patient.component.html',
  styleUrl: './new-patient.component.scss',
})
export class NewPatientComponent {
  router = inject(Router);
  patientService = inject(PatientService);

  breadcrumbs: Breadcrumb[] = [
    { label: 'Patients', url: '/patients' },
    {
      label: 'New Patient',
      url: `/patients/new`,
      active: true,
    },
  ];

  onSubmit(patient: IpatientInfo) {
    this.patientService.addPatient(patient).subscribe({
      next: () => this.router.navigateByUrl('/patients'),
      error: (err) => console.log(err),
    });
  }
}
