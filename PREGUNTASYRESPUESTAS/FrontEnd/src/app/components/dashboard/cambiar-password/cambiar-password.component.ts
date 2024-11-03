import { Component } from '@angular/core';
import { FormGroup, FormBuilder,Validators} from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrl: './cambiar-password.component.css'
})
export class CambiarPasswordComponent {
  cambiarPassword: FormGroup;
  loading=false

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private toastr:ToastrService, private route:Router) {
    this.cambiarPassword = this.fb.group({
      passwordAnterior: ["",Validators.required],
      nuevaPassword: ["",[Validators.required,Validators.minLength(4)]],
      confirmPassword: ["",[Validators.required,]]

    }, {validator: this.checkPassword })
  }

  checkPassword(group:FormGroup):any{
    const pass = group.get('nuevaPassword')?.value;
    const confirmaPass=  group.get('confirmPassword')?.value;
    return pass === confirmaPass ? null : { notSame:true };
  }

  guardarPassword(){
    console.log(this.cambiarPassword);

    const changePassword:any={
      passwordAnterior: this.cambiarPassword.value.passwordAnterior,
      nuevaPassword: this.cambiarPassword.value.nuevaPassword
    }
    console.log(changePassword);
    this.loading = true;
    this.usuarioService.changePassword(changePassword).subscribe(data=>{
      this.toastr.info(data.mensaje)
      this.route.navigate(["/dashboard"]);
    },error=>{
      this.loading = false;
      this.cambiarPassword.reset();
      this.toastr.error(error.error.mensaje,"Error!");
    });
  }


}
