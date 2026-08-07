// ========================
// NOVA MODULE DATABASE
// ========================


// CHANGE THIS FOR EACH ROOM

const moduleName = "Room";

const moduleDescription =
"Inventory & Organization";



document.getElementById("moduleName")
.innerHTML =
"🛏 " + moduleName;


document.getElementById("description")
.innerHTML =
moduleDescription;




// DATABASE


let database =
JSON.parse(
localStorage.getItem("novaDatabase")
)
||
{

items:{},

notes:{}

};





if(!database.items[moduleName])
{

database.items[moduleName]=[];

}


if(!database.notes[moduleName])
{

database.notes[moduleName]=[];

}






function saveDatabase()
{

localStorage.setItem(

"novaDatabase",

JSON.stringify(database)

);

}







// ITEMS


function addItem()
{


let input =
document.getElementById("itemInput");


if(input.value=="")
return;



database.items[moduleName]
.push(input.value);



saveDatabase();


input.value="";


display();


}








function addNote()
{


let input =
document.getElementById("noteInput");


if(input.value=="")
return;



database.notes[moduleName]
.push(input.value);



saveDatabase();


input.value="";


display();


}








function display()
{


let items =
document.getElementById("items");


let notes =
document.getElementById("notes");



items.innerHTML="";

notes.innerHTML="";




database.items[moduleName]
.forEach(item=>{


let li=document.createElement("li");

li.innerHTML="📦 "+item;

items.appendChild(li);


});





database.notes[moduleName]
.forEach(note=>{


let li=document.createElement("li");

li.innerHTML="📝 "+note;

notes.appendChild(li);


});



}



display();
