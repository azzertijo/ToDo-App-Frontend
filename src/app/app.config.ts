import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';


import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch} from '@angular/common/http';
import { TaskService } from './services/task.service';
import { routes } from './app.routes';
import { credentialsInterceptor } from './shared/interceptors/credentials.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideAnimations(), importProvidersFrom(MatDialogModule),provideHttpClient(withFetch()),
    TaskService,
    //{provide: HTTP_INTERCEPTORS, useClass: credentialsInterceptor, multi: true} 
  ],

};
