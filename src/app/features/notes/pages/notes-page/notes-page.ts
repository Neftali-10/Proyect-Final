import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import {
  Nota
} from '../../../../core/models/note.model';

import { NoteEditor }
from '../../components/note-editor/note-editor';

@Component({
  selector: 'app-notes-page',

  standalone: true,

  imports: [
    NoteEditor
  ],

  templateUrl: './notes-page.html',

  styleUrl: './notes-page.css'
})
export class NotesPage {

  @Input()
  notaSeleccionada:
    Nota | null = null;

  @Output()
  contenidoActualizado =
  new EventEmitter<string>();

  actualizarContenido(
    contenido: string
  ) {

    this.contenidoActualizado
      .emit(contenido);
  }

}