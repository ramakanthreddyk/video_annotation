import { EditAnnotationComponent } from './../edit-annotation/edit-annotation.component';
import { User, Annotation, AnnotationList } from './../_models';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { VgAPI, VgStates } from 'videogular2/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AuthenticationService, UserService } from '../_services';
import { MatDialog } from '@angular/material';

declare var VTTCue;
export interface ICuePoint {
    title: string;
    description: string;
    src: string;
    href: string;
}

export interface IWikiCue {
    startTime: number;
    endTime: number;
    title: string;
    description: string;
    src: string;
    href: string;
}

@Component({
    selector: 'app-annotations-player',
    templateUrl: './Annotations-player.component.html',
    styleUrls: ['./Annotations-player.component.css']
})
export class AnnotationsPlayerComponent implements OnInit {
    sources: Array<Object>;
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
    annotationdisplayColumns = ['user', 'title', 'description', 'vote', 'annotation_from', 'annotation_to', 'edit_icon', 'delete_icon'];
    dataSource;
    annotationdataSource: AnnotationList;
    users;
    currentTime: any;

    changed;
    sampleObject;
    /* storedAnnotations;
    displayStoredAnnotations = [''] */

    // json: JSON = JSON;
    @ViewChild('media') myVideo: any;

    constructor(private snackBar: MatSnackBar,
        private user: UserService,
        private auth: AuthenticationService,
        private dialog: MatDialog) {
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
                this.user.getPossibleAnnotations(asset.asset_id).then((annotationlist: any) => {
                    this.dataSource = annotationlist.data;
                });
            } else {
                console.log('no asset');
            }
        });
        this.user.getAll().subscribe((allusers: any) => {
            this.users = allusers.data;
        });
console.log(this.track, this.api);
    }


    @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
        if (this.api.state === 'playing' && event.shiftKey) {
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
                        user: this.selectedAnnotation.user_id,
                        annotation_id: new Date().valueOf()
                    };
                    const jsonText = JSON.stringify(jsonData);
                    const userid = localStorage.getItem('loggedUser');
                    const annotation_to_store = {
                        start_time: this.startTime,
                        end_time: this.endTime,
                        title: jsonData['title'],
                        description: jsonData['description'],
                        type_id: this.selectedAnnotation.key_type_id,
                        asset_id: this.asset.asset_id,
                        user_id: userid,
                        annotation_id: new Date().valueOf()
                    };
                    this.user.storeAnnotation(annotation_to_store).then((res: any) => {
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




    onPlayerReady(api: VgAPI) {
        this.api = api;
        this.track = this.api.textTracks[0];
        const userid = localStorage.getItem('loggedUser');
        this.user.getPreStoredAnnotations(this.asset.asset_id, userid).then((preannotationlist: any) => {
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
                                annotation_id: eachObject.annotation_id
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
                annotation_id: element.annotation_id
                }
            };
        for ( let i = 0; i < this.track.cues.length; i ++) {
            if ( this.track.cues[i].endTime === Number(element.end_time) && this.track.cues[i].startTime === Number(element.start_time)) {
                this.track.cues[i].text = JSON.stringify(this.sampleObject.jsonText);
                
                // this.track.removeCue(this.track.cues[i]);
            }
        }
        // const data = JSON.stringify(this.sampleObject.jsonText);
        // const cue = new VTTCue(this.sampleObject.startTime, this.sampleObject.endTime, data );
        // this.track.addCue(cue);
        console.log(this.track);
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


    voteUp() {
        console.log('hello');
    }


removeAnnotation(cue: any) {
    console.log(cue);
    const cueObject = {
        jsonText: {
            title: cue.title,
            src: '',
            href: '',
            description: cue.description,
            user_id: cue.user_id,
            annotation_id: cue.annotation_id
        }
    };
    const removecue = new VTTCue(cue.start_time, cue.end_time, JSON.stringify(cueObject.jsonText));
    console.log(removecue);
        this.track.removeCue(removecue);
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
            this.user.getPreStoredAnnotations(this.asset.asset_id, user).then((preannotationlist: any) => {
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
                                    annotation_id: eachObject.annotation_id
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




    // onSubmit(form: NgForm, event: Event) {
    //     event.preventDefault();
    //     if (form.valid) {
    //         const jsonData = {
    //             title: form.value.title,
    //             description: form.value.description,
    //             src: form.value.src,
    //             href: form.value.href
    //         };
    //         const jsonText = JSON.stringify(jsonData);
    //         this.track.addCue(
    //             new VTTCue(form.value.startTime, form.value.endTime, jsonText)
    //         );
    //     }
    // }









    


}
