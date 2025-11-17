import { Routes } from '@angular/router';
import { List } from './features/products/pages/list/list';
import { Edit } from './features/products/edit/edit';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: List },
  {
    path: 'products/edit/:id',
    component: Edit,
  },
];
