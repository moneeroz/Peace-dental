import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Iappointment } from '../interfaces/iappointment';
import { IappointmentInfo } from '../interfaces/iappointment-info';
import { IinvoiceStats } from '../interfaces/iinvoicestats';
import { API_URL } from '../lib/constants';

@Injectable({
  providedIn: 'root',
})
export class OverviewService {
  private baseUrl: string = `${API_URL}/overview`;
  private http = inject(HttpClient);

  // invoice stats
  private invoiceStats$ = this.http.get<IinvoiceStats>(
    `${this.baseUrl}/invoice-stats`,
  );
  private readonly invoiceStats = toSignal(this.invoiceStats$);

  getInvoiceStats(): Signal<IinvoiceStats | undefined> {
    return this.invoiceStats;
  }

  // appointment count
  private appointmentCount$ = this.http.get<number>(
    `${this.baseUrl}/appointment-count`,
  );
  private readonly appointmentCount = toSignal(this.appointmentCount$);

  getAppointmentCount(): Signal<number | undefined> {
    return this.appointmentCount;
  }

  // appointments calender
  private calenderData$ = this.http.get<Iappointment[]>(
    `${this.baseUrl}/calender`,
  );
  private readonly calenderData = toSignal(this.calenderData$);

  getCalenderData(): Signal<Iappointment[] | undefined> {
    return this.calenderData;
  }

  getData() {
    return this.http.get<IappointmentInfo[]>(`${this.baseUrl}/calender`);
  }

  updateDate({ id, appointmentDate }: { id: string; appointmentDate: Date }) {
    return this.http.put(`${this.baseUrl}/update-appointment/${id}`, {
      appointmentDate,
    });
  }
}
