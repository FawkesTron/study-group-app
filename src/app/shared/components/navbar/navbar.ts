import { Component, HostListener, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  auth = inject(AuthService);
  theme = inject(ThemeService)

  protected readonly title = signal('Study Group');
  // Menu toggle/hamburger icon state
  menuOpen = false;
  isScrolled = false;
  isLight = false;

  toggleMenu() { this.menuOpen = !this.menuOpen; }
  toggleTheme() { this.theme.toggle(); } 

  logout() { this.auth.logout(); }

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 20;
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth > 768) {
      this.menuOpen = false;
    }
  }
}
