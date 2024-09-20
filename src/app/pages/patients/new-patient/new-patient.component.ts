import { Component, inject } from '@angular/core';
import { NewFormComponent } from '../../../components/patients/new-form/new-form.component';
import { IpatientInfo } from '../../../interfaces/ipatient-info';
import { Router } from '@angular/router';
import { PatientService } from '../../../services/patient.service';

@Component({
  selector: 'app-new-patient',
  standalone: true,
  imports: [NewFormComponent],
  templateUrl: './new-patient.component.html',
  styleUrl: './new-patient.component.scss',
})
export class NewPatientComponent {
  router = inject(Router);
  patientService = inject(PatientService);
  onSubmit(patient: IpatientInfo) {
    this.patientService.addPatient(patient).subscribe({
      next: () => this.router.navigateByUrl('/patients'),
      error: (err) => console.log(err),
    });
  }
}
