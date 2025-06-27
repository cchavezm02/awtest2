import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Aplicacion } from '../../../models/aplicacion';
import { AplicacionService } from '../../../services/aplicacion.service';
import { Router } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { Servidor } from '../../../models/servidor';
import { ServidorService } from '../../../services/servidor.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-insertareditaraplicacion',
  providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './insertareditaraplicacion.component.html',
  styleUrl: './insertareditaraplicacion.component.css'
})
export class InsertareditaraplicacionComponent implements OnInit {
  form: FormGroup = new FormGroup({})

  apli: Aplicacion = new Aplicacion()

  status:boolean=true

  tipos:{value:string;viewValue:string}[]=[
    {value:'Mobile',viewValue:'Mobile'},
    {value:'Web',viewValue:'Web'}
  ]

  listaServidores:Servidor[]=[]

  constructor(
    private formBuilder: FormBuilder,
    private aS: AplicacionService,
    private router: Router,
    private sS:ServidorService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombrecito: ['', Validators.required],
      estado: ['', Validators.required],
      fecha: ['', Validators.required],
      monto: ['', Validators.required],
      tipo: ['', Validators.required],
      servidor: ['', Validators.required]
    })
    this.sS.list().subscribe(data=>{
      this.listaServidores=data
    })
  }
  aceptar() {
    if (this.form.valid) {
      this.apli.nameApp = this.form.value.nombrecito
      this.apli.stateApp = this.form.value.estado
      this.apli.implementationDateApp = this.form.value.fecha
      this.apli.amountApp = this.form.value.monto
      this.apli.typeApp = this.form.value.tipo
      this.apli.server.idServer = this.form.value.servidor
      this.aS.insert(this.apli).subscribe(() => {
        this.aS.list().subscribe(data => {
          this.aS.setList(data)
        })
      })
      this.router.navigate(['aplicaciones'])
    }
  }
}
