import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { AuthService } from '../../../../services/auth.service';

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
  


  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/personalTasks']);
    }
  }

  login() {
    console.log('Enviando credenciales:', this.username, this.password);
  
    this.userService.login(this.username, this.password).subscribe({
      next: (response: any) => {
        console.log('Respuesta del backend:', response);
  
        const token = response.auth_token;
        console.log('Token recibido desde el backend:', token);
  
        if (token) {
          this.authService.saveToken(token); 
          this.router.navigate(['/personalTasks']);
        } else {
          console.warn('No se recibió un token o la información del usuario en la respuesta');
        }
      },
      error: (err) => {
        console.error('Error en login:', err);
        alert('Error al iniciar sesión. Verifica tus credenciales.');
      }
    });
  }

  register() {
    this.router.navigate(['/register']);
  }
}

