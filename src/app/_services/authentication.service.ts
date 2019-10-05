﻿import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { User, Admins } from '../_models';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    selectedVideo: BehaviorSubject<Object> = new BehaviorSubject({});
    selectedAnnotation: BehaviorSubject<Array<Object>> = new BehaviorSubject([]);
    getUserVideoId: BehaviorSubject<Object> = new BehaviorSubject({});
    getLoggedInfo: BehaviorSubject<Boolean> = new BehaviorSubject(false);
    userType: BehaviorSubject<Admins> = new BehaviorSubject(null);
    userId: BehaviorSubject<string> = new BehaviorSubject(null);
    annotatot_Id: BehaviorSubject<string> = new BehaviorSubject(null);
    userName: BehaviorSubject<string> = new BehaviorSubject('');

    headers = new HttpHeaders({ 'Content-Type': 'application/json' });
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

    setLoggedInfo(val) {
        this.getLoggedInfo.next(val);
    }

    setUserType(val) {
        this.userType.next(val);
    }

    setUserId(id: string) {
        this.userId.next(id);
    }

    setUserName(name: string) {
        this.userName.next(name);
    }

    setAnnotatorId(id: any) {
        this.annotatot_Id.next(id);
    }

    login(loginData: any): Observable<any> {
        return this.http.post<any>(`${environment.backendUrl}/login`, loginData, { headers: this.headers });
    }

    register(user: User) {
        return this.http.post(`${environment.backendUrl}/register`, user, { headers: this.headers });
    }

    deleteUser(user_id: number) {
        return this.http.post(`${environment.backendUrl}/deleteUser`, JSON.stringify({ user_id }), { headers: this.headers });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('token');
    }
}
