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
    new Sidemenu('Home', 1, 'home'),
    new Sidemenu('Assets', 2, 'web_asset'),
    new Sidemenu('Annotation', 3, 'video_library'),
    new Sidemenu('Users', 4, 'people')];
    active;
  constructor() {
  }

  ngOnInit() {
  }

  eventforsidemenu(page) {
    this.active = page.id;
  }
}
