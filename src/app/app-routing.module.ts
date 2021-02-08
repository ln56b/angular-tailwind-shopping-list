import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemFormComponent } from './item/item-form/item-form.component';
import { ItemsComponent } from './item/items/items.component';
import { ShoppingListFormComponent } from './shopping-list/shopping-list-form/shopping-list-form.component';
import { ShoppingListsComponent } from './shopping-list/shopping-lists/shopping-lists.component';

const routes: Routes = [
  { path: '', redirectTo: '/lists', pathMatch: 'full' },
  { path: 'lists', component: ShoppingListsComponent },
  { path: 'lists/:id/edit', component: ShoppingListFormComponent },
  { path: 'lists/:id/items', component: ItemsComponent },
  { path: 'lists/:id/items/:id/edit', component: ItemFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
