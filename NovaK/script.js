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
// DEFAULT INVENTORY
// =====================================

const defaultInventory = [

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
// LOAD INVENTORY
// =====================================

let savedInventory =
    localStorage.getItem("novaKitchenInventory");


let inventory;

try {

    inventory =
        savedInventory
            ? JSON.parse(savedInventory)
            : defaultInventory;

}
catch (error) {

    console.error(
        "Could not load inventory:",
        error
    );

    inventory =
        defaultInventory;

}


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
// LOW STOCK
// =====================================

function isLowStock(item) {

    if (
        item.tracking === "percentage" ||
        item.tracking === "quantity"
    ) {

        return Number(item.current)
            <= Number(item.threshold);

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

        return 100;

    }

    return (current / max) * 100;

}


// =====================================
// DISPLAY INVENTORY
// =====================================

function displayInventory(items = inventory) {

    const container =
        document.getElementById(
            "inventoryContainer"
        );

    if (!container) return;

    container.innerHTML = "";


    if (items.length === 0) {

        container.innerHTML = `

            <div class="card empty">

                <h3>🔎 No items found</h3>

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


        if (
            item.tracking === "percentage"
        ) {

            amount =
                `${item.current}%`;

            percent =
                Number(item.current);

        }


        else if (
            item.tracking === "quantity"
        ) {

            amount =
                `${item.current} ${item.container}`;

            percent =
                item.max > 0
                    ? (item.current / item.max) * 100
                    : 0;

        }


        else {

            amount =
                item.current;

            percent =
                calculateCustomPercentage(item);

        }


        percent =
            Math.max(
                0,
                Math.min(
                    100,
                    percent
                )
            );


        const lowStock =
            isLowStock(item);


        const card =
            document.createElement("div");

        card.className =
            "card inventory-card";


        card.innerHTML = `

            <h3>
                ${escapeHTML(item.name)}
            </h3>

            <p>
                🏷 ${escapeHTML(item.category)}
            </p>

            <p>
                📍 ${escapeHTML(
                    getLocationName(item.location)
                )}
            </p>

            <p>
                📦 ${escapeHTML(item.container)}
            </p>

            <p>
                Remaining:
                <strong>${escapeHTML(
                    String(amount)
                )}</strong>
            </p>

            <div class="progress">

                <div
                    class="progress-fill"
                    style="width:${percent}%">
                </div>

            </div>

            <p class="${lowStock ? "low" : "good"}">

                ${
                    lowStock
                    ? "⚠️ Running Low"
                    : "✅ Stocked"
                }

            </p>

            <div class="inventory-buttons">

                <button
                    type="button"
                    onclick="removeItem(${item.id})">
                    −
                </button>

                <button
                    type="button"
                    onclick="increaseItem(${item.id})">
                    +
                </button>

            </div>

        `;


        container.appendChild(card);

    });


    updateStats();

}


// =====================================
// SEARCH
// =====================================

function searchInventory() {

    const searchBox =
        document.getElementById(
            "searchBox"
        );

    if (!searchBox) return;


    const search =
        searchBox.value
            .trim()
            .toLowerCase();


    if (!search) {

        displayInventory();

        return;

    }


    const results =
        inventory.filter(item => {

            return (

                String(item.name)
                    .toLowerCase()
                    .includes(search)

                ||

                String(item.category)
                    .toLowerCase()
                    .includes(search)

                ||

                getLocationName(item.location)
                    .toLowerCase()
                    .includes(search)

                ||

                String(item.container)
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


    if (
        item.tracking === "percentage"
    ) {

        item.current =
            Math.min(
                100,
                Number(item.current) + 10
            );

    }


    else if (
        item.tracking === "quantity"
    ) {

        item.current =
            Math.min(
                Number(item.max),
                Number(item.current) + 1
            );

    }


    else {

        alert(
            "Custom measurements can be edited manually for now."
        );

        return;

    }


    saveInventory();

    refreshPage();

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


    if (
        item.tracking === "percentage"
    ) {

        item.current =
            Math.max(
                0,
                Number(item.current) - 10
            );

    }


    else if (
        item.tracking === "quantity"
    ) {

        item.current =
            Math.max(
                0,
                Number(item.current) - 1
            );

    }


    else {

        alert(
            "Custom measurements can be edited manually for now."
        );

        return;

    }


    saveInventory();

    refreshPage();

}


// =====================================
// BOUGHT ITEM
// =====================================

function boughtItem(id) {

    const item =
        inventory.find(
            i => i.id === id
        );

    if (!item) return;


    if (
        item.tracking === "percentage"
    ) {

        item.current = 100;

    }


    else if (
        item.tracking === "quantity"
    ) {

        item.current =
            Number(item.max);

    }


    else {

        item.current =
            item.max;

    }


    saveInventory();

    refreshPage();

}


// =====================================
// REFILL ALL
// =====================================

function refillAll() {

    inventory.forEach(item => {

        if (!isLowStock(item)) {
            return;
        }


        if (
            item.tracking === "percentage"
        ) {

            item.current = 100;

        }


        else if (
            item.tracking === "quantity"
        ) {

            item.current =
                Number(item.max);

        }


        else {

            item.current =
                item.max;

        }

    });


    saveInventory();

    refreshPage();

}


// =====================================
// SHOPPING LIST
// =====================================

function generateShoppingList() {

    const list =
        document.getElementById(
            "shoppingList"
        );

    if (!list) return;


    list.innerHTML = "";


    const lowItems =
        inventory.filter(
            item => isLowStock(item)
        );


    if (lowItems.length === 0) {

        list.innerHTML = `

            <li class="shopping-empty">

                ✅ Nothing needs to be bought!

            </li>

        `;

    }


    else {

        lowItems.forEach(item => {

            const li =
                document.createElement("li");


            li.innerHTML = `

                <div>

                    🛒
                    <strong>
                        ${escapeHTML(item.name)}
                    </strong>

                    <br>

                    <small>
                        📍
                        ${escapeHTML(
                            getLocationName(
                                item.location
                            )
                        )}

                    </small>

                </div>

                <button
                    type="button"
                    onclick="boughtItem(${item.id})">

                    ✓ Bought

                </button>

            `;


            list.appendChild(li);

        });

    }


    const count =
        document.getElementById(
            "shoppingCount"
        );

    if (count) {

        count.innerText =
            lowItems.length;

    }

}


// =====================================
// STATISTICS
// =====================================

function updateStats() {

    const total =
        document.getElementById(
            "totalItems"
        );

    const low =
        document.getElementById(
            "lowStock"
        );


    if (total) {

        total.innerText =
            inventory.length;

    }


    if (low) {

        low.innerText =
            inventory.filter(
                item => isLowStock(item)
            ).length;

    }


    generateShoppingList();

}


// =====================================
// SHOW SECTION
// =====================================

function showSection(id) {

    console.log(
        "Opening section:",
        id
    );


    const sections =
        document.querySelectorAll(
            ".section"
        );


    sections.forEach(section => {

        section.classList.add(
            "hidden"
        );

    });


    const selected =
        document.getElementById(id);


    if (!selected) {

        console.error(
            "Section not found:",
            id
        );

        return;

    }


    selected.classList.remove(
        "hidden"
    );


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    if (id === "inventory") {

        displayInventory();

    }


    if (id === "shopping") {

        generateShoppingList();

    }

}


// =====================================
// MEASUREMENT FIELDS
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


    if (
        type === "percentage"
    ) {

        document
            .getElementById("percentageFields")
            .classList.remove("hidden");

    }


    else if (
        type === "quantity"
    ) {

        document
            .getElementById("quantityFields")
            .classList.remove("hidden");

    }


    else {

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
        document.getElementById(
            "itemName"
        ).value.trim();


    const category =
        document.getElementById(
            "itemCategory"
        ).value.trim()
        || "Other";


    const location =
        document.getElementById(
            "itemLocation"
        ).value;


    const tracking =
        document.getElementById(
            "trackingType"
        ).value;


    const container =
        document.getElementById(
            "itemContainer"
        ).value.trim()
        || "Item";


    if (!name) {

        alert(
            "Please enter an item name."
        );

        return;

    }


    let current;
    let max;
    let threshold;


    // PERCENTAGE

    if (
        tracking === "percentage"
    ) {

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


    // QUANTITY

    else if (
        tracking === "quantity"
    ) {

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


        if (max <= 0) {

            alert(
                "Maximum quantity must be greater than 0."
            );

            return;

        }

    }


    // CUSTOM

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


    inventory.push(
        newItem
    );


    saveInventory();

    displayInventory();


    // CLEAR FORM

    document.getElementById(
        "itemName"
    ).value = "";


    document.getElementById(
        "itemCategory"
    ).value = "";


    document.getElementById(
        "itemContainer"
    ).value = "";


    alert(
        `${name} was added to Nova K!`
    );


    // Go back to inventory

    showSection("inventory");

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
            📍 ${escapeHTML(
                getLocationName(location)
            )}
        </h2>

    `;


    if (items.length === 0) {

        html += `

            <div class="empty-location">

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

        `;


        items.forEach(item => {

            let amount;


            if (
                item.tracking === "percentage"
            ) {

                amount =
                    `${item.current}%`;

            }


            else if (
                item.tracking === "quantity"
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
                    ? "⚠️ LOW STOCK"
                    : "✅ STOCKED";


            html += `

                <div class="card location-item">

                    <h3>
                        ${escapeHTML(item.name)}
                    </h3>

                    <p>
                        🏷
                        ${escapeHTML(item.category)}
                    </p>

                    <p>
                        📦
                        ${escapeHTML(item.container)}
                    </p>

                    <p>
                        Remaining:
                        <strong>
                            ${escapeHTML(
                                String(amount)
                            )}
                        </strong>
                    </p>

                    <p>
                        ${warning}
                    </p>

                </div>

            `;

        });

    }


    details.innerHTML =
        html;

}


// =====================================
// CLOCK
// =====================================

function updateClock() {

    const now =
        new Date();


    const clock =
        document.getElementById(
            "clock"
        );


    const date =
        document.getElementById(
            "date"
        );


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
// ESCAPE HTML
// =====================================

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent =
        value;

    return div.innerHTML;

}


// =====================================
// REFRESH
// =====================================

function refreshPage() {

    const searchBox =
        document.getElementById(
            "searchBox"
        );


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
// START NOVA K
// =====================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateClock();

        updateMeasurementFields();

        displayInventory();

        generateShoppingList();

    }
);


setInterval(
    updateClock,
    1000
);
