import { Component, input } from '@angular/core';
import { Iinvoice } from '../../../interfaces/iinvoice';
import {
  CurrencyPipe,
  DatePipe,
  NgOptimizedImage,
  provideCloudinaryLoader,
} from '@angular/common';

@Component({
  selector: 'app-print-invoice',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, NgOptimizedImage],
  templateUrl: './print-invoice.component.html',
  styleUrl: './print-invoice.component.scss',
  providers: [provideCloudinaryLoader('https://res.cloudinary.com/dsity4tvx/')],
})
export class PrintInvoiceComponent {
  invoice = input.required<Iinvoice>();
  printSection = input.required<string>();
}
