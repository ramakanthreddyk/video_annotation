import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Subject, Observable } from 'rxjs';
import { AuthenticationService } from './../_services/authentication.service';
import { takeUntil, switchMap, filter } from 'rxjs/operators';
import { Asset, Timeline, AssetList } from './../_models';
import { UserService } from '../_services';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent implements OnInit, OnDestroy {

  displayedColumns = ['asset_id', 'asset_name', 'asset_from', 'asset_to', 'icon'];
  dataSource: AssetList;
  private _assetsubscription = Subscription.EMPTY;
  private readonly ngDestroyed$ = new Subject();
  private userId: string;

  constructor(private auth: AuthenticationService,
    private users: UserService,
    private router: Router) {
      this.auth.userId.subscribe((val) => this.userId = val);
     }
   /* get all assets */
  ngOnInit() {
      this.users.selectedTimeline.pipe(
        takeUntil(this.ngDestroyed$),
        filter((timeline) => !!timeline),
        switchMap((timeline: Timeline) => this.getAssetToDisplay(timeline))
      ).subscribe((asset) => {
      const data: AssetList = asset.data;
      if(!!data) {
        this.dataSource = data.filter((videoasset) => videoasset.asset_type_id === '1');
      }
    })
  }

  getAssetToDisplay(timeline: Timeline): Observable<any> {
    return this.users.getAsset(timeline.timeline_id, this.userId);
}
  /* goto playercomponent by taking the selected video along  */
  gotoVideo(data: Asset) {
    this.auth.selectedVideoActive(data);
    this.router.navigate(['Annotation']);
  }

  ngOnDestroy() {
    this._assetsubscription.unsubscribe();
    this.ngDestroyed$.next();
    this.ngDestroyed$.complete();
  }
}
