import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Actividad } from '../models/actividad';
const base_url = environment.base

@Injectable({
    providedIn: 'root'
})

export class ActividadService { 
    private listaCambios = new Subject<Actividad[]>();
    private url =`${base_url}/actividades`
    constructor(private http: HttpClient) { }

    list() {
        return this.http.get<Actividad[]>(this.url)
      }
      insert(s: Actividad) {
        return this.http.post(this.url, s)
      }
    
      setList(listaNueva: Actividad[]) {
        this.listaCambios.next(listaNueva)
      }
      getList() {
        return this.listaCambios.asObservable()
      }
    
      listId(id: number) {
        return this.http.get<Actividad>(`${this.url}/${id}`)
      }
    
      update(s: Actividad) {
        return this.http.put(this.url, s)
      }
    
      deleteS(id: number) {
        return this.http.delete(`${this.url}/${id}`)
      }
}