import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { requestHeaderInterceptor } from './core/interceptors/requestHeader/request-header.interceptor';
import { responseErrorInterceptor } from './core/interceptors/responseError/response-error.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { spinnerInterceptor } from './core/interceptors/spinner/spinner.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions(), withHashLocation(), withInMemoryScrolling({scrollPositionRestoration: 'top'})),
    provideHttpClient(withFetch(), withInterceptors([requestHeaderInterceptor, responseErrorInterceptor, spinnerInterceptor])),
    importProvidersFrom(BrowserAnimationsModule, NgxSpinnerModule),
    provideToastr(),
    provideClientHydration(withEventReplay())]
};
