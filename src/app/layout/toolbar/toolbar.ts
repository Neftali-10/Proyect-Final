import {
  Component,
  Output,
  EventEmitter
} from '@angular/core';

import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-toolbar',

  standalone: true,

  templateUrl: './toolbar.html',

  styleUrl: './toolbar.css'
})
export class Toolbar {

  @Output()
  toggleSidebarEvent =
    new EventEmitter<void>();

  constructor(
    public themeService: ThemeService
  ) {}

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  toggleSidebar() {
    this.toggleSidebarEvent.emit();
  }

}