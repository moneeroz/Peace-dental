import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import { ICardData } from '../interfaces/icard-data';
import { ILatestAppointment } from '../interfaces/ilatest-appointment';
import { ILatestInvoice } from '../interfaces/ilatest-invoice';
import { toSignal } from '@angular/core/rxjs-interop';
import { Iappointment } from '../interfaces/iappointment';
import { IappointmentInfo } from '../interfaces/iappointment-info';
import { API_URL } from '../lib/constants';

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
