export class Item {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  isMarkedOut: boolean = false;
  shoppingListId: string;
}
