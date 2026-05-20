import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface AuthResponse {
    token: string;
    username: string;
}

// @Injectable decorator makes this service available for dependency injection throughout the app
@Injectable({
    providedIn: 'root' // This means the service is a singleton (exactly one instance) and can be injected anywhere in the app 
})
export class AuthService {
    private readonly TOKEN_KEY = 'token';
    private readonly USERNAME_KEY = 'username';
    private apiUrl = environment.apiUrl;

    // Signal that other components can subscribe to
    isLoggedIn = signal(this.hasToken());
    currentUser = signal<string | null>(this.getUsername());

    constructor(private http: HttpClient, private router: Router) {}

    // --- Register ---
    register(username: string, email: string, password: string) {
        return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, { username, email, password})
            .pipe(
                tap(response => this.handleAuthSuccess(response))
            );
    }

    // --- Login ---
    login(username: string, password: string) {
        return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, { username, password })
            .pipe(
                tap(response => this.handleAuthSuccess(response))
            );
    }

    // --- Logout ---
    logout() {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.USERNAME_KEY);
        this.isLoggedIn.set(false);
        this.currentUser.set(null);
        this.router.navigate(['/login']);
    }

    // --- Token Helpers ---
    // saveToken(token: string) {
    //     localStorage.setItem(this.TOKEN_KEY, token);
    // }

    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    getUsername(): string | null {
        return localStorage.getItem(this.USERNAME_KEY);
    }

    hasToken(): boolean {
        return !!this.getToken();
    }

    // --- Admin Role Check (for admin -> the method the guard calls) ---
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

    // --- Private Helpers ---
    private handleAuthSuccess(response: AuthResponse) {
        localStorage.setItem(this.TOKEN_KEY, response.token);
        localStorage.setItem(this.USERNAME_KEY, response.username);
        this.isLoggedIn.set(true);
    }
    
    // --- Decode the JWT payload (middle section) ---
    private decodeToken(token: string): any {
        // JWTs have 3 parts: header.payload.signature
        const payload = token.split('.')[1]; // Get the payload part
        const decoded = atob(payload); // Decode the middle part (payload) from Base64
        return JSON.parse(decoded); // Parse the JSON
    }
}