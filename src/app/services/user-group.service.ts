import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGroupService {

  private isAdminSubject = new BehaviorSubject<boolean>(false); 
  isAdmin$ = this.isAdminSubject.asObservable(); 

  constructor() {}

  setIsAdmin(isAdmin: boolean): void {
    this.isAdminSubject.next(isAdmin); 
  }

  getIsAdmin(): boolean {
    return this.isAdminSubject.value; 
  }

}
