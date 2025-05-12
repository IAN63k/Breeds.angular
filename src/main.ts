import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations'; // o provideNoopAnimations
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

/*  interceptores propios, si los tienes  */
// import { apiKeyInterceptor } from './app/core/interceptors/api-key.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),   // 👈  OBLIGATORIO
    // provideInterceptor(apiKeyInterceptor),       // (ejemplo)
    provideRouter(routes), 
    provideAnimations()                            // o provideNoopAnimations()
  ]
}).catch(err => console.error(err));
