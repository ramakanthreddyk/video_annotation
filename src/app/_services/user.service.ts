import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/observable';

import { Timeline } from '../_models';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
  selectedTimeline: BehaviorSubject<Timeline> = new BehaviorSubject<Timeline>(null);
  headers = new HttpHeaders({ 'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  selectedTimelineActive(value: Timeline) {
    this.selectedTimeline.next(value);
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


}
