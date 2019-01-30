import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SPECTRUM_META_OVERLAY_DATA } from './tokens';

@Component({
    selector: 'app-spectrum-meta-overlay',
    templateUrl: './spectrum-meta-overlay.component.html',
    styleUrls: ['./spectrum-meta-overlay.component.scss']
})
export class SpectrumMetaOverlayComponent implements OnInit, OnDestroy {
    private _spectrumSubscription = Subscription.EMPTY;
    data: any;

    constructor(
   /*      @Inject(SPECTRUM_META_OVERLAY_DATA) private source: Observable<any>,
        private spectrumService */
    ) { }

    ngOnInit() {
/*         const data = this.spectrumService.spectrum(this.source[0], this.source[1], this.source[2], 'card');
        this._spectrumSubscription = data.subscribe((sensordata) => {
            this.data = sensordata;
        }); */
    }

    ngOnDestroy() {
/*         this._spectrumSubscription.unsubscribe();
        this.spectrumService._dynamicSubscriptions[this.source[2] + this.source[1] + 'card'].unsubscribe(); */
    }
}
