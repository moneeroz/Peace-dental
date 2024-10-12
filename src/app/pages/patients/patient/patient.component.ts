import { Component, inject, input, OnInit, signal } from '@angular/core';
import { PatientTableComponent } from '../../../components/patients/patient-table/patient-table.component';
import { PatientTableSkeleton } from '../../../components/skeletons/patient-table-skeleton/patient-table-skeleton.component';
import {
  IpatientInvoices,
  PatientService,
} from '../../../services/patient.service';
import {
  Breadcrumb,
  BreadcrumbsComponent,
} from '../../../components/common/breadcrumbs/breadcrumbs.component';

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
  breadcrumbs: Breadcrumb[] = [];

  ngOnInit() {
    this.loadInvoices(this.id());

    this.breadcrumbs = [
      { label: 'Patients', url: '/patients' },
      {
        label: 'Patient Invoices',
        url: `/patients/${this.id()}`,
        active: true,
      },
    ];
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
