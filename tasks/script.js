// ======================
// NOVA TASK DATABASE
// ======================


let database =
JSON.parse(
localStorage.getItem("novaDatabase")
)
||
{

tasks:[],

activity:[]

};




if(!database.tasks)
{

database.tasks=[];

}



function save(){

localStorage.setItem(

"novaDatabase",

JSON.stringify(database)

);

}







function addTask(){


let input =
document.getElementById("taskInput");


if(input.value.trim()=="")
return;



database.tasks.push({

name:input.value,

completed:false

});




database.activity.push(

"Added task: "
+
input.value

);



save();



input.value="";


displayTasks();


}







function completeTask(index){


database.tasks[index]
.completed=true;


database.activity.push(

"Completed task: "
+
database.tasks[index].name

);


save();


displayTasks();


}







function deleteTask(index){


database.tasks.splice(index,1);


save();


displayTasks();


}









function displayTasks(){


let list =
document.getElementById("taskList");


list.innerHTML="";



database.tasks.forEach((task,index)=>{


let li=document.createElement("li");



if(task.completed)

li.className="complete";




li.innerHTML=

`

${task.name}

<br>

<button onclick="completeTask(${index})">

✓ Complete

</button>


<button onclick="deleteTask(${index})">

🗑 Delete

</button>

`;



list.appendChild(li);



});


}





displayTasks();
