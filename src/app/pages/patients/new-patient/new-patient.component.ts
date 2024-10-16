import { Component, inject } from '@angular/core';
import { NewFormComponent } from '../../../components/patients/new-form/new-form.component';
import { IpatientInfo } from '../../../interfaces/ipatient-info';
import { Router } from '@angular/router';
import { PatientService } from '../../../services/patient.service';
import {
  Breadcrumb,
  BreadcrumbsComponent,
} from '../../../components/common/breadcrumbs/breadcrumbs.component';
import { HotToastService } from '@ngneat/hot-toast';

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
  toast = inject(HotToastService);

  breadcrumbs: Breadcrumb[] = [
    { label: 'Patients', url: '/patients' },
    {
      label: 'New Patient',
      url: `/patients/new`,
      active: true,
    },
  ];

  onSubmit(patient: IpatientInfo) {
    this.patientService
      .addPatient(patient)
      .pipe(
        this.toast.observe({
          loading: 'Creating patient...',
          success: 'Patient created',
          error: 'Something went wrong',
        }),
      )
      .subscribe({
        next: () => this.router.navigateByUrl('/patients'),
        error: (err) => console.log(err),
      });
  }
}
