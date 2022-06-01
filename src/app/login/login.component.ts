import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  aim = "perfect banking partner"
  accno = "Account number please.."
  acno = ""
  pswd = ""
  
  constructor(private router: Router, private ds:DataService) { }

  ngOnInit(): void {
  }
  //user defined functions
  acnoChange(event: any) {
    this.acno = event.target.value
    console.log(this.acno);

  }
  pswdChange(event: any) {
    this.pswd = event.target.value
    console.log(this.acno);
  }
  //-----------<event binding>--------&&---<two way binding using ngModel----------
  login() {
    var acno = this.acno
    var pswd = this.pswd

    const result = this.ds.login(acno,pswd)

    if (result) {
      alert("Login succesful")
      this.router.navigateByUrl(`dashboard`)
    }
    
  }

  //---------->template referencing variable<------------

  // login(a:any,p:any) {
  //   var acno = a.value
  //   var pswd = p.value

  //   let db = this.db

  //   if (acno in db) {
  //     if (pswd == db[acno]["password"]) {
  //       alert("Login succesful")
  //     }
  //     else {
  //       alert("Incorrect password")
  //     }
  //   }
  //   else {
  //     alert("user does not exit!!!")
  //   }
  // }


}
