import { Component, inject, input, OnInit, signal } from '@angular/core';
import { EditFormComponent } from '../../../components/patients/edit-form/edit-form.component';
import { PatientService } from '../../../services/patient.service';
import { IpatientInfo } from '../../../interfaces/ipatient-info';

@Component({
  selector: 'app-edit-patient',
  standalone: true,
  imports: [EditFormComponent],
  templateUrl: './edit-patient.component.html',
  styleUrl: './edit-patient.component.scss',
})
export class EditPatientComponent {
  id = input.required<string>();
}
