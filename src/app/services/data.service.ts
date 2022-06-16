import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  currentUser:any
  currentAcno:any
  db: any = {
    1000: { "acno": 1000, "username": "Ram", "password": 1000, "balance": 5000,transaction:[] },
    1001: { "acno": 1001, "username": "Tom", "password": 1001, "balance": 6000,transaction:[] },
    1002: { "acno": 1002, "username": "Hari", "password": 1002, "balance": 3000,transaction:[] },
  }
  constructor() {
    this.getDetails()
   }
   //get details from local storage
   getDetails(){
     if(localStorage.getItem("database")){
       this.db = JSON.parse(localStorage.getItem("database")|| '')
     }
     if(localStorage.getItem("currentUser")){
      this.currentUser = JSON.parse(localStorage.getItem("currentUser") || '')
    }
    if(localStorage.getItem("currentAcno")){
      this.currentAcno = JSON.parse(localStorage.getItem("currentAcno") || '')
    }
   }
  

  //save data
   saveDetails(){
     if(this.db){
        localStorage.setItem("database",JSON.stringify(this.db))
     }
     if(this.currentUser){
       localStorage.setItem("currentUser",JSON.stringify(this.currentUser))
     }
     if(this.currentAcno){
      localStorage.setItem("currentAcno",JSON.stringify(this.currentAcno))
    }
   }

//login
  login(acno: any, pswd: any) {


    let db = this.db

    if (acno in db) {
      if (pswd == db[acno]["password"]) {
        this.currentUser= db[acno]["username"]
        this.currentAcno = acno
        this.saveDetails()
        return true
      }
      else {
        alert("Incorrect password")
        return false
      }
    }
    else {
      alert("user does not exit!!!")
      return false
    }
  }

  //regiser
  regiser(username: any, acno: any, password: any) {
    let db = this.db
    if (acno in db) {
      return false
    }
    else {
      db[acno] = { acno, username, password, "balance": 0,transaction:[] }
      this.saveDetails()
      return true
    }
  }
  //deposite

  deposit(acno: any, password: any, amt: any) {
    var amount = parseInt(amt)
    let db = this.db
    if (acno in db) {
      if (password == db[acno]["password"]) {
        db[acno]["balance"] += amount
        db[acno].transaction.push({
          type:"CREDIT",
          amount:amount
        })
        this.saveDetails()
        return db[acno]["balance"]
      } else {
        alert("Incorrect password")
        return false
      }

    } else {
      alert("User does not exist.....")
      return false
    }
  }

  withdraw(acno: any, password: any, amt: any) {
    var amount = parseInt(amt)
    let db = this.db
    if (acno in db) {
      if (password == db[acno]["password"]) {
        if (db[acno]["balance"] > amount) {
          db[acno]["balance"] -= amount
          db[acno].transaction.push({
            type:"DEBIT",
            amount:amount
          })
          this.saveDetails()
          return db[acno]["balance"]
        } else {
          alert("Insufficient balance")
          return false
        }

      } else {
        alert("Incorrect password")
        return false
      }

    } else {
      alert("User does not exist.....")
      return false
    }
  }
  getTrasaction(acno:any){
    return this.db[acno].transaction
    
  }
}
