import { Component, inject } from '@angular/core';
import { NewFormComponent } from '../../../components/invoices/new-form/new-form.component';
import { Router } from '@angular/router';
import { InvoiceService } from '../../../services/invoice.service';
import { IinvoiceInfo } from '../../../interfaces/iinvoice-info';

@Component({
  selector: 'app-new-invoice',
  standalone: true,
  imports: [NewFormComponent],
  templateUrl: './new-invoice.component.html',
  styleUrl: './new-invoice.component.scss',
})
export class NewInvoiceComponent {
  router = inject(Router);
  invoiceService = inject(InvoiceService);

  onSubmit(invoice: IinvoiceInfo) {
    this.invoiceService.addInvoice(invoice).subscribe({
      next: () => this.router.navigateByUrl('/invoices'),
      error: (err) => console.log(err),
    });
  }
}
