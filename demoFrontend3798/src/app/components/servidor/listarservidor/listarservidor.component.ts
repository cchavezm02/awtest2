import { Component, OnInit } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Servidor } from '../../../models/servidor';
import { ServidorService } from '../../../services/servidor.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-listarservidor',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    RouterLink,
    MatIconModule
  ],
  templateUrl: './listarservidor.component.html',
  styleUrl: './listarservidor.component.css'
})
export class ListarservidorComponent implements OnInit {
  dataSource: MatTableDataSource<Servidor> = new MatTableDataSource()
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8']
  constructor(private sS: ServidorService) { }

  ngOnInit(): void {
    this.sS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
    this.sS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })

  }

  eliminar(id: number) {
    this.sS.deleteS(id).subscribe(data=>{
      this.sS.list().subscribe(data=>{
        this.sS.setList(data)
      })
    })
  }

}
