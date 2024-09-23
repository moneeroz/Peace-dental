import { Component, input, OnInit } from '@angular/core';
import { EditFormComponent } from '../../../components/patients/edit-form/edit-form.component';
import {
  Breadcrumb,
  BreadcrumbsComponent,
} from '../../../components/common/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-edit-patient',
  standalone: true,
  imports: [EditFormComponent, BreadcrumbsComponent],
  templateUrl: './edit-patient.component.html',
  styleUrl: './edit-patient.component.scss',
})
export class EditPatientComponent implements OnInit {
  id = input.required<string>();
  breadcrumbs: Breadcrumb[] = [];

  ngOnInit() {
    this.breadcrumbs = [
      { label: 'Patients', url: '/patients' },
      {
        label: 'Edit Patient',
        url: `/patients/${this.id()}/edit`,
        active: true,
      },
    ];
  }
}
