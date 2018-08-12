import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { routes } from "./routes.collections";
import { CollectionsComponent } from "./containers/collections/collections.component";
import { CollectionListComponent } from './components/collection-list/collection-list/collection-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CollectionsComponent, CollectionListComponent]
})
export class CollectionsModule { }
