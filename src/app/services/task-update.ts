import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskUpdateService {
  private taskUpdatedSource = new BehaviorSubject<Task | null>(null);
  taskUpdated$ = this.taskUpdatedSource.asObservable();

  // Emitir una nueva tarea cuando se cree
  notifyTaskCreated(task: Task) {
    this.taskUpdatedSource.next(task);
  }
}