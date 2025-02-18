import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly httpclient: HttpClient) { }

  login(name: string, password: string):Observable<User> {
    return this.httpclient.post(`${environment.api}/auth/login`, { name, password }, { withCredentials: true });
  }
  
  register(name: string, password: string):Observable<User> {
    return this.httpclient.post(`${environment.api}/auth/register`, { name, password, icon:'Prueba'}, { withCredentials: true });
  }

}
