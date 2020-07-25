import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
      this.items = list;
    });
  }

  navigateToDetails(id: number) {
    this.router.navigate(['deliveries/details'], { queryParams: { id } });
    console.log(id);
  }
}
