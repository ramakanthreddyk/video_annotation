import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  selectedVideo: BehaviorSubject<Object> = new BehaviorSubject({});
  selectedAnnotation: BehaviorSubject<Array<Object>> = new BehaviorSubject([]);
  getUserVideoId: BehaviorSubject<Object> = new BehaviorSubject({});
  getLoggedInfo: BehaviorSubject<Boolean> = new BehaviorSubject(false);
  constructor(public http: HttpClient) { }

  register(registerData) {
    console.log(registerData);
    const appUrl = 'http://localhost:3000/api/register';
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:4200' });
      this.http.post(appUrl, registerData, { headers: headers })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  login(loginData) {
    console.log(loginData);
    const appUrl = 'http://localhost:3000/api/login';
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:4200' });
      this.http.post(appUrl, loginData, { headers: headers })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  annotation_description() {
    const appUrl = 'http://localhost:3000/api/annotation_description';
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:4200' });
      this.http.get(appUrl, { headers: headers })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  assets() {
    const appUrl = 'http://localhost:3000/api/assets';
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:4200' });
      this.http.get(appUrl, { headers: headers })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  storeAnnotation(data) {
    const appUrl = 'http://localhost:3000/api/storeAnnotation';
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:4200' });
      this.http.post(appUrl, JSON.stringify({ data: data }), { headers: headers })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  selectedVideoActive(value) {
    this.selectedVideo.next(value);
  }

  getSelectedAnnotation(val) {
    this.selectedAnnotation.next(val);
  }

  getUserVideoIdmethod(val) {
    this.getUserVideoId.next(val);
  }

  getLoggedInfomethod(val) {
    this.getLoggedInfo.next(val);
  }

  getPreAnnotations(data) {
    const appUrl = 'http://localhost:3000/api/getPreAnnotations';
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:4200' });
      this.http.post(appUrl, JSON.stringify({ data: data }), { headers: headers })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
  }
}
