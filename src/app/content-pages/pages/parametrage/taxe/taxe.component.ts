import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { ServiceApiService } from '../../../../services/service-api.service';

import { NzMessageService } from 'ng-zorro-antd/message';


import { ToastService } from '../../../../services/toast.service'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from "sweetalert2";


@Component({
  selector: 'app-taxe',
  templateUrl: './taxe.component.html',
  styleUrls: ['./taxe.component.scss']
})
export class TaxeComponent implements OnInit {


  userConnect:any = {};
  ListFiliale:any = [];
  ListTaxe:any = [];
  // ListLangue:any = [];

  shobtn:boolean = false;

  titleBtn:any = "";
  titleModif:any
  ConfirmPassword:any;
  isVisibler:boolean =false;
  isVisibleLock:boolean =false;

  taxeId:any=null

  isOkLoading = false;

  isVisible = false;
  isVisibleRegister =  false
  isConfirmLoading = false;

  validateFormRegister!: FormGroup;

  constructor(private msg: NzMessageService,private fb: FormBuilder,private router: Router,private toastr: ToastrService,private ServiceApiService:ServiceApiService , private ToastService:ToastService) { }

  ngOnInit() {
    this.getAllFiliale();
    this.getAllTaxe();

    this.validateFormRegister = this.fb.group({
      libFiliale: [null, [Validators.required]],
      value: [null, [Validators.required]],
      idFiliale: [null, [Validators.required]],
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

  showModalRegister(taxe?:any): void {
    this.isVisible = true;
    this.titleModif = "Création d'une taxe";
    this.titleBtn = "Sauvegarder";
      console.log('validateFormRegister',this.validateFormRegister.value);
    if(taxe) {
      this.shobtn = true;
      this.titleModif = "Modification d'une taxe";
      this.titleBtn = "Modifier";
      this.taxeId = taxe.idTaxe;
      console.log('taxe====>',taxe);
      this.validateFormRegister.patchValue( { ...taxe }),
      this.validateFormRegister.controls['idDevise'].setValue(taxe.filiale.idFiliale);
    }
  }


handleOkRegiter(): void {
    if (this.taxeId) {
      this.confirmSubmitUpdateTaxe()
    }else{
      this.confirmSubmitCreateTaxe();
    }
  }

  handleCancel(): void {
    this.isVisible = false;
    this.validateFormRegister.reset()
  }

  getAllFiliale(){
    let endPoint = "filiale"
    this.ServiceApiService.get(endPoint).subscribe(
      (response:any) => {
        this.ListFiliale = response;
        console.log('ListFiliale', this.ListFiliale);
      },
      (error:any) => {
        console.log('error',error);
      }
    );
  }

  getAllTaxe(){
    let endPoint = "taxe"
    this.ServiceApiService.get(endPoint).subscribe(
      (response:any) => {
        this.ListTaxe = response;
        console.log('ListTaxe', this.ListTaxe);
      },
      (error:any) => {
        console.log('error',error);
      }
    );
  }


  DeleteTaxe(taxe?:any){
    const endPoint = "taxe";
    if (taxe) {
      this.ServiceApiService.delete(endPoint,taxe.idTaxe).subscribe(
        (response:any) => {
          console.log('utilisateur bien supprimé', response);
          if(response.statusCode == 200){
            this.showSuccess(response.message);
            this.getAllFiliale();
          }else if(response.statusCode == 400 ){
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

  submitFormTaxe(): void {
    let endPoint = "taxe/add"
    console.log('this.validateFormRegister.value', this.validateFormRegister.value);
    let value = {
      ...this.validateFormRegister.value
    }

    if (this.validateFormRegister.valid) {
      this.isConfirmLoading = true;
      this.ServiceApiService.post(endPoint,value).subscribe(
        (response:any) => {
          console.log('taxe bien enregistrer', response.status);
          if(response.statusCode === 200){
            this.showSuccess(response.message);
            this.isVisible = false;
            this.isConfirmLoading = false
            this.validateFormRegister.reset()
            this.getAllFiliale();
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


  UpdateTaxe(){
    const endPoint = "filiale";
    if (this.validateFormRegister.valid) {
      this.isConfirmLoading = true;
      this.ServiceApiService.put(endPoint,this.taxeId,this.validateFormRegister.value).subscribe(
        (response:any) => {
          console.log('filiale bien modifier', response);
          if(response.statusCode == 200){
            this.showSuccess(response.message);
            this.isVisible = false;
            this.isConfirmLoading = false
            this.validateFormRegister.reset()
            this.getAllFiliale();
          }else if(response.statusCode == 400 ){
            this.showDanger(response.message);
            this.isVisible = true;
            this.isConfirmLoading = false
          }else if(response.statusCode == 201 ){
            this.showDanger(response.message);
            this.isVisible = true;
            this.isConfirmLoading = false
          }
        },
        (error:any) => {
          this.showDanger(error.message);
          this.isVisible = true;
          this.isConfirmLoading = false
          console.log('error',error.message);
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


  confirmSubmitCreateTaxe(typeuser?:any) {
    Swal.fire({
      text : "Voulez-vous poursuivre cette action ?",
      icon : 'warning',
      showCancelButton : true,
      confirmButtonText : "Oui",
      cancelButtonText : "Non",
      width : '350px',
    }).then((result) => {
      if (result.value) {
        this.submitFormTaxe();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  confirmSubmitUpdateTaxe(taxe?:any) {
    Swal.fire({
      text : "Voulez-vous poursuivre cette modification ?",
      icon : 'warning',
      showCancelButton : true,
      confirmButtonText : "Oui",
      cancelButtonText : "Non",
      width : '350px',
    }).then((result) => {
      if (result.value) {
        this.UpdateTaxe();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }


  confirmSubmitDeletFiliale(taxe?:any){
    Swal.fire({
      text : "Voulez-vous poursuivre cette modification ?",
      icon : 'warning',
      showCancelButton : true,
      confirmButtonText : "Oui",
      cancelButtonText : "Non",
      width : '350px',
    }).then((result) => {
      if (result.value) {
        this.DeleteTaxe(taxe);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.validateFormRegister.controls.checkPassword.updateValueAndValidity());
  }


}
