import {
  Component,
  Input
} from '@angular/core';

import { NotesList } from '../../features/notes/components/notes-list/notes-list';

@Component({
  selector: 'app-sidebar',

  standalone: true,

  imports: [
    NotesList
  ],

  templateUrl: './sidebar.html',

  styleUrl: './sidebar.css'
})
export class Sidebar {

  @Input()
  collapsed = false;

}