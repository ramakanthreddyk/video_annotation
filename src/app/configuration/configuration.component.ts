import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '800px',
     });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     });
  }
}
