import { Component, HostListener, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  protected readonly title = signal('Study Group');

  // Menu toggle/hamburger icon state
  menuOpen = false;
  isScrolled = false;
  isLight = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  theme = inject(ThemeService);
  toggleTheme() { this.theme.toggle();}

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
