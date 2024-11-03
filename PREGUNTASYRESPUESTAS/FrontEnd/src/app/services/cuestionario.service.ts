import { Injectable } from '@angular/core';
import { environments } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Cuestionario } from '../models/cuestionario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuestionarioService {
  private Url: string;
  private Api: string;
  tituloCuestionario: string="";
  descripcionCuestionario: string="";

  constructor(private http: HttpClient) {

    this.Url = environments.endpoint;
    this.Api = "/api/Cuestionario/";

   }

   guardarCuestionario(cuestionario: Cuestionario): Observable<any> {
    return this.http.post(this.Url+this.Api, cuestionario);

   }

   getListCuestionarioByUser(): Observable<any>{
    return this.http.get(this.Url+this.Api+'GetListCuestionarioByUser');
   }

   deleteCuestionario(idCuestionario: number): Observable<any>{
    return this.http.delete(this.Url+this.Api+idCuestionario);
   }

   getCuestionario(idCuestionario:number): Observable<any>{
    return this.http.get(this.Url+this.Api+idCuestionario)
   }

   getListCuestionario(): Observable<any>{
    return this.http.get(this.Url+this.Api+'GetListCuestionarios')
   }



}
