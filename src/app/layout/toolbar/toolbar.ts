import {
  Component,
  Output,
  EventEmitter,
  Input
} from '@angular/core';

import {
  FormsModule
} from '@angular/forms';

import {
  ThemeService
} from '../../core/services/theme.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-toolbar',

  standalone: true,

  imports: [
    FormsModule,CommonModule
  ],

  templateUrl: './toolbar.html',

  styleUrl: './toolbar.css'
})
export class Toolbar {

  @Input()
  mensajeGuardado = false;

  @Input()
  titulo = '';

  @Output()
  tituloChange =
    new EventEmitter<string>();

  @Output()
  guardar =
    new EventEmitter<void>();

  @Output()
  eliminar =
    new EventEmitter<void>();

  @Output()
  toggleSidebarEvent =
    new EventEmitter<void>();

  @Input()
  fechaCreacion = '';

  @Input()
  fechaActualizacion = '';

  constructor(
    public themeService:
      ThemeService
  ) {}

  toggleTheme() {

    this.themeService
      .toggleTheme();
  }

  toggleSidebar() {

    this.toggleSidebarEvent
      .emit();
  }

  onTituloChange() {

    this.tituloChange
      .emit(this.titulo);
  }

  guardarNota() {

    this.guardar.emit();
  }

  eliminarNota() {

    this.eliminar.emit();
  }

}