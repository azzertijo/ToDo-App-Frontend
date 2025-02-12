import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDetailComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  private readonly dialogRef = inject(MatDialogRef<TaskDetailComponent>);
  
  close(): void {
    this.dialogRef.close();
  }
 }
