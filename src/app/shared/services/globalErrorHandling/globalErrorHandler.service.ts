import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export default class GlobalErrorHandler implements ErrorHandler {

  handleError(error: any): void {
    console.error('Global Error Handler:', error);
  }

}
