import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-threat-feed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './threat-feed.html',
  styleUrl: './threat-feed.scss',
})
export class ThreatFeed {
  theme = inject(ThemeService);
}

