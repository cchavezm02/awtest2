import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Aplicacion } from '../models/aplicacion';
import { Observable, Subject } from 'rxjs';
import { CantidadDTO } from '../models/cantidadDTO';
const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class AplicacionService {
  private url = `${base_url}/aplicaciones`
  private listaCambio = new Subject<Aplicacion[]>()

  constructor(private h: HttpClient) { }

  list() {
    return this.h.get<Aplicacion[]>(`${this.url}/listas`)
  }

  insert(a: Aplicacion) {
    return this.h.post(`${this.url}/registra`, a)
  }
  getList() {
    return this.listaCambio.asObservable()
  }
  setList(listaNueva: Aplicacion[]) {
    this.listaCambio.next(listaNueva)
  }

  getQuantity():Observable<CantidadDTO[]>{
    return this.h.get<CantidadDTO[]>(`${this.url}/cantidades`)

  }
}
