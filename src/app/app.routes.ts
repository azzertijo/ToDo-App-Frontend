import { Routes } from '@angular/router';
import { LoginComponent } from './dashboard/pages/auth/login/login.component';
import { RegisterComponent } from './dashboard/pages/auth/register/register.component';
import { TaskListComponent } from './dashboard/pages/task-list/task-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GroupDetailComponent } from './dashboard/pages/group-detail/group-detail.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: '', 
    component: DashboardComponent, 
    children: [
      { path: 'personalTasks', component: TaskListComponent },
      { path: 'groupTasks/:id', component: TaskListComponent },
      { path: '', redirectTo: 'personalTasks', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
