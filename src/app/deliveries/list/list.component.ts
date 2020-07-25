import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  items: Observable<any>;

  constructor(
    private readonly router: Router,
    private readonly firestore: AngularFirestore
  ) {
    this.items = firestore.collection('deliveryList').valueChanges();
  }

  ngOnInit(): void {}

  navigateToDetails(id: number) {
    this.router.navigate(['deliveries/details'], { queryParams: { id } });
  }
}
