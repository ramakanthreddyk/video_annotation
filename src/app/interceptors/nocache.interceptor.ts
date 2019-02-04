import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class NoCacheInterceptor implements HttpInterceptor {
    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const clonedReq = req.clone({
            setHeaders: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Expires': '0',
                'Pragma': 'no-cache',
            }
        });
        return next.handle(clonedReq);
    }
}
