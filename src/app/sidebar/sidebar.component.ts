import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Sidemenu } from '../_models';
import { AuthenticationService } from '../_services';
import { BehaviorSubject } from 'rxjs';

export enum Admins {
  SuperAdmin,
  Evaluator,
  Annotator
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    @Output() selected_Sidemenu = new EventEmitter<number>();
    userType: BehaviorSubject<string>;

    sidemenu = [
    new Sidemenu('Home', 1, 'home'),
    new Sidemenu('Assets', 2, 'web_asset'),
    new Sidemenu('Annotation', 3, 'video_library'),
    new Sidemenu('Configuration', 4, 'settings')
  ];
    active;
    admins = Admins;
  constructor(private auth: AuthenticationService) {

    this.userType = this.auth.userType;
  }

  ngOnInit() {
  }

  eventforsidemenu(page) {
    this.active = page.id;
    this.selected_Sidemenu.emit(page);
  }
}
