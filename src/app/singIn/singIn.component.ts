import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { ServiceApiService } from '../services/service-api.service';
// import { SpinnerService } from '../services/Spinner.service';
// import { NgbModal, ModalDismissReasons,NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../services/toast.service'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from "sweetalert2";
import { Location } from '@angular/common';
import { UserService } from '../services/user.service';

import {NzUploadChangeParam , NzUploadFile } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
// import { fail } from 'assert';


@Component({
  selector: 'app-singIn',
  templateUrl: './singIn.component.html',
  styleUrls: ['./singIn.component.scss']
})

export class SingInComponent implements OnInit {

nameFIle:any="";
  userConnect:any = {};
  ListUser:any = [];
  titleModif:any
  ConfirmPassword:any;
  isVisibler:boolean =false;
  isVisibleLock:boolean =false;

  isOkLoading = false;

  isVisible = false;
  isVisibleRegister =  false
  isConfirmLoading = false;

  validateForm!: FormGroup;
  validateFormRegister!: FormGroup;

  constructor(private msg: NzMessageService,private fb: FormBuilder,public _location: Location,private userService: UserService,private router: Router,private toastr: ToastrService,private ServiceApiService:ServiceApiService , private ToastService:ToastService) {
    const url:any =  this.router.navigate(['/authenticate']);
    if(url){
      this.userService.logout();
      window.location.href = "#";
      return;
    }
     let userConnecter = this.userService.getUserSession()
     if (!userConnecter){
      this.router.navigate(['/authenticate']);;
      window.location.href = "#";
      return;
    }
  }


  ngOnInit() {
    this.validateForm = this.fb.group({
      login: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });

    this.validateFormRegister = this.fb.group({
      login: [null, [Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      nom: [null, [Validators.required]],
      prenom: [null, [Validators.required]],
      email: [null, [Validators.email ,Validators.required]],
      contact: [null, [Validators.required]],
      idRole:[null,]
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

  showModalRegister(): void {
    this.isVisible = true;
    this.titleModif = "Création d'un compte utilisateur";
  }


  handleOkRegiter(): void {
    // this.isConfirmLoading = true;
    // this.isVisible = false;
    // this.isConfirmLoading = false;
    this.submitFormRegister();

  }

  handleCancel(): void {
    this.isVisible = false;
    this.validateFormRegister.reset()
  }


  showModal1sRegister(bqt?:any): void {
    this.isVisibler = true;
    this.titleModif = "Création d'un compte utilisateur";
  }


  //enregistrement d'un utilisateur
  submitFormRegister(): void {
    let endPoint = "user/add"
    if (this.validateFormRegister.valid) {
      this.isOkLoading = true;
      const value= {
        ...this.validateFormRegister.value,
        idRole: 1
      };
      console.log('value==>', value);
      this.ServiceApiService.post(endPoint,value).subscribe(
        (response:any) => {
          if(response.statusCode === 200){
          console.log('utilisateur bien enregistrer', response);
            this.showSuccess(response.message);
            this.isVisible = false;
            this.isOkLoading = false;
    this.validateFormRegister.reset();
          }else if (response.statusCode === 201) {
            this.showDanger(response.message);
            this.isVisible = true;
            this.isOkLoading = false
          }else if (response.statusCode === 400) {
            this.showSuccess(response.message);
            this.isVisible = true;
            this.isOkLoading = false
          }
        },
        (error:any) => {
          console.log('error',error);
          this.showDanger(error);
          this.isVisible = true;
          this.isOkLoading = false
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


  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.validateFormRegister.controls.checkPassword.updateValueAndValidity());
  }


//connexion d'un utilsateur
  submitFormLogin(): void {
    const endPoint = "user/signin";
console.log(this.validateForm.value);

    if (this.validateForm.valid) {
      this.ServiceApiService.login(endPoint,{...this.validateForm.value}).subscribe(
        (response:any) => {
          console.log('utilisateur connecter', response);
          if(response.statusCode ===201){
            this.showDanger(response.message);
          }else if (response.statusCode === 200) {
            console.log('response login', response);
            this.showSuccess(response.message);
            this.userService.setUserSession(response.user);
            this.router.navigate(["tableau-de-bord"]);
          }else if (response.statusCode===204) {
            this.showDanger(response.message)
          }
        },
        (error:any) => {
          console.log('error===>',error);
        }
      );
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }



}
