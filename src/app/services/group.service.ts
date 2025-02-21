import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Group, GroupResponse } from '../interfaces/group';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { User } from '../interfaces/user';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

    constructor(private readonly httpclient: HttpClient) {}
    private groupSubject = new BehaviorSubject<Group | null>(null); 
    group$ = this.groupSubject.asObservable();
    private groupUpdate = new BehaviorSubject<Task | null>(null);
    groupUpdate$ = this.groupUpdate.asObservable();
  
    setGroup(group: Group): void {
      this.groupSubject.next(group); 
    }
  
    getPageGroup(): Group | null {
      return this.groupSubject.value; 
    }
    
    createGroup(name: string, description: String):Observable<Group> {
      return this.httpclient.post<Group>(`${environment.api}/groups`, { name, description }, { withCredentials: true });
    }

    getPersonalGroups(): Observable<Group[]> {
      return this.httpclient.get<Group[]>(`${environment.api}/groups`, { withCredentials: true }); 
    }

    addUserToGroup(groupId: number, userCode: string): Observable<GroupResponse> {
      return this.httpclient.patch<GroupResponse>(`${environment.api}/groups/${groupId}/add-user/${userCode}`,{},{ withCredentials: true });
    }

    deleteUserFromGroup(groupId: number, userId: number): Observable<GroupResponse> {
      return this.httpclient.post<GroupResponse>(`${environment.api}/groups/${groupId}/delete-member/${userId}`, { withCredentials: true });
    }

    getGroupById(id: number): Observable<GroupResponse> {
      return this.httpclient.get<GroupResponse>(`${environment.api}/groups/${id}`, { 
        params: { tasks: true, members: true },
        withCredentials: true 
      });
    }

    getGroupMembers(groupId: number): Observable<User[]> {
      return this.httpclient.get<User[]>(`${environment.api}/groups/${groupId}`, {params: {members: true}, withCredentials: true}); 
    }

    getGroupTasks(groupId: number): Observable<GroupResponse> {
        return this.httpclient.get<GroupResponse>(`${environment.api}/groups/${groupId}`, {params: {tasks: true}, withCredentials: true});
    }
    
    getGroup(): Observable<GroupResponse> {
      return this.httpclient.get<GroupResponse>(`${environment.api}/groups`);
    }
  
    deleteGroup(id: number): Observable<GroupResponse> {
      return this.httpclient.delete<GroupResponse>(`${environment.api}/groups`, { params: { id: id } });
    }
  
    updateGroup(id: number, name: string, description:string): Observable<Group> {
      return this.httpclient.patch<Group>(`${environment.api}/groups/${id}`, { name, description }, { withCredentials: true });
    }
  
}
