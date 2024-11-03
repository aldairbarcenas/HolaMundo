import { Component } from '@angular/core';
import { Cuestionario } from '../../../../models/cuestionario';
import { RespuestacuestionarioService } from '../../../../services/respuestacuestionario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-respuestacuestionario',
  templateUrl: './respuestacuestionario.component.html',
  styleUrl: './respuestacuestionario.component.css'
})
export class RespuestacuestionarioComponent {
  cuestionario!: Cuestionario;
  respuestaUsuario:number[]=[];

  constructor(private respuestaCuestionarioService: RespuestacuestionarioService,
    private route: Router
  ) {

  }

  ngOnInit(): void {
    if(this.respuestaCuestionarioService.idCuestionario==null){
      this.route.navigate(["/inicio"]);
    }
    else{
      this.cuestionario=this.respuestaCuestionarioService.cuestionario!;
      this.respuestaUsuario=this.respuestaCuestionarioService.respuestas;
      console.log(this.cuestionario);
      console.log(this.respuestaUsuario);
    }
  }

}
