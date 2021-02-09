import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Item } from '../models/Item.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  apiUrl = '/api/lists';

  constructor(private http: HttpClient) {}

  addItem(listId: string, item: Item): Observable<Item> {
    const url = `${this.apiUrl}/${listId}/items`;

    return this.http
      .post<Item>(url, item, httpOptions)
      .pipe(catchError(this.handleError<Item>('addItem')));
  }

  getItemFromList(listId: string, itemId: string): Observable<Item> {
    const url = `${this.apiUrl}/${listId}/items/${itemId}`;
    return this.http.get<Item>(url).pipe(
      tap((item: Item) => console.log(`fetched item id: ${item._id}`)),
      catchError(this.handleError<Item>('findOneItem'))
    );
  }

  updateItem(listId: string, item: Item): Observable<Item> {
    const url = `${this.apiUrl}/${listId}/items/${item._id}`;
    return this.http.put<Item>(url, item, httpOptions).pipe(
      tap((item: Item) => console.log(`ùpdated item id: ${item._id}`)),
      catchError(this.handleError<Item>('updateItem'))
    );
  }

  deleteItem(listId: string, itemId: string): Observable<void> {
    const url = `${this.apiUrl}/${listId}/items/${itemId}`;
    return this.http.delete<void>(url, httpOptions).pipe(
      tap((_) => console.log(`deleted item id=${itemId}`)),
      catchError(this.handleError<void>('deleteItem'))
    );
  }

  save(listId: string, item: Item): Observable<Item> {
    if (item._id) {
      return this.updateItem(listId, item).pipe(map(() => item));
    } else {
      return this.addItem(listId, item);
    }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    };
  }
}
