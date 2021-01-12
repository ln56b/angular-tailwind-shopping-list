export class ShoppingList {
  _id: string;
  name: string;
  client: string;
  total: number;
  createdAt: Date;
  isMarkedOut: boolean = false;
}
