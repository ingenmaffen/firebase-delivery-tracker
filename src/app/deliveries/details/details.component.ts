import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { tileLayer, latLng, marker, featureGroup } from 'leaflet';
import { AngularFirestore } from '@angular/fire/firestore';
import * as moment from 'moment';

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
    zoom: 3,
    center: latLng(0, 0),
  };
  mapLayers = [];
  fitBounds = null;

  events;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.queryParams.id;
    if (id) {
      const data = this.firestore
        .collection('deliveries')
        .ref.where('id', '==', id)
        .get()
        .then((value) => {
          const details = value.docs[0].data();
          console.log(details.waypoints);
          details.waypoints.forEach((waypoint) => {
            this.mapLayers.push(
              marker([waypoint.latlng.oa, waypoint.latlng.ha])
            );
          });
          const group = featureGroup(this.mapLayers);
          this.fitBounds = group.getBounds();
          this.events = details.events.map((event) => {
            event.dateTime = moment(event.dateTime.seconds * 1000).format(
              'lll'
            );
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
