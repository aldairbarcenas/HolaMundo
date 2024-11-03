import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CuestionarioService } from '../../../../../services/cuestionario.service';

@Component({
  selector: 'app-pasospasos-uno',
  templateUrl: './pasospasos-uno.component.html',
  styleUrl: './pasospasos-uno.component.css'
})
export class PasospasosUnoComponent {
  datosCuestionario: FormGroup;

  constructor(private fb: FormBuilder,
    private route: Router,
    private cuestionarioService: CuestionarioService
  ) {

    this.datosCuestionario = this.fb.group({
      titulo:["",Validators.required],
      descripcion: ["",Validators.required]
    });

}

  pasoUno():void{
    this.cuestionarioService.tituloCuestionario=this.datosCuestionario.value.titulo;
    this.cuestionarioService.descripcionCuestionario=this.datosCuestionario.value.descripcion;
    this.route.navigate(["/dashboard/nuevoCuestionario/pasoDos"]);
  }

}
