import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

import { ItemListResponse, DeliveriesService } from '../deliveries.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  items: ItemListResponse[] = [];

  constructor(
    private readonly service: DeliveriesService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.service.getItemList().subscribe((list) => {
      this.items = list.map((item) => {
        item.lastUpdate = moment(item.lastUpdate).format('lll');
        return item;
      });
    });
  }

  navigateToDetails(id: number) {
    this.router.navigate(['deliveries/details'], { queryParams: { id } });
  }
}
