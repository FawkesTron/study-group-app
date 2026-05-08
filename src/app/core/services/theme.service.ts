import { Injectable, signal } from "@angular/core";


@Injectable({ providedIn: 'root' })
export class ThemeService {
    isLight = signal(false);
    toggle() { this.isLight.update(v => !v); }
}