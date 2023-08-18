import { Taskstatus } from "./taskstatus";

export class Task1 {
    taskId:number=0;
    taskDescription:string="";
    createdDate: Date =new Date();
    isCompleted:Boolean = false;
    completedDate: Date | null = null;
    dueDate :Date=new Date();
    assignedTo:string="";
    creator:string="";
    status:Taskstatus=Taskstatus.New
}
