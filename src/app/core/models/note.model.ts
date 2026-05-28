export interface Nota {
  id: string;
  titulo: string;
  contenido: string;
  fechaCreacion: string;
  fechaActualizacion: string;
}

export interface NotaFirebase {
  titulo: string;
  contenido: string;
  fechaCreacion: string;
  fechaActualizacion: string;
}
