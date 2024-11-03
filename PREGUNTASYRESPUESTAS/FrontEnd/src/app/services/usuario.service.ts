import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { HttpClient } from '@angular/common/http';
import { environments } from '../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private Url: string;
  private Api: string;
  constructor(private http: HttpClient) {
    this.Url = environments.endpoint;
    //this.Url = "http://localhost:5204";
    this.Api = "/api/Usuario";
  }
  saveUser(usuario: Usuario):Observable<any>
  {
    return this.http.post(this.Url+this.Api, usuario);
  }

  changePassword(changePassword: any):Observable<any>{
    return this.http.put(this.Url+this.Api+'/CambiarPassword',changePassword);

  }
}
