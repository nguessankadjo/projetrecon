import { Injectable } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(private spinner: NgxSpinnerService) {}


showSpinner(){
  this.spinner.show(undefined, {
    size: 'large',
    color: '#ff7900',
    fullScreen: true
  });
}

hideSpinner(){
  this.spinner.hide()
}

}
