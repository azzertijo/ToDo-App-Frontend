import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  providers: [CookieService], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private cookieService: CookieService
  ) {} 

  login() {
    console.log('Enviando credenciales:', this.username, this.password);
  
    this.userService.login(this.username, this.password).subscribe({
      next: (response: any) => {
        console.log('Respuesta del backend:', response);
  
        const token = response.token;
        console.log('Token recibido desde el backend:', token);
  
        if (token) {
          localStorage.setItem('authToken', token);
        } else {
          console.warn('No se recibió un token en la respuesta');
        }
  
        this.router.navigate(['/personalTasks']);
      },
      error: (err) => {
        console.error('Error en login:', err);
        alert('Error al iniciar sesión. Verifica tus credenciales.');
      }
    });
  }

  register() {
    alert('Moviendo a registro...');
    this.router.navigate(['/register']);
  }
}
