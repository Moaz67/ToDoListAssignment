import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from './response';
import { Observable } from 'rxjs';
import { Task1 } from './task1';
@Injectable({
  providedIn: 'root'
})
export class TaskserviceService {
  private apiUrl = 'https://localhost:7205/api';
  constructor(private http: HttpClient) { }
  getResponse(page: number, pageSize: number): Observable<Response> {
    debugger
    const url = `${this.apiUrl}/ToDoList?page=${page}&pageSize=${pageSize}`; 
    return this.http.get<Response>(url)
  }
  getTaskById(id: number): Observable<Task1> {
    const url = `${this.apiUrl}/ToDoList/${id}`;
    return this.http.get<Task1>(url);
  }
  updateTask(task: Task1): Observable<Task1> {
    const url = `${this.apiUrl}/ToDoList/${task.taskId}`;
    return this.http.put<Task1>(url, task);
  }

  createTask(task: Task1): Observable<Task1> {
   const url= `${this.apiUrl}/ToDoList`;
    return this.http.post<Task1>(url, task);
  }
  deleteTask(taskId: number): Observable<void> {
    const url = `${this.apiUrl}/ToDoList/${taskId}`;
    return this.http.delete<void>(url);
  }
  searchResult(text:string,page: number, pageSize: number):Observable<Response>{
    const url=`${this.apiUrl}/ToDoList/search?text=${text}&page=${page}&pageSize=${pageSize}`;
    return this.http.get<Response>(url);
  }
  
  }
