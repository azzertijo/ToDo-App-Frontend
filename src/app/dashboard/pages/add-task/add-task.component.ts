import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from '../../../services/task.service';
import { Task } from '../../../interfaces/task';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [MatDialogModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTaskComponent { 
private readonly dialogRef = inject(MatDialogRef<AddTaskComponent>);
private readonly taskService = inject(TaskService);

  title: string = '';
  location: string = '';
  description: string = '';

  submitTask(): void {
    if (!this.title.trim()) return; 

    this.taskService.createTask(this.title, this.location, this.description).subscribe({
      next: (task: Task) => {
        console.log('Tarea creada:', task);
        this.dialogRef.close(task); 
      },
      error: (err) => console.error('Error al crear la tarea:', err)
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
