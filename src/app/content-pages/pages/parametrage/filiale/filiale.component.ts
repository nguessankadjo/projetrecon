import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { ServiceApiService } from '../../../../services/service-api.service';

import { NzMessageService } from 'ng-zorro-antd/message';


import { ToastService } from '../../../../services/toast.service'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from "sweetalert2";

@Component({
  selector: 'app-filiale',
  templateUrl: './filiale.component.html',
  styleUrls: ['./filiale.component.scss']
})
export class FilialeComponent implements OnInit {

  userConnect:any = {};
  ListFiliale:any = [];
  ListDevise:any = [];
  ListLangue:any = [];

  shobtn:boolean = false;

  titleBtn:any = "";
  titleModif:any
  ConfirmPassword:any;
  isVisibler:boolean =false;
  isVisibleLock:boolean =false;

  filialeId:any=null

  isOkLoading = false;

  isVisible = false;
  isVisibleRegister =  false
  isConfirmLoading = false;

  validateFormRegister!: FormGroup;

  constructor(private msg: NzMessageService,private fb: FormBuilder,private router: Router,private toastr: ToastrService,private ServiceApiService:ServiceApiService , private ToastService:ToastService) { }

  ngOnInit() {
    this.getAllFiliale();
    this.getAllDevise();
    this.getAllLangue();

    this.validateFormRegister = this.fb.group({
      libFiliale: [null, [Validators.required]],
      sigle: [null, [Validators.required]],
      idDevise: [null, [Validators.required]],
      idLangue:[null,[Validators.required]]
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

  showModalRegister(filiale?:any): void {
    this.isVisible = true;
    this.titleModif = "Création d'une filiale";
    this.titleBtn = "Sauvegarder";
      console.log('validateFormRegister',this.validateFormRegister.value);
      // return
    if (filiale) {
      this.shobtn = true;
      this.titleModif = "Modification d'une filiale";
      this.titleBtn = "Modifier";
      this.filialeId = filiale.idFiliale;
      console.log('filiale====>',filiale);
      this.validateFormRegister.patchValue( { ...filiale }),
      this.validateFormRegister.controls['idDevise'].setValue(filiale.devise.idDevise),
      this.validateFormRegister.controls['idLangue'].setValue(filiale.langue.idLangue),
      console.log('validateFormRegister=====',this.validateFormRegister.controls['password'].value);
    }
  }


handleOkRegiter(): void {
    if (this.filialeId) {
      this.confirmSubmitUpdateFiliale()
    }else{
      this.confirmSubmitCreateFiliale();
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


  DeleteFiliale(filiale?:any){
    const endPoint = "filiale";
    if (filiale) {
      this.ServiceApiService.delete(endPoint,filiale.idFiliale).subscribe(
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

  submitFormFiliale(): void {
    let endPoint = "filiale/add"
    console.log('this.validateFormRegister.value', this.validateFormRegister.value);
    if (this.validateFormRegister.valid) {
      this.isOkLoading = true;
      this.ServiceApiService.post(endPoint,this.validateFormRegister.value).subscribe(
        (response:any) => {
          console.log('filiale bien enregistrer', response.status);
          if(response.statusCode === 200){
            this.showSuccess(response.message);
            this.isVisible = false;
            this.isOkLoading = false
            this.validateFormRegister.reset()
            this.getAllFiliale();
          }else if(response.statusCode === 400 ){
            this.showDanger(response.message);
            this.isVisible = true;
            this.isOkLoading = false
          }
        },
        (error:any) => {
          this.showDanger(error.message);
          this.isVisible = true;
          this.isOkLoading = false
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


  UpdateFiliale(){
    const endPoint = "filiale";
    if (this.validateFormRegister.valid) {
      this.isOkLoading = true;
      this.ServiceApiService.put(endPoint,this.filialeId,this.validateFormRegister.value).subscribe(
        (response:any) => {
          console.log('filiale bien modifier', response);
          if(response.statusCode == 200){
            this.showSuccess(response.message);
            this.isVisible = false;
            this.isOkLoading = false
            this.validateFormRegister.reset()
            this.getAllFiliale();
          }else if(response.statusCode == 400 ){
            this.showDanger(response.message);
            this.isVisible = true;
            this.isOkLoading = false
          }
        },
        (error:any) => {
          this.showDanger(error.message);
          this.isVisible = true;
          this.isOkLoading = false
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


  confirmSubmitCreateFiliale(typeuser?:any) {
    Swal.fire({
      text : "Voulez-vous poursuivre cette action ?",
      icon : 'warning',
      showCancelButton : true,
      confirmButtonText : "Oui",
      cancelButtonText : "Non",
      width : '350px',
    }).then((result) => {
      if (result.value) {
        this.submitFormFiliale();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  confirmSubmitUpdateFiliale(filiale?:any) {
    Swal.fire({
      text : "Voulez-vous poursuivre cette modification ?",
      icon : 'warning',
      showCancelButton : true,
      confirmButtonText : "Oui",
      cancelButtonText : "Non",
      width : '350px',
    }).then((result) => {
      if (result.value) {
        this.UpdateFiliale();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }


  confirmSubmitDeletFiliale(filiale?:any){
    Swal.fire({
      text : "Voulez-vous poursuivre cette modification ?",
      icon : 'warning',
      showCancelButton : true,
      confirmButtonText : "Oui",
      cancelButtonText : "Non",
      width : '350px',
    }).then((result) => {
      if (result.value) {
        this.DeleteFiliale(filiale);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.validateFormRegister.controls.checkPassword.updateValueAndValidity());
  }


}
