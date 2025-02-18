import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../interfaces/user';

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

  constructor(private router: Router, private readonly userService: UserService) {} 

  register() {
    //console.log('Usuario:', this.username);
    //console.log('Contraseña:', this.password);
    //alert('Registrando usuario...');
    const user = this.username;
    const pass = this.password;
    this.userService.register(user, pass).subscribe((response: User) => {
          console.log(response);
          alert('Usuario registrado con éxito');
    });

    //this.router.navigate(['/login']);

  }

  login() {
    alert('Moviendo a login...');
    this.router.navigate(['/login']);
  }

}
