import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { Actividad } from '../../../models/actividad';
import { ActividadService } from '../../../services/actividad.service';

@Component({
  selector: 'app-listaractividad',
  imports: [MatTableModule,
    CommonModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    MatPaginatorModule],
  templateUrl: './listaractividad.html',
  styleUrl: './listaractividad.css'
})
export class Listaractividad implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Actividad> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private aS: ActividadService) { }
  
  ngOnInit(): void {
    this.aS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    })
    this.aS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    // Configurar las opciones de tamaño de página: 4, 8, 10
    if (this.paginator) {
      this.paginator.pageSizeOptions = [4, 8, 10];
      this.paginator.pageSize = 4; // Tamaño por defecto
    }
  }

  eliminar(id: number) {
    this.aS.deleteS(id).subscribe(data=>{
      this.aS.list().subscribe(data=>{
        this.aS.setList(data);
        this.dataSource = new MatTableDataSource(data);
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
      })
    })
  }
}
