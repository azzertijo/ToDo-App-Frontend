import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  tasks = [
    { name: 'Comprar comida al perro', date: '05 - Febrero - 2025', done: true },
    { name: 'Pagar luz', date: '02 - Febrero - 2025', done: true },
    { name: 'Tintorería', date: '01 - Febrero - 2025', done: false }
  ];

  toggleTaskStatus(index: number) {
    this.tasks[index].done = !this.tasks[index].done;
  }
}
