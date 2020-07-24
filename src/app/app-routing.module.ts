import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/deliveries/list', pathMatch: 'full' },
  {
    path: 'deliveries',
    loadChildren: () =>
      import('./deliveries/deliveries.module').then((m) => m.DeliveriesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
