import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { environment } from '../environment/environment';
import { Observable, tap } from 'rxjs';
import { Task, TaskResponse } from '../interfaces/task';

interface State {
  tasks: Task[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private readonly httpclient: HttpClient) {}
  
  createTask(title: string, location: string, description: string):Observable<Task> {
    return this.httpclient.post<Task>(`${environment.api}/tasks`, { title, location, description });
  }

  getTasks(): Observable<Task[]> {
    return this.httpclient.get<Task[]>(`${environment.api}/tasks`);
  }

  getTaskById(id: number): Observable<TaskResponse> {
    return this.httpclient.get<TaskResponse>(`${environment.api}/tasks`, { params: { id: id } });
  }

  deleteTask(id: number): Observable<TaskResponse> {
    return this.httpclient.delete<TaskResponse>(`${environment.api}/tasks`, { params: { id: id } });
  }

  updateTask(id: number): Observable<TaskResponse> {
    return this.httpclient.patch<TaskResponse>(`${environment.api}/tasks`, { params: { id: id } });
  }

  completeTask(id: number, status: string): Observable<TaskResponse> {
    return this.httpclient.patch<TaskResponse>(`${environment.api}/tasks`, { params: { id: id, status: status } });
  }

  

}
