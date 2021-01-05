import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListDetailComponent } from './shopping-list/shopping-list-detail/shopping-list-detail.component';
import { ShoppingListFormComponent } from './shopping-list/shopping-list-form/shopping-list-form.component';
import { ShoppingListsComponent } from './shopping-list/shopping-lists/shopping-lists.component';

const routes: Routes = [
  { path: '', redirectTo: '/lists', pathMatch: 'full' },
  { path: 'lists', component: ShoppingListsComponent },
  { path: 'lists/:id', component: ShoppingListDetailComponent },
  { path: 'lists/:id/edit', component: ShoppingListFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
