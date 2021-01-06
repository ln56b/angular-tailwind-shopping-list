import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ShoppingList } from '../models/ShoppingList.model';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
const apiUrl = '/api/lists';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  constructor(private http: HttpClient) {}

  findAll(): Observable<ShoppingList[]> {
    return this.http.get<ShoppingList[]>(apiUrl).pipe(
      tap((lists: ShoppingList[]) => console.log('fetched lists')),
      catchError(this.handleError('findAll', []))
    );
  }

  addList(list: ShoppingList): Observable<ShoppingList> {
    return this.http.post<ShoppingList>(apiUrl, list, httpOptions).pipe(
      tap((list: ShoppingList) => console.log(`created list id: ${list._id}`)),
      catchError(this.handleError<ShoppingList>('addList'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    };
  }
}
