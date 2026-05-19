import { Component } from '@angular/core';
import { NoteEditor } from '../../components/note-editor/note-editor';

@Component({
  selector: 'app-notes-page',
  imports: [NoteEditor],
  templateUrl: './notes-page.html',
  styleUrl: './notes-page.css',
})
export class NotesPage {}
