
using Microsoft.AspNetCore.Mvc;
using Taskmanager_2._0.Models;

  

namespace Taskmanager_2._0.Controllers
{
    public class ApiController : Controller
    {   
        // array / listt to temp store the data 
        static List<Tasks> DB; 
        static int count;

        
        //constructor should have same name of the class and no return type
        public ApiController()
        {
            if(DB == null)
            {
                DB = new List<Tasks>();
                count = 1;
            }
        }
        //THIS IS NOT WORKING!!!
        public IActionResult Test()
        {
            return Content("Hello from API");
        }

        [HttpPost]
        public IActionResult SaveTasks(Tasks data)
        
        {   //get the object
            System.Console.WriteLine("Saving the task" + data.Title);

            
            //assign the unique id
            data.Id = count;
            count += 1;

            // save it on the database
            DB.Add(data); //ad items to a list

            // return the object

            return Json(data);

        }

        [HttpGet]

        public IActionResult GetTask()
        {
            return Json(DB);
        }

        [HttpDelete]

        public IActionResult DeleteTask(int id)
        {   // find the task with the id and remove it
            Tasks t = DB.First(t => t.Id == id);

            DB.Remove(t);

            return Ok();
        }

        [HttpPatch]

        public IActionResult MarkDone(int id){
            //find the task 
            Tasks t = DB.First(t => t.Id == id);
            //change the status
            t.Status = 2;// 2 =done

            return Json(t);
        }
    }

}

 