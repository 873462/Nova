// =====================
// NOVA HOME DASHBOARD
// =====================



function updateTime(){


let now = new Date();



document.getElementById("clock").innerHTML =

now.toLocaleTimeString();



document.getElementById("date").innerHTML =

now.toDateString();



}



setInterval(updateTime,1000);


updateTime();





// SEARCH


function searchNova(){


let input =

document.getElementById("searchInput")
.value
.toLowerCase();



let result =

document.getElementById("searchResult");



let modules = {


"room":"room/index.html",

"kitchen":"kitchen/index.html",

"garage":"garage/index.html",

"shed":"shed/index.html",

"basement":"basement/index.html",

"office":"office/index.html",

"notes":"notes/index.html",

"shopping":"shopping/index.html"


};





if(modules[input]){


result.innerHTML =

"Opening " + input + "...";


window.location.href =
modules[input];


}


else if(input==""){


result.innerHTML =
"Type something to search";


}


else{


result.innerHTML =
"No Nova item found";


}



}





// ADD TASK PLACEHOLDER


function addTask(){


let task = prompt(
"Enter new task:"
);



if(task){


alert(
"Added task: " + task
);


}


}
