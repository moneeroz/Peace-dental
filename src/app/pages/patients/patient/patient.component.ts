import { Component, inject, input, OnInit, signal } from '@angular/core';
import { PatientTableComponent } from '../../../components/patients/patient-table/patient-table.component';

import {
  IpatientInvoices,
  PatientService,
} from '../../../services/patient.service';
import { PatientTableSkeleton } from '../../../components/skeletons/patient-table-skeleton/patient-table-skeleton.component';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [PatientTableComponent, PatientTableSkeleton],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss',
})
export class PatientComponent implements OnInit {
  id = input.required<string>();
  patientService = inject(PatientService);
  patientInvoices = signal<IpatientInvoices[]>([]);

  ngOnInit() {
    this.loadInvoices(this.id());
  }

  loadInvoices(id: string) {
    this.patientService.getPatientInvoices(id).subscribe({
      next: (invoices) => {
        this.patientInvoices.set(invoices);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
