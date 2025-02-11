import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent { 
  username: string = '';
  password: string = '';

  constructor(private router: Router) {} 

  register() {
    console.log('Usuario:', this.username);
    console.log('Contraseña:', this.password);
    alert('Registrando usuario...');

    this.router.navigate(['/login']);

  }

  login() {
    alert('Moviendo a login...');
    this.router.navigate(['/login']);
  }

}
