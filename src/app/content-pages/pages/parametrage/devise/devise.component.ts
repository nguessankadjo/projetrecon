import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { ServiceApiService } from '../../../../services/service-api.service';

import { NzMessageService } from 'ng-zorro-antd/message';


import { ToastService } from '../../../../services/toast.service'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from "sweetalert2";

@Component({
  selector: 'app-devise',
  templateUrl: './devise.component.html',
  styleUrls: ['./devise.component.scss']
})
export class DeviseComponent implements OnInit {


  ListDevise:any = [];

  shobtn:boolean = false;

  titleBtn:any = "";
  titleModif:any

  deviseId:any=null

  isOkLoading = false;

  isVisible = false;
  isVisibleRegister =  false
  isConfirmLoading = false;

  validateFormRegister!: FormGroup;

  constructor(private msg: NzMessageService,private fb: FormBuilder,private router: Router,private toastr: ToastrService,private ServiceApiService:ServiceApiService , private ToastService:ToastService) { }

  ngOnInit() {
    this.getAllDevise();

    this.validateFormRegister = this.fb.group({
      libDevise: [null, [Validators.required]],
      value: [null, [Validators.required]],
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
  //
  showModalRegister(devise?:any): void {
    this.isVisible = true;
    this.titleModif = "Création d'une devise";
    this.titleBtn = "Sauvegarder";
      console.log('validateFormRegister',this.validateFormRegister.value);
    if (devise) {
      this.shobtn = true;
      this.titleModif = "Modification d'une devise";
      this.titleBtn = "Modifier";
      this.deviseId = devise.idDevise;
      this.validateFormRegister.patchValue( { ...devise }),
      console.log('devise====>',devise);
      console.log('validateFormRegister=====',this.validateFormRegister.controls['password'].value);
    }
  }


handleOkRegiter(): void {
    if (this.deviseId) {
      this.confirmSubmitUpdateDevise()
    }else{
      this.confirmSubmitCreateDevise();
    }
  }

  handleCancel(): void {
    this.isVisible = false;
    this.validateFormRegister.reset()
  }



  getAllDevise(){
    let endPoint = "devise"
    this.ServiceApiService.get(endPoint).subscribe(
      (response:any) => {
        this.ListDevise = response;
        console.log('ListDevise', this.ListDevise);
      },
      (error:any) => {
        console.log('error',error);
      }
    );
  }


  DeleteDevise(devise?:any){
    const endPoint = "devise";
    if (devise) {
      this.ServiceApiService.delete(endPoint,devise.idDevise).subscribe(
        (response:any) => {
          console.log('utilisateur bien supprimé', response);
          if(response.statusCode == 200){
            this.showSuccess(response.message);
            this.getAllDevise();
          }else if(response.statusCode == 400 ){
            this.showDanger(response.message);
          }
          else if (response.statusCode ===  201) {
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

  submitFormDevise(): void {
    let endPoint = "devise/add"
    console.log('this.validateFormRegister.value', this.validateFormRegister.value);
    if (this.validateFormRegister.valid) {
      this.isConfirmLoading = true;
      this.ServiceApiService.post(endPoint,this.validateFormRegister.value).subscribe(
        (response:any) => {
          console.log('devise bien enregistrer', response.statusCode);
          if(response.statusCode === 200){
            this.showSuccess(response.message);
            this.isVisible = false;
            this.isConfirmLoading = false
            this.validateFormRegister.reset()
            this.getAllDevise();
          }else if(response.statusCode === 201 ){
            this.showDanger(response.message);
            this.isVisible = true;
            this.isConfirmLoading = false
          } else if (response.statusCode === 400) {
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


  UpdateDevise(){
    const endPoint = "devise";
    if (this.validateFormRegister.valid) {
      this.isConfirmLoading = true;
      this.ServiceApiService.put(endPoint,this.deviseId,this.validateFormRegister.value).subscribe(
        (response:any) => {
          console.log('devise bien modifier', response);
          if(response.statusCode == 200){
            this.showSuccess(response.message);
            this.isVisible = false;
            this.isConfirmLoading = false
            this.validateFormRegister.reset()
            this.getAllDevise();
          }else if(response.statusCode == 400 ){
            this.showDanger(response.message);
            this.isVisible = true;
            this.isConfirmLoading = false;
          }else if (response.statusCode === 201) {
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


  confirmSubmitCreateDevise(typeuser?:any) {
    Swal.fire({
      text : "Voulez-vous poursuivre cette action ?",
      icon : 'warning',
      showCancelButton : true,
      confirmButtonText : "Oui",
      cancelButtonText : "Non",
      width : '350px',
    }).then((result) => {
      if (result.value) {
        this.submitFormDevise();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  confirmSubmitUpdateDevise(filiale?:any) {
    Swal.fire({
      text : "Voulez-vous poursuivre cette modification ?",
      icon : 'warning',
      showCancelButton : true,
      confirmButtonText : "Oui",
      cancelButtonText : "Non",
      width : '350px',
    }).then((result) => {
      if (result.value) {
        this.UpdateDevise();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }


  confirmSubmitDeletDevise(devise?:any){
    Swal.fire({
      text : "Voulez-vous poursuivre cette modification ?",
      icon : 'warning',
      showCancelButton : true,
      confirmButtonText : "Oui",
      cancelButtonText : "Non",
      width : '350px',
    }).then((result) => {
      if (result.value) {
        this.DeleteDevise(devise);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  // updateConfirmValidator(): void {
  //   Promise.resolve().then(() => this.validateFormRegister.controls.checkPassword.updateValueAndValidity());
  // }

}
