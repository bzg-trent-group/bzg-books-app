import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { routes } from "./routes.books";
import { BooksMainComponent } from "./containers/books-main/";
import { BookDetailComponent } from "./containers/book-detail/";
import { BookInfoComponent } from './components/book-info/book-info.component';
import { BookRelatedComponent } from './components/book-related/book-related.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  declarations: [BooksMainComponent, BookDetailComponent, BookInfoComponent, BookRelatedComponent]
})
export class BooksModule { }
