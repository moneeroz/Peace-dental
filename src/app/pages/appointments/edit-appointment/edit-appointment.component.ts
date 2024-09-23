import { Component, input } from '@angular/core';
import { EditFormComponent } from '../../../components/appointments/edit-form/edit-form.component';

@Component({
  selector: 'app-edit-appointment',
  standalone: true,
  imports: [EditFormComponent],
  templateUrl: './edit-appointment.component.html',
  styleUrl: './edit-appointment.component.scss',
})
export class EditAppointmentComponent {
  id = input.required<string>();
}
