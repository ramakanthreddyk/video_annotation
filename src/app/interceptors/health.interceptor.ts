import { Injectable, EventEmitter } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, empty, timer } from 'rxjs';
import { tap, timeout, catchError, debounceTime, distinctUntilChanged, retryWhen, delayWhen, auditTime,
         throttleTime, take, delay } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { MatSnackBarRef, SimpleSnackBar, MatSnackBar } from '@angular/material';
import { get } from 'lodash';

@Injectable()
export class HealthInterceptor implements HttpInterceptor {
    readonly connectionInterupt = new EventEmitter();
    readonly connecting = new EventEmitter();

    private _snackbarRef: MatSnackBarRef<SimpleSnackBar>;

    constructor(
        protected snackBar: MatSnackBar,
    ) {
        this.connecting.pipe(
            distinctUntilChanged(),
            debounceTime(200),
        ).subscribe(() => {
            if (!this._snackbarRef) {
                this._snackbarRef = snackBar.open('Verbindung zum Server wird hergestellt...', null, {
                    duration: 0,
                    panelClass: 'connection',
                });
            }
        });

        this.connectionInterupt.subscribe(() => {
            if (!this._snackbarRef) {
                this._snackbarRef = snackBar.open('Verbindung zum Server wurde unterbrochen!', null, {
                    duration: 0,
                    panelClass: 'connection-error',
                });
            }
        });
    }

    private _dismissSnackbar() {
        if (this._snackbarRef) {
            this._snackbarRef.dismiss();
            this._snackbarRef = null;
        }
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const _timeout = get(environment, ['connectionTimeout'], 5000);

        return next.handle(req).pipe(
            tap(() => {
                this.connecting.emit();
            }, (err) => {
                if ([0, 503, 504].includes(err.status)) {
                    this.connectionInterupt.emit();
                } else {
                    this._dismissSnackbar();
                }
            }, () => {
                this._dismissSnackbar();
            }),
            retryWhen(err =>
                err.pipe(
                    take(1),
                    delay(_timeout),
                )
            ),
        );
    }
}
