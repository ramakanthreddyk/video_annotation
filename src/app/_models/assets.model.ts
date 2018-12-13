export interface Asset {
   asset_id: number;
   asset_name: string;
   asset_object: string;
   asset_timestamp_from: string;
   asset_timestamp_to: string;
   asset_type_id: string;
}
export type AssetList = Asset[];