import { AnnotationList } from './../_models/annotation.model';
import { BackendUser } from './../_models/user';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, UserService, AnnotationService } from '../_services';
import { Timeline, TimelineList, Admins, Asset, IEval, Annotation } from '../_models';
import { Subject, of, Observable } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
    displayedColumns = ['timeline_id', 'timeline_name', 'timeline_from', 'timeline_to', 'icon'];
    evalColumns = ['evaluator_id', 'annotator_id', 'asset_id', 'icon'];
    AnnotationListCol = ['user_id', 'asset_id','asset_annotation_start_time',
                        'asset_annotation_end_time', 'description', 'vote_up', 'vote_down'];
    dataSource: TimelineList;
    annotatorList: BackendUser[] = [];
    annotationsList: AnnotationList = [];
    private readonly ngDestroyed$ = new Subject();
    admins = Admins;
    userType: Admins;
    userId: string;
    annotatorSelected: string;
    downloadJsonHref: any;
    constructor(
        private users: UserService,
        private router: Router,
        private auth: AuthenticationService,
        private annoService: AnnotationService,
        private sanitizer: DomSanitizer
    ) {
          this.auth.userId.subscribe((val) => {
            this.userId = val;
        });

        this.auth.userType
            .pipe(
                takeUntil(this.ngDestroyed$),
                switchMap((user: Admins) => this.getevalId(user))
            ).subscribe((annotators) => {
                if (annotators) {
                    this.annotatorList =  annotators.data;
                }
            });
    }

    ngOnInit() {
        this.users.getTimeline().subscribe((timeline: any) => {
            this.dataSource = timeline.data;
        });

        this.annoService.getAnnotationList().subscribe((list: any) => {
            this.annotationsList = list.data;
            this.generateDownloadJsonUri();
        })

    }

    getevalId(userType: Admins): Observable<any> {
        this.userType = userType;
        if (userType === this.admins.Evaluator) {
           return this.auth.userId
            .pipe(
                takeUntil(this.ngDestroyed$),
                switchMap((userId: string) => this.users.getJobs(userId))
            );
        } else if (userType === this.admins.Annotator) {
            this.auth.setAnnotatorId(this.userId);
            return of(null);
        } else {
            return of(null);
        }
    }


    getJobs(evalId: string) {
        this.users.getJobs(evalId).subscribe((annotators) => {
        });
    }

    gotoAssets(data: Timeline) {
        this.users.selectedTimelineActive(data);
        this.router.navigate(['Assets']);
    }

    gotoVideo(data: IEval) {
        this.auth.setAnnotatorId(data.annotator_id);
        this.users.getAsset(data.timeline_id, data.annotator_id).subscribe((subData: any) => {
            this.gotoVideos(subData.data[0]);
        });
    }

    gotoVideos(data: Asset) {
        this.auth.selectedVideoActive(data);
        this.router.navigate(['Annotation']);
    }

    generateDownloadJsonUri() {
        var theJSON = JSON.stringify(this.annotationsList);
        var uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
        this.downloadJsonHref = uri;
    }

    ngOnDestroy() {
        this.ngDestroyed$.next();
        this.ngDestroyed$.complete();
    }
}
