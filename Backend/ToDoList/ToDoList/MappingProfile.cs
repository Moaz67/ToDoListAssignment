using AutoMapper;
using System.Runtime.InteropServices;
using ToDoList.DTO;
using ToDoList.Entity;

namespace ToDoList
{
    public class MappingProfile:Profile
    {
        public MappingProfile() {
            CreateMap<Task1, Task1Dto>();
         }
    }
}
