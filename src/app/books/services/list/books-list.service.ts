import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap, take } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from "angularfire2/database";
import * as firebase from "firebase/app";
import { MessagesService } from "../../../alerts/services/messages.service";
import { environment } from "../../../../environments/environment";
import { BookList } from "../../models";


@Injectable({
  providedIn: 'root'
})
export class BooksListService {

  url = environment.apiBooks;
  booksList: Subject<BookList> = new Subject();
  favsRef: AngularFireList<any>;
  collectionsRef: AngularFireList<any>;
  collections$: Observable<any> = of([]);
  user: firebase.User;

  constructor(private http: HttpClient, private alertService: MessagesService, private authFire: AngularFireAuth,
    private rdb: AngularFireDatabase) {
    this.booksList.next({ kind: "", totalItems: 0, items: [] });
    authFire.authState
      .subscribe(
        user => {
          this.user = user;
          this.favsRef = rdb.list('favorites/' + this.user.uid);
          this.collectionsRef = rdb.list(`collections/${this.user.uid}`);
          this.collections$ = this.collectionsRef.valueChanges();
        }
      );
  }

  searchBooks(text: string, startIndex?: number, maxResults?: number) {

    let url = this.url + `volumes?q=${text}`;
    if (startIndex) {
      url += `&startIndex=${startIndex}`;
    }
    if (maxResults) {
      url += `&maxResults=${maxResults}`;
    }

    this.http.get<BookList>(url)
      .pipe(
        catchError(this.handleError<BookList>('Get Books List', null))
      )
      .subscribe(
        (books) => {
          this.booksList.next(books);
        }
      );
  }

  searchRelatedBooksByAuthor(author: string, currentBookId: string = '', startIndex: number = 0, maxResults: number = 5): Observable<BookList> {
    let url = this.url + `volumes?q=+inauthor:${escape(author)}`;

    if (startIndex) {
      url += `&startIndex=${startIndex}`;
    }

    if (maxResults) {
      url += `&maxResults=${maxResults}`;
    }

    return this.http.get<BookList>(url)
      .pipe(
        catchError(this.handleError<BookList>('Get Related books list', null)),
        map((bookList: BookList) => {
          let resultCount = 0;
          bookList.items = bookList.items.filter((book: any) => {
            const isCurrentBook = book.id === currentBookId;

            resultCount += isCurrentBook ? 0 : 1;
            return book.id !== currentBookId && resultCount <= 4; 
          });

          return bookList;
        }) 
      );
  }

  addFavorites(book: any) {
    this.favsRef.set(book.id, book).then(_ => this.alertService.message("Agregado a Favoritos", "success"));
  }

  addToCollection(book: any, collectionId: string = 'default') {
    let collectionRef: AngularFireList<any> = this.rdb.list(`collections/${this.user.uid}`, ref => ref.orderByChild('id').equalTo(collectionId));

    collectionRef.snapshotChanges()
      .pipe(
        take(1)
      )
      .subscribe(
        (res: any) => {
          if (res && res.length && res.length > 0) {
            this.rdb.list(`collections/${this.user.uid}/${res[0].key}/items`).push(book)
              .then(_ => this.alertService.message("Agregado a la coleccion", "success"));

              return;
          } else {
            this.rdb.list(`collections/${this.user.uid}`).push({
              id: collectionId,
              name: collectionId,
              items: []
            }).child('items')
              .push(book)
              .then(_ => {
                this.alertService.message("Agregado a la coleccion" + collectionId, "success")}
              );

              return;
          }
        }
      );
  }

  getCollections() {
    return this.collections$;      
  }

  getBook(id: string): Observable<any> {
    let url = this.url + `volumes/${id}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError<any>('Get Book', null))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    let type = "error";
    this.alertService.message(message, type);
  }
}
