import { Component } from '@angular/core';
import { RespuestacuestionarioService } from '../../../../services/respuestacuestionario.service';
import { CuestionarioService } from '../../../../services/cuestionario.service';
import { Router } from '@angular/router';
import { Pregunta } from '../../../../models/pregunta';
import { Respuesta } from './../../../../models/respuesta';
import { RepuestaCuestionarioDetalle } from './../../../../models/respuestaCuestionarioDetalle';
import { respuestaCuestionario } from '../../../../models/respuestaCuestionario';
import { error } from 'console';


@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrl: './pregunta.component.css'
})
export class PreguntaComponent {
  idCuestionario: number | null = null; // Permitir que idCuestionario sea nulo
  listPreguntas: Pregunta[] = [];
  loading=false;
  rtaConfirmada=false;
  opcionSeleccionada: any;
  index=0;
  idRespuestaSeleccionada: number | null = null;

  listRespuestaDetalle: RepuestaCuestionarioDetalle[]=[];

  constructor(private respuestaCuestionarioService: RespuestacuestionarioService,
    private cuestionarioService: CuestionarioService,
    private router: Router,
  ) { }

  ngOnInit(){
    this.idCuestionario = this.respuestaCuestionarioService.idCuestionario;
    if(this.idCuestionario==null){
      this.router.navigate(["/inicio"]);
    }
    this.getCuestionario();
    this.respuestaCuestionarioService.respuestas=[];
  }

  getCuestionario(){
    this.loading = true;

    if (this.idCuestionario === null) {
      this.router.navigate(['/inicio']);
    } else {

    this.cuestionarioService.getCuestionario(this.idCuestionario).subscribe(data=>{
      this.loading=false;

      this.listPreguntas = data.listPreguntas;

      this.respuestaCuestionarioService.cuestionario=data;
    })
  }
}

  obtenerPregunta():string{
    return this.listPreguntas[this.index].descripcion;
  }

  getIndex():number{
    return this.index;
  }

  respuestaSeleccionada(respuesta: Respuesta | undefined, idRespuesta: number | undefined): void {
    if (respuesta) {
      this.opcionSeleccionada = respuesta;
      this.rtaConfirmada = true;
      this.idRespuestaSeleccionada = idRespuesta !== undefined ? idRespuesta : 0; // Asigna 0 si idRespuesta es undefined
    }
  }

  AddClassOption(respuesta: any): string {
    if(respuesta===this.opcionSeleccionada){
      return "active text-light"
    }
    return "";
  }

  siguiente(){
    if (this.idRespuestaSeleccionada !== null) {
      this.respuestaCuestionarioService.respuestas.push(this.idRespuestaSeleccionada);
    } else {
      console.error("No se ha seleccionado una respuesta válida.");
      return; // O maneja el error como desees
    }

    //creamos un objeto RespuestaDetalle
    const detalleRespuesta: RepuestaCuestionarioDetalle = {
      respuestaId: this.idRespuestaSeleccionada,
    }

    //agregamos objeto al array
    this.listRespuestaDetalle.push(detalleRespuesta);

    this.rtaConfirmada=false;
    this.index++;
    this.idRespuestaSeleccionada=null;

    if(this.index===this.listPreguntas.length){
      //this.router.navigate(["inicio/respuestaCuestionario"]);
      this.guardarRespuestaCuestionario();
    }

  }

  guardarRespuestaCuestionario(): void {
    const rtaCuestionario: respuestaCuestionario = {
      id: 0, // Asigna un valor por defecto o maneja esto según tus necesidades
      fecha: this.respuestaCuestionarioService.fecha, // Asegúrate de que este valor esté disponible en el servicio
      activo: 1, // O asigna el valor que necesites para "activo"
      cuestionarioId: this.respuestaCuestionarioService.idCuestionario,
      nombreParticipante: this.respuestaCuestionarioService.nombreParticipante,
      listRtaCuestionarioDetalle: this.listRespuestaDetalle // Asumiendo que ya tienes esta lista
    };

    this.loading=true;

    this.respuestaCuestionarioService.guardarRespuestaCuestionario(rtaCuestionario).subscribe(data=>{
      this.router.navigate(["inicio/respuestaCuestionario"]);
      this.loading=false;
    },error=>{
      this.loading=false;
      console.log(error);
    })

  }

}
