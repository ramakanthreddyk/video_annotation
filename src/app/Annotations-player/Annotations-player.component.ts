import { EditAnnotationComponent } from './../edit-annotation/edit-annotation.component';
import { User } from './../_models/user';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { VgAPI, VgStates } from 'videogular2/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AuthenticationService, UserService } from '../_services';
import {MatDialog } from '@angular/material';

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
    cuePointData: ICuePoint = null;
    api: VgAPI;
    track: TextTrack;
    showCuePointManager = false;
    selectedAnnotation: any;
    tempAnnotation: any;
    asset: any;
    displayedColumns = ['key_type_id', 'key_name', 'key_description', 'key_shortcut'];
    annotationdisplayColumns = ['user', 'title', 'description', 'vote', 'annotation_from', 'annotation_to', 'edit_icon', 'delete_icon'];
    dataSource;
    annotationdataSource;
    users;
    /* storedAnnotations;
    displayStoredAnnotations = [''] */
    newCue: IWikiCue = {
        startTime: 40,
        endTime: 50,
        title: 'Carl Sagan',
        description: 'Carl Edward Sagan (/ˈseɪɡən/; November 9, 1934 – December 20, 1996) was an American astronomer, ',
        src: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Carl_Sagan_Planetary_Society.JPG',
        href: 'https://en.wikipedia.org/wiki/Carl_Sagan'
    };

    json: JSON = JSON;
    @ViewChild('media') myVideo: any;

    constructor(private snackBar: MatSnackBar,
                private user: UserService,
                private auth: AuthenticationService,
                private dialog: MatDialog) {
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
                        user: this.selectedAnnotation.user_id
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











    ngOnInit() {
      this.auth.selectedVideo.subscribe((asset: any) => {
          if (asset.asset_object) {
              this.asset = asset;
              this.sources = [
                  {
                      src: asset.asset_object,
                      type: 'video/mp4'
                  }
              ];

              /* get annotations to corresponding timeline with help of assset */
              this.user.getPossibleAnnotations(asset.asset_id).then((annotationlist: any) => {
                this.dataSource = annotationlist.data;
              });
              const userid = localStorage.getItem('loggedUser');
              this.user.getPreStoredAnnotations(asset.asset_id, userid).then((preannotationlist: any) => {
                if (preannotationlist.success) {
                    this.annotationdataSource = preannotationlist.data;
                        if (preannotationlist.data.length > 0) {
                           /* this.storedAnnotations = preannotationlist.data; */
                          preannotationlist.data.forEach(eachObject => {
                            const sampleObject = {
                            startTime: eachObject.start_time,
                            endTime: eachObject.end_time,
                            jsonText: {
                              title: eachObject.title,
                              src: '',
                              href: '',
                              description: eachObject.description,
                              user_name: eachObject.user_id
                           }
                       }; console.log(preannotationlist.data);
                      this.track.addCue (new VTTCue ( sampleObject.startTime, sampleObject.endTime, JSON.stringify(sampleObject.jsonText)));
                  });
            }
        }
              }, (error) => {
                  console.log('error :', error);
              });
          } else {
              console.log('no asset');
          }

      });

      this.user.getAll().subscribe((allusers: any) => {
        this.users = allusers.data;
      });

    }






    getSelectedUserAnnotations( users) {
            console.log(users);
    }




    onPlayerReady(api: VgAPI) {
        this.api = api;
        this.track = this.api.textTracks[0];
        console.log(this.track);
        this.api.subscriptions.timeUpdate.subscribe(data => {
        });

        this.api.subscriptions.canPlay.subscribe(data => {
        });
    }




    openDialog(element): void {
        const dialogRef = this.dialog.open(EditAnnotationComponent, {
          width: '250px',
          data: element
        });
        dialogRef.afterClosed().subscribe(result => {
          this.annotationdataSource = result;
        });
      }

















    onSubmit(form: NgForm, event: Event) {
        event.preventDefault();

        if (form.valid) {
            const jsonData = {
                title: form.value.title,
                description: form.value.description,
                src: form.value.src,
                href: form.value.href
            };

            const jsonText = JSON.stringify(jsonData);
            this.track.addCue(
                new VTTCue(form.value.startTime, form.value.endTime, jsonText)
            );
        }
    }









    onClickRemove(cue: TextTrackCue) {
        this.track.removeCue(cue);
    }

    onEnterCuePoint($event) {
        this.cuePointData = JSON.parse($event.text);
    }

    onExitCuePoint($event) {
        this.cuePointData = null;
    }












openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
    duration: 3000,
    panelClass: ['red-snackbar'],
    });
    }
}
