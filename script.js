// ===============================
// NOVA DASHBOARD JAVASCRIPT
// ===============================


// ---------- DATA ----------

const morningRoutine = [
    "6:00 - Wake up",
    "6:00 - Pray",
    "6:00 - Drink water",
    "6:00 - Number 1 and 2",
    "6:00 - Brush teeth",
    "6:00 - Check calendar",
    "6:10 - Read Bible (15 mins)",
    "6:25 - Run (30 mins)",
    "6:55 - Bath + Change + Make bed",
    "7:05 - Eat breakfast"
];


const bedRoutine = [
    "Put lunch box away",
    "Change",
    "Brush teeth",
    "Wash face",
    "Put cream",
    "Update calendar",
    "Switch on fan",
    "Turn off light",
    "Pray",
    "Sleep"
];


const todos = [
    {name:"Make JD Robot work", priority:"Medium-High", done:false},
    {name:"Make list of things to do for items project", priority:"Low", done:false},
    {name:"Fix shed", priority:"Medium", done:false},
    {name:"Clean fish tank", priority:"Medium", done:false},
    {name:"Clean fish tank filter", priority:"Medium", done:false},
    {name:"Fix cupboard closet top", priority:"Medium", done:false},
    {name:"Cleanup tools", priority:"High", done:false},
    {name:"Fix Lego Lamborghini", priority:"Low", done:false},
    {name:"Get notebook, pencil and eraser", priority:"Low", done:false},
    {name:"Write prayer", priority:"Medium", done:false},
    {name:"Make holders for arts and crafts", priority:"High", done:false},
    {name:"Add inventory items", priority:"Medium", done:false},
    {name:"Fix guitar and store it", priority:"Medium-High", done:false},
    {name:"Add Nova", priority:"High", done:false},
    {name:"Make playlist", priority:"Medium-High", done:true},
    {name:"Add garbage bags/bin", priority:"High", done:false}
];


const wants = [
    {
        item:"Table",
        reason:"Have a place for computers",
        priority:"High",
        done:true
    },
    {
        item:"Pocket charger",
        reason:"Charge phone anywhere",
        priority:"High",
        done:true
    },
    {
        item:"Extra bed sheet",
        reason:"Need enough space to share",
        priority:"High",
        done:true
    },
    {
        item:"Arts and crafts holder",
        reason:"Keep things organised",
        priority:"Medium-High",
        done:false
    },
    {
        item:"Plug expansion",
        reason:"More outlets for devices",
        priority:"Medium-High",
        done:true
    }
];


const calendar = [
    "Tuesday: Dishwasher",
    "Wednesday 7 PM - 8 PM: Violin Class",
    "Friday: Dishwasher",
    "Friday-Sunday: Washing",
    "Thursday: Kumon Work",
    "August 12: Brother's Birthday",
    "August 28: Violin Scale Exam"
];


// Inventory

const inventory = {

"Arduino":"Box 2 - Electronics Box",
"Raspberry Pi":"Box 2 - Electronics Box",
"Elegoo Uno R3":"Box 2 - Electronics Box",
"Chargers":"Box 1 - Grey Electronics Box",
"Headphones":"Box 1 - Grey Electronics Box",
"LEGO":"Under Bed Storage",
"Color pencils":"Box 3 - Aqua Box / Blue Bag",
"Paint brushes":"Box 3 - Aqua Box",
"Pens":"Box 3 - Pokemon Box",
"Pencils":"Box 3 - Avengers Box",
"Crayons":"Box 3 - Crayon Box",
"Highlighters":"Box 3 - Reindeer Case",
"Oil pastels":"Box 3 - Ziplock Bag",
"Board games":"Drawer 1",
"Rubiks cubes":"Drawer 1",
"Spare bed parts":"Drawer 2",
"Wood puzzles":"Drawer 3"
};


// Mandatory Today's Focus

const mandatory = [
    "PLASP IT 8:30 AM - 3:30 PM",
    "Practice violin scales (1 hour)",
    "Dishwasher"
];


// ---------- SAVE SYSTEM ----------


function saveData(){

    localStorage.setItem(
        "novaTodos",
        JSON.stringify(todos)
    );

    localStorage.setItem(
        "novaWants",
        JSON.stringify(wants)
    );

    localStorage.setItem(
        "novaDate",
        new Date().toDateString()
    );
}



function loadData(){

    let savedTodos =
    JSON.parse(localStorage.getItem("novaTodos"));

    if(savedTodos){
        savedTodos.forEach((item,index)=>{
            todos[index]=item;
        });
    }


    let savedWants =
    JSON.parse(localStorage.getItem("novaWants"));

    if(savedWants){
        savedWants.forEach((item,index)=>{
            wants[index]=item;
        });
    }

}



// ---------- DISPLAY ----------


function createList(id,array){

    let list=document.getElementById(id);

    list.innerHTML="";

    array.forEach(item=>{

        let li=document.createElement("li");

        li.innerHTML=
        `<input type="checkbox">
        ${item}`;

        li.querySelector("input").onchange=()=>{
            li.style.textDecoration =
            li.querySelector("input").checked
            ? "line-through"
            : "none";
        };

        list.appendChild(li);

    });

}



function renderTodos(){

    let list=document.getElementById("todoList");

    list.innerHTML="";


    todos.forEach((task,index)=>{

        let li=document.createElement("li");


        li.innerHTML=
        `<input type="checkbox"
        ${task.done?"checked":""}>
        ${task.name}
        (${task.priority})`;


        li.querySelector("input").onchange=e=>{

            task.done=e.target.checked;

            saveData();

            updateStats();

        };


        list.appendChild(li);

    });

}



function renderWants(){

    let list=document.getElementById("wantList");

    list.innerHTML="";


    wants.forEach((item,index)=>{

        let li=document.createElement("li");


        li.innerHTML =
        `
        <input type="checkbox" ${item.done ? "checked" : ""}>
        <span>
        ${item.item}
        <br>
        Reason: ${item.reason}
        <br>
        Priority: ${item.priority}
        </span>
        `;


        let checkbox = li.querySelector("input");


        checkbox.onchange = ()=>{

            item.done = checkbox.checked;

            saveData();

        };


        list.appendChild(li);

    });

}




function renderFocus(){

    let m=document.getElementById("mandatoryTasks");

    m.innerHTML="";


    mandatory.forEach(item=>{

        m.innerHTML +=
        `<li>
        <input type="checkbox">
        ${item}
        </li>`;

    });



    let options =
    todos
    .filter(t=>!t.done)
    .filter(t=>t.priority==="High" || t.priority==="Medium-High")
    .slice(0,3);


    let box=document.getElementById("focusOptions");

    box.innerHTML="";


    options.forEach(task=>{

        let li=document.createElement("li");

        li.innerHTML=
        `<input type="checkbox">
        ${task.name}`;

        li.querySelector("input").onchange=()=>{

            task.done=true;

            saveData();

            renderFocus();

            renderTodos();

        };

        box.appendChild(li);

    });

}




function updateStats(){

    let done =
    todos.filter(t=>t.done).length;


    document.getElementById("stats").innerHTML =
    `${done}/${todos.length} tasks completed`;

}




// ---------- INVENTORY ----------


function searchItem(){

    let q =
    document.getElementById("searchBox").value;


    document.getElementById("result").innerHTML =
    inventory[q] || "Not found";

}



// ---------- CLOCK + THEME ----------


function clock(){

    let now=new Date();


    document.getElementById("clock")
    .innerHTML =
    now.toLocaleTimeString();


    document.getElementById("date")
    .innerHTML =
    now.toDateString();



    let hour=now.getHours();


    document.getElementById("greeting")
    .innerHTML =
    hour<12
    ?"Good Morning"
    :hour<18
    ?"Good Afternoon"
    :"Good Evening";


    if(hour>=18 || hour<6){

        document.body.classList.add("night");

    }else{

        document.body.classList.remove("night");

    }

}



// ---------- START ----------


loadData();


createList(
"morningRoutine",
morningRoutine
);


createList(
"bedRoutine",
bedRoutine
);


renderTodos();

renderWants();

renderFocus();

createList(
"calendar",
calendar
);


updateStats();


clock();

setInterval(clock,1000);
