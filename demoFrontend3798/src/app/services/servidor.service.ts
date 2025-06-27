import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Servidor } from '../models/servidor';
import { Observable, Subject } from 'rxjs';
import { MontoDTO } from '../models/montoDTO';
const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class ServidorService {

  private listaCambio = new Subject<Servidor[]>()

  private url = `${base_url}/servidores`

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Servidor[]>(this.url)
  }
  insert(s: Servidor) {
    return this.http.post(this.url, s)
  }

  setList(listaNueva: Servidor[]) {
    this.listaCambio.next(listaNueva)
  }
  getList() {
    return this.listaCambio.asObservable()
  }

  listId(id: number) {
    return this.http.get<Servidor>(`${this.url}/${id}`)
  }

  update(s: Servidor) {
    return this.http.put(this.url, s)
  }

  deleteS(id: number) {
    return this.http.delete(`${this.url}/${id}`)
  }

  searchProvider(p: string) {
    const params = { proveedor: p }
    return this.http.get<Servidor[]>(`${this.url}/busquedas`, { params })
  }

  getSum(): Observable<MontoDTO[]> {
    return this.http.get<MontoDTO[]>(`${this.url}/montos`)
  }

}
