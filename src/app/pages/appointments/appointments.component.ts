import { Component, inject, OnInit, signal } from '@angular/core';
import { TableComponent } from '../../components/appointments/table/table.component';
import { Iappointment } from '../../interfaces/iappointment';
import { AppointmentService } from '../../services/appointment.service';
import { SearchComponent } from '../../components/common/search/search.component';
import { AddButtonComponent } from '../../components/common/add-button/add-button.component';
import { PaginationComponent } from '../../components/common/pagination/pagination.component';
import { PaginationService } from '../../services/pagination.service';
import { AppointmentTableSkeleton } from '../../components/skeletons/appointment-table-skeleton/appointment-table-skeleton.component';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [
    TableComponent,
    SearchComponent,
    AddButtonComponent,
    PaginationComponent,
    AppointmentTableSkeleton,
  ],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.scss',
})
export class AppointmentsComponent implements OnInit {
  paginationService = inject(PaginationService);
  readonly appointments = signal<Iappointment[]>([]);
  private readonly appointmentService = inject(AppointmentService);

  query = signal<string>('');

  placeHolder = 'Search for Appointments...';

  ngOnInit() {
    this.loadAppointments();
    this.loadTotalPages();
  }

  loadAppointments(query: string | null = null, page: number = 1) {
    query = query?.trim() || '';
    this.appointmentService.getAppointments({ query, page }).subscribe({
      next: (appointments) => {
        this.paginationService.setCurrentPage(page);
        this.appointments.set(appointments);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  loadTotalPages(query: string | null = null) {
    query = query?.trim() || '';
    this.appointmentService.getTotalPages(query).subscribe({
      next: (totalPages) => {
        this.paginationService.setTotalPages(totalPages);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteAppointment(id: string) {
    this.appointmentService.deleteAppointment(id).subscribe({
      next: () => {
        this.loadAppointments();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  filterAppointments(query: string | null) {
    query = query?.trim() || '';
    this.query.set(query);
    this.loadAppointments(this.query());
    this.loadTotalPages(this.query());
  }

  // pagination
  navigateToPage(page: number) {
    this.loadAppointments(this.query(), page);
    this.loadTotalPages(this.query());
  }
}
