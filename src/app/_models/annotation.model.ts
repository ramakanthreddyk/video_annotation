export interface Annotation {
    asset_id: number;
    user_id: number;
    key_type_id: number;
    start_time: string;
    end_time: string;
    title: string;
    description: string;
    vote_up: number;
    vote_down: number;
    asset_annotation_start_time: string;
    asset_annotation_end_time: string;
    annotation_id: string;
 }
 export type AnnotationList = Annotation[];

 export interface EditAnnotation {
    uniqueId: number;
    title: string;
    description: string;
    asset_id:  number;
    user_id:  number;
 }

 export interface IAnnotationModel {
    key_type_id: number;
    key_description: string;
    key_name: string;
    key_shortcut: string;
 }