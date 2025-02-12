import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-member',
  standalone: true,
  imports: [MatDialogModule,  MatButtonModule],
  templateUrl: './add-member.component.html',
  styleUrl: './add-member.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddMemberComponent { 

  private readonly dialogRef = inject(MatDialogRef<AddMemberComponent>);
  
  close(): void {
    this.dialogRef.close();
  }
}
