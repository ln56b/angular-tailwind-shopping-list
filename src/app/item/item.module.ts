import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemsComponent } from './items/items.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ItemFormComponent } from './item-form/item-form.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [ItemsComponent, ItemDetailComponent, ItemFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule,
  ],
})
export class ItemModule {}
