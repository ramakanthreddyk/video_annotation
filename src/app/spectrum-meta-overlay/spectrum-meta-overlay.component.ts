import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SpectrumMeta } from '../spectrum/spectrum.model';
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
        @Inject(SPECTRUM_META_OVERLAY_DATA) private source: Observable<SpectrumMeta>
    ) { }

    ngOnInit() {
        this._spectrumSubscription = this.source.subscribe((data) => {
            this.data = data;
        });
    }

    ngOnDestroy() {
        this._spectrumSubscription.unsubscribe();
    }
}
