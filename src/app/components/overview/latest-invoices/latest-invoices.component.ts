import { CurrencyPipe, NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroArrowPath } from '@ng-icons/heroicons/outline';
import { ILatestInvoice } from '../../../interfaces/ilatest-invoice';

@Component({
  selector: 'app-latest-invoices',
  standalone: true,
  imports: [NgIconComponent, CurrencyPipe, NgClass],
  templateUrl: './latest-invoices.component.html',
  styleUrl: './latest-invoices.component.scss',
  providers: [provideIcons({ heroArrowPath })],
})
export class LatestInvoicesComponent {
  latestInvoices = input.required<ILatestInvoice[] | undefined>();
}
