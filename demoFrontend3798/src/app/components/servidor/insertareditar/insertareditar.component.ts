import { Value } from './../../../../../node_modules/regjsparser/parser.d';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Servidor } from '../../../models/servidor';
import { ServidorService } from '../../../services/servidor.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-insertareditar',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './insertareditar.component.html',
  styleUrl: './insertareditar.component.css'
})
export class InsertareditarComponent implements OnInit {
  form: FormGroup = new FormGroup({})
  servidor: Servidor = new Servidor()

  proveedores: { value: string; viewValue: string }[] = [
    { value: 'IBM', viewValue: 'IBM' },
    { value: 'Lenovo', viewValue: 'Lenovo' },
    { value: 'Oracle', viewValue: 'Oracle' }
  ]

  id: number = 0
  edicion: boolean = false

  constructor(private sS: ServidorService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {

      this.id = data['id']
      this.edicion = data['id'] != null
      //actualizar
      this.init()
    }
    )



    this.form = this.formBuilder.group({
      codigo: [''],
      name: ['', Validators.required],
      ip: ['', Validators.required],
      ubication: ['', Validators.required],
      so: ['', Validators.required],
      dateStart: ['', Validators.required],
      provider: ['', Validators.required],
    })
  }

  aceptar() {
    if (this.form.valid) {
      this.servidor.idServer = this.form.value.codigo
      this.servidor.nameServer = this.form.value.name
      this.servidor.ipServer = this.form.value.ip
      this.servidor.ubicationServer = this.form.value.ubication
      this.servidor.soServer = this.form.value.so
      this.servidor.startDateOperationServer = this.form.value.dateStart
      this.servidor.providerServer = this.form.value.provider

      if (this.edicion) {
        //actualizar
        this.sS.update(this.servidor).subscribe(data => {
          this.sS.list().subscribe(data => {
            this.sS.setList(data)
          })
        })
      } else {
        //INSERTAR
        this.sS.insert(this.servidor).subscribe(data => {
          this.sS.list().subscribe(data => {
            this.sS.setList(data)
          })
        })
      }
      this.router.navigate(['servidores'])
    }
  }
  init() {
    if (this.edicion) {
      this.sS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idServer),
          name: new FormControl(data.nameServer),
          ip: new FormControl(data.ipServer),
          ubication: new FormControl(data.ubicationServer),
          so: new FormControl(data.soServer),
          dateStart: new FormControl(data.startDateOperationServer),
          provider: new FormControl(data.providerServer),
        })
      })

    }
  }

}
