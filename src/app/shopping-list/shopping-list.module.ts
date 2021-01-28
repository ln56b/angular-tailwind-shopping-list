import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingListsComponent } from './shopping-lists/shopping-lists.component';
import { ShoppingListDetailComponent } from './shopping-list-detail/shopping-list-detail.component';
import { ShoppingListFormComponent } from './shopping-list-form/shopping-list-form.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalModule } from '../modal/modal.module';

@NgModule({
  declarations: [
    ShoppingListsComponent,
    ShoppingListDetailComponent,
    ShoppingListFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule,
    ModalModule,
  ],
})
export class ShoppingListModule {}
