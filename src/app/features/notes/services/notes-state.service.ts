import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Nota } from '../../../core/models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NotasStateService {

  private notaSeleccionadaSubject =
    new BehaviorSubject<Nota | null>(null);

  notaSeleccionada$ =
    this.notaSeleccionadaSubject.asObservable();

  seleccionarNota(nota: Nota) {

    this.notaSeleccionadaSubject.next(nota);
  }

}