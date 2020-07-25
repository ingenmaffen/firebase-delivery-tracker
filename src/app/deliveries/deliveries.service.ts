import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeliveriesService {
  constructor(private readonly http: HttpClient) {}

  getItemList(): Observable<ItemListResponse[]> {
    return this.itemListMock();
    // return this.http.get<ItemListResponse[]>('');
  }

  getItemDetails(id): Observable<ItemDetailsResponse> {
    return this.itemDetailsMock();
    // return this.http.get<ItemListResponse[]>('');
  }

  private itemDetailsMock(): Observable<ItemDetailsResponse> {
    return of({
      events: [
        {
          status: 'SENT_FROM_STORE',
          dateTime: new Date().toISOString(),
        },
        {
          status: 'AT_WAREHOUSE',
          dateTime: new Date().toISOString(),
        },
        {
          status: 'DELIVERED',
          dateTime: new Date().toISOString(),
        },
      ],
      waypoints: [
        {
          lat: 10,
          lng: 10,
          marker: 'store',
        },
        {
          lat: 11,
          lng: 10,
          marker: 'warehouse',
        },
        {
          lat: 10,
          lng: 11,
          marker: 'address',
        },
        {
          lat: 10,
          lng: 10,
          marker: 'courier',
        },
      ],
    });
  }

  private itemListMock(): Observable<ItemListResponse[]> {
    return of([
      {
        id: 1,
        status: 'IN_STORE',
        lastUpdate: new Date().toISOString(),
      },
      {
        id: 2,
        status: 'IN_WAREHOUSE',
        lastUpdate: new Date().toISOString(),
      },
      {
        id: 3,
        status: 'DELIVERED',
        lastUpdate: new Date().toISOString(),
      },
    ]);
  }
}

export interface ItemListResponse {
  id: number;
  status: string;
  lastUpdate: string;
}

export interface ItemDetailsResponse {
  waypoints: any[];
  events: any[];
}
