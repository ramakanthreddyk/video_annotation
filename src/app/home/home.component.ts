import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, UserService } from '../_services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayedColumns = ['timeline_id', 'timeline_name', 'timeline_timestamp_from', 'timeline_timestamp_to'];
  dataSource;
  constructor(private auth: AuthenticationService,
              private users: UserService,
              private router: Router) { }

  ngOnInit() {

    this.users.getTimeline().subscribe((timeline) => {
      this.dataSource = timeline['data'];
      console.log(this.dataSource);
    });
  }
}
