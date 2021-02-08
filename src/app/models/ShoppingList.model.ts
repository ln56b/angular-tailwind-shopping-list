import { Item } from './Item.model';

export class ShoppingList {
  _id: string;
  name: string;
  client: string;
  total: number;
  createdAt: Date;
  isMarkedOut: boolean = false;
  items: Item[];
}
