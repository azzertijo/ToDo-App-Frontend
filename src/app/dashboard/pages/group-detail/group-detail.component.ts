import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-group-detail',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './group-detail.component.html',
  styleUrl: './group-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupDetailComponent { 
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  private readonly dialogRef = inject(MatDialogRef<GroupDetailComponent>);
  
  close(): void {
    this.dialogRef.close();
  }
 }


