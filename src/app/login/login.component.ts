import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { FormBuilder, Validators } from '@angular/forms';

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

  LoginForm = this.fb.group({
    acno: [``, [Validators.required, Validators.pattern(`[0-9 ]*`)]],
    pswd: [``, [Validators.required, Validators.pattern(`[a-zA-Z0-9 ]*`)]],
  })

  constructor(private router: Router, private ds: DataService, private fb: FormBuilder) { }

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
    var acno = this.LoginForm.value.acno
    var pswd = this.LoginForm.value.pswd

    if (this.LoginForm.valid) {
      //asynchronous
      this.ds.login(acno, pswd)
      .subscribe((result:any) =>{
        if (result) {
          localStorage.setItem('currentUser',result.currentUser)
          localStorage.setItem('currentAcno',result.currentAcno)
          localStorage.setItem('token',result.token)
          alert(result.message)
          this.router.navigateByUrl(`dashboard`)
        }

      },
      result =>{
        alert(result.error.message)
      })
    }
    else {
      alert("invalid Form")
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
