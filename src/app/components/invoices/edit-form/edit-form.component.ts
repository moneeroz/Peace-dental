import { Component, inject, input, OnInit, signal } from '@angular/core';
import { IinvoiceInfo } from '../../../interfaces/iinvoice-info';
import { Router, RouterLink } from '@angular/router';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { InvoiceService } from '../../../services/invoice.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroCurrencyDollar,
  heroDocument,
  heroHeart,
  heroCheck,
  heroClock,
} from '@ng-icons/heroicons/outline';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-edit-form',
  standalone: true,
  imports: [NgIconComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './edit-form.component.html',
  styleUrl: './edit-form.component.scss',
  providers: [
    provideIcons({
      heroCurrencyDollar,
      heroDocument,
      heroHeart,
      heroCheck,
      heroClock,
    }),
  ],
})
export class EditFormComponent implements OnInit {
  id = input.required<string>();
  invoice = signal<IinvoiceInfo | null>(null);
  router = inject(Router);
  fb = inject(NonNullableFormBuilder);
  toast = inject(HotToastService);

  invoiceService = inject(InvoiceService);

  invoiceForm = this.fb.group({
    reason: this.fb.control(''),
    amount: this.fb.control(''),
    status: this.fb.control(0),
  });

  ngOnInit(): void {
    this.loadInvoice(this.id());
  }

  loadInvoice(id: string) {
    this.invoiceService.getInvoice(id).subscribe({
      next: (invoice) => {
        this.invoice.set(invoice);
        this.invoiceForm.patchValue(invoice);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onSubmit() {
    const { reason, amount, status } = this.invoiceForm.getRawValue();
    this.invoiceService
      .updateInvoice({ id: this.id(), reason, amount, status })
      .pipe(
        this.toast.observe({
          loading: 'Updating invoice...',
          success: 'Invoice updated',
          error: 'Something went wrong',
        }),
      )
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/invoices');
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
