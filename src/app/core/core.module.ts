import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ApiKeyInterceptor } from "../environments/environment";

providers: [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ApiKeyInterceptor,
        multi: true
    }
]

