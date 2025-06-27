import { Routes } from '@angular/router';
import { ServidorComponent } from './components/servidor/servidor.component';
import { InsertareditarComponent } from './components/servidor/insertareditar/insertareditar.component';
import { BuscarComponent } from './components/servidor/buscar/buscar.component';
import { AplicacionComponent } from './components/aplicacion/aplicacion.component';
import { InsertareditaraplicacionComponent } from './components/aplicacion/insertareditaraplicacion/insertareditaraplicacion.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { ReportecantidadComponent } from './components/reportes/reportecantidad/reportecantidad.component';

export const routes: Routes = [
  {
    path:'',redirectTo:'servidores',pathMatch:'full'
  },
  {
    path:'servidores',component:ServidorComponent,
    children:[
      {
        path:'formulario',component:InsertareditarComponent
      },
      {
        path:'ediciones/:id',component:InsertareditarComponent
      },
      {
        path:'busquedasproveedor',component:BuscarComponent
      }
    ]
  },
  {
    path:'aplicaciones',component:AplicacionComponent,
    children:[
      {
        path:'insercion',component:InsertareditaraplicacionComponent
      }
    ]
  },
  {
    path:'reportes',component:ReportesComponent,
    children:[
      {
        path:'cantidades',component:ReportecantidadComponent
      }
    ]
  }
];
