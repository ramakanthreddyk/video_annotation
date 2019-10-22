import { EditAnnotationComponent } from './../edit-annotation/edit-annotation.component';
import { AnnotationList, Admins } from './../_models';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { VgAPI } from 'videogular2/core';
import { MatSnackBar } from '@angular/material';
import { AuthenticationService, UserService, AnnotationService } from '../_services';
import { MatDialog } from '@angular/material';

declare var VTTCue;

@Component({
    selector: 'app-annotations-player',
    templateUrl: './Annotations-player.component.html',
    styleUrls: ['./Annotations-player.component.css']
})
export class AnnotationsPlayerComponent implements OnInit {
    sources: Array<Object>;
    admins = Admins;
    userId: string;
    annotatorId: any;
    action;
    startTime;
    endTime;
    cuePointData = [];
    backupCue = [];
    api: VgAPI;
    track: TextTrack;
    showCuePointManager = false;
    selectedAnnotation: any;
    tempAnnotation: any;
    asset: any;
    displayedColumns = ['key_type_id', 'key_name', 'key_description', 'key_shortcut'];
    annotationdisplayColumns =['user', 'title', 'description', 'vote_up', 'vote_down', 
                        'annotation_from', 'annotation_to', 'edit_icon', 'delete_icon'];
    dataSource;
    userType: Admins;
    annotationdataSource: AnnotationList;
    users;
    currentTime: any;

    changed;
    sampleObject;
    @ViewChild('media') myVideo: any;
    
    constructor(private snackBar: MatSnackBar,
        private user: UserService,
        private auth: AuthenticationService,
        private annotationservice: AnnotationService,
        private dialog: MatDialog
        ) {
            this.auth.userType.subscribe((val) => {
                this.userType = val;
                if(val === this.admins.Evaluator) {
                    this.annotationdisplayColumns.splice(7, 2);
                }

                if(val === this.admins.Annotator) {
                    this.annotationdisplayColumns.splice(3, 2);
                }
            })
            this.auth.userId.subscribe((val) => this.userId = val);
            this.auth.annotatot_Id.subscribe((val) => this.annotatorId = val);
    }



    ngOnInit() {
        this.auth.selectedVideo.subscribe((asset: any) => {
            if (asset.asset_object) {
                this.asset = asset;
                this.sources = [
                    {
                        src: this.asset.asset_object,
                        type: 'video/mp4'
                    }
                ];

                /* get annotations to corresponding timeline with help of assset */
                this.annotationservice.getPossibleAnnotations(asset.asset_id).subscribe((annotationlist: any) => {
                    this.dataSource = annotationlist.data;
                });
            } else {
                console.log('no asset');
            }
        });
        this.user.getAll().subscribe((allusers: any) => {
            this.users = allusers.data;
        });
    }


    @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
        // console.log('this.api', this.userType );
        if (this.userType === this.admins.Annotator) {
            // console.log(this.api, this.userType );
            if (this.api && this.api.state === 'playing' && event.shiftKey) {
                const key = event.key.toLowerCase();
                if (event.key !== 'Shift') {
                    if (this.action !== key) {
                        this.tempAnnotation = this.dataSource.filter(eachAnnotation => {
                            return key === eachAnnotation.key_shortcut;
                        });
                        if (this.tempAnnotation.length !== 0) {
                            if (key === this.tempAnnotation[0].key_shortcut) {
                                this.selectedAnnotation = this.tempAnnotation[0];
                                this.action = key;
                                this.startTime = this.api.currentTime;
                                this.openSnackBar('started annotation' + ` ${this.tempAnnotation[0].key_description}`, '');
                            }
                        } else {
                            console.log('unknown');
                        }
                    } else {
                        this.endTime = this.api.currentTime;
                        this.openSnackBar('Ended annotation' + ` ${this.selectedAnnotation.key_description}`, '');
                        const jsonData = {
                            title: 'Test',
                            description: this.selectedAnnotation.key_description,
                            src: '',
                            href: '',
                            asset_id: this.asset.asset_id,
                            user_id: this.userId,
                            annotation_id: new Date().valueOf()
                        };
                        const jsonText = JSON.stringify(jsonData);
                        const annotation_to_store = {
                            start_time: this.startTime,
                            end_time: this.endTime,
                            title: jsonData['title'],
                            description: jsonData['description'],
                            key_type_id: this.selectedAnnotation.key_type_id,
                            asset_id: this.asset.asset_id,
                            user_id: this.userId,
                            annotation_id: new Date().valueOf()
                        };
                        this.annotationservice.storeAnnotation(annotation_to_store).subscribe((res: any) => {
                            console.log(res);
                            this.annotationdataSource = res.data;
                        });
                        this.track.addCue(
                            new VTTCue(this.startTime, this.endTime, jsonText)
                        );
                        this.action = '';
                    }
                }
            }
        }
    }


    onPlayerReady(api: VgAPI) {
        this.api = api;
        this.track = this.api.textTracks[0];
 
        this.annotationservice.getPreStoredAnnotations(this.asset.asset_id, this.annotatorId).subscribe((preannotationlist: any) => {
            if (preannotationlist.success) {
                this.annotationdataSource = preannotationlist.data;
                if (preannotationlist.data.length > 0) {
                    preannotationlist.data.forEach(eachObject => {
                        const sampleObject = {
                            startTime: eachObject.start_time,
                            endTime: eachObject.end_time,
                            jsonText: {
                                title: eachObject.title,
                                src: '',
                                href: '',
                                description: eachObject.description,
                                user_id: eachObject.user_id,
                                annotation_id: eachObject.annotation_id,
                                asset_id: eachObject.asset_id
                            }
                        };
                        const cue = new VTTCue(sampleObject.startTime, sampleObject.endTime, JSON.stringify(sampleObject.jsonText));
                        console.log(cue);
                        this.backupCue.push(cue);
                        this.track.addCue(cue);
                    });
                }
            }
        }, (error) => {
            console.log('error :', error);
        });
        this.api.subscriptions.timeUpdate.subscribe(() => {
            this.currentTime = this.api.currentTime;
        });

        this.api.subscriptions.canPlay.subscribe(() => {
            if (this.track.cues.length < this.backupCue.length) {
                this.backupCue.forEach(cue => {
                    this.track.addCue(cue);
                });
            }
        });
    }


    /* to edit the annotation */
    openDialog(element): void {
        const dialogRef = this.dialog.open(EditAnnotationComponent, {
            width: '250px',
            data: element
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
            this.annotationdataSource = result.result;
            this.changed = result.changed;
            this.sampleObject = {
                startTime: Number(element.start_time),
                endTime: Number(element.end_time),
                jsonText: {
                title: this.changed.title,
                src: '',
                href: '',
                description: this.changed.description,
                user_id: element.user_id,
                annotation_id: element.annotation_id,
                asset_id: element.asset_id
                }
            };
        for ( let i = 0; i < this.track.cues.length; i ++) { 
            // console.log(this.track.cues[i].endTime, element);
            if ( this.track.cues[i].endTime === Number(element.end_time) && this.track.cues[i].startTime === Number(element.start_time)) {
                this.track.cues[i].text = JSON.stringify(this.sampleObject.jsonText);
                const removeAnnotation = this.cuePointData.filter(annotation => annotation.annotation_id === element.annotation_id);
                this.cuePointData.splice((this.cuePointData).indexOf(removeAnnotation, 1));
            }
        }
    }
        });

    }


    onEnterCuePoint(event) {
        const text = JSON.parse(event.text);
        this.cuePointData.push(text);
    }

    onExitCuePoint(event) {
        const text = JSON.parse(event.text);
        const removeAnnotation = this.cuePointData.filter(annotation => annotation.annotation_id === text.annotation_id);
        this.cuePointData.splice((this.cuePointData).indexOf(removeAnnotation, 1));
    }


    voteUp(annotation) {
        this.annotationservice.voteUp(annotation.annotation_id, annotation.asset_id, annotation.user_id).subscribe( (response: any) => {
            this.annotationdataSource =  response.data;
        });
    }

    voteDown(annotation) {
        this.annotationservice.voteDown(annotation.annotation_id, annotation.asset_id, annotation.user_id).subscribe( (response: any) => {
            this.annotationdataSource =  response.data;
        });
    }


    removeAnnotation(cue: any) {
        for (let i = 0; i < this.track.cues.length; i++) {
            if (this.track.cues[i].startTime === Number(cue.start_time)) {
                this.track.removeCue(this.track.cues[i]);
                const removeAnnotation = this.cuePointData.filter(annotation => annotation.annotation_id === cue.annotation_id);
                this.cuePointData.splice((this.cuePointData).indexOf(removeAnnotation, 1));
            }
        }
        this.annotationservice.deleteAnnotation(cue.annotation_id, cue.asset_id, cue.user_id).subscribe( (response: any) => {
            this.annotationdataSource =  response.data;
        });
    }



    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 3000,
            panelClass: ['red-snackbar'],
        });
    }


    /* creating errors */
    getSelectedUserAnnotations(users) {
        this.sources = [
            {
                src: this.asset.asset_object,
                type: 'video/mp4'
            }
        ];
        users.forEach(user => {
            this.annotationservice.getPreStoredAnnotations(this.asset.asset_id, user).subscribe((preannotationlist: any) => {
                if (preannotationlist.success) {
                    this.annotationdataSource = preannotationlist.data;
                    if (preannotationlist.data.length > 0) {
                        preannotationlist.data.forEach(eachObject => {
                            const sampleObject = {
                                startTime: eachObject.start_time,
                                endTime: eachObject.end_time,
                                jsonText: {
                                    title: eachObject.title,
                                    src: '',
                                    href: '',
                                    description: eachObject.description,
                                    user_id: eachObject.user_id,
                                    annotation_id: eachObject.annotation_id,
                                    asset_id: eachObject.asset_id
                                }
                            };
                            const cue = new VTTCue(sampleObject.startTime, sampleObject.endTime, JSON.stringify(sampleObject.jsonText));
                            this.backupCue.push(cue);
                            this.track.addCue(cue);
                        });
                    }
                }
            }, (error) => {
                console.log('error :', error);
            });
            this.api.subscriptions.timeUpdate.subscribe(data => {
                this.currentTime = this.api.currentTime;
            });

            this.api.subscriptions.canPlay.subscribe(data => {
                if (this.track.cues.length < this.backupCue.length) {
                    this.backupCue.forEach(cue => {
                        this.track.addCue(cue);
                    });
                }
            });
        });
    }
}
