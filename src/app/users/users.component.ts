import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services';
import { User } from '../_models';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns = ['user_id', 'first_name', 'last_name', 'email'];
  dataSource: User[];
  constructor(private users: UserService) { }

  ngOnInit() {
    this.users.getAll().subscribe((allusers) => {
      console.log(allusers['data']);
      this.dataSource = allusers['data'];
    });
  }

}
