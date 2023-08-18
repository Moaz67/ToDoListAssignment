import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import { CreatetaskComponent } from './createtask/createtask.component';
import { TaskserviceService } from './taskservice.service';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DeletemodalComponent } from './deletemodal/deletemodal.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,CreatetaskComponent, DeletemodalComponent
    
    
  ],
  imports: [
   
    ModalModule,
    BrowserModule,
    AppRoutingModule,HttpClientModule,FormsModule
  ],
  providers: [TaskserviceService, BsModalService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
