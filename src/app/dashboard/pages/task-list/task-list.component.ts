import { ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../../services/modal.service';
import { AddTaskComponent } from '../add-task/add-task.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TaskDetailComponent } from '../task-detail/task-detail.component';
import { AddMemberComponent } from '../add-member/add-member.component';
import { AddGroupComponent } from '../add-group/add-group.component';
import { GroupDetailComponent } from '../group-detail/group-detail.component';
import { TaskService } from '../../../services/task.service';
import { Observable, Subscription } from 'rxjs';
import { Task, TaskResponse } from '../../../interfaces/task';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Group } from '../../../interfaces/group';
import { UserGroupService } from '../../../services/user-group.service';
import { GroupService } from '../../../services/group.service';
import { TaskUpdateService } from '../../../services/task-update';
import { AdminGroupComponent } from '../admin-group/admin-group.component';
import { group } from 'console';


@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, MatDialogModule, HttpClientModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  providers: [TaskService]
})
export class TaskListComponent implements OnInit, OnDestroy {
  private readonly modalSvc = inject(ModalService);
  @Input() group: Group;
  listType: 'personal' | 'group' = 'personal';
  isAdmin: boolean = false;
  groupName?: string;
  description?: string;
  taskList: Task[] = [];
  taskGroupList: Task[]= [];
  filteredTaskList : Task[] = []; 
  filterStatus: string = '';
  members = [];
  private routeSub: Subscription | undefined;
  taskUpdatedSubscription: Subscription | undefined;

  constructor (
    public readonly taskService: TaskService,
    private readonly userService: UserService,
    private readonly groupService: GroupService,
    private readonly userGroupService: UserGroupService,
    private readonly taskUpdateService: TaskUpdateService,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.group = navigation?.extras.state?.['response'];
    
  }

  ngOnInit() {
    this.cdRef.detectChanges();
    if (this.group) {
      this.routeSub = this.route.paramMap.subscribe((params) => {
        const groupId = parseInt(params.get('id')!, 10); 
        this.loadGroupData(groupId); 
      });
    }else{
      this.loadUserTasks();
    }

    this.taskUpdatedSubscription = this.taskUpdateService.taskUpdated$.subscribe((newTask) => {
      if (newTask) {
        this.taskGroupList.push(newTask); 
        this.cdRef.detectChanges(); 
      }
    });
  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.taskUpdatedSubscription) {
      this.taskUpdatedSubscription.unsubscribe();
    }
  }

  loadGroupData(groupId: number) {
    this.groupService.getGroupById(groupId).subscribe((response: any) => {
      this.group = response; 
      this.groupName = this.group.name;
      this.description = this.group.description;
      this.isAdmin = this.userGroupService.getIsAdmin();
      this.getGroupMembers();
      this.loadGroupTasks();
    });
  }

  loadUserTasks(){
    this.taskService.getPersonalTasks().subscribe((response: Task[]) => {
      this.taskList = response;
      this.filteredTaskList = this.taskList;
    });
  }

  loadGroupTasks(){
    if (this.group) {
      this.groupService.getGroupTasks(this.group.id).subscribe((response: any) => {
        console.log('Tareas del grupo:', response.tasks);
        this.taskGroupList = response.tasks as Task[];
        console.log('Tareas del grupo metodo:', this.taskGroupList);
      });
    }
  }

  getGroupMembers(){
    if(this.group) { 
      this.groupService.getGroupMembers(this.group.id).subscribe((response: any) => {
        this.members = Object.values(response.members);
    });
    }
  }

  filterTasks(status: string) {
    this.filterStatus = status;
    if (status === 'done') {
      this.filteredTaskList = this.taskList.filter(task => task.status === 'done');
    } else if (status === 'pending') {
      this.filteredTaskList = this.taskList.filter(task => task.status === 'pending');
    } else {
      this.filteredTaskList = this.taskList; 
    }
  }

  onClickTask(task: Task) {
    this.modalSvc.open(TaskDetailComponent, {
      data: task,
      maxWidth: 400,
      minWidth: 400,
      maxHeight: 520,
      minHeight: 520
    });
  }

  onClickGroupDetail() {
    this.modalSvc.open(GroupDetailComponent, {
      data: {members: this.members, groupName: this.groupName},
      maxWidth: 400,
      minWidth: 400,
      maxHeight: 520,
      minHeight: 520
    });
  }

  onClickAdminGroup(){
    this.modalSvc.open(AdminGroupComponent, {
      data: {members: this.members, groupName: this.groupName, description: this.group.description, id: this.group.id},
      maxWidth: 450,
      minWidth: 450,
      maxHeight: 550,
      minHeight: 550
    });
  }

  onClickNewTask(): void {
    const dialogRef = this.modalSvc.open(AddTaskComponent, {maxWidth: 300, minWidth: 300, maxHeight: 420, minHeight: 420});
    dialogRef.afterClosed().subscribe(() => {
      this.loadUserTasks(); 
    });
  }

  onCode(): void {
    this.modalSvc.open(AddMemberComponent, {data:{id: this.group.id},maxWidth: 300, minWidth: 300, maxHeight: 420, minHeight: 420});
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  
}
