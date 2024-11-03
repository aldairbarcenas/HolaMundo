import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../environments/environments';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private Url: string;
  private Api: string;

  constructor(private http: HttpClient) {
    this.Url = environments.endpoint;
    this.Api = "/api/Login";

   }

   login(usuario: Usuario):Observable<any>
  {
    return this.http.post(this.Url+this.Api, usuario);
  }

  setLocalStorage(data:any):void{
    localStorage.setItem("token", data);
  }

  //getNombreUsuario():string{
    //return localStorage.getItem("nombreUsuario") || '';
  //}

  getTokenDecoded(): any {
    const token = localStorage.getItem('token');
    if (token) {
      const helper = new JwtHelperService();
      return helper.decodeToken(token);
    }
    return null;  // O lanzar un error o manejar de otra manera si el token es null
  }

  removeLocalStore():void{
    localStorage.removeItem("token");
  }

}
