import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-note-editor',

  standalone: true,

  imports: [
    FormsModule,
    QuillModule
  ],

  templateUrl: './note-editor.html',

  styleUrl: './note-editor.css'
})
export class NoteEditor {

  content = '';

  modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, false] }],

      [{ size: [] }],

      ['bold', 'italic', 'underline'],

      [{ align: [] }],

      [{ list: 'ordered' }, { list: 'bullet' }],

      ['link', 'code-block'],

      [{ color: [] }, { background: [] }],

      ['clean']
    ]
  };

}