import { AlarmLevel } from 'app/dashboard';

export type ReferenceCalculationMethod = 'frequency' | 'order';

export interface DataPoint {
    name: any;
    value: any;
}

export interface MapSeriesResult {
    series: DataPoint[];
    maxY?: number;
}

export interface DataSeries {
    name: string;
    series: DataPoint[];
    maxY?: number;
}

export interface Reference {
    workstep: number;
    alarmLevel: AlarmLevel;
    data: number[];
}

export interface ReferenceBundle {
    [alarmLevel: string]: DataPoint[];
}

export interface ReferenceCollection {
    [step: number]: ReferenceBundle;
}

export interface ReferenceResponse {
    frequencyStep: number;
    references: Reference[];
}

export interface SpectrumMeta {
    rpm: number;
    frequencyStep: number;
    measureFrequency: number;
    measureSeconds: number;
    timestamp: string;
    workstep: number;
}

export interface SpectrumResponse extends SpectrumMeta {
    data: number[];
}

export interface ChartDataInfo {
    data: ChartData[];
    label: string;
    backgroundColor: string;
}

export interface ChartData {
    x: any;
    y: any;
}

export interface ChartInfo {
    chartData: ChartDataInfo[];
    chartLabel: Array<number>;
}
