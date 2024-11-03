import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RespuestacuestionarioService } from './../../../../../services/respuestacuestionario.service';
import { Cuestionario } from '../../../../../models/cuestionario';
import { RepuestaCuestionarioDetalle } from './../../../../../models/respuestaCuestionarioDetalle';


@Component({
  selector: 'app-detallerespuesta',
  templateUrl: './detallerespuesta.component.html',
  styleUrl: './detallerespuesta.component.css'
})
export class DetallerespuestaComponent {
  idRespuesta: number;
  loading=false;
  cuestionario?: Cuestionario;
  respuestas: RepuestaCuestionarioDetalle[]=[];

  constructor(private aRoute: ActivatedRoute,
    private respuestaCuestionarioService: RespuestacuestionarioService) {
      this.idRespuesta = +this.aRoute.snapshot.paramMap.get("id")!;
      //this.cuestionario = cuestionario;

    }

  ngOnInit():void {
    this.getListRespuestasyCuestionarios()
;
  }

  getListRespuestasyCuestionarios():void{
    this.loading = true;
    this.respuestaCuestionarioService.getCuestionarioByIdRespuesta(this.idRespuesta).subscribe(data=>{
      this.cuestionario = data.cuestionario;
      this.respuestas=data.respuestas;
      this.loading = false;
    },error=>{
      this.loading = false;
    });
  }

}
