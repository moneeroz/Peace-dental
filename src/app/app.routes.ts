import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/dashboard/layout/layout.component';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'overview',
        title: 'Overview',
        loadComponent: () =>
          import('./pages/overview/overview.component').then(
            (m) => m.OverviewComponent,
          ),
      },
      {
        path: 'patients',
        title: 'Patients',
        loadComponent: () =>
          import('./pages/patients/patients.component').then(
            (m) => m.PatientsComponent,
          ),
      },
      {
        path: 'patients/new',
        title: 'New Patient',
        loadComponent: () =>
          import('./pages/patients/new-patient/new-patient.component').then(
            (m) => m.NewPatientComponent,
          ),
      },
      {
        path: 'patients/:id',
        title: 'Patient',
        loadComponent: () =>
          import('./pages/patients/patient/patient.component').then(
            (m) => m.PatientComponent,
          ),
      },
      {
        path: 'patients/:id/edit',
        title: 'Edit Patient',
        loadComponent: () =>
          import('./pages/patients/edit-patient/edit-patient.component').then(
            (m) => m.EditPatientComponent,
          ),
      },
      {
        path: 'invoices',
        title: 'Invoices',
        loadComponent: () =>
          import('./pages/invoices/invoices.component').then(
            (m) => m.InvoicesComponent,
          ),
      },
      {
        path: 'invoices/:id/edit',
        title: 'Edit Invoice',
        loadComponent: () =>
          import('./pages/invoices/edit-invoice/edit-invoice.component').then(
            (m) => m.EditInvoiceComponent,
          ),
      },
      {
        path: 'invoices/new',
        title: 'New Invoice',
        loadComponent: () =>
          import('./pages/invoices/new-invoice/new-invoice.component').then(
            (m) => m.NewInvoiceComponent,
          ),
      },
      {
        path: 'appointments',
        title: 'Appointments',
        loadComponent: () =>
          import('./pages/appointments/appointments.component').then(
            (m) => m.AppointmentsComponent,
          ),
      },
      {
        path: 'appointments/:id/edit',
        title: 'Edit Appointment',
        loadComponent: () =>
          import(
            './pages/appointments/edit-appointment/edit-appointment.component'
          ).then((m) => m.EditAppointmentComponent),
      },
      {
        path: 'appointments/new',
        title: 'New Appointment',
        loadComponent: () =>
          import(
            './pages/appointments/new-appointment/new-appointment.component'
          ).then((m) => m.NewAppointmentComponent),
      },
      {
        path: 'revenue',
        title: 'Revenue',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/revenue/revenue.component').then(
            (m) => m.RevenueComponent,
          ),
      },
      {
        path: 'unauthorized',
        title: 'Unauthorized Access',
        loadComponent: () =>
          import(
            './components/common/un-authorized/un-authorized.component'
          ).then((m) => m.UnAuthorizedComponent),
      },
    ],
  },
  {
    path: '**',
    title: 'Page Not Found',
    loadComponent: () =>
      import('./components/common/not-found/not-found.component').then(
        (m) => m.NotFoundComponent,
      ),
  },
];
