import { AssetList, Asset } from './../_models/assets.model';
import { User, IUser } from './../_models/user';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RegisterComponent } from '../register/register.component';
import { UserService } from '../_services';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  userList: User[];
  assetList: AssetList;

  userSelected: number;
  selectedAssets = new FormControl();

  constructor(
    public dialog: MatDialog, 
    public userService: UserService
  ) {}

  ngOnInit() {

    this.userService.getAll().subscribe((users: IUser) => {
      console.log(users.data);
      this.userList = users.data;
    })
    this.userService.getAssets().subscribe((assets: any) => {
      console.log(assets);
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

  openAssetDialog(): void {
    const assetDialogRef = this.dialog.open(RegisterComponent, {
      width: '800px',
     });
    }
    
}
