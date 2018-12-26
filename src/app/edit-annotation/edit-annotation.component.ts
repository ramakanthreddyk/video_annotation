import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AnnotationService } from '../_services';
import { EditAnnotation } from '../_models';

@Component({
  selector: 'app-edit-annotation',
  templateUrl: './edit-annotation.component.html',
  styleUrls: ['./edit-annotation.component.css']
})
export class EditAnnotationComponent {

  constructor(
    public dialogRef: MatDialogRef<EditAnnotationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: AnnotationService) {
  }

  annotationData: EditAnnotation = {
    uniqueId: this.data.annotation_id,
    title: this.data.title,
    description: this.data.description,
    asset_id: this.data.asset_id,
    user_id: this.data.user_id
  };

  onNoClick(): void {
    this.dialogRef.close();
  }

  editAnnotation(annotationdata: EditAnnotation) {
    this.service.editAnnotationData(annotationdata).subscribe((res: any) => {
      this.dialogRef.close({ result: res.data, changed: annotationdata });
    }, error => {
      console.log(error);
    });
  }
}
