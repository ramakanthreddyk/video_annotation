import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, UserService } from '../_services';


import { Timeline, TimelineList } from '../_models';
import { from } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayedColumns = ['timeline_id', 'timeline_name', 'timeline_from', 'timeline_to', 'icon'];
  dataSource: TimelineList;
  constructor(private users: UserService,
              private router: Router) { }

  ngOnInit() {
    this.users.getTimeline().subscribe((timeline: any) => {
      this.dataSource = timeline.data;
    });
  }

  gotoAssets(data: Timeline) {
    this.users.selectedTimelineActive(data);
    this.router.navigate(['Assets']);
  }
}
