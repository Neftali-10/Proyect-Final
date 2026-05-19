import { Component } from '@angular/core';

import { Sidebar } from '../sidebar/sidebar';

import { Toolbar } from '../toolbar/toolbar';

import { NotesPage } from '../../features/notes/pages/notes-page/notes-page';

@Component({
  selector: 'app-main-layout',

  standalone: true,

  imports: [
    Sidebar,
    Toolbar,
    NotesPage
  ],

  templateUrl: './main-layout.html',

  styleUrl: './main-layout.css'
})
export class MainLayout {

  sidebarCollapsed = false;

  toggleSidebar() {
    this.sidebarCollapsed =
      !this.sidebarCollapsed;
  }

}