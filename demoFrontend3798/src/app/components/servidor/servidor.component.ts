import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarservidorComponent } from './listarservidor/listarservidor.component';

@Component({
  selector: 'app-servidor',
  imports: [RouterOutlet,ListarservidorComponent],
  templateUrl: './servidor.component.html',
  styleUrl: './servidor.component.css'
})
export class ServidorComponent {
  constructor(public route:ActivatedRoute) { }
}
