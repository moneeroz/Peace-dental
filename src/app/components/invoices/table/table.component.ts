import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroTrash, heroPencil } from '@ng-icons/heroicons/outline';
import { StatusComponent } from '../status/status.component';
import { Iinvoice } from '../../../interfaces/iinvoice';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    NgIconComponent,
    RouterLink,
    CurrencyPipe,
    DatePipe,
    StatusComponent,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  providers: [provideIcons({ heroTrash, heroPencil })],
})
export class TableComponent {
  invoices = input.required<Iinvoice[]>();
  onDeleteInvoice = output<string>();

  onDelete(id: string) {
    this.onDeleteInvoice.emit(id);
  }
}
