import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './components/inicio/bienvenida/bienvenida.component';
import { RegisterComponent } from './components/inicio/register/register.component';
import { LoginComponent } from './components/inicio/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CuestionariosComponent } from './components/dashboard/cuestionarios/cuestionarios.component';
import { CambiarPasswordComponent } from './components/dashboard/cambiar-password/cambiar-password.component';
import { NewCuestionariosComponent } from './components/dashboard/cuestionarios/new-cuestionarios/new-cuestionarios.component';
import { PasospasosUnoComponent } from './components/dashboard/cuestionarios/new-cuestionarios/pasospasos-uno/pasospasos-uno.component';
import { PasospasosDosComponent } from './components/dashboard/cuestionarios/new-cuestionarios/pasospasos-dos/pasospasos-dos.component';
import { CuestionarioComponent } from './components/dashboard/cuestionarios/cuestionario/cuestionario.component';
import { ListcuestionariosComponent } from './components/inicio/listcuestionarios/listcuestionarios.component';
import { IngresarnombreComponent } from './components/inicio/listcuestionarios/ingresarnombre/ingresarnombre.component';
import { PreguntaComponent } from './components/inicio/listcuestionarios/pregunta/pregunta.component';
import { RespuestacuestionarioComponent } from './components/inicio/listcuestionarios/respuestacuestionario/respuestacuestionario.component';
import { EstadisticasComponent } from './components/dashboard/cuestionarios/estadisticas/estadisticas.component';
import { DetallerespuestaComponent } from './components/dashboard/cuestionarios/estadisticas/detallerespuesta/detallerespuesta.component';



const routes: Routes = [
  {path: "", redirectTo: '/inicio', pathMatch: "full"},
  {path: "inicio", component: InicioComponent, children:[
    {path: "", component: BienvenidaComponent},
    {path: "register", component: RegisterComponent},
    {path: "login", component: LoginComponent},
    {path: "listCuestionarios", component: ListcuestionariosComponent},
    {path: "ingresarNombre", component: IngresarnombreComponent},
    {path: "pregunta", component: PreguntaComponent},
    {path: "respuestaCuestionario", component: RespuestacuestionarioComponent},
  ]},
  {path: "dashboard", component: DashboardComponent, children:[
    {path: "", component: CuestionariosComponent},
    {path: "cambiarPassword", component: CambiarPasswordComponent},
    {path: "verCuestionario/:id", component: CuestionarioComponent},
    {path: "estadisticas/:id", component: EstadisticasComponent },
    {path: "detallerespuesta/:id", component: DetallerespuestaComponent },
    {path: "nuevoCuestionario", component: NewCuestionariosComponent , children:[
      {path: "pasoUno", component: PasospasosUnoComponent },
      {path: "pasoDos", component: PasospasosDosComponent}
    ]}
     ]},

  {path: "**", redirectTo: '/inicio', pathMatch: "full"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

exports: [RouterModule]
})
export class AppRoutingModule { }
