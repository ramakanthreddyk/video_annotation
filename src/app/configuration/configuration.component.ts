import { TimelineList } from './../_models/timeline.model';
import { AnnotationService } from './../_services/annotation.service';
import { AssetList, Asset } from './../_models/assets.model';
import { User, IUser, Admins, BackendUser } from './../_models/user';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { RegisterComponent } from '../register/register.component';
import { UserService, AuthenticationService } from '../_services';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  adminList: BackendUser[] = [];
  annotatorList: BackendUser[] = [];
  evaluatorList: BackendUser[] = [];
  shortcutList = [];
  timelineList: TimelineList = [];
  assetList: AssetList;
  // userType: string;
  annotatorSelected: number;
  evaluatorSelected: number;
  timeLineSelected: number;

  admins = Admins;
  selectedAssets = new FormControl();
  selectedAnnotators = new FormControl();
  selectedShorcuts = new FormControl();
  shortCutForm: FormGroup;

  constructor(
    public dialog: MatDialog, 
    public userService: UserService,
    public annotationService: AnnotationService,
    private auth: AuthenticationService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.shortCutForm = this.formBuilder.group({
      key_type_id: [null],
      key_description: ['', Validators.required],
      key_name: ['', Validators.required],
      key_shortcut: ['', Validators.required],
    });

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

    this.userService.getTimeline().subscribe((timeline: any) => {
      this.timelineList = timeline.data;
    })
    this.userService.getShortCuts().subscribe((sho: any) => {
      this.shortcutList = sho.data;
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

  onCreateShortut() {
    console.log(this.shortCutForm);
    this.annotationService.createShortcuts(this.shortCutForm.value)
    .subscribe((message: any) => {
      this.snackBar.open(message.message, '', {
        duration: 3000,
      });
      this.shortCutForm.reset();
    })
  }
  assignShortcuts() {
    this.annotationService.assignShortcuts(
      {timeline_id: this.timeLineSelected, shorcut_idList: this.selectedShorcuts.value})
      .subscribe((message: any) => {
        this.snackBar.open(message.message, '', {
          duration: 3000,
        });
        this.selectedShorcuts.reset();
      })
  }
}
