import { AssetList } from './../_models/assets.model';
import { AuthenticationService } from './../_services/authentication.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../_services';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Asset, Timeline} from './../_models';



@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent implements OnInit, OnDestroy {

  displayedColumns = ['asset_id', 'asset_name', 'asset_from', 'asset_to', 'icon'];
  dataSource: AssetList;
  private _assetsubscription = Subscription.EMPTY;

  constructor(private auth: AuthenticationService,
    private users: UserService,
    private router: Router) { }
   /* get all assets */
  ngOnInit() {
      this.users.selectedTimeline.subscribe((timeline: Timeline) => {
        if (timeline) {
          this._assetsubscription = this.users.getAsset(timeline.timeline_id).subscribe((asset: any) => {
            const data: AssetList = asset.data;
            this.dataSource = data.filter((videoasset) => videoasset.asset_type_id === '1');
            this.dataSource = data;
          });
        }
      });
  }

  /* goto playercomponent by taking the selected video along  */
  gotoVideo(data: Asset) {
    this.auth.selectedVideoActive(data);
    this.router.navigate(['Annotation']);
  }

  ngOnDestroy() {
    this._assetsubscription.unsubscribe();
  }
}
