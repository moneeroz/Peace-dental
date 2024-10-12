import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/dashboard/layout/layout.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { PatientComponent } from './pages/patients/patient/patient.component';
import { EditPatientComponent } from './pages/patients/edit-patient/edit-patient.component';
import { NewPatientComponent } from './pages/patients/new-patient/new-patient.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { EditInvoiceComponent } from './pages/invoices/edit-invoice/edit-invoice.component';
import { NewInvoiceComponent } from './pages/invoices/new-invoice/new-invoice.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { EditAppointmentComponent } from './pages/appointments/edit-appointment/edit-appointment.component';
import { NewAppointmentComponent } from './pages/appointments/new-appointment/new-appointment.component';
import { RevenueComponent } from './pages/revenue/revenue.component';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';
import { UnAuthorizedComponent } from './components/common/un-authorized/un-authorized.component';
import { NotFoundComponent } from './components/common/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'overview', component: OverviewComponent },
      { path: 'patients', component: PatientsComponent },
      { path: 'patients/new', component: NewPatientComponent },
      { path: 'patients/:id', component: PatientComponent },
      { path: 'patients/:id/edit', component: EditPatientComponent },
      { path: 'invoices', component: InvoicesComponent },
      { path: 'invoices/:id/edit', component: EditInvoiceComponent },
      { path: 'invoices/new', component: NewInvoiceComponent },
      { path: 'appointments', component: AppointmentsComponent },
      { path: 'appointments/:id/edit', component: EditAppointmentComponent },
      { path: 'appointments/new', component: NewAppointmentComponent },
      {
        path: 'revenue',
        component: RevenueComponent,
        canActivate: [authGuard],
      },
      { path: 'unauthorized', component: UnAuthorizedComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
