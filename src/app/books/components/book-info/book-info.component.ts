import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.styl']
})
export class BookInfoComponent implements OnInit {

  @Input() book:any;
  @Input() userCollections: Array<any>;
  @Output() pushFavorite = new EventEmitter<any>();
  @Output() pushToCollection = new EventEmitter<any>();
  @Output() pushLoadCollections = new EventEmitter<any>();

  constructor() { }

  ngOnInit() { }

  addFavorite(){
    this.pushFavorite.emit(this.book);
  }

  loadCollections() {
    this.pushLoadCollections.emit();
  }

  addToCollection() {
    this.pushToCollection.emit({
      book: this.book,
      collectionId: 'default'
    });
  }
}
