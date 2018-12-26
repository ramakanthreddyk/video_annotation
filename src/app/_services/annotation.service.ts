import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/observable';

import { User, Timeline } from '../_models';
import { environment } from '../../environments/environment';

@Injectable()
export class AnnotationService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:4300' });
  constructor(private http: HttpClient) { }

  login(loginData: any): Observable<any> {
    return this.http.post(`${environment.backendUrl}/login`, loginData, { headers: this.headers });
  }
}
