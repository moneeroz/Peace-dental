import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import { ICardData } from '../interfaces/icard-data';
import { ILatestAppointment } from '../interfaces/ilatest-appointment';
import { ILatestInvoice } from '../interfaces/ilatest-invoice';
import { toSignal } from '@angular/core/rxjs-interop';
import { Iappointment } from '../interfaces/iappointment';
import { IappointmentInfo } from '../interfaces/iappointment-info';
import { API_URL } from '../lib/utils';

@Injectable({
  providedIn: 'root',
})
export class OverviewService {
  private baseUrl: string = `${API_URL}/overview`;
  private http = inject(HttpClient);

  // card data
  private cardData$ = this.http.get<ICardData>(`${this.baseUrl}/card-data`);
  private readonly cardData = toSignal(this.cardData$);

  getCardData(): Signal<ICardData | undefined> {
    return this.cardData;
  }

  // latest appointments
  private latestAppointments$ = this.http.get<ILatestAppointment[]>(
    `${this.baseUrl}/latest-appointments`,
  );
  private readonly latestAppointments = toSignal(this.latestAppointments$);

  getLatestAppointments(): Signal<ILatestAppointment[] | undefined> {
    return this.latestAppointments;
  }

  // latest invoices
  private latestInvoices$ = this.http.get<ILatestInvoice[]>(
    `${this.baseUrl}/latest-invoices`,
  );
  private readonly latestInvoices = toSignal(this.latestInvoices$);

  getLatestInvoices(): Signal<ILatestInvoice[] | undefined> {
    return this.latestInvoices;
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

  updateDate({ id, appointmentDate }: { id: string; appointmentDate: string }) {
    return this.http.put(`${this.baseUrl}/update-appointment/${id}`, {
      appointmentDate,
    });
  }
}
