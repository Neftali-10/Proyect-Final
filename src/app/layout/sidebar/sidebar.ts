import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
} from '@angular/core';

import {
  FormsModule
} from '@angular/forms';

import {
  CommonModule
} from '@angular/common';

import {
  Nota
} from '../../core/models/note.model';

@Component({
  selector: 'app-sidebar',

  standalone: true,

  imports: [
    CommonModule,FormsModule
  ],

  templateUrl: './sidebar.html',

  styleUrl: './sidebar.css'
})
export class Sidebar
implements OnChanges {

  @Input()
  notas: Nota[] = [];

  @Input()
  notaSeleccionada:
    Nota | null = null;

  @Input()
  collapsed = false;

  @Output()
  seleccionar =
    new EventEmitter<Nota>();

  @Output()
  nueva =
    new EventEmitter<void>();

  @Output()
  eliminar =
    new EventEmitter<Nota>();

  notasFiltradas: Nota[] = [];

  ngOnChanges(): void {

    this.filtrarNotas();
  }

  seleccionarNota(nota: Nota) {

    this.seleccionar.emit(nota);
  }

  crearNota() {

    this.nueva.emit();
  }

  eliminarNota(
    event: Event,
    nota: Nota
  ) {

    event.stopPropagation();

    this.eliminar.emit(nota);
  }

  limpiarHtml(html: string): string {

    const div =
      document.createElement('div');

    div.innerHTML = html;

    return div.textContent
      || div.innerText
      || '';
  }
  searchTerm = '';

  filtrarNotas() {

  const term =
    this.searchTerm
      .toLowerCase()
      .trim();

  if (!term) {

    this.notasFiltradas =
      [...this.notas];

    return;
  }

  this.notasFiltradas =
    this.notas.filter(nota =>

      nota.titulo
        .toLowerCase()
        .includes(term)

      ||

      this.limpiarHtml(
        nota.contenido
      )
      .toLowerCase()
      .includes(term)
    );
}
  

}