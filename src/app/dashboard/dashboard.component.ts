import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
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
  private readonly modalSvc = inject(ModalService);

  onAddGroup(): void {
      this.modalSvc.open(AddGroupComponent, {maxWidth: 300, minWidth: 300, maxHeight: 420, minHeight: 420});
    }

  onEditUser(): void {
      this.modalSvc.open(EditUserComponent, {
      data: { username: 'Marcos López' }, maxWidth: 380, minWidth: 380,maxHeight: 380, minHeight: 380,
    });
  }

 }
