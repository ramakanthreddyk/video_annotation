import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { map, share, tap, filter } from 'rxjs/operators';
import * as SockJS from 'sockjs-client';
import { get } from 'lodash';
// import * as EventSource from 'eventsource';

import { AppConfig } from 'app/app.config';
import { UniqueSensor } from 'app/dashboard';
import { DataPoint, MapSeriesResult, DataSeries, ReferenceResponse, ReferenceBundle, ReferenceCollection, SpectrumResponse,
         ReferenceCalculationMethod, SpectrumMeta} from './spectrum.model';
import { isNullOrUndefined } from 'util';

@Injectable()
export class SpectrumService {
    private _sock: any;

    private _spectrum: Observable<SpectrumResponse>;
    private _reference: Observable<ReferenceResponse>;

    get sensor(): UniqueSensor { return this._sensor; }
    private _sensor: UniqueSensor;

    get calculationMethod(): ReferenceCalculationMethod { return this._calculationMethod.value; }
    set calculationMethod(method: ReferenceCalculationMethod) { this._calculationMethod.next(method); }
    private readonly _calculationMethod = new BehaviorSubject<ReferenceCalculationMethod>('frequency');

    get showAlarmReference(): boolean { return this._showAlarmReference.value; }
    set showAlarmReference(show: boolean) {
        if (this._showAlarmReference.value !== show) {
            this._showAlarmReference.next(show);
        }
    }
    private readonly _showAlarmReference = new BehaviorSubject<boolean>(true);

    get showWarnReference(): boolean { return this._showWarnReference.value; }
    set showWarnReference(show: boolean) {
        if (this._showWarnReference.value !== show) {
            this._showWarnReference.next(show);
        }
    }
    private readonly _showWarnReference = new BehaviorSubject<boolean>(true);

    public errors = new BehaviorSubject<any>({});

    constructor(
        private appConfig: AppConfig,
        private http: HttpClient,
    ) { }

    private _eventData<T>(type: string): Observable<T> {
        if (!this._sock) {
            throw Error('No EventSource found! Did you call open()?');
        }
        return new Observable<T>((subscriber) => {
            const listener = (event: any) => {
                if (event.data.startsWith(type)) {
                    event.data = event.data.slice(type.length + 1);

                    subscriber.next(JSON.parse(get(event, 'data', '{}')));
                }
            };

            this._sock.addEventListener('message', listener);

            return () => {
                this._sock.removeEventListener('message', listener);
            };

        }).pipe(
            share(),
        );
    }

    open(sensor: UniqueSensor, calculationMethod?: ReferenceCalculationMethod) {
        if (this._sock && this._sock.readyState !== this._sock.CLOSED) {
            this.close();
        }

        if (calculationMethod) {
            this.calculationMethod = calculationMethod;
        }

        this._sensor = sensor;

        const vseId = sensor.vseId;
        const sensorId = sensor.sensorId;

        this._sock = new SockJS(this.appConfig.url('vse', 'data'));

        this._sock.onopen = function() {
            this.send(`${vseId} ${sensorId}`);
        };
    }

    close() {
        if (this._sock) {
            this._sock.close();
        }

        this._spectrum = null;
        this._reference = null;
    }

    spectrum(): Observable<SpectrumResponse> {
        if (!this._spectrum) {
            this._spectrum = this._eventData('spectrum');
        }
        return this._spectrum;
    }

    reference(): Observable<ReferenceResponse> {
        if (!this._reference) {
            this._reference = this._eventData('reference');
        }
        return this._reference;
    }

    mapSeries(data: number[], resolution: number, rpm: number = 0,
              calculationMethod: ReferenceCalculationMethod = 'frequency'): MapSeriesResult {

        if (calculationMethod === 'order' && !rpm) {
            this.errors.next({...this.errors.value, rpmError: true });
            return null;
        } else if (this.errors.value.rpmError) {
            this.errors.next({...this.errors.value, rpmError: false });
        }


        if (isNullOrUndefined(data)) {
            return null;
        } else {
            const series = data.map((point, index) => {
                const res: DataPoint = {
                    name: 0,
                    value: point,
                };

                switch (calculationMethod) {
                    case 'order':
                        res.name = index / (rpm / 60);
                        break;
                    default:
                        res.name = (index * resolution);
                }

                return res;
            });
            return {
                series: series,
                maxY: Math.max(...data),
            };
        }
    }

    timestamp(): Observable<string> {
        return this.spectrum().pipe(
            map((s) => s.timestamp)
        );
    }

    // spectrumMeta(): Observable<SpectrumMeta> {
    //     return this.spectrum().pipe(
    //         map((s) => {
    //             const meta: SpectrumMeta = {
    //                 ...s
    //             };

    //             return meta;
    //         })
    //     );
    // }

    data(): Observable<DataSeries[]> {
        return combineLatest(
            this.spectrum(),
            this.reference(),
            this._calculationMethod,
            this._showAlarmReference,
            this._showWarnReference,
        ).pipe(
            map(([spectrum, reference, method, showAlarm, showWarn]) => {
                let res: DataSeries[] = [];
                if (spectrum) {
                    if (reference) {
                        const references = reference.references.filter((val) => val.workstep === spectrum.workstep);
                        const alarmRef = references.find((val) => val.alarmLevel === 'error');
                        const warnRef = references.find((val) => val.alarmLevel === 'warn');

                        if (method === 'frequency') {
                            if (warnRef && showWarn) {
                                const mapResult = this.mapSeries(warnRef.data, reference.frequencyStep);
                                res.push({
                                    name: 'ref_warning',
                                    series: mapResult.series,
                                    maxY: mapResult.maxY,
                                });
                            }

                            if (alarmRef && showAlarm) {
                                const mapResult = this.mapSeries(alarmRef.data, reference.frequencyStep);
                                res.push({
                                    name: 'ref_alarm',
                                    series: mapResult.series,
                                    maxY: mapResult.maxY,
                                });
                            }
                        }
                    }

                    const spectrumMapResult = this.mapSeries(spectrum.data, spectrum.frequencyStep, spectrum.rpm, method);

                    if (spectrumMapResult) {
                        res.push({
                            name: 'spectrum',
                            series: spectrumMapResult.series,
                            maxY: spectrumMapResult.maxY,
                        });
                    } else {
                        res = null;
                    }
                }
                return res;
            }),
        );
    }

}
