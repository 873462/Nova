```javascript
// =====================================
// NOVA K - LOCAL INVENTORY STORAGE
// =====================================

// All kitchen items are stored in this browser
let inventory = [];


// =====================================
// LOAD INVENTORY
// =====================================

function loadInventory() {

    const saved =
        localStorage.getItem(
            "novaKInventory"
        );

    if (saved) {

        try {

            inventory =
                JSON.parse(saved);

        } catch (error) {

            console.error(
                "Could not load inventory:",
                error
            );

            inventory = [];

        }

    } else {

        inventory = [];

    }

    displayInventory();

}


// =====================================
// SAVE INVENTORY
// =====================================

function saveInventory() {

    localStorage.setItem(
        "novaKInventory",
        JSON.stringify(inventory)
    );

}


// =====================================
// START NOVA K
// =====================================

function startNovaK() {

    console.log(
        "Nova K started using local storage."
    );

    loadInventory();

    updateClock();

    setInterval(
        updateClock,
        1000
    );

    updateMeasurementFields();

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


    // =================================
    // PERCENTAGE
    // =================================

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


    // =================================
    // QUANTITY
    // =================================

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


    // =================================
    // CUSTOM
    // =================================

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


    // =================================
    // CREATE ITEM
    // =================================

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


    // Add to inventory

    inventory.push(
        newItem
    );


    // Save to this browser

    saveInventory();


    // Refresh display

    displayInventory();


    // Clear form

    document.getElementById(
        "itemName"
    ).value = "";


    document.getElementById(
        "itemCategory"
    ).value = "";


    document.getElementById(
        "itemContainer"
    ).value = "";


    // Confirmation

    alert(
        `${name} was added to Nova K!`
    );


    // Return to inventory

    showSection(
        "inventory"
    );

}


// =====================================
// DELETE ITEM
// =====================================

function deleteItem(id) {

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


    inventory =
        inventory.filter(
            i => i.id !== id
        );


    saveInventory();

    displayInventory();

}


// =====================================
// UPDATE ITEM
// =====================================

function updateItem(item) {

    const index =
        inventory.findIndex(
            i => i.id === item.id
        );


    if (index === -1) return;


    inventory[index] =
        item;


    saveInventory();

    displayInventory();

}
```
