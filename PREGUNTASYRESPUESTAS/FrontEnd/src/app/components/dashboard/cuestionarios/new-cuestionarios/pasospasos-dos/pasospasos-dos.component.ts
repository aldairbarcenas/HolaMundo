import { Component } from '@angular/core';
import { Cuestionario } from './../../../../../models/cuestionario';
import { CuestionarioService } from '../../../../../services/cuestionario.service';
import { Toast, ToastrService } from 'ngx-toastr';

import { Pregunta } from '../../../../../models/pregunta';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pasospasos-dos',
  templateUrl: './pasospasos-dos.component.html',
  styleUrl: './pasospasos-dos.component.css'
})
export class PasospasosDosComponent {
  tituloCuestionario: string="";
  descripcionCuestionario: string="";
  listPreguntas:Pregunta[]=[];
  loading = false;

  constructor(private cuestionarioService: CuestionarioService,
              private toastr: ToastrService,
              private router: Router,
  )
  {


  }

  ngOnInit():void{
    this.tituloCuestionario=this.cuestionarioService.tituloCuestionario;
    this.descripcionCuestionario=this.cuestionarioService.descripcionCuestionario;

  }

  guardarPregunta(pregunta: Pregunta): void{
    this.listPreguntas.push(pregunta);
    //console.log(this.listPreguntas);
  }

  eliminarPregunta(index: number){
    this.listPreguntas.splice(index, 1);
  }

  guardarCuestionario() {
    const cuestionario: Cuestionario = {
      nombre: this.tituloCuestionario,
      descripcion: this.descripcionCuestionario,
      listPreguntas: this.listPreguntas
    };

    console.log(cuestionario);
    this.loading = true;

    this.cuestionarioService.guardarCuestionario(cuestionario).subscribe({
      next: (data) => {
        this.toastr.success("El cuestionario fue registrado con éxito", "CUESTIONARIO REGISTRADO");
        this.router.navigate(["/dashboard"]);
        this.loading = false;
      },
      error: (error) => {
        //console.log(error);
        this.toastr.error("Oops... ocurrió un error", "ERROR");
        this.router.navigate(["/dashboard"]);
        this.loading = false;
      }
    });
  }



}
