import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { GroupService } from '../../../services/group.service';
import { Group } from '../../../interfaces/group';

@Component({
  selector: 'app-admin-group',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatDialogModule, MatInputModule, MatButtonModule, CommonModule],
  templateUrl: './admin-group.component.html',
  styleUrl: './admin-group.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminGroupComponent { 
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
    private readonly dialogRef = inject(MatDialogRef<AdminGroupComponent>);
    private readonly groupService = inject(GroupService);

    name: string = '';
    location: string = '';
    description: string = '';

  editGroup(): void {
    if (!this.name.trim() && !this.description.trim()) {
      alert('No se hicieron cambios')
      this.close(); 
      return; 
    }
    
    this.groupService.updateGroup(this.data.id, this.name, this.description).subscribe({
      next: (group: Group) => {
        alert('Grupo editado');
        this.dialogRef.close(group); 
      },
      error: (err) => console.error('Error al editar el grupo:', err)
    });
  }

  deleteUserFromGroup(memberId: number): void {
    this.groupService.deleteUserFromGroup(this.data.id, memberId).subscribe({
      next: () => {
        alert('Usuario eliminado del grupo');
        this.dialogRef.close();
      },
      error: (err) => console.error('Error al eliminar el usuario del grupo:', err)
    });
  }

    close(): void {
      this.dialogRef.close();
    }
}
