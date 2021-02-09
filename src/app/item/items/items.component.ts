import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/models/Item.model';
import { ShoppingList } from 'src/app/models/ShoppingList.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import {
  faEraser,
  faEllipsisV,
  faPlus,
  faEdit,
  faTenge,
  faLongArrowAltLeft,
} from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  id: string;
  item: Item;
  items: Item[];
  list: ShoppingList;
  showModal: boolean = false;

  faBack = faLongArrowAltLeft;
  faEdit = faEdit;
  faMore = faEllipsisV;
  faPlus = faPlus;
  faMove = faTenge;
  faDelete = faTrashAlt;
  faMarkout = faEraser;

  constructor(
    private itemService: ItemService,
    private shoppingListService: ShoppingListService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.refreshData();
  }

  addItem(listId: string, name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.itemService.addItem(listId, { name } as Item).subscribe((item) => {
      this.items.push(item);
      this.refreshData();
    });
  }

  deleteItem(): void {
    this.items = this.items.filter((i) => i !== this.item);
    this.itemService.deleteItem(this.list._id, this.item._id).subscribe();
    this.showModal = false;
  }

  markoutItem(): void {
    this.item.isMarkedOut = true;
    this.showModal = false;
  }

  toggleModal(item: Item) {
    this.showModal = !this.showModal;
    this.item = item;
  }

  protected refreshData(): void {
    this.shoppingListService
      .getListWithItems(this.id)
      .subscribe((list: ShoppingList) => {
        if (list.items.length) {
          list.items.sort((a, b) => (a.isMarkedOut > b.isMarkedOut ? 1 : -1));
        }
        this.items = list.items;
        this.list = list;
      });
  }
}
