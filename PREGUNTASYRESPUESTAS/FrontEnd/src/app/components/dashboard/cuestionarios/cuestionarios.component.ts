import { Component } from '@angular/core';
import { LoginService } from '../../../services/login.service';

import { Toast, ToastrService } from 'ngx-toastr';
import { Cuestionario } from '../../../models/cuestionario';
import { CuestionarioService } from '../../../services/cuestionario.service';

@Component({
  selector: 'app-cuestionarios',
  templateUrl: './cuestionarios.component.html',
  styleUrl: './cuestionarios.component.css'
})
export class CuestionariosComponent {
  nombreUsuario: string = '';
  listCuestionarios: Cuestionario[]=[]
  loading: boolean = false;

  constructor(private loginService: LoginService,
    private cuestionarioService: CuestionarioService,
    private toastr: ToastrService

  )
  {

  }

  ngOnInit(): void {
    this.getNombreUsuario();
    this.getCuestionarios();
  }

  getNombreUsuario():void{
    this.nombreUsuario = this.loginService.getTokenDecoded().sub;

  }

  getCuestionarios(): void{
    this.loading = true;
    this.cuestionarioService.getListCuestionarioByUser().subscribe(data=>{

      this.listCuestionarios = data;
      this.loading = false;

    }, error => {
      console.log(error);
      this.loading = false;
      this.toastr.error("OPSS.. OCURRIO UN ERROR","ERROR");
    });
  }

  eliminarCuestionario(idCuestionario: any):void{
    if(confirm("ESTA SEGURO QUE DESEA ELIMINAR EL CUESTIONARIO")){
      this.loading=true;
      this.cuestionarioService.deleteCuestionario(idCuestionario).subscribe(data=>{
        this.loading=false;
        this.toastr.success("EL CUESTIONARIO FUE ELIMINADO CON EXITO","REGISTRO ELIMINADO");
        this.getCuestionarios();
      },error=>{
        this.loading=false;
        this.toastr.error("OPSS.. OCURRIO UN ERROR","ERROR");
      })
    }
  }

}
