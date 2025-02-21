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
    return this.httpclient.post(`${environment.api}/auth/register`, { name, password, icon:'Prueba'} );
  }

  updateUser(name: string, id: number):Observable<User> {
    return this.httpclient.patch(`${environment.api}/users/${id}`, { name }, { withCredentials: true });
  }

    getUserInfo():Observable<User> {
      return this.httpclient.get<User>(`${environment.api}/users/profile/me`, { withCredentials: true });
    }
}
