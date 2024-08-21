import { Component, ErrorHandler } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './layout/header/header.component';
import SpinnerComponent from '@shared/components/spinner.component';
import GlobalErrorHandler from '@shared/services/globalErrorHandling/globalErrorHandler.service';
import { SpinnerInterceptor } from '@shared/interceptors/spinner.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, HeaderComponent, SpinnerComponent],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useValue: SpinnerInterceptor, multi: true },
  ],
})
export class AppComponent {}
