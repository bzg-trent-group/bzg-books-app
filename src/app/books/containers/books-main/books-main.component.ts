import { Component, OnInit } from '@angular/core';
//import { books } from "../../../data-books";
import { BooksListService } from "../../services/list/books-list.service";
import { BookList } from '../../models';

@Component({
  selector: 'app-books-main',
  templateUrl: './books-main.component.html',
  styleUrls: ['./books-main.component.styl']
})
export class BooksMainComponent implements OnInit {

  booksList: BookList;

  constructor(private bookService: BooksListService) { 
    this.bookService.searchBooks('Javascript', 0, 20);
  }

  ngOnInit() {    
    this.bookService.booksList
    .subscribe(
      books => {        
        if(books){
          this.booksList = books;
        }        
      }
    );
  }

}
