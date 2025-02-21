import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { ModalService } from '../services/modal.service';
import { AddGroupComponent } from './pages/add-group/add-group.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { UserService } from '../services/user.service';
import { GroupService } from '../services/group.service';
import { Group, GroupResponse } from '../interfaces/group';
import { CommonModule } from '@angular/common';
import { UserGroupService } from '../services/user-group.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, MatDialogModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit{
  
  listType: 'personal' | 'group' = 'personal';
  groupName?: string;
  name: string = '';
  code: string = '';
  id: number = 0;
  groupList: Group[] = [];

  private readonly modalSvc = inject(ModalService);
  private readonly router = inject(Router);

  constructor(
    private readonly userService: UserService,
    private readonly groupService: GroupService,
    private readonly userGroupService: UserGroupService,
    
  ) {}

  ngOnInit() {
    this.getUser();
    this.getGroups();    
  }
    
  onEditUser(): void {
      this.modalSvc.open(EditUserComponent, {
      data: {code: this.code, name: this.name}, maxWidth: 380, minWidth: 380,maxHeight: 380, minHeight: 380,
    });
  }

  getUser(){
    this.userService.getUserInfo().subscribe((response: any) => {
      console.log('Respuesta del backend:', response);
      this.name = response.name;
      this.code = response.code;
      this.id = response.id;
    });
  }

  getGroups(){
    this.groupService.getPersonalGroups().subscribe((response: any) => {
      this.groupList = response;
      console.log('Grupos personales:', this.groupList);
    });
  }

  onAddGroup(): void {
    const dialogRef = this.modalSvc.open(AddGroupComponent, {maxWidth: 300, minWidth: 300, maxHeight: 420, minHeight: 420});
    dialogRef.afterClosed().subscribe(() => {
      this.getGroups(); 
    });
  }

  onOpenPersonal(): void {
    this.router.navigate(['/personalTasks']);
  }

  onOpenGroup(group: Group): void {
    this.groupService.getGroupById(group.id).subscribe((response: any) => {
      const isAdmin = response.admin.id === this.id;
      this.userGroupService.setIsAdmin(isAdmin);
      this.router.navigate([`personalTasks/groupTasks/${response.id}`], { state: { response } });
    });
  }


 }
