import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { ModalService } from '../services/modal.service';
import { AddGroupComponent } from './pages/add-group/add-group.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, MatDialogModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  listType: 'personal' | 'group' = 'personal';
  isAdmin: boolean = false;
  groupName?: string; 
  private readonly modalSvc = inject(ModalService);
  private readonly router = inject(Router);

  onAddGroup(): void {
      this.modalSvc.open(AddGroupComponent, {maxWidth: 300, minWidth: 300, maxHeight: 420, minHeight: 420});
    }

  onEditUser(): void {
      this.modalSvc.open(EditUserComponent, {
      data: { username: 'Marcos López' }, maxWidth: 380, minWidth: 380,maxHeight: 380, minHeight: 380,
    });
  }

  //loadList(type: 'personal' | 'group', groupName?: string, isAdmin: boolean = false) {
    //this.listType = type;
    //this.groupName = groupName;
    //this.isAdmin = isAdmin;
    //return this.listType, this.groupName, this.isAdmin;
  //}

  onOpenPersonal(): void {
    //this.loadList('personal');
    this.router.navigate(['/personalTasks']);
  }
  
  onOpenGroup1(): void {
    //this.loadList('group', 'Grupo 1', false);
    this.router.navigate(['/groupTasks/Grupo2']);
  }

  onOpenGroup2(): void {
    //this.loadList('group', 'Grupo 2', true);
    this.router.navigate(['/groupTasks/Grupo2']);
  }

 }
