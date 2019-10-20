export interface Asset {
   asset_id: number;
   asset_name: string;
   asset_object: string;
   asset_from: string;
   asset_to: string;
   asset_type_id: string;
}
export type AssetList = Asset[];

export interface AssignAsset {
   annotator_id: number;
   asset_idList: number[];
}

export interface AssignShortcut {
   timeline_id: number;
   shorcut_idList: number[];
}

export interface EvaluatorJob {
    evaluator_id: number;
    annotator_idList: number [];
}

export interface IEval {
   annotator_id: number;
   asset_id:number;
   evaluator_id: number;
   timeline_id: string;
}