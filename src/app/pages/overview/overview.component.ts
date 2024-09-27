import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { CardWrapperComponent } from '../../components/overview/card-wrapper/card-wrapper.component';
import { LatestAppointmentsComponent } from '../../components/overview/latest-appointments/latest-appointments.component';
import { LatestInvoicesComponent } from '../../components/overview/latest-invoices/latest-invoices.component';
import { OverviewService } from '../../services/overview.service';
import { CalenderComponent } from '../../components/overview/calender/calender.component';
import { CardWrapperSkeleton } from '../../components/skeletons/card-wrapper/card-wrapper.component';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    CardWrapperComponent,
    LatestAppointmentsComponent,
    LatestInvoicesComponent,
    CalenderComponent,
    CardWrapperSkeleton,
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
})
export class OverviewComponent {
  overviewService = inject(OverviewService);
  data = this.overviewService.getCardData();
  latestAppointments = this.overviewService.getLatestAppointments();
  latestInvoices = this.overviewService.getLatestInvoices();
}
