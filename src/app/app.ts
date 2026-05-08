// import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { Navbar } from "./shared/components/navbar/navbar";

// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet, Navbar],
//   templateUrl: './app.html',
//   styleUrl: './styles/global.scss'
// })
// export class App {
//   protected readonly title = signal('study-group-app');
// }

import { Component, signal, inject, effect, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./shared/components/navbar/navbar";
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './styles/global.scss'
})
export class App {
  protected readonly title = signal('study-group-app');
  theme = inject(ThemeService);
  renderer = inject(Renderer2);

  constructor() {
    // This effect runs every time the theme signal changes
    effect(() => {
      if (this.theme.isLight()) {
        this.renderer.addClass(document.body, 'light-mode');
      } else {
        this.renderer.removeClass(document.body, 'light-mode');
      }
    });
  }
}