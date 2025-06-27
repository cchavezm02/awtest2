import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Servidor } from '../../../models/servidor';
import { ServidorService } from '../../../services/servidor.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-buscar',
  imports: [
    MatTableModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.css'
})
export class BuscarComponent implements OnInit {
  dataSource: MatTableDataSource<Servidor> = new MatTableDataSource()
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6']
  form: FormGroup;

  mensaje: string = ""
  notResults: boolean = false

  proveedorBusqueda: string = ""

  constructor(
    private sS: ServidorService,
    private fb: FormBuilder) {
    this.form = fb.group({
      proveedor: ['']
    })
  }

  ngOnInit(): void {
    this.sS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
    this.form.get('proveedor')?.valueChanges.subscribe(value => {
      this.proveedorBusqueda = value
      this.buscar()
    })
  }

  buscar() {
    if (this.proveedorBusqueda.trim()) {
      this.sS.searchProvider(this.proveedorBusqueda).subscribe(data => {
        this.dataSource = new MatTableDataSource(data)
        this.notResults = data.length === 0
      })
    } else {
      this.sS.list().subscribe(data => {
        this.dataSource = new MatTableDataSource(data)
        this.notResults = false
      })
    }

  }

}
