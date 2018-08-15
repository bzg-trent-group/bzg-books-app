import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from "@angular/animations";
import { User } from "firebase/app";
import { AngularFireAuth } from "angularfire2/auth";

@Component({
  selector: 'app-aside-left',
  templateUrl: './aside-left.component.html',
  styleUrls: ['./aside-left.component.styl'],
  animations: [
    trigger('asideCollapse', [
      state('close', style({
        width: "50px"        
      })),
      state('open', style({
        width: "auto"
      })),
      transition('open => close', animate('100ms ease-out')),
      transition('close => open', animate('100ms ease-in'))
    ])
  ]
})
export class AsideLeftComponent implements OnInit {

  @Input() asideState:string;
  user: User;

  constructor(private authFire:  AngularFireAuth) { }

  ngOnInit() {
    this.authFire.authState
    .subscribe(
      user => {        
        this.user = user;
      }
    )
  }

}
