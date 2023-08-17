import { Component ,EventEmitter, Input, Output  } from '@angular/core';
import { BsModalRef,BsModalService } from 'ngx-bootstrap/modal';
import { Task1 } from '../task1';
import { TaskserviceService } from '../taskservice.service';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-createtask',
  templateUrl: './createtask.component.html',
  styleUrls: ['./createtask.component.css']
})
export class CreatetaskComponent {
Task:Task1 =new Task1()

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
      
      
    })
}
CreateTask(){
  debugger
  this.taskService.createTask(this.Task).subscribe(
    (response) => {
      debugger
  
      
      
    })
}
UpdateTask(){
  debugger
  this.taskService.updateTask(this.Task).subscribe(
    (response) => {
      debugger
      
      
      
    })
}
// transformDate(date: string): string {
//   const transformedDate = this.datepipes.transform(new Date(date), 'yyyy-MM-dd');
//   return transformedDate || ''; 
// }
transformDate(date: Date): string {
  const datePipe = new DatePipe('en-US');
  return datePipe.transform(date, 'yyyy-MM-dd') || ''; // Return empty string if transformation fails
}
}
