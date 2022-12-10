import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { ServiceApiService } from '../../../../services/service-api.service';

import { NzMessageService } from 'ng-zorro-antd/message';


import { ToastService } from '../../../../services/toast.service'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from "sweetalert2";
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss']
})

export class UtilisateurComponent implements OnInit {

  userConnect:any = {};
  ListUser:any = [];
  ListRole:any = [];

  shobtn:boolean = false;

  titleBtn:any = "";
  titleModif:any
  ConfirmPassword:any;
  isVisibler:boolean =false;
  isVisibleLock:boolean =false;

  userId:any=null

  isOkLoading = false;

  isVisible = false;
  isVisibleRegister =  false
  isConfirmLoading = false;

  // validateForm!: FormGroup;
  validateFormRegister!: FormGroup;

  constructor(private msg: NzMessageService,private fb: FormBuilder,private router: Router,private toastr: ToastrService,private ServiceApiService:ServiceApiService , private ToastService:ToastService) { }

  ngOnInit() {
    this.getAllRole();
    this.getAllUser();

    this.validateFormRegister = this.fb.group({
      login: [null, [Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      nom: [null, [Validators.required]],
      prenom: [null, [Validators.required]],
      email: [null, [Validators.email ,Validators.required]],
      contact: [null, [Validators.required]],
      idRole:[null,[Validators.required]]
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

  showModalRegister(user?:any): void {
    this.isVisible = true;
    this.titleModif = "Création d'un compte utilisateur";
    this.titleBtn = "Sauvegarder";
    if (user) {
      this.shobtn = true;
      this.titleModif = "Modification d'un compte utilisateur";
      this.titleBtn = "Modifier";
      this.userId = user.id
      console.log('user====>',user);
      this.validateFormRegister.patchValue( { ...user }),
      this.validateFormRegister.controls['idRole'].setValue(user.role.idRole),
      console.log('validateFormRegister',this.validateFormRegister.value);
      console.log('validateFormRegister=====',this.validateFormRegister.controls['password'].value);

    }
  }


  handleOkRegiter(): void {
if (this.userId) {

  this.confirmSubmitUpdateUser()
}else{

  this.confirmSubmitCreateUser();
}


  }

  handleCancel(): void {
    this.isVisible = false;
    this.validateFormRegister.reset()
  }


  // showModal1sRegister(bqt?:any): void {
  //   this.isVisibler = true;
  //   this.titleModif = "Création d'un compte utilisateur";
  // }

  getAllUser(){
    let endPoint = "user"
    this.ServiceApiService.get(endPoint).subscribe(
      (response:any) => {
        this.ListUser = response;
        console.log('ListUser', this.ListUser);
      },
      (error:any) => {
        console.log('error',error);
      }
    );
  }

  getAllRole(){
    let endPoint = "role"
    this.ServiceApiService.get(endPoint).subscribe(
      (response:any) => {
        this.ListRole = response;
        console.log('ListRole', this.ListRole, response.status);
      },
      (error:any) => {
        console.log('error',error);
      }
    );
  }


  DeleteRegistration(user?:any){
    const endPoint = "user";
    if (user) {
      this.ServiceApiService.delete(endPoint,user.id).subscribe(
        (response:any) => {
          console.log('utilisateur bien supprimé', response);
          if(response.statusCode == 200){
            this.showSuccess(response.message);
            this.getAllUser()
          }else if(response.statusCode == 201 ){
            this.showDanger(response.message);
          } else if (response.statusCode == 400 ) {
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


  //enregistrement d'un utilisateur
  submitFormRegister(): void {
    let endPoint = "user/add"
    if (this.validateFormRegister.valid) {
      this.isConfirmLoading = true;
      this.ServiceApiService.post(endPoint,this.validateFormRegister.value).subscribe(
        (response:any) => {
          console.log('utilisateur bien enregistrer', response);
          if(response.statusCode == 200){
            this.showSuccess(response.message);
            this.isVisible = false;
            this.isConfirmLoading = false
            this.validateFormRegister.reset()
            this.getAllUser()
          }else if(response.statusCode == 400 ){
            this.showDanger(response.message);
            this.isVisible = true;
            this.isConfirmLoading = false
          }else if(response.statusCode == 204 ){
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


  UpdateRegistration(){
    const endPoint = "user";
    // return;
    if (this.validateFormRegister.valid) {
      this.isConfirmLoading = true;
      this.ServiceApiService.put(endPoint,this.userId,this.validateFormRegister.value).subscribe(
        (response:any) => {
          console.log('utilisateur bien modifier', response);
          if(response.statusCode === 200){
            this.showSuccess(response.message);
            this.isVisible = false;
            this.isConfirmLoading = false
            this.validateFormRegister.reset()
            this.getAllUser()
          }else if(response.statusCode === 400 ){
            this.showDanger(response.message);
            this.isVisible = true;
            this.isConfirmLoading = false
          } else if (response.statusCode === 204 ) {
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



  confirmSubmitCreateUser(typeuser?:any) {
    Swal.fire({
      text : "Voulez-vous poursuivre cette action ?",
      icon : 'warning',
      showCancelButton : true,
      confirmButtonText : "Oui",
      cancelButtonText : "Non",
      width : '350px',
    }).then((result) => {
      if (result.value) {
        this.submitFormRegister();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  confirmSubmitUpdateUser(user?:any) {
    Swal.fire({
      text : "Voulez-vous poursuivre cette modification ?",
      icon : 'warning',
      showCancelButton : true,
      confirmButtonText : "Oui",
      cancelButtonText : "Non",
      width : '350px',
    }).then((result) => {
      if (result.value) {
        this.UpdateRegistration();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  confirmSubmitDeletUser(user?:any){
    Swal.fire({
      text : "Voulez-vous poursuivre cette modification ?",
      icon : 'warning',
      showCancelButton : true,
      confirmButtonText : "Oui",
      cancelButtonText : "Non",
      width : '350px',
    }).then((result) => {
      if (result.value) {
        this.DeleteRegistration(user);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }





  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.validateFormRegister.controls.checkPassword.updateValueAndValidity());
  }

}
