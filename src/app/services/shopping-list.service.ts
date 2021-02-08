import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ShoppingList } from '../models/ShoppingList.model';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  apiUrl = '/api/lists';

  constructor(private http: HttpClient) {}

  findAll(): Observable<ShoppingList[]> {
    return this.http.get<ShoppingList[]>(this.apiUrl).pipe(
      tap((lists: ShoppingList[]) => console.log('fetched lists')),
      catchError(this.handleError('findAll', []))
    );
  }
  getListWithItems(id: string): Observable<ShoppingList> {
    const url = `${this.apiUrl}/${id}/items`;
    return this.http.get<ShoppingList>(url).pipe(
      tap((list: ShoppingList) => console.log(`fetched list id: ${list._id}`)),
      catchError(this.handleError<ShoppingList>('findOne'))
    );
  }

  addList(list: ShoppingList): Observable<ShoppingList> {
    return this.http
      .post<ShoppingList>(this.apiUrl, list, httpOptions)
      .pipe(catchError(this.handleError<ShoppingList>('addList')));
  }

  updateList(list: ShoppingList): Observable<ShoppingList> {
    const url = `${this.apiUrl}/${list._id}`;
    return this.http.put<ShoppingList>(url, list, httpOptions).pipe(
      tap((list: ShoppingList) => console.log(`updated list id: ${list._id}`)),
      catchError(this.handleError<ShoppingList>('updateList'))
    );
  }

  deleteList(id: string): Observable<ShoppingList> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<ShoppingList>(url, httpOptions).pipe(
      tap((_) => console.log(`deleted list id=${id}`)),
      catchError(this.handleError<ShoppingList>('deleteList'))
    );
  }

  save(list: ShoppingList): Observable<ShoppingList> {
    if (list._id) {
      return this.updateList(list).pipe(map(() => list));
    } else {
      return this.addList(list);
    }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    };
  }
}
