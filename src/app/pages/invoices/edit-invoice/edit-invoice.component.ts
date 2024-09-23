import { Component, input } from '@angular/core';
import { EditFormComponent } from '../../../components/invoices/edit-form/edit-form.component';

@Component({
  selector: 'app-edit-invoice',
  standalone: true,
  imports: [EditFormComponent],
  templateUrl: './edit-invoice.component.html',
  styleUrl: './edit-invoice.component.scss',
})
export class EditInvoiceComponent {
  id = input.required<string>();
}
