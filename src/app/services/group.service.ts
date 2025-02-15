import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Group, GroupResponse } from '../interfaces/group';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

    constructor(private readonly httpclient: HttpClient) {}
    
    createGroup(name: string, description: string, adminId: number):Observable<Group> {
      return this.httpclient.post<Group>(`${environment.api}/groups`, { name, description, adminId });
    }
  
    getGroup(): Observable<GroupResponse> {
      return this.httpclient.get<GroupResponse>(`${environment.api}/groups`);
    }
  
    getGroupById(id: number): Observable<GroupResponse> {
      return this.httpclient.get<GroupResponse>(`${environment.api}/groups`, { params: { id: id } });
    }
  
    deleteGroup(id: number): Observable<GroupResponse> {
      return this.httpclient.delete<GroupResponse>(`${environment.api}/groups`, { params: { id: id } });
    }
  
    updateGroup(id: number): Observable<GroupResponse> {
      return this.httpclient.patch<GroupResponse>(`${environment.api}/groups`, { params: { id: id } });
    }
  
}
