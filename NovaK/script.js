```javascript
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
// SAVE INVENTORY
// =====================================

function saveInventory() {

    localStorage.setItem(
        "novaKitchenInventory",
        JSON.stringify(inventory)
    );

}



// =====================================
// LOCATION NAME
// =====================================

function getLocationName(location) {

    return locations[location] || location;

}



// =====================================
// DISPLAY INVENTORY
// =====================================

function displayInventory(items = inventory) {

    const container =
        document.getElementById("inventoryContainer");

    if (!container) return;

    container.innerHTML = "";


    if (items.length === 0) {

        container.innerHTML = `

            <div class="card empty-state">

                <h3>🔍 No Items Found</h3>

                <p>
                    Try another search.
                </p>

            </div>

        `;

        updateStats();

        return;

    }


    items.forEach(item => {

        let amount;
        let percent;


        // PERCENTAGE

        if (item.tracking === "percentage") {

            amount = `${item.current}%`;

            percent = Number(item.current);

        }


        // QUANTITY

        else if (item.tracking === "quantity") {

            amount =
                `${item.current} ${item.container}`;

            percent =
                Number(item.max) > 0
                ?
                (Number(item.current) / Number(item.max)) * 100
                :
                0;

        }


        // CUSTOM

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
                    🏷 ${item.category}
                </p>


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
                    `<p class="low-stock">
                        ⚠️ Running Low
                    </p>`
                    :
                    `<p class="good-stock">
                        ✅ Stocked
                    </p>`
                }


                <div class="inventory-buttons">

                    <button
                        onclick="removeItem(${item.id})"
                    >
                        −
                    </button>


                    <button
                        onclick="increaseItem(${item.id})"
                    >
                        +
                    </button>

                </div>

            </div>

        `;

    });


    updateStats();

}



// =====================================
// CUSTOM PERCENTAGE
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

        return 0;

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
            Number(item.current)
            <=
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

    const input =
        document.getElementById("searchBox");


    if (!input) return;


    const search =
        input.value
            .trim()
            .toLowerCase();


    if (!search) {

        displayInventory();

        return;

    }


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

                ||

                item.container
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
        inventory.find(
            i => i.id === id
        );


    if (!item) return;


    if (item.tracking === "percentage") {

        item.current =
            Math.min(
                100,
                Number(item.current) + 10
            );

    }


    else if (item.tracking === "quantity") {

        item.current =
            Math.min(
                Number(item.max),
                Number(item.current) + 1
            );

    }


    else {

        alert(
            "Custom measurements should be edited manually for now."
        );

        return;

    }


    saveInventory();

    refreshInventory();

}



// =====================================
// REMOVE ITEM
// =====================================

function removeItem(id) {

    const item =
        inventory.find(
            i => i.id === id
        );


    if (!item) return;


    if (item.tracking === "percentage") {

        item.current =
            Math.max(
                0,
                Number(item.current) - 10
            );

    }


    else if (item.tracking === "quantity") {

        item.current =
            Math.max(
                0,
                Number(item.current) - 1
            );

    }


    else {

        alert(
            "Custom measurements should be edited manually for now."
        );

        return;

    }


    saveInventory();

    refreshInventory();

}



// =====================================
// SHOPPING LIST
// =====================================

function generateShoppingList() {

    const list =
        document.getElementById("shoppingList");


    if (!list) return;


    list.innerHTML = "";


    const lowItems =
        inventory.filter(
            item => isLowStock(item)
        );


    if (lowItems.length === 0) {

        list.innerHTML = `

            <li class="empty-shopping">

                ✅ Nothing needs to be bought!

            </li>

        `;

    }


    else {

        lowItems.forEach(item => {

            let amount;


            if (item.tracking === "percentage") {

                amount =
                    `${item.current}%`;

            }

            else if (item.tracking === "quantity") {

                amount =
                    `${item.current} ${item.container}`;

            }

            else {

                amount =
                    item.current;

            }


            list.innerHTML += `

                <li class="shopping-item">

                    <div>

                        🛒

                        <strong>
                            ${item.name}
                        </strong>

                        <br>

                        <small>
                            📍 ${getLocationName(item.location)}
                        </small>

                        <br>

                        <small>
                            Remaining: ${amount}
                        </small>

                    </div>


                    <button
                        onclick="markBought(${item.id})"
                    >
                        ✅ Bought
                    </button>

                </li>

            `;

        });

    }


    document.getElementById(
        "shoppingCount"
    ).innerText =
        lowItems.length;

}



// =====================================
// MARK ITEM AS BOUGHT
// =====================================

function markBought(id) {

    const item =
        inventory.find(
            i => i.id === id
        );


    if (!item) return;


    // Buying an item refills it to maximum.

    item.current =
        item.max;


    saveInventory();

    refreshInventory();


    showSection("shopping");

}



// =====================================
// REFILL ALL
// =====================================

function refillAll() {

    const lowItems =
        inventory.filter(
            item => isLowStock(item)
        );


    if (lowItems.length === 0) {

        alert(
            "Nothing needs to be refilled."
        );

        return;

    }


    lowItems.forEach(item => {

        item.current =
            item.max;

    });


    saveInventory();

    refreshInventory();


    showSection("shopping");

}



// =====================================
// STATISTICS
// =====================================

function updateStats() {

    const total =
        document.getElementById("totalItems");


    const lowStock =
        document.getElementById("lowStock");


    if (total) {

        total.innerText =
            inventory.length;

    }


    const low =
        inventory.filter(
            item => isLowStock(item)
        );


    if (lowStock) {

        lowStock.innerText =
            low.length;

    }


    generateShoppingList();

}



// =====================================
// REFRESH EVERYTHING
// =====================================

function refreshInventory() {

    const searchBox =
        document.getElementById("searchBox");


    if (
        searchBox &&
        searchBox.value.trim()
    ) {

        searchInventory();

    }

    else {

        displayInventory();

    }


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


    // If map is opened, reset the map display.

    if (id === "map") {

        resetLocationDetails();

    }

}



// =====================================
// TRACKING FIELD SWITCHER
// =====================================

function updateMeasurementFields() {

    const type =
        document.getElementById(
            "trackingType"
        ).value;


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
        document
            .getElementById("itemName")
            .value
            .trim();


    const category =
        document
            .getElementById("itemCategory")
            .value
            .trim()
        ||
        "Other";


    const location =
        document
            .getElementById("itemLocation")
            .value;


    const tracking =
        document
            .getElementById("trackingType")
            .value;


    const container =
        document
            .getElementById("itemContainer")
            .value
            .trim()
        ||
        "Item";


    if (!name) {

        alert(
            "Please enter an item name."
        );

        return;

    }


    let current;
    let max;
    let threshold;



    // =================================
    // PERCENTAGE
    // =================================

    if (tracking === "percentage") {

        current =
            Number(
                document
                    .getElementById(
                        "itemCurrentPercentage"
                    )
                    .value
            );


        max = 100;


        threshold =
            Number(
                document
                    .getElementById(
                        "itemThresholdPercentage"
                    )
                    .value
            );

    }



    // =================================
    // QUANTITY
    // =================================

    else if (tracking === "quantity") {

        current =
            Number(
                document
                    .getElementById(
                        "itemCurrentQuantity"
                    )
                    .value
            );


        max =
            Number(
                document
                    .getElementById(
                        "itemMaxQuantity"
                    )
                    .value
            );


        threshold =
            Number(
                document
                    .getElementById(
                        "itemThresholdQuantity"
                    )
                    .value
            );


        if (max <= 0) {

            alert(
                "Maximum quantity must be greater than 0."
            );

            return;

        }

    }



    // =================================
    // CUSTOM
    // =================================

    else {

        current =
            document
                .getElementById(
                    "itemCustomCurrent"
                )
                .value
                .trim();


        max =
            document
                .getElementById(
                    "itemCustomMax"
                )
                .value
                .trim();


        threshold =
            document
                .getElementById(
                    "itemCustomThreshold"
                )
                .value
                .trim();


        if (
            !current ||
            !max ||
            !threshold
        ) {

            alert(
                "Please fill in all custom measurement fields."
            );

            return;

        }

    }



    // =================================
    // CREATE ITEM
    // =================================

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


    // Clear search.

    const searchBox =
        document.getElementById("searchBox");


    if (searchBox) {

        searchBox.value = "";

    }


    // Clear fields.

    document.getElementById(
        "itemName"
    ).value = "";


    document.getElementById(
        "itemCategory"
    ).value = "";


    document.getElementById(
        "itemContainer"
    ).value = "";


    // Reset tracking fields.

    document.getElementById(
        "trackingType"
    ).value = "percentage";


    document.getElementById(
        "itemCurrentPercentage"
    ).value = 100;


    document.getElementById(
        "itemThresholdPercentage"
    ).value = 25;


    document.getElementById(
        "itemCurrentQuantity"
    ).value = 1;


    document.getElementById(
        "itemMaxQuantity"
    ).value = 10;


    document.getElementById(
        "itemThresholdQuantity"
    ).value = 3;


    document.getElementById(
        "itemCustomCurrent"
    ).value = "";


    document.getElementById(
        "itemCustomMax"
    ).value = "";


    document.getElementById(
        "itemCustomThreshold"
    ).value = "";


    updateMeasurementFields();


    refreshInventory();


    // Show the new item immediately.

    showSection("inventory");


    alert(
        `${name} was added to Nova K.`
    );

}



// =====================================
// KITCHEN MAP
// =====================================

function showLocationItems(location) {

    const details =
        document.getElementById(
            "locationDetails"
        );


    if (!details) return;


    const items =
        inventory.filter(
            item =>
                item.location === location
        );


    let html = `

        <h2>
            📍 ${getLocationName(location)}
        </h2>

    `;


    if (items.length === 0) {

        html += `

            <div class="map-empty">

                <p>
                    Nothing is currently recorded
                    in this location.
                </p>

            </div>

        `;

    }


    else {

        html += `

            <p>
                ${items.length}
                item(s) stored here.
            </p>

            <div class="location-items">

        `;


        items.forEach(item => {

            let amount;


            if (
                item.tracking ===
                "percentage"
            ) {

                amount =
                    `${item.current}%`;

            }


            else if (
                item.tracking ===
                "quantity"
            ) {

                amount =
                    `${item.current} ${item.container}`;

            }


            else {

                amount =
                    item.current;

            }


            const warning =
                isLowStock(item)
                ?
                "⚠️ LOW STOCK"
                :
                "✅ STOCKED";


            html += `

                <div class="card location-item">

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        🏷 ${item.category}
                    </p>

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


        html += `

            </div>

        `;

    }


    details.innerHTML =
        html;

}



// =====================================
// RESET MAP
// =====================================

function resetLocationDetails() {

    const details =
        document.getElementById(
            "locationDetails"
        );


    if (!details) return;


    details.innerHTML = `

        <h2>
            📍 Select a Location
        </h2>

        <p>
            Click a location above to see
            the items stored there.
        </p>

    `;

}



// =====================================
// CLOCK
// =====================================

function updateClock() {

    const now =
        new Date();


    const clock =
        document.getElementById("clock");


    const date =
        document.getElementById("date");


    if (clock) {

        clock.innerText =
            now.toLocaleTimeString();

    }


    if (date) {

        date.innerText =
            now.toLocaleDateString(
                undefined,
                {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                }
            );

    }

}



// =====================================
// START NOVA K
// =====================================

setInterval(
    updateClock,
    1000
);


updateClock();

updateMeasurementFields();

displayInventory();

generateShoppingList();

showSection("inventory");
```
