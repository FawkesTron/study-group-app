import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { inject } from "@angular/core";
import { catchError, throwError } from "rxjs";


export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    const auth = inject(AuthService);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                // the token is there but invalid or expired
                auth.logout();
                router.navigate(['/login']);
            }

            if (error.status === 403) {
                // the request is made without a token to a protected endpoint
                router.navigate(['/login']);
            }

            return throwError(() => error);
        })
    );
}