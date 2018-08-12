import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.styl']
})
export class CollectionsComponent implements OnInit {

  collectionList: Observable<any[]>;

  constructor(private authFire: AngularFireAuth, private rdb: AngularFireDatabase) {
    this.collectionList = null;
  }

  ngOnInit() {
    this.authFire.authState
      .subscribe(
        user => {
          this.collectionList = this.rdb.list(`collections/${user.uid}`).valueChanges().pipe(
            map((coll: Array<any>) => {
              coll.forEach((collectionData: any) => {
                var arr = Object.keys(collectionData.items).map((key) => collectionData.items[key]);
                collectionData.items = arr;
              });

              return coll;
            })
          );
        }
      );
  }

  // this.rdb.list(`collections/${userId}`).push({id: 'default', name: 'A collection', items: {}});
}
