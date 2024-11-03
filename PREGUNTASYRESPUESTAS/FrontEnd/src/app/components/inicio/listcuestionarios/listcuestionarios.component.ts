import { Component } from '@angular/core';
import { CuestionarioService } from '../../../services/cuestionario.service';
import { Cuestionario } from '../../../models/cuestionario';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { RespuestacuestionarioService } from './../../../services/respuestacuestionario.service';

@Component({
  selector: 'app-listcuestionarios',
  templateUrl: './listcuestionarios.component.html',
  styleUrl: './listcuestionarios.component.css'
})
export class ListcuestionariosComponent {
  loading=false;
  listCuestionarios: Cuestionario [] = [];

  constructor(private cuestionarioService: CuestionarioService,
    private toastr: ToastrService,
    private router: Router,
    private respuestaCuestionario: RespuestacuestionarioService
  ) { }


  ngOnInit() {
    this.getListCuestionarios();
  }

  getListCuestionarios():void{
    this.loading = true;
    this.cuestionarioService.getListCuestionario().subscribe(data=>{
      this.loading=false;
      console.log(data);
      this.listCuestionarios = data;
    },error=>{
      this.loading=false;
      this.toastr.error(error);
    });
  }

  ingresarNombre(idCuestionario: any): void{
    this.respuestaCuestionario.idCuestionario = idCuestionario;
    this.router.navigate(["/inicio/ingresarNombre"]);

  }



}
