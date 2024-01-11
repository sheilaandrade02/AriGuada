import { Routes } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import { EventosComponent } from './eventos/eventos.component';
import { MusicaComponent } from './musica/musica.component';
import { IniciarSessionComponent } from './iniciar-session/iniciar-session.component';
import { RegistroComponent } from './registro/registro.component';
import { TiendaComponent } from './tienda/tienda.component';
import { CarritoComponent } from './carrito/carrito.component';

export const routes: Routes = [
  { path: '',
   component: IntroComponent },

  { path: 'eventos',
   component: EventosComponent },

   { path: 'musica',
    component: MusicaComponent
   },
   {
    path: 'iniciar-session',
    component: IniciarSessionComponent
   },
   {
    path: 'iniciar-session/registro',
    component: RegistroComponent
   },
    {
    path: 'tienda',
    component: TiendaComponent
   },
   {
    path: 'carrito',
    component: CarritoComponent
   }
];
