import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { GroupService } from '../../../services/group.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-group',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, FormsModule],
  templateUrl: './add-group.component.html',
  styleUrl: './add-group.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddGroupComponent {
  private readonly dialogRef = inject(MatDialogRef<AddGroupComponent>);
  name: string = '';
  description: string = '';

  constructor (
     private readonly groupService: GroupService,
   ) {}
  
  createGroup(){
    this.groupService.createGroup(this.name, this.description).subscribe((response: any) => {
      console.log('Respuesta del backend:', response);
    });
  }

  close(): void {
    this.dialogRef.close();
  }

 }
