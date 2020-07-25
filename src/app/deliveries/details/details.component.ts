import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { tileLayer, latLng, marker } from 'leaflet';
import * as moment from 'moment';

import { DeliveriesService } from '../deliveries.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  deliveryTypes: any[] = [
    {
      value: 'bike',
      name: 'Bike',
    },
    {
      value: 'car',
      name: 'Car',
    },
  ];

  mapOptions = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...',
      }),
    ],
    zoom: 5,
    center: latLng(10, 10),
  };
  mapLayers = [];

  events;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly service: DeliveriesService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.queryParams.id;
    if (id) {
      this.service.getItemDetails(id).subscribe((details) => {
        // TODO: fit boundaries
        details.waypoints.forEach((waypoint) => {
          this.mapLayers.push(marker([waypoint.lat, waypoint.lng]));
        });
        this.events = details.events.map((event) => {
          event.dateTime = moment(event.dateTime).format('lll');
          return event;
        });
      });
    } else {
      this.backToList();
    }
  }

  backToList() {
    this.router.navigate(['deliveries/list']);
  }
}
