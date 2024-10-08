import { Component, inject, OnInit, signal } from '@angular/core';
import { TableComponent } from '../../components/patients/table/table.component';
import { PatientService } from '../../services/patient.service';
import { Ipatient } from '../../interfaces/ipatient';
import { SearchComponent } from '../../components/common/search/search.component';
import { AddButtonComponent } from '../../components/common/add-button/add-button.component';
import { PaginationComponent } from '../../components/common/pagination/pagination.component';
import { PaginationService } from '../../services/pagination.service';
import { PatientsTableSkeleton } from '../../components/skeletons/patients-table-skeleton/patients-table-skeleton.component';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [
    TableComponent,
    SearchComponent,
    AddButtonComponent,
    PaginationComponent,
    PatientsTableSkeleton,
  ],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.scss',
})
export class PatientsComponent implements OnInit {
  paginationService = inject(PaginationService);
  private readonly patientService = inject(PatientService);
  readonly patients = signal<Ipatient[]>([]);

  query = signal<string>('');
  placeHolder = 'Search for patients...';

  ngOnInit() {
    this.loadPatients();
    this.loadTotalPages();
  }

  filterPatients(query: string | null = null) {
    query = query?.trim() || '';
    this.query.set(query);
    this.loadPatients(this.query());
    this.loadTotalPages(this.query());
  }

  loadPatients(query: string | null = null, page: number = 1) {
    query = query?.trim() || '';
    this.patientService.getPatients({ query, page }).subscribe({
      next: (patients) => {
        this.paginationService.setCurrentPage(page);
        this.patients.set(patients);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  loadTotalPages(query: string | null = null) {
    query = query?.trim() || '';
    this.patientService.getTotalPages(query).subscribe({
      next: (totalPages) => {
        this.paginationService.setTotalPages(totalPages);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deletePatient(id: string) {
    this.patientService.deletePatient(id).subscribe({
      next: () => {
        this.loadPatients();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // pagination
  navigateToPage(page: number) {
    this.loadPatients(this.query(), page);
    this.loadTotalPages(this.query());
  }
}
