import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AssignAsset, EvaluatorJob } from '../_models';

@Injectable()
export class AnnotationService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  getPossibleAnnotations(asset: string) {
    return this.http.post(`/possible_annotations`, JSON.stringify({ data: asset }), { headers: this.headers });
  }

  storeAnnotation(annotation_to_store) {
    return this.http.post(`/storeAnnotation`, annotation_to_store, { headers: this.headers });
  }

  getPreStoredAnnotations(asset_id: string, user_id: string) {
    return this.http.post(`/getPreStoredAnnotations`,
      JSON.stringify({ asset_id: asset_id, user_id: user_id }), { headers: this.headers });
  }

  editAnnotationData(data: Object) {
    return this.http.post(`/editAnnotationData`,
      JSON.stringify({ data: data }), { headers: this.headers });
  }

  deleteAnnotation(annotation_id: number, asset_id: number, user_id: number) {
    return this.http.post(`/deleteAnnotation`,
      JSON.stringify({ annotation_id: annotation_id, asset_id: asset_id, user_id: user_id }), { headers: this.headers });
  }

  voteUp(annotation_id: number, asset_id: number, user_id: number) {
    return this.http.post(`/voteUp`,
      JSON.stringify({ annotation_id: annotation_id, asset_id: asset_id, user_id: user_id }), { headers: this.headers });
  }

  voteDown(annotation_id: number, asset_id: number, user_id: number) {
    return this.http.post(`/voteDown`,
      JSON.stringify({ annotation_id: annotation_id, asset_id: asset_id, user_id: user_id }), { headers: this.headers });
  }

  assignAssetsToAnnotator(assignAsset: AssignAsset) {
    return this.http.post(`/assignAssetsToAnnotator`, assignAsset, { headers: this.headers });
  }

  assignEvaluatorJobs(assignEvaluatorJob: EvaluatorJob) {
    console.log(assignEvaluatorJob);
    return this.http.post(`/assignEvaluatorJobs`, assignEvaluatorJob, { headers: this.headers });
  }

}
