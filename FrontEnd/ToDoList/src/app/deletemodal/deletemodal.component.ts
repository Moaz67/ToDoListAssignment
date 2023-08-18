import { Component, EventEmitter, Output } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-deletemodal',
  templateUrl: './deletemodal.component.html',
  styleUrls: ['./deletemodal.component.css']
})
export class DeletemodalComponent {
  @Output() public Yes = new EventEmitter<any>();
constructor(public bsmodal: BsModalRef , public _modalService:BsModalService){}
id:number=0
OnYesClick(){
  debugger
this.Yes.emit("Yes")
}
}
