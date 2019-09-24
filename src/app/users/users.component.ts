import { Component, OnInit } from '@angular/core';
import { UserService, AuthenticationService } from '../_services';
import { User } from '../_models';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns = ['user_id', 'first_name', 'last_name', 'email','user_type', 'delete_icon' ];
  dataSource: User[];
  constructor(private users: UserService, private auth: AuthenticationService) { }

  ngOnInit() {
    this.users.getAll().subscribe((allusers) => {
      console.log(allusers['data']);
      this.dataSource = allusers['data'];
    });
  }

  deleteUser(user: any) {
    this.auth.deleteUser(user.user_id).subscribe((res: any) => {
      console.log(user);
  });
  }
}
