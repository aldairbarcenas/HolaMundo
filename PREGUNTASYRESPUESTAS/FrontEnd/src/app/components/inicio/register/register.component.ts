import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  register: FormGroup;
  loading =false;

  constructor(private fb: FormBuilder,
    private usuarioservice: UsuarioService,
    private router: Router,
    private toastr: ToastrService) {
    this.register = this.fb.group({
      usuario: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(4)]],
      repetirContraseña: [""],
    }, {validator: this.checkPassword });
  }

  ngOnInit(): void {

  }

  registrarUsuario():void{

    console.log(this.register);
    console.log("si llego");

    const usuario: Usuario ={
      nombreUsuario: this.register.value.usuario,
      password: this.register.value.password,
    }
    this.loading = true;

    this.usuarioservice.saveUser(usuario).subscribe(data=>{
      console.log(data);
      this.toastr.success("El usuario "+usuario.nombreUsuario+" creado Correctamente","REGISTRO EXITOSO");
      this.router.navigate(["/inicio/login"]);
      this.loading = false;
    },error=>{
      this.loading = false;
      this.toastr.error(error.error.mensaje,"ERROR!!");
      this.register.reset();
    });
  }

  checkPassword(group:FormGroup):any{
    const pass = group.get('password')?.value;
    const confirmaPass=  group.get('repetirContraseña')?.value;
    return pass === confirmaPass ? null : { notSame:true };
  }



  }



