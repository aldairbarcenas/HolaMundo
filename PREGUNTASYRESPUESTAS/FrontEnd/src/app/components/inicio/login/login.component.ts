import { Component } from '@angular/core';
import { FormGroup, FormBuilder,Validators} from '@angular/forms';
import {Usuario} from "../../../models/usuario";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  login: FormGroup;
  loading: boolean = false;



  constructor(private fb: FormBuilder,
              private toastr: ToastrService,
              private router: Router,
              private loginService: LoginService) {
    this.login = this.fb.group({
      usuario: ["", Validators.required],
      contraseña: ["", Validators.required],
    });
  }


  log():void
  {


    //seteamos
    const Usuario: Usuario={
      nombreUsuario: this.login.value.usuario,
      password: this.login.value.contraseña,
    }


      this.loading=true;
      this.loginService.login(Usuario).subscribe(data=>{
      console.log(data);
      this.loading = false;
      //almacenamos los datos de usuario
      this.loginService.setLocalStorage(data.token);

      this.router.navigate(["/dashboard"]);

    },error=>{
      console.log(error);

      this.loading = false;
      this.toastr.error(error.error.mensaje,"ERROR");
      this.login.reset();

    });

  }
}



