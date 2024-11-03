import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RespuestacuestionarioService } from '../../../../services/respuestacuestionario.service';

@Component({
  selector: 'app-ingresarnombre',
  templateUrl: './ingresarnombre.component.html',
  styleUrl: './ingresarnombre.component.css'
})
export class IngresarnombreComponent {
  nombreParticipante="";
  constructor(private router: Router,
    private respuestaCuestionario: RespuestacuestionarioService
  ) { }

  ngOnInit() {
    if(this.respuestaCuestionario.idCuestionario==null){
      this.router.navigate(["/inicio"]);
    }
  }

  siguiente():void{
    this.respuestaCuestionario.nombreParticipante = this.nombreParticipante;
    this.router.navigate(["/inicio/pregunta"]);

  }

}
