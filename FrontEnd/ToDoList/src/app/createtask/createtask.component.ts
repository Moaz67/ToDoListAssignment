import { Component ,EventEmitter, Input, Output  } from '@angular/core';
import { BsModalRef,BsModalService } from 'ngx-bootstrap/modal';
import { Task1 } from '../task1';
import { TaskserviceService } from '../taskservice.service';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Taskstatus } from '../taskstatus';

@Component({
  selector: 'app-createtask',
  templateUrl: './createtask.component.html',
  styleUrls: ['./createtask.component.css']
})
export class CreatetaskComponent {
  Taskstatus = Taskstatus;
@Output() public Done = new EventEmitter<any>();
Task:Task1 =new Task1()
isEditing=false
formattedDueDate: string=""
constructor(public bsmodal: BsModalRef , public _modalService:BsModalService,private taskService:TaskserviceService,private datepipes:DatePipe){}
ngOnInit(): void {
  this.getdata(); 
  debugger
}
id:number=0
getdata(){
  debugger
  this.taskService.getTaskById(this.id).subscribe(
    (response:Task1) => {
      debugger
      this.Task=response;
      this.formattedDueDate = this.datepipes.transform(this.Task.dueDate, 'yyyy-MM-dd')||'';
    })
}
CreateorUpdate(){
  var originalDateFormat=new Date(Date.parse(this.formattedDueDate));
  this.Task.dueDate=originalDateFormat;
  debugger
  if(this.isEditing==false){
    this.taskService.createTask(this.Task).subscribe(
      (response) => {
      })
  }
  else{
    this.taskService.updateTask(this.Task).subscribe(
      (response) => {
       
     })
  }
 
  this.bsmodal.hide()
  this.Done.emit();
}

// transformDate(date: string): string {
//   const transformedDate = this.datepipes.transform(new Date(date), 'yyyy-MM-dd');
//   return transformedDate || ''; 
// }
}
