import {Injectable} from '@angular/core';
// import * as _ from "lodash";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class UserService {

  public user: any = {};
  constructor(private router: Router) {
  }

  logout() {
    sessionStorage.removeItem('xyz-token');
    this.router.navigate(['/authenticate']);
  }

  public getUserStorage(): any {
    const user = JSON.parse(localStorage.getItem('xyz-token') || '{}');
    if (user != null) {
      user.password = undefined;
    } else {
      return;
    }
    return user;
  }

  public getUser(): any {
    const user = JSON.parse(sessionStorage.getItem('xyz-token') || '{}' );
    if (user != null) {
      user.password = undefined;
    } else {
      return;
    }
    return user;
  }



  public getUserSession(): any {
    const user = JSON.parse(sessionStorage.getItem('xyz-token')!);
    if (user != null) {
      // user.password = undefined;
      console.log('user connecter', user);
    } else {
      return;
    }
    return user;
  }


  public setUserStorage(user?: any) {
    this.user = user;
    localStorage.setItem('xyz-token', JSON.stringify(user));
    return this.user;
  }

  //event localstorage

  public setEventStorage(event?: any) {
    // this.user = user;
    return localStorage.setItem('xyz-event', JSON.stringify(event));
  }

  public getEventStorage(): any {
    const event = JSON.parse(localStorage.getItem('xyz-event') || '{}');
    if (event != null) {
      event.password = undefined;
    } else {
      return;
    }
    return event;
  }


  public setUserSession(user?: any) {
    this.user = user;
    sessionStorage.setItem('xyz-token', JSON.stringify(user));
    return this.user;
  }

  public isAuthenticated(): boolean {
    console.log('check is authenticated');
    const userSession = JSON.parse(sessionStorage.getItem('xyz-token')!);
    console.log('token', userSession)
    if (userSession == null && !userSession) {
      this.router.navigate(['/authenticate']);
      return false;
    }
    return true;
  }

}
