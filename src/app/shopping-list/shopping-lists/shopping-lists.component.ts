import { Component, OnInit } from '@angular/core';
import { ShoppingList } from 'src/app/models/ShoppingList.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import {
  faEraser,
  faEllipsisV,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-shopping-lists',
  templateUrl: './shopping-lists.component.html',
  styleUrls: ['./shopping-lists.component.scss'],
})
export class ShoppingListsComponent implements OnInit {
  lists: ShoppingList[];
  list: ShoppingList;
  faPlus = faPlus;
  faMore = faEllipsisV;
  faDelete = faTrashAlt;
  faEdit = faEraser;
  showModal: boolean = false;

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
        this.refreshData();
      });
  }

  deleteList(): void {
    this.lists = this.lists.filter((l) => l !== this.list);
    this.shoppingListService.deleteList(this.list._id).subscribe();
    this.showModal = false;
  }

  markoutList(): void {
    this.list.isMarkedOut = true;
    this.showModal = false;
  }

  toggleModal(list: ShoppingList) {
    this.showModal = !this.showModal;
    this.list = list;
  }

  protected refreshData(): void {
    this.shoppingListService.findAll().subscribe((lists: ShoppingList[]) => {
      lists.sort((a, b) => (a.isMarkedOut > b.isMarkedOut ? 1 : -1));
      this.lists = lists;
    });
  }
}
