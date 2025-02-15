import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly httpclient: HttpClient) { }

  login(name: string, password: string):Observable<any> {
    return this.httpclient.post(`${environment.api}/users`, { name, password });
  }
  
  
}
