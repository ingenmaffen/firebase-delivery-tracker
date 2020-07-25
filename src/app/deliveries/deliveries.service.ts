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

  private itemListMock(): Observable<ItemListResponse[]> {
    return of([
      {
        id: 1,
        status: 'IN_STORE',
        lastUpdate: new Date().toString(),
      },
      {
        id: 2,
        status: 'IN_WAREHOUSE',
        lastUpdate: new Date().toString(),
      },
      {
        id: 3,
        status: 'DELIVERED',
        lastUpdate: new Date().toString(),
      },
    ]);
  }
}

export interface ItemListResponse {
  id: number;
  status: string;
  lastUpdate: string;
}
