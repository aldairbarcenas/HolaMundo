import { Respuesta } from "./respuesta";

export class Pregunta{
  descripcion: string;
  listRespuesta: Respuesta[];
  hide?:boolean;

  constructor(desc:string, respuesta:Respuesta[]){
    this.descripcion = desc;
    this.listRespuesta = respuesta;
    this.hide = true;
  }
}
