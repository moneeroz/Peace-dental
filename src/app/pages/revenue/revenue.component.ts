import { Component, inject, OnInit, signal } from '@angular/core';
import { CardWrapperComponent } from '../../components/revenue/card-wrapper/card-wrapper.component';
import { ChartComponent } from '../../components/revenue/chart/chart.component';
import { LatestInvoicesComponent } from '../../components/overview/latest-invoices/latest-invoices.component';
import { IRevenuCard } from '../../interfaces/irevenu-card';
import { RevenueService } from '../../services/revenue.service';
import { IChartData } from '../../interfaces/ichart-data';
import { FliterComponent } from '../../components/revenue/fliter/fliter.component';
import { months } from '../../lib/utils';
import { Idoctor } from '../../interfaces/idoctor';
import { DoctorService } from '../../services/doctor.service';
import { SearchComponent } from '../../components/revenue/search/search.component';
import { CardWrapperSkeleton } from '../../components/skeletons/card-wrapper/card-wrapper.component';
import { ChartSkeleton } from '../../components/skeletons/chart-skeleton/chart-skeleton.component';
import { InvoicesCardSkeleton } from '../../components/skeletons/invoices-card-skeleton/invoices-card-skeleton.component';

@Component({
  selector: 'app-revenue',
  standalone: true,
  imports: [
    CardWrapperComponent,
    ChartComponent,
    LatestInvoicesComponent,
    FliterComponent,
    SearchComponent,
    CardWrapperSkeleton,
    ChartSkeleton,
    InvoicesCardSkeleton,
  ],
  templateUrl: './revenue.component.html',
  styleUrl: './revenue.component.scss',
})
export class RevenueComponent implements OnInit {
  revenueService = inject(RevenueService);
  doctorService = inject(DoctorService);
  latestInvoices = this.revenueService.getLatestInvoices();
  cardData = signal<IRevenuCard | undefined>(undefined);
  chartData = signal<IChartData[]>([]);
  doctors = signal<Idoctor[]>([]);
  month = signal<number | string | null>('');
  year = signal<number | string | null>('');
  doctorId = signal<number | string | null>('');

  months = months;

  ngOnInit(): void {
    this.loadCardData();
    this.loadChartData();
    this.loadDoctors();
  }

  loadCardData(data?: { month?: number; year?: number; doctorId?: string }) {
    this.revenueService.getCardData(data).subscribe({
      next: (data) => {
        this.cardData.set(data);
      },
      error: (error) => {
        console.error('Error loading card data', error);
      },
    });
  }

  loadChartData(data?: { year: number }) {
    this.revenueService.GetChartData(data).subscribe({
      next: (data) => {
        this.chartData.set(data);
      },
      error: (error) => {
        console.error('Error loading chart data', error);
      },
    });
  }

  loadDoctors() {
    this.doctorService.getDoctors().subscribe({
      next: (data) => {
        this.doctors.set(data);
      },
      error: (error) => {
        console.error('Error loading doctors', error);
      },
    });
  }

  onMonthChange(month: number | string | null) {
    this.month.set(month);
    this.loadCardData({
      month: Number(month),
      year: Number(this.year()),
      doctorId: String(this.doctorId()),
    });
  }

  onYearChange(year: number | string | null) {
    this.year.set(year);
    this.loadCardData({
      year: Number(year),
      month: Number(this.month()),
      doctorId: String(this.doctorId()),
    });
    this.loadChartData({ year: Number(year) });
  }

  onDoctorChange(doctorId: number | string | null) {
    this.doctorId.set(doctorId);
    this.loadCardData({
      doctorId: String(doctorId),
      year: Number(this.year()),
      month: Number(this.month()),
    });
  }
}
