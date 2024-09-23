import { Component, inject, OnInit, signal } from '@angular/core';
import { TableComponent } from '../../components/invoices/table/table.component';
import { Iinvoice } from '../../interfaces/iinvoice';
import { InvoiceService } from '../../services/invoice.service';
import { SearchComponent } from '../../components/common/search/search.component';
import { AddButtonComponent } from '../../components/common/add-button/add-button.component';
import { PaginationComponent } from '../../components/common/pagination/pagination.component';
import { PaginationService } from '../../services/pagination.service';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [
    TableComponent,
    SearchComponent,
    AddButtonComponent,
    PaginationComponent,
  ],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.scss',
})
export class InvoicesComponent implements OnInit {
  paginationService = inject(PaginationService);
  private readonly invoiceService = inject(InvoiceService);
  readonly invoices = signal<Iinvoice[]>([]);

  query = signal<string>('');
  placeHolder = 'Search for Invoices...';

  ngOnInit() {
    this.loadInvoices();
    this.loadTotalPages();
  }

  loadInvoices(query: string | null = null, page: number = 1) {
    query = query?.trim() || '';
    this.invoiceService.getInvoices({ query, page }).subscribe({
      next: (invoices) => {
        this.paginationService.setCurrentPage(page);
        this.invoices.set(invoices);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  loadTotalPages(query: string | null = null) {
    query = query?.trim() || '';
    this.invoiceService.getTotalPages(query).subscribe({
      next: (totalPages) => {
        this.paginationService.setTotalPages(totalPages);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteInvoice(id: string) {
    this.invoiceService.deleteInvoice(id).subscribe({
      next: () => {
        this.loadInvoices();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  filterInvoices(query: string | null) {
    query = query?.trim() || '';
    this.query.set(query);
    this.loadInvoices(this.query());
    this.loadTotalPages(this.query());
  }

  // pagination
  navigateToPage(page: number) {
    this.loadInvoices(this.query(), page);
    this.loadTotalPages(this.query());
  }
}
