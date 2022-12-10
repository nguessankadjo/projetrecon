import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ServiceApiService {



  headersJson = new  HttpHeaders().set('Content-Type', 'application/json');
  httpOptions: any;
  httpOptionsUpload: any;
  httpOptionsLogin: any;
  constructor(private httpClient: HttpClient, private route: Router) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8 ',
      })
    };
    this.httpOptionsLogin = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      })
    };
    this.httpOptionsUpload = {
      headers: new HttpHeaders({
      })
    };

  }


  login(endPoint: string, data: any): Observable<any> {
    return new Observable((observer) => {
      this.httpClient.post(environment.BASE_URL + '/' + endPoint, data , this.httpOptionsLogin).subscribe(
        result => {
          observer.next(result);
        },
        error => {
          //console.log(error);
          if (error.status === 401 && error.statusText !== 'Unauthorized'){
            observer.error("Session expiré")
            this.route.navigate(['login-recon']);
          }else {
            observer.error(error.error ? error.error['hydra:description']: 'Une erreur c\'est produite')
          }
        },() => {
          observer.complete();
        }
      );
    });
  }

  getAll(endpoint: string, params?: any, options?: HttpParams) {
    return this.httpClient.get(environment.BASE_URL + "/" + endpoint);
  }




  get(endPoint: string): Observable<any> {
    return new Observable((observer)=> {
      this.httpClient.get(environment.BASE_URL + '/' + endPoint + '/' ,this.httpOptionsLogin).subscribe(
        result => {
          console.log(result);
          observer.next(result);
        },
        error => {
          if (error.status === 401){
            observer.error("Session expiré")
            this.route.navigate(['login-recon']);
          }else {
            observer.error(error.error ? error.error['hydra:description']: 'Une erreur c\'est produite')
          }

        },() => {
          observer.complete();
        }
      );
    });
  }



  post(endPoint: string, data: any): Observable<any> {
    return new Observable((observer) => {
      this.httpClient.post(environment.BASE_URL + '/' + endPoint + '/', data , this.httpOptionsLogin).subscribe(
        result => {
          observer.next(result);
        },
        error => {
          console.log(error);
          if (error.status === 401 && error.statusText !== "Unauthorized"){
            observer.error("Session expiré")
            this.route.navigate(["login-recon"]);
          }else {
            observer.error(error.error ? error.error['hydra:description']: 'Une erreur c\'est produite')
          }
        },()=>{
          observer.complete()
        }
      )
    });
  }



  postUpload(endPoint: string, data: any): Observable<any> {
    return new Observable((observer) => {
      this.httpClient.post(environment.BASE_URL + '/' +endPoint,data,this.httpOptionsUpload).subscribe(
        result => {
          observer.next(result);
        },
        error => {
          console.log(error);
          if (error.status === 401 && error.statusText !== "Unauthorized"){
            observer.error("Session expiré")
            this.route.navigate(["login-recon"]);
          }else {
            observer.error(error.error ? error.error['hydra:description']: 'Une erreur c\'est produite')
          }
        },()=>{
          observer.complete()
        }
      )
    })
  }

  find(id: number, endPoint:string): Observable<any> {
    return new Observable((observer)=> {
      this.httpClient.get(environment.BASE_URL + '/' + endPoint + '/' ,this.httpOptionsLogin).subscribe(
        result => {
          console.log(result);
          observer.next(result);
        },
        error => {
          if (error.status === 401){
            observer.error("Session expiré")
            this.route.navigate(['login-recon']);
          }else {
            observer.error(error.error ? error.error['hydra:description']: 'Une erreur c\'est produite')
          }

        },() => {
          observer.complete();
        }
      );
    });
  }

  getOptionFind(endpoint: string, params: any, options?: any) {
    return this.httpClient.get(environment.BASE_URL + "/" + endpoint + "/" +  params + "/");
  }

  getByURI(endpoint: string, params?: any, options?: any) {
    return this.httpClient.get(environment.BASE_URL+ endpoint);
  }

  put(endpoint:string, id:number, data:any): Observable<any> {
    return new Observable((observer) => {
      this.httpClient.put(environment.BASE_URL + "/" + endpoint + "/" + id + "/" ,data).subscribe(
        result => {
          observer.next(result);
        },
        error => {
          console.log(error);
          if(error.status === 401 && error.statusText !== "Unauthorized"){
            observer.error("Session expiré")
            this.route.navigate(["login-recon"]);
          }else {
            observer.error(error.error ? error.error['hydra:description']: 'Une erreur c\'est produite')
          }

        },()=>{
          observer.complete();
        }
      );
    });
  }


  delete(endpoint: string, id:number){
    return new Observable((observer) => {
      this.httpClient.delete(environment.BASE_URL  + "/" + endpoint + "/" + id + "/").subscribe(
        result => {
          observer.next(result);
        },
        error => {
          console.log(error);
          if (error.status === 401 && error.statusText !== 'Unauthorized'){
            observer.error("Session expiré")
            this.route.navigate(['login-recon']);
          }else {
            observer.error(error.error ? error.error['hydra:description']: 'Une erreur c\'est produite')
          }
        },() => {
          observer.complete();
        }
      );
    });
  }



}
