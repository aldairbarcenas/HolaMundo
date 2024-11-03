import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

//modulos
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, provideHttpClient, withInterceptors, withFetch  } from '@angular/common/http';
import {FormsModule} from "@angular/forms";


//interceptors
import { addTokenInterceptor } from '../app/helpers/add-token.interceptor';


//componentes
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { BienvenidaComponent } from './components/inicio/bienvenida/bienvenida.component';
import { LoginComponent } from './components/inicio/login/login.component';
import { RegisterComponent } from './components/inicio/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CambiarPasswordComponent } from './components/dashboard/cambiar-password/cambiar-password.component';
import { CuestionariosComponent } from './components/dashboard/cuestionarios/cuestionarios.component';
import { NavbarComponent } from './components/dashboard/navbar/navbar.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { NewCuestionariosComponent } from './components/dashboard/cuestionarios/new-cuestionarios/new-cuestionarios.component';
import { PasospasosUnoComponent } from './components/dashboard/cuestionarios/new-cuestionarios/pasospasos-uno/pasospasos-uno.component';
import { PasospasosDosComponent } from './components/dashboard/cuestionarios/new-cuestionarios/pasospasos-dos/pasospasos-dos.component';
import { NuevaPreguntaComponent } from './components/dashboard/cuestionarios/new-cuestionarios/pasospasos-dos/nueva-pregunta/nueva-pregunta.component';
import { CuestionarioComponent } from './components/dashboard/cuestionarios/cuestionario/cuestionario.component';
import { ListcuestionariosComponent } from './components/inicio/listcuestionarios/listcuestionarios.component';
import { IngresarnombreComponent } from './components/inicio/listcuestionarios/ingresarnombre/ingresarnombre.component';
import { PreguntaComponent } from './components/inicio/listcuestionarios/pregunta/pregunta.component';
import { RespuestacuestionarioComponent } from './components/inicio/listcuestionarios/respuestacuestionario/respuestacuestionario.component';
import { EstadisticasComponent } from './components/dashboard/cuestionarios/estadisticas/estadisticas.component';
import { DetallerespuestaComponent } from './components/dashboard/cuestionarios/estadisticas/detallerespuesta/detallerespuesta.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    BienvenidaComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    CambiarPasswordComponent,
    CuestionariosComponent,
    NavbarComponent,
    LoadingComponent,
    NewCuestionariosComponent,
    PasospasosUnoComponent,
    PasospasosDosComponent,
    NuevaPreguntaComponent,
    CuestionarioComponent,
    ListcuestionariosComponent,
    IngresarnombreComponent,
    PreguntaComponent,
    RespuestacuestionarioComponent,
    EstadisticasComponent,
    DetallerespuestaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
      withInterceptors([addTokenInterceptor])
    ),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
