import { BackendUser } from './../_models/user';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, UserService } from '../_services';
import { Timeline, TimelineList, Admins, Asset, IEval } from '../_models';
import { Subject, of, Observable } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
    displayedColumns = ['timeline_id', 'timeline_name', 'timeline_from', 'timeline_to', 'icon'];
    evalColumns = ['evaluator_id', 'annotator_id', 'asset_id', 'icon'];
    dataSource: TimelineList;
    private readonly ngDestroyed$ = new Subject();
    admins = Admins;
    userType: Admins;
    userId: string;
    annotatorSelected: string;
    // allotedAnnotatorList: BackendUser[];
    annotatorList: BackendUser[] = [];
    constructor(
        private users: UserService,
        private router: Router,
        private auth: AuthenticationService
    ) {
          this.auth.userId.subscribe((val) => {
            this.userId = val;
        })

        this.auth.userType
            .pipe(
                takeUntil(this.ngDestroyed$),
                switchMap((user: Admins) => this.getevalId(user))
            ).subscribe((annotators) => {
                this.annotatorList =  annotators.data;
                console.log(annotators, this.userType);
            })
    }

    ngOnInit() {
        this.users.getTimeline().subscribe((timeline: any) => {
            this.dataSource = timeline.data;
        });

    }

    getevalId(userType: Admins): Observable<any> {
        this.userType = userType;
        if (userType === this.admins.Evaluator) {
           return this.auth.userId
            .pipe(
                takeUntil(this.ngDestroyed$),
                switchMap((userId: string) => this.users.getJobs(userId))
            )
        } else if(userType === this.admins.Annotator) {
                this.auth.setAnnotatorId(this.userId);
        }
        else {
            return of(null)
        }
    }
    getJobs(evalId: string) {
      this.users.getJobs(evalId).subscribe((annotators) => {
        console.log(annotators, this.userType);
      })
    }
    gotoAssets(data: Timeline) {
        this.users.selectedTimelineActive(data);
        this.router.navigate(['Assets']);
    }

    gotoVideo(data: IEval) {
        this.auth.setAnnotatorId(data.annotator_id);
        this.users.getAsset(data.timeline_id, data.annotator_id).subscribe((data) => { 
            this.gotoVideos(data.data[0]);
        });
      }

      gotoVideos(data: Asset) {
        this.auth.selectedVideoActive(data);
        this.router.navigate(['Annotation']);
      }

    ngOnDestroy() {
        this.ngDestroyed$.next();
        this.ngDestroyed$.complete();
    }
}
