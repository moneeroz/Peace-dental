import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import { ICardData } from '../interfaces/icard-data';
import { ILatestAppointment } from '../interfaces/ilatest-appointment';
import { ILatestInvoice } from '../interfaces/ilatest-invoice';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class OverviewService {
  private baseUrl: string = 'http://localhost:3030/api/overview';
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
}
