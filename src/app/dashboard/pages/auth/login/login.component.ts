import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {} 

  login() {
    console.log('Usuario:', this.username);
    console.log('Contraseña:', this.password);
    alert('Iniciando sesión...');

    this.router.navigate(['/personalTasks']);

  }

  register() {
    alert('Moviendo a registro...');
    this.router.navigate(['/register']);
  }
}
