import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
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

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    };
  }
}
