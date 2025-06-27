import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Listaractividad } from './listaractividad/listaractividad';

@Component({
  selector: 'app-actividad',
  imports: [RouterOutlet,Listaractividad],
  templateUrl: './actividad.html',
  styleUrl: './actividad.css'
})
export class Actividad {
  constructor(public route:ActivatedRoute) { }
}
