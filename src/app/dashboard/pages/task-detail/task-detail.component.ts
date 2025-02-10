import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDetailComponent { }
