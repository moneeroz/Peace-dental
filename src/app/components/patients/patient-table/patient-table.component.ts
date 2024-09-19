import { Component, input } from '@angular/core';
import { IpatientInvoices } from '../../../services/patient.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { StatusComponent } from '../../invoices/status/status.component';

@Component({
  selector: 'app-patient-table',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, StatusComponent],
  templateUrl: './patient-table.component.html',
  styleUrl: './patient-table.component.scss',
})
export class PatientTableComponent {
  invoices = input.required<IpatientInvoices[]>();
}
