import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { User, Timeline } from '../_models';
const config = { apiUrl : 'http://localhost:3000/api'};

@Injectable()
export class UserService {
  selectedTimeline: BehaviorSubject<Timeline> = new BehaviorSubject<Timeline>(null);
  constructor(private http: HttpClient) { }

    selectedTimelineActive(value: Timeline) {
      this.selectedTimeline.next(value);
    }

    login(loginData) {
        return new Promise((resolve, reject) => {
          const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:4300' });
          this.http.post(`${config.apiUrl}/login`, loginData, { headers: headers })
            .subscribe(res => {
              resolve(res);
            }, (err) => {
              reject(err);
            });
        });
      }


      getAsset(timelineId) {
          return new Promise((resolve, reject) => {
            const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:4300' });
            this.http.post(`${config.apiUrl}/getAsset`, JSON.stringify({ timelineId }), { headers: headers })
              .subscribe((res: any) => {
                resolve(res.data);
              }, (err) => {
                reject(err);
              });
          });
      }


    getAll() {
        return this.http.get(`${config.apiUrl}/users`);
    }

    getAssets() {
        return this.http.get(`${config.apiUrl}/assets`);
    }

    getTimeline() {
        return this.http.get(`${config.apiUrl}/timeline`);
    }
    getPossibleAnnotations(asset: string) {
        return new Promise((resolve, reject) => {
          const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:4300' });
          this.http.post(`${config.apiUrl}/possible_annotations`, JSON.stringify({ data: asset }), { headers: headers })
            .subscribe(res => {
              resolve(res);
            }, (err) => {
              reject(err);
            });
        });
      }

      storeAnnotation(annotation_to_store) {
        return new Promise((resolve, reject) => {
          const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:4300' });
          this.http.post(`${config.apiUrl}/storeAnnotation`, annotation_to_store, { headers: headers })
            .subscribe(res => {
              resolve(res);
            }, (err) => {
              reject(err);
            });
        });
      }


      getPreStoredAnnotations(asset_id: string, user_id: string) {
        return new Promise((resolve, reject) => {
          const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:4300' });
          this.http.post(`${config.apiUrl}/getPreStoredAnnotations`,
                  JSON.stringify({ asset_id: asset_id, user_id: user_id }), { headers: headers })
            .subscribe(res => {
              resolve(res);
            }, (err) => {
              reject(err);
            });
        });
      }

      editAnnotationData(data: Object) {
        return new Promise((resolve, reject) => {
          const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:4300' });
          this.http.post(`${config.apiUrl}/editAnnotationData`,
                  JSON.stringify({ data: data}), { headers: headers })
            .subscribe(res => {
              resolve(res);
            }, (err) => {
              reject(err);
            });
        });
      }

      deleteAnnotation(annotation_id: number, asset_id: number, user_id: number) {
        return new Promise((resolve, reject) => {
          const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:4300' });
          this.http.post(`${config.apiUrl}/deleteAnnotation`,
                  JSON.stringify({ annotation_id: annotation_id, asset_id: asset_id, user_id: user_id}), { headers: headers })
            .subscribe(res => {
              resolve(res);
            }, (err) => {
              reject(err);
            });
        });
      }

      voteUp(annotation_id: number, asset_id: number, user_id: number) {
        return new Promise((resolve, reject) => {
          const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:4300' });
          this.http.post(`${config.apiUrl}/voteUp`,
                      JSON.stringify({ annotation_id: annotation_id, asset_id: asset_id, user_id: user_id}), { headers: headers })
            .subscribe(res => {
              resolve(res);
            }, (err) => {
              reject(err);
            });
        });
      }



















    register(user: User) {
        return this.http.post(`${config.apiUrl}/users/register`, user);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/users/` + id);
    }
}
