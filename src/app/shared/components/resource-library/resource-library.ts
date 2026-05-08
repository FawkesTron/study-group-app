import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resource-library',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resource-library.html',
  styleUrl: './resource-library.scss',
})
export class ResourceLibrary {
  theme = inject(ThemeService);
}
