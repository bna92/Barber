export interface Horario {
  disponible: boolean;
  cliente: string;
}

export interface HorariosDia {
  [hora: string]: Horario;
}

export interface HorariosSemana {
  [dia: string]: HorariosDia;
}