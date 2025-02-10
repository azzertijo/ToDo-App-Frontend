import { Routes } from '@angular/router';
import { LoginComponent } from './dashboard/pages/auth/login/login.component';
import { RegisterComponent } from './dashboard/pages/auth/register/register.component';
import { TaskListComponent } from './dashboard/pages/task-list/task-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'tasks', component: TaskListComponent },
  { path: '**', redirectTo: 'login' } 
];