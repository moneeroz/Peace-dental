import { Component, input, OnInit } from '@angular/core';
import { EditFormComponent } from '../../../components/appointments/edit-form/edit-form.component';
import {
  Breadcrumb,
  BreadcrumbsComponent,
} from '../../../components/common/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-edit-appointment',
  standalone: true,
  imports: [EditFormComponent, BreadcrumbsComponent],
  templateUrl: './edit-appointment.component.html',
  styleUrl: './edit-appointment.component.scss',
})
export class EditAppointmentComponent implements OnInit {
  id = input.required<string>();
  breadcrumbs: Breadcrumb[] = [];

  ngOnInit() {
    this.breadcrumbs = [
      { label: 'Appointments', url: '/appointments' },
      {
        label: 'Edit Appointment',
        url: `/appointments/${this.id()}/edit`,
        active: true,
      },
    ];
  }
}
