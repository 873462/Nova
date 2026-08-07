// =====================================
// NOVA K - KITCHEN MANAGEMENT SYSTEM
// =====================================


// ===============================
// INVENTORY DATABASE
// ===============================

let inventory = JSON.parse(localStorage.getItem("novaKitchenInventory")) || [

    {
        id: 1,
        name: "Milk",
        category: "Dairy",
        location: "Refrigerator",
        tracking: "percentage",
        container: "Jug",
        current: 65,
        max: 100,
        threshold: 25
    },


    {
        id: 2,
        name: "Eggs",
        category: "Dairy",
        location: "Refrigerator",
        tracking: "quantity",
        container: "Carton",
        current: 8,
        max: 12,
        threshold: 3
    },


    {
        id: 3,
        name: "Instant Noodles",
        category: "Pantry",
        location: "Upper Cupboard",
        tracking: "quantity",
        container: "Packets",
        current: 6,
        max: 12,
        threshold: 3
    },


    {
        id: 4,
        name: "Rice",
        category: "Pantry",
        location: "Upper Cupboard",
        tracking: "percentage",
        container: "Container",
        current: 80,
        max: 100,
        threshold: 25
    }

];



// ===============================
// SAVE DATA
// ===============================

function saveInventory(){

    localStorage.setItem(
        "novaKitchenInventory",
        JSON.stringify(inventory)
    );

}



// ===============================
// DISPLAY INVENTORY
// ===============================

function displayInventory(items = inventory){

    const container = document.getElementById(
        "inventoryContainer"
    );


    container.innerHTML = "";


    items.forEach(item => {


        let amount;


        if(item.tracking === "percentage"){

            amount =
            `${item.current}%`;

        }

        else{

            amount =
            `${item.current} ${item.container}`;

        }



        let percent;


        if(item.tracking === "percentage"){

            percent = item.current;

        }

        else{

            percent =
            (item.current / item.max) * 100;

        }




        container.innerHTML += `

        <div class="card inventory-card">


            <h3>
            ${item.name}
            </h3>


            <p>
            📍 ${item.location}
            </p>


            <p>
            📦 ${item.container}
            </p>


            <p>
            Remaining:
            <b>${amount}</b>
            </p>



            <div class="progress">

                <div 
                class="progress-fill"
                style="width:${percent}%">
                </div>

            </div>



            <button onclick="removeItem(${item.id})">
            -1
            </button>


            <button onclick="increaseItem(${item.id})">
            +1
            </button>



        </div>

        `;


    });


    updateStats();

}



// ===============================
// SEARCH
// ===============================

function searchInventory(){


    let search =
    document.getElementById("searchBox")
    .value
    .toLowerCase();



    let results =
    inventory.filter(item =>


        item.name.toLowerCase()
        .includes(search)


        ||

        item.category.toLowerCase()
        .includes(search)


        ||

        item.location.toLowerCase()
        .includes(search)

    );


    displayInventory(results);


}





// ===============================
// UPDATE ITEMS
// ===============================


function increaseItem(id){


    let item =
    inventory.find(i => i.id === id);



    if(item.tracking === "percentage"){

        item.current += 10;

        if(item.current > 100)
        item.current = 100;

    }


    else{


        item.current++;


        if(item.current > item.max)
        item.current = item.max;


    }



    saveInventory();

    displayInventory();

}





function removeItem(id){


    let item =
    inventory.find(i => i.id === id);



    if(item.tracking === "percentage"){

        item.current -= 10;


        if(item.current < 0)
        item.current = 0;

    }


    else{

        item.current--;


        if(item.current < 0)
        item.current = 0;

    }



    saveInventory();

    displayInventory();

}





// ===============================
// SHOPPING LIST
// ===============================

function generateShoppingList(){


    let list =
    document.getElementById(
        "shoppingList"
    );


    list.innerHTML = "";



    let count = 0;



    inventory.forEach(item => {


        if(item.current <= item.threshold){


            list.innerHTML += `

            <li>

            🛒 ${item.name}

            </li>

            `;


            count++;

        }


    });



    document.getElementById(
        "shoppingCount"
    )
    .innerText = count;


}




function clearShoppingList(){

    inventory.forEach(item =>{


        if(item.current <= item.threshold){

            item.current =
            item.max;

        }


    });



    saveInventory();

    displayInventory();

}





// ===============================
// ADD ITEM
// ===============================

function addItem(){


    let name =
    document.getElementById("itemName")
    .value;



    let location =
    document.getElementById("itemLocation")
    .value;



    let tracking =
    document.getElementById("trackingType")
    .value;



    let newItem = {


        id:
        Date.now(),


        name:name,


        category:"Other",


        location:location,


        tracking:tracking,


        container:
        tracking === "percentage"
        ?
        "Container"
        :
        "Items",



        current:
        tracking === "percentage"
        ?
        100
        :
        1,


        max:
        tracking === "percentage"
        ?
        100
        :
        10,


        threshold:
        tracking === "percentage"
        ?
        25
        :
        3


    };



    inventory.push(newItem);


    saveInventory();


    displayInventory();


}







// ===============================
// STATISTICS
// ===============================


function updateStats(){


    document.getElementById(
        "totalItems"
    )
    .innerText =
    inventory.length;



    let low =
    inventory.filter(item =>
    item.current <= item.threshold
    );


    document.getElementById(
        "lowStock"
    )
    .innerText =
    low.length;



    generateShoppingList();


}







// ===============================
// PAGE SECTIONS
// ===============================


function showSection(id){


    document
    .querySelectorAll(".section")
    .forEach(section=>{


        section.classList.add(
            "hidden"
        );


    });



    document
    .getElementById(id)
    .classList.remove(
        "hidden"
    );


}






// ===============================
// CLOCK
// ===============================

function updateClock(){


    let now =
    new Date();



    document.getElementById(
        "clock"
    )
    .innerText =
    now.toLocaleTimeString();



    document.getElementById(
        "date"
    )
    .innerText =
    now.toLocaleDateString();



}


setInterval(
    updateClock,
    1000
);






// ===============================
// START APP
// ===============================

updateClock();

displayInventory();
