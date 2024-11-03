import { Component } from '@angular/core';
import { CuestionarioService } from '../../../../services/cuestionario.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cuestionario',
  templateUrl: './cuestionario.component.html',
  styleUrl: './cuestionario.component.css'
})
export class CuestionarioComponent {
  idCuestionario:number;
  loading=false;
  cuestionario:any={};



  constructor(private cuestionarioService: CuestionarioService,
    private aRoute: ActivatedRoute,
  ) {
    this.idCuestionario= +this.aRoute.snapshot.paramMap.get("id")!;
  }


  getCuestionario():void{
    this.loading=true;
    this.cuestionarioService.getCuestionario(this.idCuestionario).subscribe(data=>{
      this.loading=false;
      console.log(data);
      this.cuestionario=data;
    })
  }

  ngOnInit(){
    this.getCuestionario();
  }

}
