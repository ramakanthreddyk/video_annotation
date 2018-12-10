import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Sidemenu } from '../_models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    @Output() selected_Sidemenu = new EventEmitter<number>();
    sidemenu = [
    new Sidemenu('Home', 1),
    new Sidemenu('Assets', 2),
    new Sidemenu('Player', 3),
    new Sidemenu('Users', 4)];
    active;
  constructor() {
  }

  ngOnInit() {
  }

  eventforsidemenu(page) {
    this.active = page.id;
  }
}
