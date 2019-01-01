import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/observable';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { User, Timeline } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  selectedVideo: BehaviorSubject<Object> = new BehaviorSubject({});
  selectedAnnotation: BehaviorSubject<Array<Object>> = new BehaviorSubject([]);
  getUserVideoId: BehaviorSubject<Object> = new BehaviorSubject({});
  getLoggedInfo: BehaviorSubject<Boolean> = new BehaviorSubject(false);

  headers = new HttpHeaders({ 'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }


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

  login(loginData: any): Observable<any> {
    return this.http.post(`${environment.backendUrl}/login`, loginData, { headers: this.headers });
  }

  register(user: User) {
    return this.http.post(`${environment.backendUrl}/register`, user);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
  }
}
