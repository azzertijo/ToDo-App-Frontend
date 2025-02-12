import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../../services/modal.service';
import { AddTaskComponent } from '../add-task/add-task.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TaskDetailComponent } from '../task-detail/task-detail.component';
import { AddMemberComponent } from '../add-member/add-member.component';
import { AddGroupComponent } from '../add-group/add-group.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  private readonly modalSvc = inject(ModalService);
  tasks = [
    { name: 'Comprar comida al perro', date: '05 - Febrero - 2025', description: 'Comprar pedigree en Walmart', done: true },
    { name: 'Pagar luz', date: '02 - Febrero - 2025',description: 'Pagar 550 pesos de luz', done: true },
    { name: 'Tintorería', date: '01 - Febrero - 2025',description: 'Pasar por el saco a la tintorería', done: false }
  ];

  toggleTaskStatus(index: number) {
    this.tasks[index].done = !this.tasks[index].done;
  }

  onClickTask(task: any) {
    this.modalSvc.open(TaskDetailComponent, {
      data: task,
      maxWidth: 400,
      minWidth: 400, 
      maxHeight: 520, 
      minHeight: 520
    });
  }

  onClickNewTask(): void {
    this.modalSvc.open(AddTaskComponent, {maxWidth: 300, minWidth: 300, maxHeight: 420, minHeight: 420});
  }

  onCode(): void {
    this.modalSvc.open(AddMemberComponent, {maxWidth: 300, minWidth: 300, maxHeight: 420, minHeight: 420});
  }

  onAddGroup(): void {
    this.modalSvc.open(AddGroupComponent, {maxWidth: 300, minWidth: 300, maxHeight: 420, minHeight: 420});
  }


}
