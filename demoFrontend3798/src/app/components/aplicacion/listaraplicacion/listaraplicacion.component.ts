import { Component, OnInit } from '@angular/core';
import { AplicacionService } from '../../../services/aplicacion.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Aplicacion } from '../../../models/aplicacion';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listaraplicacion',
  imports: [
     MatTableModule,
    CommonModule,

  ],
  templateUrl: './listaraplicacion.component.html',
  styleUrl: './listaraplicacion.component.css'
})
export class ListaraplicacionComponent implements OnInit {
  dataSource: MatTableDataSource<Aplicacion> = new MatTableDataSource()
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7']
  constructor(private aS: AplicacionService) { }

  ngOnInit(): void {
    this.aS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
      this.aS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
  }
}
