import { Component, OnInit } from '@angular/core';
import { UserService, AuthenticationService } from '../_services';
import { User, Admins } from '../_models';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    displayedColumns = ['user_id', 'first_name', 'last_name', 'email', 'user_type', 'delete_icon'];
    dataSource: User[];
    userType: BehaviorSubject<Admins>;
    admins = Admins;

    constructor(
        private users: UserService, 
        private auth: AuthenticationService
    ) {
        this.userType = this.auth.userType;
    }

    ngOnInit() {
        this.users.getAll().subscribe((allusers) => {
            this.dataSource = allusers['data'];
        });
    }

    deleteUser(user: any) {
        this.auth.deleteUser(user.user_id).subscribe((newUsers) => {
            this.dataSource = newUsers['data']
        });
    }
}
