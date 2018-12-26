import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/observable';

import { User, Timeline } from '../_models';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
  selectedTimeline: BehaviorSubject<Timeline> = new BehaviorSubject<Timeline>(null);
  headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:4300' });
  constructor(private http: HttpClient) { }

  selectedTimelineActive(value: Timeline) {
    this.selectedTimeline.next(value);
  }

  login(loginData: any): Observable<any> {
    return this.http.post(`${environment.backendUrl}/login`, loginData, { headers: this.headers });
  }


  getAsset(timelineId: number): Observable<any> {
    return this.http
      .post(`${environment.backendUrl}/getAsset`, JSON.stringify({ timelineId }), { headers: this.headers });
  }

     getAll() {
        return this.http.get(`${environment.backendUrl}/users`);
      }

    getAssets() {
        return this.http.get(`${environment.backendUrl}/assets`);
    }

    getTimeline() {
        return this.http.get(`${environment.backendUrl}/timeline`);
    }

    getPossibleAnnotations(asset: string) {
      return this.http.post(`${environment.backendUrl}/possible_annotations`, JSON.stringify({ data: asset }), { headers: this.headers });
    }

      storeAnnotation(annotation_to_store) {
        return new Promise((resolve, reject) => {

          this.http.post(`${environment.backendUrl}/storeAnnotation`, annotation_to_store, { headers: this.headers })
            .subscribe(res => {
              resolve(res);
            }, (err) => {
              reject(err);
            });
        });
      }


      getPreStoredAnnotations(asset_id: string, user_id: string) {
        return new Promise((resolve, reject) => {

          this.http.post(`${environment.backendUrl}/getPreStoredAnnotations`,
                  JSON.stringify({ asset_id: asset_id, user_id: user_id }), { headers: this.headers })
            .subscribe(res => {
              resolve(res);
            }, (err) => {
              reject(err);
            });
        });
      }

      editAnnotationData(data: Object) {
        return new Promise((resolve, reject) => {

          this.http.post(`${environment.backendUrl}/editAnnotationData`,
                  JSON.stringify({ data: data}), { headers: this.headers })
            .subscribe(res => {
              resolve(res);
            }, (err) => {
              reject(err);
            });
        });
      }

      deleteAnnotation(annotation_id: number, asset_id: number, user_id: number) {
        return new Promise((resolve, reject) => {

          this.http.post(`${environment.backendUrl}/deleteAnnotation`,
                  JSON.stringify({ annotation_id: annotation_id, asset_id: asset_id, user_id: user_id}), { headers: this.headers })
            .subscribe(res => {
              resolve(res);
            }, (err) => {
              reject(err);
            });
        });
      }

      voteUp(annotation_id: number, asset_id: number, user_id: number) {
        return new Promise((resolve, reject) => {

          this.http.post(`${environment.backendUrl}/voteUp`,
                      JSON.stringify({ annotation_id: annotation_id, asset_id: asset_id, user_id: user_id}), { headers: this.headers })
            .subscribe(res => {
              resolve(res);
            }, (err) => {
              reject(err);
            });
        });
      }



















    register(user: User) {
        return this.http.post(`${environment.backendUrl}/users/register`, user);
    }

    delete(id: number) {
        return this.http.delete(`${environment.backendUrl}/users/` + id);
    }
}
