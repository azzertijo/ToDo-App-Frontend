import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../../services/modal.service';
import { AddTaskComponent } from '../add-task/add-task.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TaskDetailComponent } from '../task-detail/task-detail.component';
import { AddMemberComponent } from '../add-member/add-member.component';
import { AddGroupComponent } from '../add-group/add-group.component';
import { GroupDetailComponent } from '../group-detail/group-detail.component';
import { TaskService } from '../../../services/task.service';
import { Observable } from 'rxjs';
import { Task, TaskResponse } from '../../../interfaces/task';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, MatDialogModule, HttpClientModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  providers: [TaskService]
})
export class TaskListComponent implements OnInit {
  private readonly modalSvc = inject(ModalService);

  constructor (private readonly taskService: TaskService) {}

  listType: 'personal' | 'group' = 'personal';
  isAdmin: boolean = false;
  groupName?: string; 
  taskList: Task[] = [];

  members = [
    { name: 'Michelle Cedano'},
    { name: 'Jorge Sánchez'},
    { name: 'Marcos López'},
    { name: 'Marcos López'},
    { name: 'Marcos López'},
    { name: 'Marcos López'},
    { name: 'Marcos López'},
    { name: 'Marcos López'},
    { name: 'Marcos López'}
  ];

  ngOnInit() {
    // CODIGO PARA PROBAR DIFERENTES TIPOS DE GRUPOS
    //this.loadList('group', 'Grupo 1', true);  // Prueba como ADMIN de un grupo
    //this.loadList('group', 'Grupo 1', false); // Prueba como MIEMBRO de un grupo
    //this.loadList('personal');  // Prueba la LISTA PERSONAL

    this.taskService.getTasks().subscribe((response: Task[]) => {
      Array.prototype.push.apply(this.taskList, response);
      console.log(response);
    });
  }

  loadList(type: 'personal' | 'group', groupName?: string, isAdmin: boolean = false) {
    this.listType = type;
    this.groupName = groupName;
    this.isAdmin = isAdmin;
  }

  //toggleTaskStatus(index: number) {
    //this.tasks[index].done = !this.tasks[index].done;
  //}

  onClickTask(task: Task) {
    this.modalSvc.open(TaskDetailComponent, {
      data: task,
      maxWidth: 400,
      minWidth: 400, 
      maxHeight: 520, 
      minHeight: 520
    });
  }

  onClickGroupDetail() {
    this.modalSvc.open(GroupDetailComponent, {
      data: {members: this.members, groupName: this.groupName},
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

  onOpenPersonal(): void {
    this.loadList('personal');
  }

  onOpenGroup1(): void {
    this.loadList('group', 'Grupo 1', false);
  }

  onOpenGroup2(): void {
    this.loadList('group', 'Grupo 2', true);
  }
}
