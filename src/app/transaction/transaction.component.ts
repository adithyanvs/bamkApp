import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  //array to hold all transaction made by give account number
  transactions:any
  acno=JSON.parse(localStorage.getItem("currentAcno")||'')
  constructor(private ds:DataService) { 
    //asynchronous
    this.ds.getTrasaction(this.acno)
    .subscribe((result:any) =>{
      this.transactions = result.transaction
    },
    (result:any) =>{
      alert(result.error.message)
    }
      )
     
  }

  ngOnInit(): void {
  }

}
