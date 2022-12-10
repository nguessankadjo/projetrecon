import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toasts: any[] = [];

constructor() { }



  show(text: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ text, ...options });
  }

  remove(toas:any) {
    this.toasts = this.toasts.filter(t => t !== toas);
  }

}
