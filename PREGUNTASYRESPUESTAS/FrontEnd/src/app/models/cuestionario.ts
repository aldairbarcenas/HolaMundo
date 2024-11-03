import { Pregunta } from "./pregunta";
import { Usuario } from "./usuario";

export class Cuestionario{
  id?: number;
  nombre: string;
  descripcion: string;
  fechaCreacion?: Date;
  listPreguntas: Pregunta[];
  usuario?: Usuario;

  constructor(nombre: string, description: string,fechaCreacion: Date,listPreguntas: Pregunta[], usuario: Usuario ){
    this.nombre = nombre;
    this.descripcion = description;
    this.fechaCreacion = fechaCreacion;
    this.listPreguntas =listPreguntas;
    this.usuario = usuario;
  }
}
