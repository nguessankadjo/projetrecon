import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-content-pages',
  templateUrl: './content-pages.component.html',
  styleUrls: ['./content-pages.component.scss']
})
export class ContentPagesComponent implements OnInit {

  userConnecter:any={};

  constructor(private userService: UserService ) {

  }

  ngOnInit() {
    this.userConnecter = this.userService.getUserSession();
  }

  logout(){
    this.userService.logout()
  }

}
