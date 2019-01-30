import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Directive, ElementRef, HostListener, Injector, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { SpectrumMetaOverlayComponent } from './spectrum-meta-overlay.component';
import { SPECTRUM_META_OVERLAY_DATA } from './tokens';

@Directive({
    selector: '[appSpectrumOverlay]',
})
export class SpectrumMetaOverlayDirective {
    private _overlayRef: OverlayRef;

    @Input('appSpectrumOverlay') meta: Observable<any>;

    @HostListener('mouseenter')
    mouseenter() {
        this.open();
    }

    @HostListener('mouseleave')
    mouseleave() {
        this.close();
    }

    constructor (
        private el: ElementRef,
        private overlay: Overlay,
        private injector: Injector
    ) { }

    private _overlayConfig(): OverlayConfig {
        const positionStrategy = this.overlay.position().connectedTo(
            this.el,
            { originX: 'end', originY: 'bottom' },
            { overlayX: 'start', overlayY: 'center' }
        );

        const overlayConfig = new OverlayConfig({
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy
        });

        return overlayConfig;
    }

    private _createInjector(): PortalInjector {
        const injectionTokens = new WeakMap();
/*         injectionTokens.set(SPECTRUM_META_OVERLAY_DATA, this.meta); */

        return new PortalInjector(this.injector, injectionTokens);
    }

    open() {
        this._overlayRef = this.overlay.create(this._overlayConfig());
        const injector = this._createInjector();

        const spectrumMetaPortal = new ComponentPortal(SpectrumMetaOverlayComponent, null, injector);
        this._overlayRef.attach(spectrumMetaPortal);
    }

    close() {
        this._overlayRef.dispose();
    }
}
