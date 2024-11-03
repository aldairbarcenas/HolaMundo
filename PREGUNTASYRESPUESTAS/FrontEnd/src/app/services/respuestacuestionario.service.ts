import { Injectable } from '@angular/core';
import { Cuestionario } from '../models/cuestionario';
import { environments } from '../environments/environments';
import { respuestaCuestionario } from './../models/respuestaCuestionario';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RespuestacuestionarioService {
  nombreParticipante: string = '';
  idCuestionario: number | null = null; // Permite que idCuestionario sea nulo
  fecha: Date | null = null; // Asegúrate de agregar esta propiedad
  respuestas: number[] = [];
  cuestionario: Cuestionario | null = null; // Permite que cuestionario sea nulo
  myAppUrl: string;
  myApiUrl:string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environments.endpoint;
    this.myApiUrl = "/api/RespuestaCuestionario/";
   }

   guardarRespuestaCuestionario(respuestaCuestionario: respuestaCuestionario):Observable<any> {

    return this.http.post(this.myAppUrl + this.myApiUrl,respuestaCuestionario) ;

   }

   getListCuestionarioRespuesta(idCuestionario: number):Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl + idCuestionario)
   }

   eliminarRespuestaCuestionario(idRespuestaCuestionario: number):Observable<any>  {
    return this.http.delete(this.myAppUrl + this.myApiUrl + idRespuestaCuestionario);
   }

   getCuestionarioByIdRespuesta(idRespuesta: number):Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl +"GetCuestionarioByIdRespuesta/"+idRespuesta);
   }
}
