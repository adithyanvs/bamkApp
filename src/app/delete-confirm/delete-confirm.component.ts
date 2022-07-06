import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css']
})
export class DeleteConfirmComponent implements OnInit {
 @Input() item:string|undefined
 @Output() onCancel=new EventEmitter
 //creating on delete event-since it occuring in parent,so put it in@output
 @Output() onDelete =new EventEmitter()
  constructor() { 
    console.log(this.item);
    
  }

  ngOnInit(): void {
  }
  cancel(){
    this.onCancel.emit()
  }
delete(){
  this.onDelete.emit(this.item)
}
}
