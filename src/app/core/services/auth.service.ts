import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

// @Injectable decorator makes this service available for dependency injection throughout the app
@Injectable({
    providedIn: 'root' // This means the service is a singleton (exactly one instance) and can be injected anywhere in the app 
})
export class AuthService {
    private readonly TOKEN_KEY = 'auth_token';
    private apiUrl = environment.apiUrl;

    // Signal that other components can subscribe to
    isLoggedIn = signal(this.hasToken());

    constructor(private http: HttpClient, private router: Router) {}

    // --- Login ---
    login(email: string, password: string) {
        return this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, { email, password })
        .pipe(
            tap(response => {
                this.saveToken(response.token);
                this.isLoggedIn.set(true);
            })
        );
    }

    // --- Logout ---
    logout() {
        localStorage.removeItem(this.TOKEN_KEY);
        this.isLoggedIn.set(false);
        this.router.navigate(['/']);
    }

    // --- Token Management ---
    saveToken(token: string) {
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    hasToken(): boolean {
        return !!this.getToken();
    }

    // --- Role Check (for admin -> the method the guard calls) ---
    isAdmin(): boolean {
        const token = this.getToken();
        if (!token) return false;

        try {
            const payload = this.decodeToken(token);
            // Spring Boot JWT will include a 'roles' or 'role' claim
            return payload?.role === 'ADMIN' || payload?.roles?.includes('ADMIN');
        } catch {
            return false;
        }
    }

    // --- Decode the JWT payload (middle section) ---
    private decodeToken(token: string): any {
        // JWTs have 3 parts: header.payload.signature
        const payload = token.split('.')[1]; // Get the payload part
        const decoded = atob(payload); // Decode the middle part (payload) from Base64
        return JSON.parse(decoded); // Parse the JSON
    }
}