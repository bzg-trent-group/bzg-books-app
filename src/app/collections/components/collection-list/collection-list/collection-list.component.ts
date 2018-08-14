import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.styl']
})
export class CollectionListComponent implements OnInit {

  @Input() collection: any;

  constructor() { }

  ngOnInit() {
  }

}
