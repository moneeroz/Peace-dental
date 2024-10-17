import { Component, inject } from '@angular/core';
import { CardWrapperComponent } from '../../components/overview/card-wrapper/card-wrapper.component';
import { OverviewService } from '../../services/overview.service';
import { CalenderComponent } from '../../components/overview/calender/calender.component';
import { CardWrapperSkeleton } from '../../components/skeletons/card-wrapper/card-wrapper.component';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CardWrapperComponent, CalenderComponent, CardWrapperSkeleton],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
})
export class OverviewComponent {
  overviewService = inject(OverviewService);
  invoiceStats = this.overviewService.getInvoiceStats();
  appointmentCount = this.overviewService.getAppointmentCount();
}
