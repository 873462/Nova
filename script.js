// =============================
// NOVA HOMEPAGE SYSTEM
// =============================



// CLOCK


function updateClock(){


let now=new Date();



document.getElementById("clock")
.innerHTML =
now.toLocaleTimeString();



document.getElementById("date")
.innerHTML =
now.toDateString();



}


setInterval(updateClock,1000);

updateClock();







// DATABASE


let database =
JSON.parse(
localStorage.getItem("novaDatabase")
)
||
{

items:{},

notes:{},

activity:[]

};








// UNIVERSAL SEARCH


function searchNova(){


let query =
document
.getElementById("searchInput")
.value
.toLowerCase();



let results =
document.getElementById("searchResults");



results.innerHTML="";



if(query=="")
{

results.innerHTML=
"Type something to search Nova";

return;

}





let found=false;



Object.keys(database.items)
.forEach(module=>{


database.items[module]
.forEach(item=>{


if(item.toLowerCase()
.includes(query))
{


let p=document.createElement("p");


p.innerHTML=
"📦 "
+
module
+
": "
+
item;


results.appendChild(p);


found=true;


}



});


});






Object.keys(database.notes)
.forEach(module=>{


database.notes[module]
.forEach(note=>{


if(note.toLowerCase()
.includes(query))
{


let p=document.createElement("p");


p.innerHTML=
"📝 "
+
module
+
": "
+
note;


results.appendChild(p);


found=true;


}



});


});





if(!found)

{

results.innerHTML=
"No results found";

}



}








// RECENT NOTES


function loadNotes(){


let list =
document.getElementById("recentNotes");


list.innerHTML="";



Object.keys(database.notes)
.forEach(module=>{


database.notes[module]
.slice(-3)
.forEach(note=>{


let li=document.createElement("li");


li.innerHTML=
"☐ "
+
note;


list.appendChild(li);


});


});


}









// ACTIVITY


function loadActivity(){


let list =
document.getElementById("activity");


list.innerHTML="";



database.activity
.slice(-5)
.reverse()
.forEach(item=>{


let li=document.createElement("li");


li.innerHTML=
"✓ "
+
item;


list.appendChild(li);


});



}










// ADD TASK


function addTask(){


let task =
prompt(
"New Nova task:"
);



if(task)

{


if(!database.activity)
database.activity=[];



database.activity.push(
"Added task: "
+
task
);



localStorage.setItem(

"novaDatabase",

JSON.stringify(database)

);



loadActivity();


}



}






loadNotes();

loadActivity();
