import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Sidemenu, Admins } from '../_models';
import { AuthenticationService } from '../_services';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    @Output() selected_Sidemenu = new EventEmitter<number>();
    userType: BehaviorSubject<Admins>;
    sidemenu = [];
    annotator_sideMenu = [
        new Sidemenu('Home', 1, 'home'),
        new Sidemenu('Assets', 2, 'web_asset'),
        new Sidemenu('Annotation', 3, 'video_library'),
    ];
    evaluator_SideMenu = [
        new Sidemenu('Home', 1, 'home'),
        new Sidemenu('Evaluation', 3, 'video_library'),
    ];
    admin_SideMenu = [
        new Sidemenu('Configuration', 4, 'settings'),
        new Sidemenu('uploadAsset', 5, 'cloud_upload'),
    ];
    active: number;
    admins = Admins;

    constructor(private auth: AuthenticationService) {
        this.userType = this.auth.userType;
    }

    ngOnInit() {
        this.auth.userType.subscribe(
            (user) => {
                switch (user) {
                    case this.admins.Annotator:
                        this.sidemenu = this.annotator_sideMenu;
                        break;
                    case this.admins.SuperAdmin:
                        this.sidemenu = this.admin_SideMenu;
                        break;
                    case this.admins.Evaluator:
                        this.sidemenu = this.evaluator_SideMenu;
                        break;
                }
            }
        );
    }

    eventforsidemenu(page) {
        this.active = page.id;
        this.selected_Sidemenu.emit(page);
    }
}
