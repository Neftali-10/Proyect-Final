import {
  Component,
  OnInit
} from '@angular/core';

import { Sidebar }
from '../sidebar/sidebar';

import { Toolbar }
from '../toolbar/toolbar';

import { NotesPage }
from '../../features/notes/pages/notes-page/notes-page';

import { Nota }
from '../../core/models/note.model';

import { NotasService }
from '../../core/services/notes.service';

import { CommonModule }
from '@angular/common';

@Component({
  selector: 'app-main-layout',

  standalone: true,

  imports: [
    CommonModule,
    Sidebar,
    Toolbar,
    NotesPage
  ],

  templateUrl: './main-layout.html',

  styleUrl: './main-layout.css'
})
export class MainLayout
implements OnInit {

  sidebarCollapsed = false;

  notas: Nota[] = [];

  notaSeleccionada:
    Nota | null = null;

  constructor(
    private notasService:
      NotasService
  ) {}

  ngOnInit(): void {

    this.cargarNotas();
  }

  cargarNotas() {

    this.notasService
      .getNotas()
      .subscribe({

        next: (notas) => {

          this.notas = notas;
        }
      });
  }

  toggleSidebar() {

    this.sidebarCollapsed =
      !this.sidebarCollapsed;
  }

  seleccionarNota(nota: Nota) {

    this.notaSeleccionada = nota;
  }

  crearNota() {

    this.notasService
      .crearNota({

        titulo: 'Nueva nota',

        contenido: '',

        fechaCreacion: '',

        fechaActualizacion: ''

      })
      .subscribe({

        next: (notaCreada) => {

          this.notas = [
            notaCreada,
            ...this.notas
          ];

          this.notaSeleccionada =
            notaCreada;
        }
      });
  }

  eliminarNota(nota: Nota) {

    if (!nota.id) return;

    this.notasService
      .eliminarNota(nota.id)
      .subscribe({

        next: () => {

          this.notas =
            this.notas.filter(
              n => n.id !== nota.id
            );
        }
      });
  }
  
    actualizarTitulo(
      titulo: string
    ) {

      if (
        !this.notaSeleccionada ||
        !this.notaSeleccionada.id
      ) return;

      /* ACTUALIZAR LOCAL */

      this.notaSeleccionada.titulo =
        titulo;

      /* ACTUALIZAR LISTA */

      this.notas = this.notas.map(n =>

        n.id === this.notaSeleccionada?.id

          ? {
              ...n,
              titulo
            }

          : n
      );

      /* AUTOSAVE */

      this.notasService
        .actualizarNota(

          this.notaSeleccionada.id,

          {
            titulo
          }

        )
        .subscribe();
    }

  guardarNota() {

  if (
    !this.notaSeleccionada ||
    !this.notaSeleccionada.id
  ) return;

  this.notasService
    .actualizarNota(

      this.notaSeleccionada.id,

      {

        titulo:
          this.notaSeleccionada
            .titulo,

        contenido:
          this.notaSeleccionada
            .contenido
      }

    )
    .subscribe();
  }

    eliminarNotaActual() {

    if (!this.notaSeleccionada)
      return;

    this.eliminarNota(
      this.notaSeleccionada
    );
  }

}