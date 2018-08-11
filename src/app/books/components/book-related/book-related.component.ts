import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BooksListService } from '../../services/list/books-list.service';
import { BookList } from '../../models';

@Component({
  selector: 'app-book-related',
  templateUrl: './book-related.component.html',
  styleUrls: ['./book-related.component.styl']
})
export class BookRelatedComponent implements OnInit {

  @Input() author: string;
  relatedBooksList: BookList;

  constructor(private bookService: BooksListService, private router: ActivatedRoute) { }

  ngOnInit() {

    this.router.params.subscribe((params: Params) => {
      this.bookService.searchRelatedBooksByAuthor(this.author, params.id || '')
        .subscribe(
          (relatedBooks: BookList) => {
            if(relatedBooks){
              this.relatedBooksList = relatedBooks;
            }       
          }
        );
    });

  }
}
