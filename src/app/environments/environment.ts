import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

export const environment = {
    production: false,
    apiBaseUrl: 'https://api.thedogapi.com/v1',
    apiKey: 'live_X6YlQD0kIXOWj9LHhUwnb1gpDYRXYn69aS7u3t8v484VuyXSie1uyhYWQNCIHYNK'
    // apiKey: process.env["API_KEY"] // puede venir de un secret .env si usas ngx-dotenv o similar
};


@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const apiReq = req.clone({  
            setHeaders: { 'x-api-key': environment.apiKey }
        });
        return next.handle(apiReq);
    }
}