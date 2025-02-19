import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private router: Router) {}

  isAuthenticated(): boolean {
    return this.isLocalStorageAvailable() && !!localStorage.getItem('authToken');
  }

  saveToken(token: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('authToken', token);
      document.cookie = `authToken=${token}; path=/;`;
    }
  }

  getToken(): string | null {
    return this.isLocalStorageAvailable() ? localStorage.getItem('authToken') : null;
  }

  private isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  logout(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      sessionStorage.clear();
    }            
    document.cookie = 'authToken=; Max-Age=0; path=/'; 
    this.router.navigate(['/login']);      
  }
}

