import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { ServiceApiService } from '../../../../services/service-api.service';

import { NzMessageService } from 'ng-zorro-antd/message';


import { ToastService } from '../../../../services/toast.service'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from "sweetalert2";



@Component({
  selector: 'app-langue',
  templateUrl: './langue.component.html',
  styleUrls: ['./langue.component.scss']
})
export class LangueComponent implements OnInit {

  userConnect:any = {};
  ListLangue:any = [];

  shobtn:boolean = false;

  titleBtn:any = "";
  titleModif:any
  ConfirmPassword:any;
  isVisibler:boolean =false;
  isVisibleLock:boolean =false;

  langueId:any=null

  isOkLoading = false;

  isVisible = false;
  isVisibleRegister =  false
  isConfirmLoading = false;

  validateFormRegister!: FormGroup;

  constructor(private msg: NzMessageService,private fb: FormBuilder,private router: Router,private toastr: ToastrService,private ServiceApiService:ServiceApiService , private ToastService:ToastService) { }


  ngOnInit() {
    this.getAllLangue();

    this.validateFormRegister = this.fb.group({
      libLangue: [null, [Validators.required]],
    });
  }



  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateFormRegister.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  showSuccess(msg:any) {
    this.toastr.success(msg);
  }

  showDanger(msg:any){
    this.toastr.error(msg);
  }

  showModalRegister(langue?:any): void {
    this.isVisible = true;
    this.titleModif = "Création d'une langue";
    this.titleBtn = "Sauvegarder";
      console.log('validateFormRegister',this.validateFormRegister.value);
    if (langue) {
      this.shobtn = true;
      this.titleModif = "Modification d'une langue";
      this.titleBtn = "Modifier";
      this.langueId = langue.idLangue;
      console.log('langue====>',langue);
      this.validateFormRegister.patchValue( { ...langue })
    }
  }


handleOkRegiter(): void {
    if (this.langueId) {
      this.confirmSubmitUpdateLangue()
    }else{
      this.confirmSubmitCreateLangue();
    }
  }

  handleCancel(): void {
    this.isVisible = false;
    this.validateFormRegister.reset()
  }

  getAllLangue(){
    let endPoint = "langue"
    this.ServiceApiService.get(endPoint).subscribe(
      (response:any) => {
        this.ListLangue = response;
        console.log('ListLangue', this.ListLangue);
      },
      (error:any) => {
        console.log('error',error);
      }
    );
  }

  DeleteLangue(langue?:any){
    const endPoint = "langue";
    if (langue) {
      this.ServiceApiService.delete(endPoint,langue.idLangue).subscribe(
        (response:any) => {
          console.log('la langue bien supprimé', response);
          if(response.statusCode == 200){
            this.showSuccess(response.message);
            this.getAllLangue();
          }else if(response.statusCode == 400 ){
            this.showDanger(response.message);
          }
          else if(response.statusCode == 201 ){
            this.showDanger(response.message);
          }
        },
        (error:any) => {
          this.showDanger(error.message);
          console.log('error',error);
        }
      );
    } else {
      Object.values(this.validateFormRegister.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  submitFormLangue(): void {
    let endPoint = "langue/add"
    if (this.validateFormRegister.valid) {
      this.isConfirmLoading = true;
      this.ServiceApiService.post(endPoint,this.validateFormRegister.value).subscribe(
        (response:any) => {
          console.log('langue bien enregistrer', response.statusCode);
          if(response.statusCode === 200){
            this.showSuccess(response.message);
            this.isVisible = false;
            this.isConfirmLoading = false
            this.validateFormRegister.reset()
            this.getAllLangue();
          }else if(response.statusCode === 400 ){
            this.showDanger(response.message);
            this.isVisible = true;
            this.isConfirmLoading = false
          }else if(response.statusCode === 201 ){
            this.showDanger(response.message);
            this.isVisible = true;
            this.isConfirmLoading = false
          }
        },
        (error:any) => {
          this.showDanger(error.message);
          this.isVisible = true;
          this.isConfirmLoading = false
          console.log('error',error);
        }
      );
    } else {
      Object.values(this.validateFormRegister.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }


  UpdateLangue(){
    const endPoint = "langue";
    if (this.validateFormRegister.valid) {
      this.isConfirmLoading = true;
      this.ServiceApiService.put(endPoint,this.langueId,this.validateFormRegister.value).subscribe(
        (response:any) => {
          console.log('langue bien modifier', response);
          if(response.statusCode == 200){
            this.showSuccess(response.message);
            this.isVisible = false;
            this.isConfirmLoading = false
            this.validateFormRegister.reset()
            this.getAllLangue();
          }else if(response.statusCode == 400 ){
            this.showDanger(response.message);
            this.isVisible = true;
            this.isConfirmLoading = false
          }
          else if(response.statusCode == 201 ){
            this.showDanger(response.message);
            this.isVisible = true;
            this.isConfirmLoading = false
          }
        },
        (error:any) => {
          this.showDanger(error.message);
          this.isVisible = true;
          this.isConfirmLoading = false
          console.log('error',error);
        }
      );
    } else {
      Object.values(this.validateFormRegister.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }


  confirmSubmitCreateLangue(langue?:any) {
    Swal.fire({
      text : "Voulez-vous poursuivre cette action ?",
      icon : 'warning',
      showCancelButton : true,
      confirmButtonText : "Oui",
      cancelButtonText : "Non",
      width : '350px',
    }).then((result) => {
      if (result.value) {
        this.submitFormLangue();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  confirmSubmitUpdateLangue(langue?:any) {
    Swal.fire({
      text : "Voulez-vous poursuivre cette modification ?",
      icon : 'warning',
      showCancelButton : true,
      confirmButtonText : "Oui",
      cancelButtonText : "Non",
      width : '350px',
    }).then((result) => {
      if (result.value) {
        this.UpdateLangue();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }


  confirmSubmitDeletLangue(langue?:any){
    Swal.fire({
      text : "Voulez-vous poursuivre cette modification ?",
      icon : 'warning',
      showCancelButton : true,
      confirmButtonText : "Oui",
      cancelButtonText : "Non",
      width : '350px',
    }).then((result) => {
      if (result.value) {
        this.DeleteLangue(langue);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.validateFormRegister.controls.checkPassword.updateValueAndValidity());
  }


}
