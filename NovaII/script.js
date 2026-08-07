// ===============================
// NOVA DASHBOARD JAVASCRIPT
// ===============================


// ---------- DATA ----------


const morningRoutine = [
    "6:00 - Wake up",
    "6:01 - Pray",
    "6:02 - Drink water",
    "6:07 - Number 1 and 2",
    "6:09 - Brush teeth",
    "6:10 - Check calendar",
    "6:25 - Read Bible (15 mins)",
    "6:55 - Run (30 mins)",
    "7:05 - Bath + Change + Make bed",
    "7:15 - Eat breakfast"
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

{name:"JD Robot", priority:"Medium-High", done:false},

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




// =================================
// INVENTORY DATABASE
// =================================


const inventory = {


"Random stuff":
"Under Bed → Box 1 → Blue Box",


"Toys":
"Under Bed → Box 1 → Blue Box",


"Accessory toys":
"Under Bed → Box 1 → Blue Box",


"Clips":
"Under Bed → Box 1 → Green Box",


"Pumpkin cutters":
"Under Bed → Box 1 → Green Box",


"Headphones":
"Under Bed → Box 1 → Grey Box",


"Chargers":
"Under Bed → Box 1 → Grey Box",


"Raspberry Pi":
"Under Bed → Box 2 → Electronics Box",


"Arduino":
"Under Bed → Box 2 → Electronics Box",


"Arduino Uno R3":
"Under Bed → Box 2 → Electronics Box",


"Wires":
"Under Bed → Box 2 → Ziploc Bags",


"Broken fan":
"Under Bed → Box 2 → Electronics Box",


"Electronic components":
"Under Bed → Box 2 → Old Shoe Box",


"Colored pencils":
"Under Bed → Box 3 → Aqua Box → Blue Bag",


"Paint":
"Under Bed → Box 3 → Aqua Box → Ziploc Bag",


"Paint brushes":
"Under Bed → Box 3 → Aqua Box → Ziploc Bag",


"Pokemon box":
"Under Bed → Box 3 → Aqua Box",


"Pens":
"Under Bed → Box 3 → Pokemon Box",


"Colored pens":
"Under Bed → Box 3 → Black Panther Case",


"Pencils":
"Under Bed → Box 3 → Avengers Box",


"Crayons":
"Under Bed → Box 3 → Avengers Box → Crayon Box",


"Highlighters":
"Under Bed → Box 3 → Reindeer Pencil Case",


"Oil pastels":
"Under Bed → Box 3 → Ziploc Bag",


"Books":
"Under Bed → Box 3",


"Rulers":
"Under Bed → Box 3",


"Green backpack":
"Under Bed → Green Backpack",


"Mini bookshelf":
"Under Bed → Empty Mini Bookshelf",


"Board games":
"Bunk Bed Drawer 1",


"Battleship":
"Bunk Bed Drawer 1 → Board Games",


"Sequence":
"Bunk Bed Drawer 1 → Board Games",


"Scrabble":
"Bunk Bed Drawer 1 → Board Games",


"Pokemon cards":
"Bunk Bed Drawer 1 → Cards",


"Uno":
"Bunk Bed Drawer 1 → Cards",


"Spot It":
"Bunk Bed Drawer 1 → Cards",


"3x3 Rubik's Cube":
"Bunk Bed Drawer 1",


"4x4 Rubik's Cube":
"Bunk Bed Drawer 1",


"Circle Rubik's Cube":
"Bunk Bed Drawer 1",


"Pyramid Rubik's Cube":
"Bunk Bed Drawer 1",


"Old fan base":
"Bunk Bed Drawer 2",


"Bunk bed spare parts":
"Bunk Bed Drawer 2",


"Chess":
"Bunk Bed Drawer 2 → Board Game Combo",


"Checkers":
"Bunk Bed Drawer 2 → Board Game Combo",


"Backgammon":
"Bunk Bed Drawer 2 → Board Game Combo",


"Ludo":
"Bunk Bed Drawer 2 → Board Game Combo",


"Snakes and Ladders":
"Bunk Bed Drawer 2 → Board Game Combo",


"Wood puzzles":
"Bunk Bed Drawer 3",


"Medium balls":
"Bunk Bed Drawer 3",


"Bible cards":
"Bunk Bed Drawer 3",


"Christmas cards":
"Bunk Bed Drawer 3",


"Fit the Box":
"Bunk Bed Drawer 3",


"Dice":
"Bunk Bed Drawer 3 → Dice Pack",


"Empty drawer":
"Bunk Bed Drawer 4",


"Lego mug":
"Desk → Lego Mug",


"Everyday stationery":
"Desk → Clear Bin",


"Calculator":
"Desk → Clear Bin",


"Comb":
"Nightstand → Top Drawer",


"Watches":
"Nightstand → Top Drawer",


"Gum":
"Nightstand → Drawer 2",


"Hand sanitizer":
"Nightstand → Drawer 2",


"Fan remote":
"Nightstand → Drawer 2",


"Glasses screwdriver":
"Nightstand → Drawer 2",


"LEGO manuals":
"Nightstand → Drawer 3",


"Letters":
"Nightstand → Drawer 3",


"Water bottle covers":
"Nightstand → Drawer 3",


"Broken phone":
"Nightstand → Drawer 3 Repair Project",


"Broken LED wire":
"Nightstand → Drawer 3 Repair Project"


};

// ---------- TODAY'S FOCUS ----------


function getMandatoryTasks(){

    let today = new Date();

    let day = today.getDay();

    let tasks = [];


    // PLASP until August 6

    if(today <= new Date("2026-08-06")){

        tasks.push(
            "PLASP IT 8:30 AM - 3:30 PM"
        );

    }



    // Violin exam practice

    tasks.push(
        "Practice violin scales (1 hour)"
    );



    // Dishwasher Tuesday and Friday only

    if(day === 2 || day === 5){

        tasks.push(
            "Dishwasher"
        );

    }


    return tasks;

}



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



        li.innerHTML =

        `

        <input type="checkbox">

        <span>${item}</span>

        `;



        list.appendChild(li);



    });


}





function renderTodos(){


    let list=document.getElementById("todoList");


    list.innerHTML="";



    todos.forEach(task=>{


        let li=document.createElement("li");



        li.innerHTML =


        `

        <input type="checkbox"

        ${task.done?"checked":""}>


        <span>

        ${task.name}

        (${task.priority})

        </span>

        `;




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



    wants.forEach(item=>{


        let li=document.createElement("li");



        li.innerHTML =


        `

        <input type="checkbox"

        ${item.done?"checked":""}>


        <span>

        ${item.item}

        <br>

        Reason: ${item.reason}

        <br>

        Priority: ${item.priority}

        </span>


        `;



        li.querySelector("input").onchange=e=>{


            item.done=e.target.checked;


            saveData();


        };



        list.appendChild(li);



    });



}







function renderFocus(){


    let m=document.getElementById("mandatoryTasks");


    m.innerHTML="";



    getMandatoryTasks().forEach(item=>{


        m.innerHTML +=


        `

        <li>

        <input type="checkbox">

        <span>${item}</span>

        </li>


        `;



    });




    let options =


    todos

    .filter(t=>!t.done)

    .filter(t=>

        t.priority==="High" ||

        t.priority==="Medium-High"

    )

    .slice(0,3);





    let box=document.getElementById("focusOptions");


    box.innerHTML="";




    options.forEach(task=>{


        let li=document.createElement("li");



        li.innerHTML =


        `

        <input type="checkbox">

        <span>${task.name}</span>

        `;



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







// ---------- INVENTORY SEARCH ----------



function searchItem(){


    let q =

    document

    .getElementById("searchBox")

    .value

    .toLowerCase()

    .trim();




    let result =

    Object.keys(inventory)

    .find(item =>

        item.toLowerCase().includes(q)

    );




    document.getElementById("result").innerHTML =



    result

    ?

    `<b>${result}</b><br>${inventory[result]}`

    :

    "Not found";


}







// ---------- CLOCK + THEME ----------

function clock() {

    const now = new Date();
    const hour = now.getHours();

    const greeting = document.getElementById("greeting");
    const clock = document.getElementById("clock");
    const date = document.getElementById("date");

    if (greeting) {

        if (hour < 12) {
            greeting.textContent = "☀️ Good Morning";
        } else if (hour < 18) {
            greeting.textContent = "🌤️ Good Afternoon";
        } else {
            greeting.textContent = "🌙 Good Evening";
        }

    }

    if (clock) {
        clock.textContent = now.toLocaleTimeString();
    }

    if (date) {
        date.textContent = now.toDateString();
    }

    document.body.classList.toggle("night", hour >= 18 || hour < 6);

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



setInterval(

clock,

1000

);
