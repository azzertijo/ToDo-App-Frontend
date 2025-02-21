import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../services/task.service';
import { TaskUpdateService } from '../../../services/task-update';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [
      CommonModule,
      MatDialogModule,
      MatButtonModule,
  ],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css',
})
export class TaskDetailComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private readonly taskService: TaskService,
  private taskUpdateService: TaskUpdateService)
  {}

  private readonly dialogRef = inject(MatDialogRef<TaskDetailComponent>);

  completeTask(status: string): void {
    this.taskService.completeTask(this.data.id, status).subscribe({
      next: () => {
        console.log('Tarea completada:', this.data);
        alert('Tarea '+ this.data.title + ' actualizada');
        this.dialogRef.close();
      },
      error: (err) => console.error('Error al completar la tarea:', err)
    });
  }

  close(): void {
    this.dialogRef.close();
  }
 }
