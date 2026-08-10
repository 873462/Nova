```javascript
// =====================================
// NOVA K - KITCHEN MANAGEMENT SYSTEM
// SHARED SUPABASE DATABASE VERSION
// =====================================


// =====================================
// SUPABASE CONFIGURATION
// =====================================

const SUPABASE_URL =
    "https://whvghfgaqjzjbytnkwtn.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_8XkDH_vzIYxSOBCjlnm1VA_T-lcXM4k";


// =====================================
// SUPABASE CLIENT
// =====================================

let db = null;


// Load Supabase library
const supabaseScript =
    document.createElement("script");

supabaseScript.src =
    "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";

supabaseScript.onload = () => {

    db = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );

    startNovaK();

};

document.head.appendChild(supabaseScript);


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

    "island-upper-cabinets":
        "Island Upper Cabinets",

    "double-cabinet":
        "Double Cabinet",

    "coffee-cabinet":
        "Coffee Cabinet",

    "coffee-counter":
        "Coffee Counter",

    "coffee-drawers":
        "Coffee Drawers",

    "freezer":
        "Freezer",

    "refrigerator":
        "Refrigerator",

    "fridge-upper-cabinet":
        "Refrigerator Upper Cabinet",

    "fridge-lower-cabinet":
        "Refrigerator Lower Cabinet",

    "display-storage":
        "Display Storage",

    "marketplace-cabinet":
        "Marketplace Cabinet",

    "curio-cabinet":
        "Curio Cabinet",

    "window":
        "Window - Salt & Pepper"

};


// =====================================
// INVENTORY
// =====================================

let inventory = [];


// =====================================
// START NOVA K
// =====================================

async function startNovaK() {

    console.log("Nova K starting...");

    await loadInventory();

    setupRealtime();

    updateClock();

    setInterval(
        updateClock,
        1000
    );

    updateMeasurementFields();

}


// =====================================
// LOAD INVENTORY FROM SUPABASE
// =====================================

async function loadInventory() {

    try {

        const {
            data,
            error
        } = await db
            .from("kitchen_inventory")
            .select("*")
            .order("created_at", {
                ascending: true
            });


        if (error) {

            console.error(
                "Could not load inventory:",
                error
            );

            alert(
                "Nova K could not connect to the database."
            );

            return;

        }


        inventory =
            data.map(
                convertDatabaseItem
            );


        displayInventory();

    }

    catch (error) {

        console.error(error);

    }

}


// =====================================
// DATABASE → JAVASCRIPT
// =====================================

function convertDatabaseItem(item) {

    let current =
        item.current_value;

    let max =
        item.max_value;

    let threshold =
        item.threshold_value;


    if (
        item.tracking ===
        "percentage"
    ) {

        current =
            Number(current);

        max =
            Number(max);

        threshold =
            Number(threshold);

    }


    else if (
        item.tracking ===
        "quantity"
    ) {

        current =
            Number(current);

        max =
            Number(max);

        threshold =
            Number(threshold);

    }


    return {

        id: item.id,

        name: item.name,

        category:
            item.category || "Other",

        location:
            item.location,

        tracking:
            item.tracking,

        container:
            item.container || "Item",

        current: current,

        max: max,

        threshold: threshold

    };

}


// =====================================
// JAVASCRIPT → DATABASE
// =====================================

function convertToDatabaseItem(item) {

    return {

        id: item.id,

        name: item.name,

        category:
            item.category || "Other",

        location:
            item.location,

        tracking:
            item.tracking,

        container:
            item.container || "Item",

        current_value:
            String(item.current),

        max_value:
            String(item.max),

        threshold_value:
            String(item.threshold),

        updated_at:
            new Date().toISOString()

    };

}


// =====================================
// REALTIME
// =====================================

function setupRealtime() {

    db
        .channel("nova-kitchen-inventory")

        .on(
            "postgres_changes",
            {
                event: "*",
                schema: "public",
                table: "kitchen_inventory"
            },

            payload => {

                console.log(
                    "Nova K database update:",
                    payload
                );

                loadInventory();

            }

        )

        .subscribe();

}


// =====================================
// SAVE NEW ITEM
// =====================================

async function saveNewItem(item) {

    const databaseItem =
        convertToDatabaseItem(item);


    const {
        error
    } = await db
        .from("kitchen_inventory")
        .insert(
            databaseItem
        );


    if (error) {

        console.error(
            "Could not add item:",
            error
        );

        alert(
            "There was a problem adding the item."
        );

        return false;

    }


    return true;

}


// =====================================
// UPDATE ITEM
// =====================================

async function updateItemInDatabase(item) {

    const databaseItem =
        convertToDatabaseItem(item);


    const {
        error
    } = await db
        .from("kitchen_inventory")
        .update(
            databaseItem
        )
        .eq(
            "id",
            item.id
        );


    if (error) {

        console.error(
            "Could not update item:",
            error
        );

        alert(
            "There was a problem updating the item."
        );

        return false;

    }


    return true;

}


// =====================================
// DELETE ITEM
// =====================================

async function deleteItem(id) {

    const item =
        inventory.find(
            i => i.id === id
        );


    if (!item) return;


    const confirmed =
        confirm(
            `Remove "${item.name}" from Nova K?`
        );


    if (!confirmed) return;


    const {
        error
    } = await db
        .from("kitchen_inventory")
        .delete()
        .eq(
            "id",
            id
        );


    if (error) {

        console.error(
            "Could not delete item:",
            error
        );

        alert(
            "There was a problem removing the item."
        );

        return;

    }


    await loadInventory();

}


// =====================================
// LOCATION NAME
// =====================================

function getLocationName(location) {

    return (
        locations[location] ||
        location
    );

}


// =====================================
// DISPLAY INVENTORY
// =====================================

function displayInventory(
    items = inventory
) {

    const container =
        document.getElementById(
            "inventoryContainer"
        );


    if (!container) return;


    container.innerHTML = "";


    items.forEach(item => {

        let amount;

        let percent;


        // Percentage

        if (
            item.tracking ===
            "percentage"
        ) {

            amount =
                `${item.current}%`;

            percent =
                Number(item.current);

        }


        // Quantity

        else if (
            item.tracking ===
            "quantity"
        ) {

            amount =
                `${item.current} ${item.container}`;

            percent =
                (
                    Number(item.current) /
                    Number(item.max)
                ) * 100;

        }


        // Custom

        else {

            amount =
                item.current;

            percent =
                calculateCustomPercentage(
                    item
                );

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


        container.innerHTML += `

            <div class="card inventory-card">

                <h3>
                    ${escapeHTML(item.name)}
                </h3>

                <p>
                    📍
                    ${escapeHTML(
                        getLocationName(
                            item.location
                        )
                    )}
                </p>

                <p>
                    📦
                    ${escapeHTML(
                        item.container
                    )}
                </p>

                <p>
                    Remaining:
                    <b>
                        ${escapeHTML(
                            String(amount)
                        )}
                    </b>
                </p>

                <div class="progress">

                    <div
                        class="progress-fill"
                        style="
                            width:${percent}%
                        ">
                    </div>

                </div>

                <p>
                    ${
                        lowStock
                        ? "⚠️ Running Low"
                        : "✅ Stocked"
                    }
                </p>


                ${
                    item.tracking !==
                    "custom"

                    ?

                    `

                    <button
                        onclick="
                            removeItem(
                                ${item.id}
                            )
                        ">
                        −
                    </button>

                    <button
                        onclick="
                            increaseItem(
                                ${item.id}
                            )
                        ">
                        +
                    </button>

                    `

                    :

                    ""

                }


                <button
                    onclick="
                        deleteItem(
                            ${item.id}
                        )
                    ">
                    🗑️ Remove
                </button>

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
        parseFloat(
            item.current
        );


    const max =
        parseFloat(
            item.max
        );


    if (
        isNaN(current) ||
        isNaN(max) ||
        max <= 0
    ) {

        return 100;

    }


    return (
        current /
        max
    ) * 100;

}


// =====================================
// LOW STOCK
// =====================================

function isLowStock(item) {

    if (
        item.tracking ===
        "percentage"
        ||
        item.tracking ===
        "quantity"
    ) {

        return (
            Number(item.current)
            <=
            Number(item.threshold)
        );

    }


    const current =
        parseFloat(
            item.current
        );


    const threshold =
        parseFloat(
            item.threshold
        );


    if (
        isNaN(current) ||
        isNaN(threshold)
    ) {

        return false;

    }


    return (
        current <= threshold
    );

}


// =====================================
// SEARCH
// =====================================

function searchInventory() {

    const search =
        document.getElementById(
            "searchBox"
        )
        .value
        .toLowerCase()
        .trim();


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

                getLocationName(
                    item.location
                )
                    .toLowerCase()
                    .includes(search)

            );

        });


    displayInventory(results);

}


// =====================================
// INCREASE
// =====================================

async function increaseItem(id) {

    const item =
        inventory.find(
            i => i.id === id
        );


    if (!item) return;


    if (
        item.tracking ===
        "percentage"
    ) {

        item.current =
            Math.min(
                100,
                Number(item.current) + 10
            );

    }


    else if (
        item.tracking ===
        "quantity"
    ) {

        item.current =
            Math.min(
                Number(item.max),
                Number(item.current) + 1
            );

    }


    await updateItemInDatabase(
        item
    );

}


// =====================================
// DECREASE
// =====================================

async function removeItem(id) {

    const item =
        inventory.find(
            i => i.id === id
        );


    if (!item) return;


    if (
        item.tracking ===
        "percentage"
    ) {

        item.current =
            Math.max(
                0,
                Number(item.current) - 10
            );

    }


    else if (
        item.tracking ===
        "quantity"
    ) {

        item.current =
            Math.max(
                0,
                Number(item.current) - 1
            );

    }


    await updateItemInDatabase(
        item
    );

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
            item =>
                isLowStock(item)
        );


    if (
        lowItems.length === 0
    ) {

        list.innerHTML = `

            <li>
                ✅ Nothing needs to be
                purchased right now.
            </li>

        `;

    }


    else {

        lowItems.forEach(item => {

            list.innerHTML += `

                <li>

                    🛒
                    <strong>
                        ${escapeHTML(
                            item.name
                        )}
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

                </li>

            `;

        });

    }


    const count =
        lowItems.length;


    const countElement =
        document.getElementById(
            "shoppingCount"
        );


    if (countElement) {

        countElement.innerText =
            count;

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


    if (total) {

        total.innerText =
            inventory.length;

    }


    const low =
        inventory.filter(
            item =>
                isLowStock(item)
        );


    const lowElement =
        document.getElementById(
            "lowStock"
        );


    if (lowElement) {

        lowElement.innerText =
            low.length;

    }


    generateShoppingList();

}


// =====================================
// SECTION SWITCHING
// =====================================

function showSection(id) {

    document
        .querySelectorAll(".section")
        .forEach(
            section => {

                section.classList.add(
                    "hidden"
                );

            }
        );


    const selected =
        document.getElementById(
            id
        );


    if (selected) {

        selected.classList.remove(
            "hidden"
        );

    }

}


// =====================================
// MEASUREMENT TYPE
// =====================================

function updateMeasurementFields() {

    const type =
        document.getElementById(
            "trackingType"
        );


    if (!type) return;


    const selected =
        type.value;


    document
        .getElementById(
            "percentageFields"
        )
        .classList.add(
            "hidden"
        );


    document
        .getElementById(
            "quantityFields"
        )
        .classList.add(
            "hidden"
        );


    document
        .getElementById(
            "customFields"
        )
        .classList.add(
            "hidden"
        );


    if (
        selected ===
        "percentage"
    ) {

        document
            .getElementById(
                "percentageFields"
            )
            .classList.remove(
                "hidden"
            );

    }


    else if (
        selected ===
        "quantity"
    ) {

        document
            .getElementById(
                "quantityFields"
            )
            .classList.remove(
                "hidden"
            );

    }


    else if (
        selected ===
        "custom"
    ) {

        document
            .getElementById(
                "customFields"
            )
            .classList.remove(
                "hidden"
            );

    }

}


// =====================================
// ADD ITEM
// =====================================

async function addItem() {

    const name =
        document.getElementById(
            "itemName"
        )
        .value
        .trim();


    const category =
        document.getElementById(
            "itemCategory"
        )
        .value
        .trim()
        ||
        "Other";


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
        )
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


    // Percentage

    if (
        tracking ===
        "percentage"
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


    // Quantity

    else if (
        tracking ===
        "quantity"
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

    }


    // Custom

    else {

        current =
            document.getElementById(
                "itemCustomCurrent"
            ).value
            .trim();


        max =
            document.getElementById(
                "itemCustomMax"
            ).value
            .trim();


        threshold =
            document.getElementById(
                "itemCustomThreshold"
            ).value
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


    const newItem = {

        id:
            Date.now(),

        name:
            name,

        category:
            category,

        location:
            location,

        tracking:
            tracking,

        container:
            container,

        current:
            current,

        max:
            max,

        threshold:
            threshold

    };


    const success =
        await saveNewItem(
            newItem
        );


    if (!success) return;


    await loadInventory();


    // Clear fields

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
        `${name} was added to Nova K.`
    );

}


// =====================================
// KITCHEN MAP
// =====================================

function showLocationItems(
    location
) {

    const details =
        document.getElementById(
            "locationDetails"
        );


    if (!details) return;


    const items =
        inventory.filter(
            item =>
                item.location ===
                location
        );


    let html = `

        <h2>
            📍
            ${escapeHTML(
                getLocationName(
                    location
                )
            )}
        </h2>

    `;


    if (
        items.length === 0
    ) {

        html += `

            <p>
                Nothing is currently
                recorded in this location.
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


            html += `

                <div class="card">

                    <h3>
                        ${escapeHTML(
                            item.name
                        )}
                    </h3>

                    <p>
                        📦
                        ${escapeHTML(
                            item.container
                        )}
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
                        ${
                            isLowStock(item)
                            ?
                            "⚠️ LOW STOCK"
                            :
                            "✅ Stocked"
                        }
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
            now.toLocaleDateString();

    }

}


// =====================================
// HTML SAFETY
// =====================================

function escapeHTML(value) {

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}
```
