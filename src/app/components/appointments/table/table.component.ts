import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroTrash, heroPencil } from '@ng-icons/heroicons/outline';
import { Iappointment } from '../../../interfaces/iappointment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgIconComponent, RouterLink, DatePipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  providers: [provideIcons({ heroTrash, heroPencil })],
})
export class TableComponent {
  appointments = input.required<Iappointment[]>();
  onDeleteAppointment = output<string>();

  onDelete(id: string) {
    this.onDeleteAppointment.emit(id);
  }
}
