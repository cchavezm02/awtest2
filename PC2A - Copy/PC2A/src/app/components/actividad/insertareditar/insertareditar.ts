import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Actividad } from '../../../models/actividad';
import { ActividadService } from '../../../services/actividad.service';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-insertareditar',
  imports: [    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    RouterLink,
    MatCheckboxModule],
  templateUrl: './insertareditar.html',
  styleUrl: './insertareditar.css'
})
export class Insertareditar implements OnInit  {
  form: FormGroup = new FormGroup({});
  actividad: Actividad = new Actividad();
  tiposac: { value: string; viewValue: string }[] = [
    { value: 'procesos industrials', viewValue: 'procesos industrials' },
    { value: 'uso de refrigerantes', viewValue: 'uso de refrigerantes' },
    { value: 'uso de refrigerantes', viewValue: 'uso de refrigerantes' }
  ]
  id: number = 0;
  edicion: boolean = false;
  status: boolean = true;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private aS: ActividadService) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {

      this.id = data['id']
      this.edicion = data['id'] != null
      //actualizar
      this.init()
    }
    )
    this.form = this.fb.group({
      acid: ['', [Validators.required, Validators.nullValidator]],
      acdenominacion: ['', [Validators.required, Validators.minLength(8)]],
      actipo: ['', [Validators.required]],
      actiempomin: ['', [Validators.required, Validators.min(0), Validators.max(300)]],
      acfecha: ['', [Validators.required, this.fechaPasadaValidator]],
      acestado: [true, [Validators.required]], // Valor por defecto true
    })
  }

  aceptar() {
    this.actividad.codigo = this.form.value.acid;
    this.actividad.denominacion = this.form.value.acdenominacion;
    this.actividad.tipo = this.form.value.actipo;
    this.actividad.fecha = this.form.value.acfecha;
    this.actividad.estado = this.form.value.acestado;
    this.actividad.tiempoMinutos = this.form.value.actiempomin;

    if (this.edicion) {
      //actualizar
      this.aS.update(this.actividad).subscribe(data => {
        this.aS.list().subscribe(data => {
          this.aS.setList(data)
        })
      })
    } else {
      //insertar
      this.aS.insert(this.actividad).subscribe(data => {
        this.aS.list().subscribe(data => {
          this.aS.setList(data)
        })
      })
    }
    this.router.navigate(['actividad'])
  }
  
    init(){ 
      if (this.edicion) {
        this.aS.listId(this.id).subscribe(data => {
          this.form = new FormGroup({
            acid: new FormControl(data.codigo, [Validators.required, Validators.nullValidator]),
            acdenominacion: new FormControl(data.denominacion, [Validators.required, Validators.minLength(8)]),
            actipo: new FormControl(data.tipo, [Validators.required]),
            actiempomin: new FormControl(data.tiempoMinutos, [Validators.required, Validators.min(0), Validators.max(300)]),
            acfecha: new FormControl(data.fecha, [Validators.required, this.fechaPasadaValidator]),
            acestado: new FormControl(data.estado, [Validators.required]),
          })
        })
      } 
    }

  // Validador personalizado para fecha pasada
  fechaPasadaValidator(control: any) {
    if (!control.value) return null;
    
    const fechaSeleccionada = new Date(control.value);
    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0); // Resetear horas para comparar solo fechas
    
    if (fechaSeleccionada >= fechaActual) {
      return { fechaFutura: true };
    }
    return null;
  }

  }
      






































