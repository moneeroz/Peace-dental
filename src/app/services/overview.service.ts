import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import { ICardData } from '../interfaces/icard-data';
import { ILatestAppointments } from '../interfaces/ilatest-appointments';
import { ILatestInvoices } from '../interfaces/ilatest-invoices';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class OverviewService {
  private baseUrl: string = 'http://localhost:3030/api/overview';
  private http = inject(HttpClient);

  private cardData$ = this.http.get<ICardData>(`${this.baseUrl}/card-data`);
  private readonly cardData = toSignal(this.cardData$);

  private latestAppointments$ = this.http.get<ILatestAppointments>(
    `${this.baseUrl}/latest-appointments`,
  );
  private readonly latestAppointments = toSignal(this.latestAppointments$);

  private latestInvoices$ = this.http.get<ILatestInvoices>(
    `${this.baseUrl}/latest-invoices`,
  );
  private readonly latestInvoices = toSignal(this.latestInvoices$);

  getCardData(): Signal<ICardData | undefined> {
    return this.cardData;
  }

  getLatestAppointments(): Signal<ILatestAppointments | undefined> {
    return this.latestAppointments;
  }

  getLatestInvoices(): Signal<ILatestInvoices | undefined> {
    return this.latestInvoices;
  }
}
