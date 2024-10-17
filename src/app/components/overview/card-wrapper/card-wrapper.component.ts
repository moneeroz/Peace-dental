import { Component, input } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { IinvoiceStats } from '../../../interfaces/iinvoicestats';

@Component({
  selector: 'app-card-wrapper',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './card-wrapper.component.html',
  styleUrl: './card-wrapper.component.scss',
})
export class CardWrapperComponent {
  invoiceStats = input.required<IinvoiceStats | undefined>();
  appointmentCount = input.required<number | undefined>();
}
