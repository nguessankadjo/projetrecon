import { Component, Input, OnInit,ElementRef,ViewChild  } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { ServiceApiService } from 'src/app/services/service-api.service';
import { ToastService } from 'src/app/services/toast.service';

import * as moment from "moment";
moment.locale('fr');


@Component({
  selector: 'app-mise-a-jour',
  templateUrl: './mise-a-jour.component.html',
  styleUrls: ['./mise-a-jour.component.scss']
})
export class MiseAJourComponent implements OnInit {

  isVisible:boolean =false;
  newMontant:any;
  isOkLoading = false;
  dataModif:any = {}
  disableBtn:boolean = false;

  @ViewChild('printe') printe!: ElementRef;
  dataFacture:any = {};

  OnFacture:any = {}

  @Input()
  ListFactureMajChield:any

  constructor(private toastr: ToastrService,private ServiceApiService:ServiceApiService , private ToastService:ToastService) { }

  ngOnInit() {
    // console.log('ListFactureMaj', this.ListFactureMaj);

  }


  handleCancel(): void {
    this.isVisible = false;
    this.dataModif = {};
    this.newMontant = ""
  }

  handleOkRegiter(){

  }

  showSuccess(msg:any) {
    this.toastr.success(msg);
  }

  showDanger(msg:any){
    this.toastr.error(msg);
  }


  printFacture(data:any){
    this.triggerPrinte(data);
    //les actions que tu fais , sinon

    }

    public triggerPrinte(data:any): void {
        this.printe.nativeElement.click();
    this.dataFacture = data

    }

  showModalRegister(fact?:any): void {
    this.isVisible = true;
    console.log('fact==', fact);
    this.dataModif =  fact;

    this.getInfoEdit(fact.idFact)
    console.log('fact==', fact.idFact);
    }

    getEventChange(event:any){
      console.log('event', event);

      if (event && event.length > 0) {
        this.disableBtn =  true
      }

      if (!event) {
        this.disableBtn =  false
      }
    }

    refresh(): void {
      window.location.reload();
  }


    updateValide(){
      const endPoint = "facture/etat";
      let data = {
        idEtat: 3
       }
      if (!this.newMontant) {
        this.ServiceApiService.put(endPoint,this.dataModif.idFact,data).subscribe(
          (response:any) => {
            console.log('facture status validé', response);
              this.showSuccess(response.message);
              this.isVisible = false;
              this.refresh()
          },
          (error:any) => {
            this.showDanger(error.message);
            this.isVisible = true;
            console.log('error',error);
          }
        );
      }
    }

    updateRejeter(){
      const endPoint = "facture/etat";
      let data = {
        idEtat: 2
       }
      if (!this.newMontant) {
        this.ServiceApiService.put(endPoint,this.dataModif.idFact,data).subscribe(
          (response:any) => {
            console.log('facture status rejeter', response);
              this.showSuccess(response.message);
              this.isVisible = false;
              this.refresh()
          },
          (error:any) => {
            this.showDanger(error.message);
            this.isVisible = true;
            console.log('error',error);
          }
        );
      }
    }

    // updateValide(){
    //   const endPoint = "facture/etat";
    //   let data = {
    //     idEtat: 2
    //    }
    //   // return;
    //   if (this.newMontant) {
    //     this.ServiceApiService.put(endPoint,this.dataModif.idFact,data).subscribe(
    //       (response:any) => {
    //         console.log('facture status validé', response);
    //           this.showSuccess(response.message);
    //           this.isVisible = false;
    //           // this.getAllUser()
    //       },
    //       (error:any) => {
    //         this.showDanger(error.message);
    //         this.isVisible = true;
    //         console.log('error',error);
    //       }
    //     );
    //   }
    // }

    updateEncours(){
      const endPoint = "facture/etat";
      let data = {
        idEtat: 1
       }
      if (!this.newMontant) {
        this.ServiceApiService.put(endPoint,this.dataModif.idFact,data).subscribe(
          (response:any) => {
            console.log('facture status rejeter', response);
              this.showSuccess(response.message);
              this.isVisible = false;
              this.refresh()
          },
          (error:any) => {
            this.showDanger(error.message);
            this.isVisible = true;
            console.log('error',error);
          }
        );
      }
    }

    getInfoEdit(fact:any){
      console.log('iddddd====', fact);

      let endPoint = "facture/infofact"
      this.ServiceApiService.getOptionFind(endPoint,fact).subscribe(
        (response:any) => {
          this.OnFacture = response;
          this.OnFacture.date = moment(  new Date()).format('LLL');
          console.log('On facture EN', this.OnFacture);
        },
        (error:any) => {
          console.log('error one',error);
        }
      );
    }

}
