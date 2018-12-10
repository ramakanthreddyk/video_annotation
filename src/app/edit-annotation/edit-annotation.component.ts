import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {UserService} from '../_services';

@Component({
  selector: 'app-edit-annotation',
  templateUrl: './edit-annotation.component.html',
  styleUrls: ['./edit-annotation.component.css']
})
export class EditAnnotationComponent {

  constructor(
    public dialogRef: MatDialogRef<EditAnnotationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private service: UserService) {
    }

    annotationData = {
      uniqueId: this.data.annotation_id,
      title: this.data.title,
      description: this.data.description,
      asset_id: this.data.asset_id
    };

  onNoClick(): void {
    this.dialogRef.close();
  }

  editAnnotation(annotationdata) {
    console.log(annotationdata);
    this.service.editAnnotationData(annotationdata).then((res: any) => {
      this.dialogRef.close(res.data);
    }, error => {
      console.log(error);
    });
  }

}
