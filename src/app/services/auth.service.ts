import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private router: Router) {}

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');  
  }

  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
    //localStorage.setItem('user', JSON.stringify(user));
    document.cookie = `authToken=${token}; path=/;`; 
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  logout(): void {
    localStorage.removeItem('authToken');  
    localStorage.removeItem('user');       
    sessionStorage.clear();                
    document.cookie = 'authToken=; Max-Age=0; path=/'; 
    this.router.navigate(['/login']);      
  }
}

