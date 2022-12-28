
import { AfterViewInit, Component, OnInit } from '@angular/core';
// import { Chart } from 'angular-highcharts';

import {Chart} from 'chart.js'


import { ServiceApiService } from '../../../services/service-api.service';

import { NzMessageService } from 'ng-zorro-antd/message';


import { ToastService } from '../../../services/toast.service'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from "sweetalert2";
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

// import * as Highcharts from 'highcharts';
// import { Chart } from 'angular-highcharts';
// import { Options } from 'highcharts';

import * as Highcharts from 'highcharts';


import { donutChartOptions } from './helpers/donutChartOptions';

import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormControlName,
} from '@angular/forms';
import { SpinnerService } from 'src/app/services/Spinner.service';
// var randomColor = require("randomcolor");
@Component({
  selector: 'app-editer',
  templateUrl: './editer.component.html',
  styleUrls: ['./editer.component.scss']
})
export class EditerComponent implements OnInit , AfterViewInit {

  userConnect:any = {};
  statistic:any=[]
  staticEtat:any=[];
  staticHistori:any = [];

  checked = false;
  indeterminate = false;
  listOfCurrentPageData: any = [];
  listOfData:any =  [];
  setOfCheckedId = new Set<any>();
  expandSet = new Set<any>();

  constructor(private SpinnerService:SpinnerService,private router: Router, private ServiceApiService:ServiceApiService) { }


  ngOnInit() {
    this.getAllstatistic();
    this.getAllstaticStatus();
    this.getAllstatichistorique()

    const data = [
      { year: 2010, count: 10 },
      { year: 2011, count: 20 },
      { year: 2012, count: 15 },
      { year: 2013, count: 25 },
      { year: 2014, count: 22 },
      { year: 2015, count: 30 },
      { year: 2016, count: 28 },
    ];
    // console.log('oooook----', this.statistic);


  }

  graphSTat(data:any){
      // this.getAllstatistic()
      console.log('oooook===>', data);
      new Chart(
        'acquisitions',
        {
          type: 'pie',
          data: {
            labels: data.map((it:any) => it.lib),
            datasets: [{
              label: 'My First Dataset',
              data: data.map((it:any) => it.montant),
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(255, 205, 86)'
              ],
              // hoverOffset: 4
            }]
          },
        }
      );
  }


  getAllstatistic(){
    let endPoint = "dashboard"
    this.SpinnerService.showSpinner();

    this.ServiceApiService.get(endPoint).subscribe(
      (response:any) => {
        this.statistic = response.msg;
        console.log('statistic+++', this.statistic);
        this.graphSTat(this.statistic)
    this.SpinnerService.hideSpinner();

      },
      (error:any) => {
        console.log('error',error);
      }
    );
  }

  getAllstaticStatus(){
    let endPoint = "dashboard/statByEtat"

    this.ServiceApiService.get(endPoint).subscribe(
      (response:any) => {
        this.staticEtat = response;
        console.log('staticEtat+++', this.staticEtat);
        // this.graphSTat(this.statistic)

      },
      (error:any) => {
        console.log('error',error);
      }
    );
  }

  getAllstatichistorique(){
    let endPoint = "dashboard/history"

    this.ServiceApiService.get(endPoint).subscribe(
      (response:any) => {
        this.staticHistori = response;
        console.log('staticHistori+++', this.staticHistori);
        // this.graphSTat(this.statistic)

      },
      (error:any) => {
        console.log('error',error);
      }
    );
  }

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }


  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  goCreateColi(){
    console.log('goCreateColi');
    localStorage.setItem('isVilibled', JSON.stringify({gestion: false, create: true}));
    this.router.navigate(['gestion-colis']);
  }


  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach((item:any) => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every((item:any) => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some((item:any) => this.setOfCheckedId.has(item.id)) && !this.checked;
  }


  ngAfterViewInit() {
    // this.graphSTat()
  }



}
