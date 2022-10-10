var isItImportant = false;

function toggleImportant() {
  console.log("icon!");

  if (isItImportant) {
    // change to non important
    isItImportant = false;
    $("#iImportant").removeClass("fa-regular").addClass("fa-solid");
  } else {
    //change to important
    isItImportant = true;
    $("#iImportant").removeClass("fa-solid").addClass("fa-regular");
  }
}

function saveTask() {
  console.log("savin!");
  //get the values
  let title = $("#txtTitle").val();
  let desc = $("#txtDesc").val();
  let isItImportant = $("#iImportant").val();
  let dueDate = $("#txtDueDate").val();
  let alert = parseInt($("#alertText").val() || 0);
  let location = $("#txtLocation").val();

  //to clear values just display an empty string after savi1ng
  $("#txtTitle").val("");
  $("#txtDesc").val("");
  $("#iImportant").val("");
  $("#txtDueDate").val("");
  $("#alertText").val("");
  $("#txtLocation").val("");

  // data validation
  if (!title) {
    $("#warn").removeClass("hide")

    setTimeout(
      function () {
        $("#warn").addClass("hide");
      },
      4000
    );

    return;
  }

  if (!dueDate) {
   $("#myDate").removeClass("hide")
    setTimeout(function () {
  $("#myDate").addClass("hide");
  }, 4000);
  return;
  }

  //get an object
  //let task = new task(pass the perameter, second, third)
  let theTask = new Task(
    title,
    desc,
    isItImportant,
    dueDate,
    alert,
    location
  ); // <-finish t here

  console.log(theTask);

  //send task to server
  $.ajax({
    url: '/api/saveTasks',
    type: "POST",
    data: JSON.stringify(theTask),
    contentType: "application/json",
    success: function (res) {
      console.log("server says", res);

      displayTask(res);
    },
    error: function (error) {
      console.error("error saving", error);
    }
  });
}
//document.querySelector('.fa-solid').onclick = function(){
//console.log('icon clicked!!!');
//}
function displayTask(task) {
  let alert = "";
  switch (task.alertText) {
    case 1:
      alert = "Dont forget to:";
      break;
    case 2:
      alert = "stop:";
      break;
    case 3:
      alert = "start:";
      break;
    case 4:
      alert = "get more coffee:";
      break;
  }
  let class2 = task.status == 2 ? "task-done" : "";
  let doneIcon = task.status == 1 ?
    `<i id="iDone" onclick="doneTask(${task.id})" class="fa-regular fa-square-check"></i>`
    : "";

  let syntax = `<div id="task${task.id}" class="task ${class2}">
    <div class="sec-1">
    ${doneIcon}
    ${alert}
    
    </div>
    <div class="sec-2">
    
        <div class="sec-title">
          <h5>${task.title}</h5>
          <p>${task.description}</p>
        </div>

        <div class="sec-date">
            <label>${task.dueDate}</label>
        </div>

        <div class="sec-location">
            <label>${task.location}</label>
        </div>
        <i id="iDelete" onclick="deleteTask(${task.id})" class="far fa-trash-alt"></i>
      </div>
    </div>`;

  if (task.status == 1) {
    $("#tasksContainer").append(syntax);
  }
  else {
    $("#doneContainer").append(syntax);
  }
}

function deleteTask(id) {
  console.log("deleting: " + id);
  $.ajax({
    url: "/api/deleteTask/" + id,
    type: "DELETE",
    success: function () {
      console.log("deleted");
      $("#task" + id).remove();
      // option:2 location.reload();

    },
    error: function (details) {
      console.error("error deleting", details);
    }
  });

}

function doneTask(id) {
  console.log("Done task:" + id);
  $.ajax({
    url: "/api/markDone/" + id,
    type: "PATCH",
    success: function (task) {
      $("#task" + id).remove();

        displayTask(task);
      },
      
      error: function (details) {
        console.log("error removing", details);
    }
  });

}

function retrieveTasks() {
  $.ajax({
    url: '/api/getTask',
    type: "GET",
    success: function (list) {
      console.log(" Retrieved", list);
      for (let i = 0; i < list.length; i++) {
        let task = list[i];

        if (task.user === "ChrisCodina") {
          displayTask(task);
        }
      }
    },
    error: function (err) {
      console.error("Error reading", err);
    },
  });
}

function init() {
  console.log("task manager");

  retrieveTasks();
  $("#btnSave").click(saveTask);
  $("#iImportant").click(toggleImportant);
  $("#showHide").click(function () {
    $("#details").toggle();
  });
}
// function myClear(){
//     document.getElementById("myForm").value="";
// }

window.onload = init;

function testRequest() {
  $.ajax({
    url: "https://restclass.azurewebsites.net/api/test",
    type: "GET",
    success: function (res) {
      console.log("SerVer says", res);
    },
    error: function (errorDet) {
      console.log("error on req", errorDet);
    },
  });
}
