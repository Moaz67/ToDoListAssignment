import { Component,OnInit } from '@angular/core';
import { TaskserviceService } from '../taskservice.service';
import { Task1 } from '../task1';
import { Response } from '../response';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreatetaskComponent } from '../createtask/createtask.component';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  Task:Task1[]=[];
  PageNumbers:number[]=[]
  TotalPages:number=0
  constructor(private taskService: TaskserviceService, public _modalService:BsModalService) {}
  ngOnInit(): void {
    this.getResponse(1); 
  }
  getResponse(page: number): void {
    this.taskService.getResponse(page, 1)
      .subscribe(
        (response:Response) => {
          this.Task=response.items;
          this.PageNumbers = Array.from({ length: response.totalPages }, (_, index) => index + 1);
          
        })
      
      
  }
  Add(id?:number): void {
    this.showCreateOrEditPropertyTypeModalDialogg(id);
  }
  showCreateOrEditPropertyTypeModalDialogg(id?: number, arg?: string): void {
    debugger
    let bsmodal: BsModalRef;
    
      
    bsmodal = this._modalService.show(
        CreatetaskComponent,
        {
          class: 'modal-sm',
          backdrop: 'static',
          initialState: {
          id: id
          }
        }
      );
    
  }
  
    
}
