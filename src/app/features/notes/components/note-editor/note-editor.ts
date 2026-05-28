import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import {CommonModule} from '@angular/common';

import {
  Subject,
  debounceTime
} from 'rxjs';

import {
  Nota
} from '../../../../core/models/note.model';

import {
  NotasService
} from '../../../../core/services/notes.service';

@Component({
  selector: 'app-note-editor',

  standalone: true,

  imports: [
    FormsModule,
    QuillModule,
    CommonModule,
  ],

  templateUrl: './note-editor.html',

  styleUrl: './note-editor.css'
})
export class NoteEditor
implements OnChanges {

  @Input()
  nota: Nota | null = null;

  @Output()
  contenidoActualizado =
  new EventEmitter<string>();

  content = '';

  private saveSubject =
    new Subject<string>();

  modules = {

    toolbar: [

      [{ font: [] }],

      [{ header: [1, 2, 3, false] }],

      [{ size: [] }],

      ['bold', 'italic', 'underline'],

      [{ align: [] }],

      [{ list: 'ordered' },
       { list: 'bullet' }],

      ['link', 'code-block'],

      [{ color: [] },
       { background: [] }],

      ['clean']
    ]
  };

  constructor(
    private notasService:
      NotasService
  ) {

    /* AUTOSAVE */

    this.saveSubject
      .pipe(
        debounceTime(1000)
      )
      .subscribe(content => {

        if (
          this.nota &&
          this.nota.id
        ) {

          this.notasService
            .actualizarNota(

              this.nota.id,

              {

                contenido: content
              }

            )
            .subscribe({
              next: () => {

                console.log(
                  'Autosave completado'
                );
              }
            });
        }
      });
  }

  ngOnChanges(): void {

    if (this.nota) {

      this.content =
        this.nota.contenido;
    }
  }

  onContentChanged() {

  if (this.nota) {

    this.nota.contenido =
      this.content;

    /* EMITIR */

    this.contenidoActualizado
      .emit(this.content);
  }

  this.saveSubject
    .next(this.content);
}

}