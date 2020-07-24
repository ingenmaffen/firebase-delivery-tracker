import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { DeliveriesComponent } from './deliveries.component';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';

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
  declarations: [DeliveriesComponent, ListComponent, DetailsComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule, DeliveriesComponent],
})
export class DeliveriesModule {}
