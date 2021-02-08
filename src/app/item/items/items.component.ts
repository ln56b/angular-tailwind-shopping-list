import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/models/Item.model';
import { ShoppingList } from 'src/app/models/ShoppingList.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { faEllipsisV, faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';
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
  faEdit = faEdit;
  faMore = faEllipsisV;
  faPlus = faPlus;
  showModal: boolean = false;

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

  toggleModal(item: Item) {
    this.showModal = !this.showModal;
    this.item = item;
  }

  protected refreshData(): void {
    this.shoppingListService
      .getListWithItems(this.id)
      .subscribe((list: ShoppingList) => {
        this.items = list.items;
        this.list = list;
      });
  }
}
