import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-group',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './add-group.component.html',
  styleUrl: './add-group.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddGroupComponent {
  private readonly dialogRef = inject(MatDialogRef<AddGroupComponent>);
  
  close(): void {
    this.dialogRef.close();
  }

 }
