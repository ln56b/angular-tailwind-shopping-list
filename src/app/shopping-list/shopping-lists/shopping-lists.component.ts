import { Component, OnInit } from '@angular/core';
import { ShoppingList } from 'src/app/models/ShoppingList.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-shopping-lists',
  templateUrl: './shopping-lists.component.html',
  styleUrls: ['./shopping-lists.component.scss'],
})
export class ShoppingListsComponent implements OnInit {
  lists: ShoppingList[];
  faPlus = faPlus;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.refreshData();
  }

  addList(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.shoppingListService
      .addList({ name } as ShoppingList)
      .subscribe((list) => {
        this.lists.push(list);
      });
  }

  protected refreshData(): void {
    this.shoppingListService.findAll().subscribe((lists: ShoppingList[]) => {
      this.lists = lists;
    });
  }
}
