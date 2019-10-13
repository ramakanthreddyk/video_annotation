import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType, HttpResponse, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-upload-assets',
  templateUrl: './upload-assets.component.html',
  styleUrls: ['./upload-assets.component.css']
})
export class UploadAssetsComponent implements OnInit {

  selectedCategoryFile: File;
  fileStatus = false;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  oncategoryFileChanged(event: any) {
    this.selectedCategoryFile = event.target.files[0];
  }

  submitCategoryData() {
    if (!this.selectedCategoryFile.name) {
      alert('please fill details');
    } else {
      this.fileStatus = true;
      const uploadData = new FormData();
      uploadData.append('upload', this.selectedCategoryFile, this.selectedCategoryFile.name);

      const req = new HttpRequest('POST', `${environment.backendUrl}/uploadAssets`, uploadData, {
        reportProgress: true
      });

      this.http.request(req).subscribe(event => {
        if (event instanceof HttpResponse) {
          this.fileStatus = false;
          this.fileInput.nativeElement.value = '';
          this.getUserUploadAssets();
        }
      }, error => {
        this.fileStatus = false;
        console.log('server error');
      });
    }
  }

  getUserUploadAssets() {
    this.http.get(`/getUserUploadAssets`).subscribe(data => {
      console.log(data);
    });
  }

}
