import { Task1 } from "./task1";
import { Taskstatus } from "./taskstatus";
// this class is to get all the data from the backend
export class Response {
    items:Task1[]=[]
    taskstatus:Taskstatus[]=[]
    totalPages:number=0
    pageNumber:number=0
}
