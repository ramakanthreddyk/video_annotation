import { AssetList } from './../_models/assets.model';
import { AuthenticationService } from './../_services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services';
import { Router } from '@angular/router';

import { Asset, Timeline} from './../_models';



@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent implements OnInit {

  displayedColumns = ['asset_id', 'asset_name', 'asset_timestamp_from', 'asset_timestamp_to', 'icon'];
  dataSource: AssetList;
  annotations;
  constructor(private auth: AuthenticationService,
    private users: UserService,
    private router: Router) { }
   /* get all assets */
  ngOnInit() {
      this.users.selectedTimeline.subscribe((timeline: Timeline) => {
        if (timeline) {
          this.users.getAsset(timeline.timeline_id).then((asset: AssetList) => {
            this.dataSource = asset.filter((videoasset) => videoasset.asset_type_id === '1');
            this.dataSource = asset;
          });
        }
      });
  }

  /* goto playercomponent by taking the selected video along  */
  gotoVideo(data: Asset) {
    this.auth.selectedVideoActive(data);
    this.router.navigate(['Player']);
/*     this.auth.annotation_description().then((res: any) => {
      if (res.success === true) {
        this.annotations = res.data.filter((value: any) => {
          return value.Video_Id === data.Video_Id;
        });
        this.auth.getSelectedAnnotation(this.annotations);
        const username = localStorage.getItem('token');
        const videodata = {videoId: this.annotations[0].Video_Id, username: username};
        this.auth.getUserVideoIdmethod( videodata );
        this.router.navigate(['Player']);
      } else {
      }
    }, (err) => {
      console.log(err);
    }); */
  }
}
