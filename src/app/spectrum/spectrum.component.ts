import { BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DapStatusResponse, DashboardStatusService, DashboardVseService, Sensor, UniqueSensor, Vse, VseResponse } from 'app/dashboard';
import { environment } from 'app/env';
import { get } from 'lodash';
import { BehaviorSubject, combineLatest, Observable, of, Subscription, interval } from 'rxjs';
import { bufferTime, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { Chart } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { isArray, isNullOrUndefined } from 'util';
import { DataSeries, SpectrumMeta, DataPoint, ChartDataInfo, ChartInfo } from './spectrum.model';
import { SpectrumService } from './spectrum.service';
import { NullTemplateVisitor } from '@angular/compiler';
import { ChartService } from '../chart/chart.service';


const XAXIS_LABELS = {
    order: 'Ordnung',
    frequencies: 'f in Hz',
};

const YAXIS_LABELS = {
    acceleration: 'a in mG',
};

const ERROR_MESSAGES = {
    rpmError: 'Keine Drehzahl vorhanden. Bitte einen anderen Modus wählen.'
};

export interface VseExpansion {
    [key: string]: boolean;
}

export interface SensorExpansion {
    [key: string]: boolean;
}

export interface SelectedSensors {
    [key: string]: boolean;
}
@Component({
    selector: 'app-monitoring-spectrum',
    templateUrl: './spectrum.component.html',
    styleUrls: ['./spectrum.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpectrumComponent implements OnInit, OnDestroy {
    private _paramsSubscription = Subscription.EMPTY;
    private _sensorSubscription = Subscription.EMPTY;
    private _sensorLabelSubscription = Subscription.EMPTY;
    private _statusSubscription = Subscription.EMPTY;
    private _dataSubscription = Subscription.EMPTY;
    private _metaSubscription = Subscription.EMPTY;
    private _alarmSpecSubscription = Subscription.EMPTY;
    private _warnSpecSubscription = Subscription.EMPTY;
    private _spectrumErrorsSubscription = Subscription.EMPTY;
    private _dampenScaleSubscription = Subscription.EMPTY;
    private _timestampSubscription = Subscription.EMPTY;
    private _xAxesScaleSubscription = Subscription.EMPTY;

    readonly selectedSensor = new BehaviorSubject<UniqueSensor>(null);
    readonly spectrumMeta = new BehaviorSubject<SpectrumMeta>(null);
    readonly showAlarmSpec = new BehaviorSubject<boolean>(true);
    readonly showWarnSpec = new BehaviorSubject<boolean>(true);
    readonly chartErrors = new BehaviorSubject<Array<string>>([]);

    @ViewChild(BaseChartDirective) public chart: BaseChartDirective;

    data: DataSeries[];
    status: DapStatusResponse;
    vseList: VseResponse;
    selectedSensorLabel = '';
    update = true;
    sensorSelected = false;
    vseExpansion: VseExpansion = {};
    sensorExpansion: SensorExpansion = {};
    selectedSensors: SelectedSensors = {};

    // chart options
    animations = false;
    showXAxis = true;
    showYAxis = true;
    gradient = true;
    showLegend = false;
    roundDomains = true;
    tooltipDisabled = false;
    showXAxisLabel = true;
    xAxisLabel = XAXIS_LABELS.frequencies;
    showYAxisLabel = true;
    yAxisLabel = YAXIS_LABELS.acceleration;
    autoScale = false;
    timestamp: Observable<string> = null;

    readonly dampenScale = new BehaviorSubject<boolean>(true);

    readonly yScaleMaxChange = new EventEmitter<number>();
    readonly xScaleMaxChange = new EventEmitter<number>();

    yScaleMax = 0;
    xScaleMax = 10000;

    colorScheme = {
        domain: ['#AAAAAA']
    };

    customColors = [
        {
            name: 'spectrum',
            value: '#0DD97B'
        },
        {
            name: 'ref_warning',
            value: '#FAC832'
        },
        {
            name: 'ref_alarm',
            value: '#B93656'
        }
    ];

    // lineChart - Chart.js Settings
    public lineChartInfo: ChartInfo;
    public lineChartData: ChartDataInfo[] = [];
    public lineChartLabels: Array<number> = [];

    public lineChartOptions: any = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 0, // general animation time
        },
        hover: {
            animationDuration: 0, // duration of animations when hovering an item
        },
        responsiveAnimationDuration: 0, // animation duration after a resize
        showLines: true,
        elements: {
            line: {
                tension: 0, // disables bezier curves
            }
        },
        scales: {
            xAxes: [{
                display: true,
                type: 'linear',
                position: 'bottom',
                scaleLabel: {
                    display: true,
                    labelString: this.xAxisLabel,
                    fontSize: 15
                },
                ticks: {
                    beginAtZero: true,
                    suggestedMax: 10000,
                    stepSize: 1000,
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: this.yAxisLabel,
                    fontSize: 15
                },
                ticks: {
                    beginAtZero: true,
                    suggestedMax: 200
                }
            }]
        },
        legend: {
            position: 'bottom',
            usePointStyle: true,
            labels: {
                boxWidth: 20,
                generateLabels: function(chart) {
                    const labels = Chart.defaults.global.legend.labels.generateLabels(chart);
                    labels[0].fillStyle = 'rgba(250,200,50,0.8)';
                    labels[1].fillStyle = 'rgba(185,54,86,0.8)';
                    labels[2].fillStyle = 'rgba(13,217,123,0.8)';
                    return labels;
                }
            },
        },
        tooltips: {
            enabled: false
        }
    };
    public lineChartLegend: Boolean = true;
    public lineChartType: String = 'line';
    public lineChartColors: Array<any> = [
        {
            // yellow - warning
            borderColor: 'rgba(250,200,50,1)',
            borderWidth: 1,
            pointBackgroundColor: 'rgba(250,200,50,1)',
            pointBorderColor: 'rgba(250,200,50,1)',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(250,200,50,0.8)',
            pointRadius: 0,
            pointStyle: 'line'
        },
        {
            // red - alarm
            borderColor: 'rgba(185,54,86,1)',
            borderWidth: 1,
            pointBackgroundColor: 'rgba(185,54,86,1)',
            pointBorderColor: 'rgba(185,54,86,1)',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(185,54,86,0.8)',
            pointRadius: 0,
            pointStyle: 'line'
        },
        {
            // green - spectrum
            borderColor: 'rgba(13,217,123,1)',
            borderWidth: 1,
            pointBackgroundColor: 'rgba(13,217,123,1)',
            pointBorderColor: 'rgba(13,217,123,1)',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(13,217,123,0.8)',
            pointRadius: 0,
            pointStyle: 'line'
        }
    ];

    constructor(
        private spectrumService: SpectrumService,
        private statusService: DashboardStatusService,
        private vseService: DashboardVseService,
        private chartService: ChartService,
        private route: ActivatedRoute,
        private router:  Router,
        private changeDetection: ChangeDetectorRef,
        public breakpointObserver: BreakpointObserver
    ) { }

    ngOnInit() {
        this._updateChanges();

        this.vseService.list.pipe(
            take(1),
        ).subscribe((data) => {
            this.vseList = data;

            if (!this.sensorSelected && this.vseList && this.vseList.length) {
                const vse = this.vseList[0];

                if (vse.sensors.length) {
                    const sensor = vse.sensors[0];
                    this.sensorSelected = true;

                    this.selectedSensor.next({ vseId: vse.id, sensorId: sensor.id });
                    this.router.navigate(['/monitoring', 'spectrum', vse.id, sensor.id]);
                }
            }

            this.changeDetection.detectChanges();
        });

        this._paramsSubscription = this.route.params.subscribe((params) => {
            const vseId: number = +get(params, 'vseId');
            const sensorId: number = +get(params, 'sensorId');

            if (!isNaN(vseId) && !isNaN(sensorId)) {
                this.selectedSensor.next({ vseId: vseId, sensorId: sensorId });
                this.sensorSelected = true;
            }

            this._updateChanges();
        });
    }

    ngOnDestroy() {
        this._unsubscribe();
        this.spectrumService.close();
        this._paramsSubscription.unsubscribe();
    }

    private _unsubscribe() {
        this._sensorSubscription.unsubscribe();
        this._sensorLabelSubscription.unsubscribe();
        this._statusSubscription.unsubscribe();
        this._dataSubscription.unsubscribe();
        this._metaSubscription.unsubscribe();
        this._alarmSpecSubscription.unsubscribe();
        this._warnSpecSubscription.unsubscribe();
        this._spectrumErrorsSubscription.unsubscribe();
        this._dampenScaleSubscription.unsubscribe();
        this._xAxesScaleSubscription.unsubscribe();
    }

    private _updateChanges() {
        this._unsubscribe();
        const yScaleMaxDefault = get(environment, ['chart', 'yScaleMax'], 200);

        this._sensorSubscription = this.selectedSensor.pipe(
            filter((sensor) => !!sensor && !!sensor.sensorId && !!sensor.vseId),
        ).subscribe((sensor) => {
            this.spectrumService.open(sensor);
            this.timestamp = this.spectrumService.timestamp();
            this.yScaleMax = yScaleMaxDefault;
            this.update = true;
        });

        this._dataSubscription = this.selectedSensor.pipe(
            filter((sensor) => !!sensor && !!sensor.sensorId && !!sensor.vseId),
            switchMap(() => this.spectrumService.data())
        ).subscribe((data) => {
            this.data = data;

            this.lineChartInfo = this.chartService.setChartFormData(this.data);
            this.lineChartLabels.length = 0;
            this.lineChartLabels.push(...this.lineChartInfo.chartLabel);
            this.lineChartData = this.lineChartInfo.chartData;

            if (data) {
                this.yScaleMaxChange.emit(Math.max(...data.map((s) => s.maxY)));
            }

            this.changeDetection.detectChanges();

            const maxFrequency = this.lineChartLabels.pop().toFixed();
            if ( maxFrequency !== this.xScaleMax.toFixed() ) {
                this.xScaleMaxChange.emit( +maxFrequency );
            }
        });

        this._metaSubscription = this.selectedSensor.pipe(
            filter((sensor) => !!sensor && !!sensor.sensorId && !!sensor.vseId),
            switchMap(() => this.spectrumService.spectrum())
        ).subscribe((data) => {
            this.spectrumMeta.next(data);
        });

        this._statusSubscription = this.statusService.status.subscribe((data) => {
            this.status = data;
            this.changeDetection.detectChanges();
        });

        this._sensorLabelSubscription = combineLatest(
            this.selectedSensor,
            this.vseService.list,
        ).subscribe(([sensor, list]) => {
            const _vse: Vse = list.find((val) => {
                return sensor ? val.id === sensor.vseId : false;
            } );

            let _sensor: Sensor;
            if (_vse) {
                _sensor = _vse.sensors.find((val) => val.id === sensor.sensorId);
                this.selectedSensorLabel = `${_vse.name} - ${ _sensor.name || 'Unbekannt' }`;
            } else {
                this.selectedSensorLabel = null;
            }
        });

        this._alarmSpecSubscription = this.showAlarmSpec.subscribe((show) => {
            this.spectrumService.showAlarmReference = show;
        });

        this._warnSpecSubscription = this.showWarnSpec.subscribe((show) => {
            this.spectrumService.showWarnReference = show;
        });

        this._spectrumErrorsSubscription = this.spectrumService.errors.subscribe((errors) => {
            const errorMessages = [];

            Object.keys(errors).forEach((key) => {
                if (errors[key]) {
                    errorMessages.push(ERROR_MESSAGES[key]);
                }
            });

            this.chartErrors.next(errorMessages);
        });

        this._dampenScaleSubscription = this.dampenScale.pipe(
            switchMap((x) => {
                if (x) {
                    return this.yScaleMaxChange.pipe(
                        tap((val) => {
                            if (val > this.yScaleMax) {
                                this._setYScaleMax(val);
                            }

                            return val;
                        }),
                        bufferTime(get(environment, ['chart', 'retainingTime'], 5000)),
                        map((values) => {
                            if (isArray(values) && values) {
                                return Math.max(...values);
                            } else {
                                return values;
                            }
                        }),
                    );
                } else {
                    return of(undefined);
                }
            }),
        )
        .subscribe((val) => {
            if (val && this.update) {
                this._setYScaleMax(val);
                this.lineChartOptions.scales.yAxes[0].ticks.suggestedMax = this.yScaleMax;
                this.chart.ngOnChanges(this.lineChartOptions);
            }
        });

        this._xAxesScaleSubscription = this.xScaleMaxChange
        .subscribe((val) => {
                const stepSize = Math.floor( val / 10000 ) * 1000;

                this.xScaleMax = val;
                this.lineChartOptions.scales.xAxes[0].ticks.suggestedMax = this.xScaleMax;
                this.lineChartOptions.scales.xAxes[0].ticks.stepSize = stepSize;
                this.chart.ngOnChanges(this.lineChartOptions);
        });
    }

    private _setYScaleMax(val: number) {
        const yScaleMaxDefault = get(environment, ['chart', 'yScaleMax'], 200);
        this.yScaleMax = isNullOrUndefined(val) || val > yScaleMaxDefault ? val : yScaleMaxDefault;
    }

    trackByVse(index: number, vse: Vse) {
        return vse.id;
    }

    toggleUpdate() {
        this.update = !this.update;

        if (this.update) {
            this._updateChanges();
        } else {
            this._statusSubscription.unsubscribe();
            this.spectrumService.close();
        }
    }

    toggleOrder() {
        this.spectrumService.calculationMethod = this.spectrumService.calculationMethod === 'frequency' ? 'order' : 'frequency';
        this.xAxisLabel = get(XAXIS_LABELS, this.spectrumService.calculationMethod, XAXIS_LABELS.frequencies);
        this.lineChartOptions.scales.xAxes[0].scaleLabel.labelString = this.xAxisLabel;
        this.chart.ngOnChanges(this.lineChartOptions);

        if (this.update) {
            this._updateChanges();
        }
    }

    toggleAutoScale() {
        this.dampenScale.next(this.autoScale);
        this.autoScale = !this.autoScale;
    }

    toggleAlarmSpec() {
        this.showAlarmSpec.next(!this.showAlarmSpec.value);
    }

    toggleWarnSpec() {
        this.showWarnSpec.next(!this.showWarnSpec.value);
    }

    expanded(id: number): boolean {
        return get(this.vseExpansion, id, false);
    }

    setExpansion(id: number, expanded: boolean) {
        this.vseExpansion[id] = expanded;
    }

    toggleExpansion(id: number) {
        this.setExpansion(id, !get(this.vseExpansion, id));
    }


    expandedSensor(id: number): boolean {
        return get(this.sensorExpansion, id, false);
    }
    setSensorExpansion(id: number, expanded: boolean) {
        this.sensorExpansion[id] = expanded;
    }

    toggleExpansionSensor(id: number) {
        this.setSensorExpansion(id, !get(this.sensorExpansion, id));
    }


    setSelectedSensors(id: number, selected: boolean) {
    this.selectedSensors[id] = selected;
    }
    activeLink(id: number) {
        return get(this.selectedSensors, id, false);
    }

    toggleactiveLink(id: number) {
        this.setSelectedSensors(id, !get(this.selectedSensors, id));
    }

}
