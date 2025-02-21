import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { GroupService } from '../../../services/group.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-member',
  standalone: true,
  imports: [MatDialogModule,  MatButtonModule, FormsModule],
  templateUrl: './add-member.component.html',
  styleUrl: './add-member.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddMemberComponent { 

  code: string = '';
  private readonly dialogRef = inject(MatDialogRef<AddMemberComponent>);
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private readonly groupService: GroupService,) {}

  addMemberToGroup(){
    this.groupService.addUserToGroup(this.data.id, this.code).subscribe((response: any) => {
      alert('Usuario agregado al grupo');
      this.dialogRef.close(response); 
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
