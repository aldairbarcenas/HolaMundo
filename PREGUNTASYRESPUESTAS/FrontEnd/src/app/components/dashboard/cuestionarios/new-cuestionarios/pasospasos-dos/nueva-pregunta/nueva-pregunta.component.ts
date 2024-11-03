import { Component, OnInit, output, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Pregunta } from '../../../../../../models/pregunta';
import { ToastrService } from 'ngx-toastr';
import { Respuesta } from '../../../../../../models/respuesta';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nueva-pregunta',
  templateUrl: './nueva-pregunta.component.html',
  styleUrl: './nueva-pregunta.component.css'
})
export class NuevaPreguntaComponent {
  nuevaPregunta: FormGroup;
  pregunta: Pregunta;
  rtaCorrecta=0;
  @Output() enviarPregunta = new EventEmitter<Pregunta>(); //pasar de hijo a padre

  constructor(private fb: FormBuilder,
              private toastr: ToastrService,
  ) {

    this.pregunta = new Pregunta('', []);

    this.nuevaPregunta=this.fb.group({
      titulo:["",Validators.required],
      respuestas: this.fb.array([])
    })
  }


  //devuelve Formarray de respuestas
  get getRespuestas(): FormArray {
    return this.nuevaPregunta.get('respuestas') as FormArray;
  }

  //agregar respuesta al array
  agregarRespuesta(){
    this.getRespuestas.push(this.fb.group({
      descripcion:["",Validators.required],
      esCorrecta:0
    }));
  }

  agregarRespuestarPorDefecto(){
    this.agregarRespuesta();
    this.agregarRespuesta();
  }

  ngOnInit(){
    this.agregarRespuestarPorDefecto();
  }

  eliminarRespuesta(index: number){
    if(this.getRespuestas.length == 2){
      this.toastr.error("Como minimo la pregunta debe contener 2 respuestas","ERROR!!!");
    }else{
      this.getRespuestas.removeAt(index);
      this.toastr.info("Respues eliminada");
    }
  }

  setRespuestaValida(index: number){
    this.rtaCorrecta = index;
  }

  agregarPregunta(){
    //obtenemos el titulo de la pregunta
    const descripcionPregunta= this.nuevaPregunta.get('titulo')?.value;

    //obtenemos el array de respuesta

    const arrayRespuestas= this.nuevaPregunta.get('respuestas')?.value;

    //crearmos un arroz de respuestas de tipo respuesta

    const arrayRta: Respuesta[] = [];

    arrayRespuestas.forEach((element: { descripcion: string; esCorrecta: boolean }, index: number) => {
      const respuesta: Respuesta = new Respuesta(element.descripcion, false);

      // Verifica si el índice coincide con la respuesta correcta
      if (index === this.rtaCorrecta) {
          respuesta.esCorrecta = true;
      }

      arrayRta.push(respuesta);
  });

    const pregunta:Pregunta=new Pregunta(descripcionPregunta, arrayRta);

    this.enviarPregunta.emit(pregunta);
    this.reset() ;
  }

  reset(){
    this.rtaCorrecta=0;
    this.nuevaPregunta.reset();
    this.getRespuestas.clear();
    this.agregarRespuestarPorDefecto();
  }

}
