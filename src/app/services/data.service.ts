import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const options ={
  headers:new HttpHeaders()
}
@Injectable({
  providedIn: 'root'
})
export class DataService {
  currentUser: any
  currentAcno: any
  // db: any = {
  //   1000: { "acno": 1000, "username": "Ram", "password": 1000, "balance": 5000, transaction: [] },
  //   1001: { "acno": 1001, "username": "Tom", "password": 1001, "balance": 6000, transaction: [] },
  //   1002: { "acno": 1002, "username": "Hari", "password": 1002, "balance": 3000, transaction: [] },
  // }
  constructor(private http: HttpClient) {
    // this.getDetails()
  }
  //get details from local storage
  // getDetails() {
  //   if (localStorage.getItem("database")) {
  //     this.db = JSON.parse(localStorage.getItem("database") || '')
  //   }
  //   if (localStorage.getItem("currentUser")) {
  //     this.currentUser = JSON.parse(localStorage.getItem("currentUser") || '')
  //   }
  //   if (localStorage.getItem("currentAcno")) {
  //     this.currentAcno = JSON.parse(localStorage.getItem("currentAcno") || '')
  //   }
  // }


  //save data
  // saveDetails() {
  //   if (this.db) {
  //     localStorage.setItem("database", JSON.stringify(this.db))
  //   }
  //   if (this.currentUser) {
  //     localStorage.setItem("currentUser", JSON.stringify(this.currentUser))
  //   }
  //   if (this.currentAcno) {
  //     localStorage.setItem("currentAcno", JSON.stringify(this.currentAcno))
  //   }
  // }

  //login
  login(acno: any, pswd: any) {

    const data ={
      acno,
      pswd
    }
    //asynchronous.....
    return this.http.post('http://localhost:3000/login', data)





    //---->before integration<---------------
    // let db = this.db

    // if (acno in db) {
    //   if (pswd == db[acno]["password"]) {
    //     this.currentUser = db[acno]["username"]
    //     this.currentAcno = acno
    //     this.saveDetails()
    //     return true
    //   }
    //   else {
    //     alert("Incorrect password")
    //     return false
    //   }
    // }
    // else {
    //   alert("user does not exit!!!")
    //   return false
    // }
  }

  //regiser
  register(username: any, acno: any, password: any) {
    const data = {
      username,
      acno,
      password
    }
    //asynchronous 
    return this.http.post('http://localhost:3000/register', data)



    // let db = this.db
    // if (acno in db) {
    //   return false
    // }
    // else {
    //   db[acno] = { acno, username, password, "balance": 0,transaction:[] }
    //   this.saveDetails()
    //   return true
    // }
  }
  //deposite

  deposit(acno: any, password: any, amt: any) {

const data ={
  acno,password,amt
}

return this.http.post('http://localhost:3000/deposit',
 data,this.getOptions())


    //----------->before integration<--------------
    // var amount = parseInt(amt)
    // let db = this.db
    // if (acno in db) {
    //   if (password == db[acno]["password"]) {
    //     db[acno]["balance"] += amount
    //     db[acno].transaction.push({
    //       type: "CREDIT",
    //       amount: amount
    //     })
    //     this.saveDetails()
    //     return db[acno]["balance"]
    //   } else {
    //     alert("Incorrect password")
    //     return false
    //   }

    // } else {
    //   alert("User does not exist.....")
    //   return false
    // }
  }
  getOptions(){
    const token = localStorage.getItem('token')
    let headers = new HttpHeaders()
    if(token){
      headers = headers.append('x-access-token',token)
      options.headers = headers
    }
    return options
  }

  withdraw(acno: any, password: any, amt: any) {

    const data ={
      acno,password,amt
    }
    
    return this.http.post('http://localhost:3000/withdraw',
     data,this.getOptions())
    // var amount = parseInt(amt)
    // let db = this.db
    // if (acno in db) {
    //   if (password == db[acno]["password"]) {
    //     if (db[acno]["balance"] > amount) {
    //       db[acno]["balance"] -= amount
    //       db[acno].transaction.push({
    //         type: "DEBIT",
    //         amount: amount
    //       })
    //       this.saveDetails()
    //       return db[acno]["balance"]
    //     } else {
    //       alert("Insufficient balance")
    //       return false
    //     }

    //   } else {
    //     alert("Incorrect password")
    //     return false
    //   }

    // } else {
    //   alert("User does not exist.....")
    //   return false
    // }
  }
  getTrasaction(acno: any) {
    const data ={
      acno
    }
    return this.http.post('http://localhost:3000/transaction',data,this.getOptions())

  }
  deleteAcc(acno:any){
    return this.http.delete('http://localhost:3000/deleteAcc/'+acno,this.getOptions())

  }
}
