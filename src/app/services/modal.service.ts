import { ComponentType } from "@angular/cdk/portal";
import { inject, Injectable, TemplateRef } from "@angular/core";
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Injectable({providedIn: 'root'})
export class ModalService {
  
   private readonly dialog = inject(MatDialog);

   constructor() { }

   open<T, D=any, R=any>(
    component: ComponentType<T>,
    config?: MatDialogConfig<D>
   ): MatDialogRef<T, R> {
    return this.dialog.open(component, config);
   }
    
}