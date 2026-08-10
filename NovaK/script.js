// =====================================
// NOVA K - KITCHEN MANAGEMENT SYSTEM
// =====================================


// =====================================
// LOCATION DATABASE
// =====================================

const locations = {

    "upper-cupboard": "Upper Cupboard",
    "microwave-oven": "Microwave / Oven",
    "oven-storage": "Oven Storage",
    "countertop": "Countertop",

    "drawer-1": "Drawer 1 - Utensils",
    "drawer-2": "Drawer 2 - Small Containers",
    "drawer-3": "Drawer 3 - Measuring Tools",
    "drawer-4": "Drawer 4 - Wraps & Bags",

    "kitchen-island": "Kitchen Island",
    "stove": "Stove",
    "pots-pans": "Pots & Pans Cabinet",
    "spice-rack": "Pull-Out Spice Rack",
    "sink-cabinet": "Sink Cabinet",
    "dishwasher": "Dishwasher",
    "right-cabinet": "Right Cabinet",

    "island-upper-cabinets": "Island Upper Cabinets",
    "double-cabinet": "Double Cabinet",

    "coffee-cabinet": "Coffee Cabinet",
    "coffee-counter": "Coffee Counter",
    "coffee-drawers": "Coffee Drawers",

    "freezer": "Freezer",
    "refrigerator": "Refrigerator",
    "fridge-upper-cabinet": "Refrigerator Upper Cabinet",
    "fridge-lower-cabinet": "Refrigerator Lower Cabinet",

    "display-storage": "Display Storage",
    "marketplace-cabinet": "Marketplace Cabinet",
    "curio-cabinet": "Curio Cabinet",

    "window": "Window - Salt & Pepper"

};


// =====================================
// INVENTORY DATABASE
// =====================================

let inventory =
    JSON.parse(
        localStorage.getItem("novaKitchenInventory")
    ) || [

    {
        id: 1,
        name: "Milk",
        category: "Dairy",
        location: "refrigerator",
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
        location: "refrigerator",
        tracking: "quantity",
        container: "Eggs",
        current: 8,
        max: 12,
        threshold: 3
    },

    {
        id: 3,
        name: "Instant Noodles",
        category: "Pantry",
        location: "upper-cupboard",
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
        location: "upper-cupboard",
        tracking: "percentage",
        container: "Container",
        current: 80,
        max: 100,
        threshold: 25
    }

];


// =====================================
// SAVE
// =====================================

function saveInventory() {

    localStorage.setItem(
        "novaKitchenInventory",
        JSON.stringify(inventory)
    );

}


// =====================================
// FORMAT LOCATION
// =====================================

function getLocationName(location) {

    return locations[location] || location;

}


// =====================================
// DISPLAY INVENTORY
// =====================================

function displayInventory(items = inventory) {

    const container =
        document.getElementById(
            "inventoryContainer"
        );

    container.innerHTML = "";


    items.forEach(item => {

        let amount;
        let percent;


        if (item.tracking === "percentage") {

            amount = `${item.current}%`;

            percent = item.current;

        }

        else if (item.tracking === "quantity") {

            amount =
                `${item.current} ${item.container}`;

            percent =
                (item.current / item.max) * 100;

        }

        else {

            amount = item.current;

            percent =
                calculateCustomPercentage(item);

        }


        const lowStock =
            isLowStock(item);


        container.innerHTML += `

        <div class="card inventory-card">

            <h3>
                ${item.name}
            </h3>

            <p>
                📍 ${getLocationName(item.location)}
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
                    style="width:${Math.max(
                        0,
                        Math.min(100, percent)
                    )}%">
                </div>

            </div>

            ${
                lowStock
                ?
                `<p>⚠️ Running Low</p>`
                :
                `<p>✅ Stocked</p>`
            }

            <button onclick="removeItem(${item.id})">
                −
            </button>

            <button onclick="increaseItem(${item.id})">
                +
            </button>

        </div>

        `;

    });


    updateStats();

}


// =====================================
// CUSTOM MEASUREMENT PERCENTAGE
// =====================================

function calculateCustomPercentage(item) {

    const current =
        parseFloat(item.current);

    const max =
        parseFloat(item.max);


    if (
        isNaN(current) ||
        isNaN(max) ||
        max <= 0
    ) {

        return 100;

    }


    return (current / max) * 100;

}


// =====================================
// LOW STOCK
// =====================================

function isLowStock(item) {

    if (
        item.tracking === "percentage" ||
        item.tracking === "quantity"
    ) {

        return (
            Number(item.current) <=
            Number(item.threshold)
        );

    }


    const current =
        parseFloat(item.current);

    const threshold =
        parseFloat(item.threshold);


    if (
        isNaN(current) ||
        isNaN(threshold)
    ) {

        return false;

    }


    return current <= threshold;

}


// =====================================
// SEARCH
// =====================================

function searchInventory() {

    const search =
        document.getElementById("searchBox")
        .value
        .toLowerCase();


    const results =
        inventory.filter(item => {

            return (

                item.name
                    .toLowerCase()
                    .includes(search)

                ||

                item.category
                    .toLowerCase()
                    .includes(search)

                ||

                getLocationName(item.location)
                    .toLowerCase()
                    .includes(search)

            );

        });


    displayInventory(results);

}


// =====================================
// INCREASE ITEM
// =====================================

function increaseItem(id) {

    const item =
        inventory.find(i => i.id === id);


    if (!item) return;


    if (item.tracking === "percentage") {

        item.current += 10;

        if (item.current > 100) {
            item.current = 100;
        }

    }

    else if (item.tracking === "quantity") {

        item.current += 1;

        if (item.current > item.max) {
            item.current = item.max;
        }

    }

    else {

        alert(
            "Custom measurements should be edited manually for now."
        );

        return;

    }


    saveInventory();

    displayInventory();

}


// =====================================
// REMOVE ITEM
// =====================================

function removeItem(id) {

    const item =
        inventory.find(i => i.id === id);


    if (!item) return;


    if (item.tracking === "percentage") {

        item.current -= 10;

        if (item.current < 0) {
            item.current = 0;
        }

    }

    else if (item.tracking === "quantity") {

        item.current -= 1;

        if (item.current < 0) {
            item.current = 0;
        }

    }

    else {

        alert(
            "Custom measurements should be edited manually for now."
        );

        return;

    }


    saveInventory();

    displayInventory();

}


// =====================================
// SHOPPING LIST
// =====================================

function generateShoppingList() {

    const list =
        document.getElementById("shoppingList");


    list.innerHTML = "";


    const lowItems =
        inventory.filter(item => isLowStock(item));


    lowItems.forEach(item => {

        list.innerHTML += `

            <li>

                🛒
                <strong>
                    ${item.name}
                </strong>

                <br>

                <small>
                    ${getLocationName(item.location)}
                </small>

            </li>

        `;

    });


    document.getElementById("shoppingCount")
        .innerText = lowItems.length;

}


// =====================================
// STATISTICS
// =====================================

function updateStats() {

    document.getElementById("totalItems")
        .innerText = inventory.length;


    const low =
        inventory.filter(item => isLowStock(item));


    document.getElementById("lowStock")
        .innerText = low.length;


    generateShoppingList();

}


// =====================================
// SHOW SECTION
// =====================================

function showSection(id) {

    document
        .querySelectorAll(".section")
        .forEach(section => {

            section.classList.add("hidden");

        });


    const selected =
        document.getElementById(id);


    if (selected) {

        selected.classList.remove("hidden");

    }

}


// =====================================
// TRACKING FIELD SWITCHER
// =====================================

function updateMeasurementFields() {

    const type =
        document.getElementById("trackingType").value;


    document
        .getElementById("percentageFields")
        .classList.add("hidden");


    document
        .getElementById("quantityFields")
        .classList.add("hidden");


    document
        .getElementById("customFields")
        .classList.add("hidden");


    if (type === "percentage") {

        document
            .getElementById("percentageFields")
            .classList.remove("hidden");

    }

    else if (type === "quantity") {

        document
            .getElementById("quantityFields")
            .classList.remove("hidden");

    }

    else if (type === "custom") {

        document
            .getElementById("customFields")
            .classList.remove("hidden");

    }

}


// =====================================
// ADD ITEM
// =====================================

function addItem() {

    const name =
        document.getElementById("itemName")
        .value.trim();


    const category =
        document.getElementById("itemCategory")
        .value.trim() || "Other";


    const location =
        document.getElementById("itemLocation")
        .value;


    const tracking =
        document.getElementById("trackingType")
        .value;


    const container =
        document.getElementById("itemContainer")
        .value.trim() || "Item";


    if (!name) {

        alert("Please enter an item name.");

        return;

    }


    let current;
    let max;
    let threshold;


    if (tracking === "percentage") {

        current =
            Number(
                document.getElementById(
                    "itemCurrentPercentage"
                ).value
            );

        max = 100;

        threshold =
            Number(
                document.getElementById(
                    "itemThresholdPercentage"
                ).value
            );

    }


    else if (tracking === "quantity") {

        current =
            Number(
                document.getElementById(
                    "itemCurrentQuantity"
                ).value
            );

        max =
            Number(
                document.getElementById(
                    "itemMaxQuantity"
                ).value
            );

        threshold =
            Number(
                document.getElementById(
                    "itemThresholdQuantity"
                ).value
            );

    }


    else {

        current =
            document.getElementById(
                "itemCustomCurrent"
            ).value.trim();


        max =
            document.getElementById(
                "itemCustomMax"
            ).value.trim();


        threshold =
            document.getElementById(
                "itemCustomThreshold"
            ).value.trim();


        if (!current || !max || !threshold) {

            alert(
                "Please fill in all custom measurement fields."
            );

            return;

        }

    }


    const newItem = {

        id: Date.now(),

        name: name,

        category: category,

        location: location,

        tracking: tracking,

        container: container,

        current: current,

        max: max,

        threshold: threshold

    };


    inventory.push(newItem);


    saveInventory();

    displayInventory();


    document.getElementById("itemName").value = "";

    document.getElementById("itemCategory").value = "";

    document.getElementById("itemContainer").value = "";


    alert(`${name} was added to Nova K.`);

}


// =====================================
// KITCHEN MAP
// =====================================

function showLocationItems(location) {

    const details =
        document.getElementById("locationDetails");


    const items =
        inventory.filter(
            item => item.location === location
        );


    let html = `

        <h2>
            📍 ${getLocationName(location)}
        </h2>

    `;


    if (items.length === 0) {

        html += `

            <p>
                Nothing is currently recorded
                in this location.
            </p>

        `;

    }

    else {

        html += `

            <p>
                ${items.length}
                item(s) stored here.
            </p>

        `;


        items.forEach(item => {

            let amount;


            if (item.tracking === "percentage") {

                amount = `${item.current}%`;

            }

            else if (item.tracking === "quantity") {

                amount =
                    `${item.current} ${item.container}`;

            }

            else {

                amount = item.current;

            }


            const warning =
                isLowStock(item)
                ? "⚠️ LOW STOCK"
                : "✅";


            html += `

                <div class="card">

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        📦 ${item.container}
                    </p>

                    <p>
                        Remaining:
                        <strong>
                            ${amount}
                        </strong>
                    </p>

                    <p>
                        ${warning}
                    </p>

                </div>

            `;

        });

    }


    details.innerHTML = html;

}


// =====================================
// CLOCK
// =====================================

function updateClock() {

    const now = new Date();


    document.getElementById("clock")
        .innerText =
        now.toLocaleTimeString();


    document.getElementById("date")
        .innerText =
        now.toLocaleDateString();

}


setInterval(updateClock, 1000);


// =====================================
// START
// =====================================

updateClock();

updateMeasurementFields();

displayInventory();
