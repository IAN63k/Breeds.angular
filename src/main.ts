import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations'; // o provideNoopAnimations
// import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { ShellComponent } from './app/features/breeds/components/shell/shell.component';

/*  interceptores propios, si los tienes  */
// import { apiKeyInterceptor } from './app/core/interceptors/api-key.interceptor';

bootstrapApplication(ShellComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),   // 👈  OBLIGATORIO
    // provideInterceptor(apiKeyInterceptor),       // (ejemplo)
    provideRouter(routes), 
    provideAnimations()                            // o provideNoopAnimations()
  ]
}).catch(err => console.error(err));
