import { Routes } from '@angular/router';
import { Insertareditar } from './components/actividad/insertareditar/insertareditar';
import { Actividad } from './components/actividad/actividad';

export const routes: Routes = [
    {
        path:'',redirectTo:'actividad',pathMatch:'full'
    },
    {
        path:'actividad',component:Actividad,
        children:[
          {
            path:'formulario',component:Insertareditar
          },
          {
            path:'ediciones/:id',component:Insertareditar
          }
        ]
      },
];
