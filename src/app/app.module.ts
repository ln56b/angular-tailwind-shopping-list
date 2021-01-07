import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShoppingListsComponent } from './shopping-list/shopping-lists/shopping-lists.component';
import { ShoppingListDetailComponent } from './shopping-list/shopping-list-detail/shopping-list-detail.component';
import { ShoppingListFormComponent } from './shopping-list/shopping-list-form/shopping-list-form.component';
import { ItemFormComponent } from './item/item-form/item-form.component';
import { ItemsComponent } from './item/items/items.component';
import { ItemDetailComponent } from './item/item-detail/item-detail.component';
import { HttpClientModule } from '@angular/common/http';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingListsComponent,
    ShoppingListDetailComponent,
    ShoppingListFormComponent,
    ItemFormComponent,
    ItemsComponent,
    ItemDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons();
  }
}
