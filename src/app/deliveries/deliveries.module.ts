import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { DeliveriesComponent } from './deliveries.component';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { environment } from '../../environments/environment';
import { MomentPipe } from '../../common/moment.pipe';

const routes: Routes = [
  {
    path: '',
    component: DeliveriesComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: ListComponent,
      },
      {
        path: 'details',
        component: DetailsComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    DeliveriesComponent,
    ListComponent,
    DetailsComponent,
    MomentPipe,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    LeafletModule,
    RouterModule.forChild(routes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
  ],
  exports: [RouterModule, DeliveriesComponent],
})
export class DeliveriesModule {}
