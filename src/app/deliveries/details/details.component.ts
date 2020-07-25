import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { tileLayer, latLng, marker, featureGroup, icon } from 'leaflet';
import { AngularFirestore } from '@angular/fire/firestore';
import * as moment from 'moment';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  deliveryType: string = 'bike';

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
  waypoints;

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
          this.waypoints = details.waypoints;
          this.drawWaypoints(this.waypoints);
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

  onTypeChange(_event) {
    console.log(this.deliveryType);
    this.drawWaypoints(this.waypoints);
  }

  private drawWaypoints(waypoints) {
    this.mapLayers = [];
    waypoints.forEach((waypoint, index) => {
      this.mapLayers.push(
        marker([waypoint.latlng.oa, waypoint.latlng.ha], {
          icon: icon({ iconUrl: this.selectIcon(waypoint.marker) }),
        })
      );
    });
  }

  private selectIcon(iconType: string): string {
    let url = 'assets/';
    switch (iconType) {
      case 'courier':
        url +=
          this.deliveryType === 'bike'
            ? 'pedal_bike-24px.svg'
            : 'local_shipping-24px.svg';
        break;
      case 'address':
        url += 'home-24px.svg';
        break;
      default:
        url += 'store-black-18dp.svg';
        break;
    }
    return url;
  }
}
