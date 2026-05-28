import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { Toolbar } from '../toolbar/toolbar';
import { NotesPage } from '../../features/notes/pages/notes-page/notes-page';
import { Nota } from '../../core/models/note.model';
import { NotasService } from '../../core/services/notes.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main-layout',

  standalone: true,

  imports: [
    CommonModule,
    Sidebar,
    Toolbar,
    NotesPage,
    
  ],

  templateUrl: './main-layout.html',

  styleUrl: './main-layout.css'
})
export class MainLayout
implements OnInit {

  sidebarCollapsed = false;

  mensajeGuardado = false;

  loading = false;

  notas: Nota[] = [];

  notaSeleccionada:
    Nota | null = null;

  constructor(
    private notasService:
      NotasService,

    private cdr:
    ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.cargarNotas();
  }

  cargarNotas() {

  this.loading = true;

  this.notasService
    .getNotas()
    .subscribe({

      next: (notas) => {

        /* NUEVO ARRAY */

        this.notas = [...notas];

        this.loading = false;

        /* FORZAR RENDER */

        this.cdr.detectChanges();
      },

      error: () => {

        this.loading = false;
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

        /* NUEVO ARRAY */

        this.notas = [
          notaCreada,
          ...this.notas
        ];

        /* SELECCIONAR */

        this.notaSeleccionada = {
          ...notaCreada
        };
        /* FORZAR RENDER */
        this.cdr.detectChanges();
      }
    });
}

  eliminarNota(nota: Nota) {

    if (!nota.id) return;

    Swal.fire({

      title: '¿Eliminar nota?',

      text:
        'Esta acción no se puede deshacer.',

      icon: 'warning',

      showCancelButton: true,

      confirmButtonText: 'Eliminar',

      cancelButtonText: 'Cancelar',

      confirmButtonColor: '#ef4444',

      cancelButtonColor: '#64748b',

      background: '#ffffff',

      color: '#111827'

    }).then((result) => {

      if (result.isConfirmed) {

        this.notasService
          .eliminarNota(nota.id!)
          .subscribe({

            next: () => {

              this.notas =
                this.notas.filter(
                  n => n.id !== nota.id
                );

                this.notas = [
                  ...this.notas
                ];

                this.cdr.detectChanges();

              if (
                this.notaSeleccionada?.id
                === nota.id
              ) {

                this.notaSeleccionada =
                  null;
              }

              Swal.fire({

                title: 'Eliminada',

                text:
                  'La nota fue eliminada.',

                icon: 'success',

                timer: 1200,

                showConfirmButton: false
              });
            }
          });
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
    .subscribe({

      next: () => {

        this.mensajeGuardado =
          true;

        setTimeout(() => {

          this.mensajeGuardado =
            false;

        }, 1500);
      }
    });
}

    eliminarNotaActual() {

    if (!this.notaSeleccionada)
      return;

    this.eliminarNota(
      this.notaSeleccionada
    );
  }

  formatFecha(
  fecha?: string
): string {

  if (!fecha) return '-';

  const d = new Date(fecha);

  return d.toLocaleDateString(
    'es-GT',
    {

      day: '2-digit',

      month: 'short',

      year: 'numeric'
    }
    );
  }

  sincronizarContenido(
  contenido: string
) {

  if (!this.notaSeleccionada)
    return;

  this.notaSeleccionada = {

    ...this.notaSeleccionada,

    contenido
  };

  this.notas = this.notas.map(n =>

    n.id === this.notaSeleccionada?.id

      ? {

          ...n,

          contenido
        }

      : n
  );

  this.cdr.detectChanges();
}

}