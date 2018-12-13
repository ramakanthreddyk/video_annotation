export interface Annotation {
    asset_id: number;
    user_id: number;
    key_type_id: number;
    start_time: string;
    end_time: string;
    title: string;
    description: string;
    vote: number;
    asset_annotation_start_time: string;
    asset_annotation_end_time: string;
    annotation_id: string;
 }
 export type AnnotationList = Annotation[];