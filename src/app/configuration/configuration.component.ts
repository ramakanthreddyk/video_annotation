import { AnnotationService } from './../_services/annotation.service';
import { AssetList, Asset } from './../_models/assets.model';
import { User, IUser, Admins, BackendUser } from './../_models/user';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { RegisterComponent } from '../register/register.component';
import { UserService, AuthenticationService } from '../_services';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  adminList: BackendUser[] = [];
  annotatorList: BackendUser[] = [];
  evaluatorList: BackendUser[] = [];
  assetList: AssetList;
  // userType: string;
  annotatorSelected: number;
  evaluatorSelected: number;
  admins = Admins;
  selectedAssets = new FormControl();
  selectedAnnotators = new FormControl();

  constructor(
    public dialog: MatDialog, 
    public userService: UserService,
    public annotationService: AnnotationService,
    private auth: AuthenticationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.userService.getAll().subscribe((users: IUser) => {
     users.data.map((user) => {
        if(user.user_type === this.admins.SuperAdmin) {
          this.adminList.push(user);
        }
        if(user.user_type === this.admins.Evaluator) {
          this.evaluatorList.push(user);
        }
        if(user.user_type === this.admins.Annotator) {
          this.annotatorList.push(user);
        }
      })
    })
    this.userService.getAssets().subscribe((assets: any) => {
      this.assetList = assets.data;
    })

  }
  openDialog(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '800px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     });
  }

  assignAssetsToAnnotator() {
    this.annotationService.assignAssetsToAnnotator({annotator_id: this.annotatorSelected, asset_idList: this.selectedAssets.value}).subscribe((message: any) => {
      this.snackBar.open(message.message, '', {
        duration: 3000,
      });
    })
  }

  assignEvaluatorJobs() {
    this.annotationService.assignEvaluatorJobs({evaluator_id: this.evaluatorSelected, annotator_idList: this.selectedAnnotators.value}).subscribe((message: any) => {
      this.snackBar.open(message.message, '', {
        duration: 3000,
      });
    })
  }
    
}
