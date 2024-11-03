import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RespuestacuestionarioService } from '../../../../services/respuestacuestionario.service';
import { respuestaCuestionario } from '../../../../models/respuestaCuestionario';
import { Toast, ToastrService } from 'ngx-toastr';
import { error } from 'console';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.css'
})
export class EstadisticasComponent {

  idCuestionario:number;
  loading=false;
  listRespuestasCuestionario: respuestaCuestionario[]=[];

  constructor(private aRoute:ActivatedRoute,
    private respuestaCuestionarioService : RespuestacuestionarioService,
    private toastr: ToastrService
   ) {
    this.idCuestionario = +this.aRoute.snapshot.paramMap.get('id')!; // El operador ! indica que no es null
   }

   getListCuestionarioService():void{
    this.loading=true;
    this.respuestaCuestionarioService.getListCuestionarioRespuesta(this.idCuestionario).subscribe(data=>{
      this.loading=false;
      this.listRespuestasCuestionario=data;
      console.log(data);
    });
   }

   ngOnInit():void{
    this.getListCuestionarioService();
   }

   eliminarRespuestaCuestionario(idRtaCuestionario: number): void{
    this.loading=true;
    this.respuestaCuestionarioService.eliminarRespuestaCuestionario(idRtaCuestionario).subscribe(data=>{
      this.loading=false;
      this.toastr.error("LA RESPUESTA AL CUESTIONARIO FUE ELIMINADA CON EXITO!", "REGISTRO ELIMINADO");
      this.getListCuestionarioService();
    }, error=>{
      this.loading=false;
      
    })
   }

}
