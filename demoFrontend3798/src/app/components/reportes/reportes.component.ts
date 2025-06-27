import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ReportesumaComponent } from './reportesuma/reportesuma.component';

@Component({
  selector: 'app-reportes',
  imports: [RouterOutlet,ReportesumaComponent],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {
  constructor(public route: ActivatedRoute) { }
}
