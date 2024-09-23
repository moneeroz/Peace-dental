import { Component, input, OnInit } from '@angular/core';
import { EditFormComponent } from '../../../components/invoices/edit-form/edit-form.component';
import {
  Breadcrumb,
  BreadcrumbsComponent,
} from '../../../components/common/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-edit-invoice',
  standalone: true,
  imports: [EditFormComponent, BreadcrumbsComponent],
  templateUrl: './edit-invoice.component.html',
  styleUrl: './edit-invoice.component.scss',
})
export class EditInvoiceComponent implements OnInit {
  id = input.required<string>();
  breadcrumbs: Breadcrumb[] = [];

  ngOnInit() {
    this.breadcrumbs = [
      { label: 'Invoices', url: '/invoices' },
      {
        label: 'Edit Invoice',
        url: `/invoices/${this.id()}/edit`,
        active: true,
      },
    ];
  }
}
