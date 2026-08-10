/* =====================================
   NOVA K - KITCHEN MANAGEMENT SCRIPT
===================================== */

// Load existing inventory from LocalStorage, or use starter defaults
let inventory = JSON.parse(localStorage.getItem("novaKitchenInventory")) || [
    {
        id: 1,
        name: "Whole Milk",
        category: "Dairy",
        location: "refrigerator",
        container: "gallon",
        type: "percentage",
        currentPct: 80,
        thresholdPct: 25
    },
    {
        id: 2,
        name: "Ground Cinnamon",
        category: "Spices",
        location: "spice-rack",
        container: "jar",
        type: "percentage",
        currentPct: 15,
        thresholdPct: 20
    },
    {
        id: 3,
        name: "Forks & Spoons",
        category: "Utensils",
        location: "drawer-1",
        container: "set",
        type: "quantity",
        currentQty: 12,
        maxQty: 12,
        thresholdQty: 4
    }
];

// Initialize when the page loads
document.addEventListener("DOMContentLoaded", () => {
    updateDateTime();
    setInterval(updateDateTime, 1000);
    renderAll();
    
    // Ensure correct fields are visible on first load
    if (typeof updateMeasurementFields === "function") {
        updateMeasurementFields();
    }
});

// --- CLOCK & DATE ---
function updateDateTime() {
    const now = new Date();
    const clockEl = document.getElementById("clock");
    const dateEl = document.getElementById("date");

    if (clockEl) {
        clockEl.innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
    if (dateEl) {
        dateEl.innerText = now.toLocaleDateString(undefined, { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }
}

// --- SECTION TOGGLE ---
function showSection(sectionId) {
    const sections = ["inventory", "shopping", "map"];
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.style.display = (id === sectionId) ? "block" : "none";
        }
    });
}

// --- FORM DYNAMICS ---
function updateMeasurementFields() {
    const selectEl = document.getElementById("trackingType");
    if (!selectEl) return;
    
    const trackingType = selectEl.value;
    const pctFields = document.getElementById("percentageFields");
    const qtyFields = document.getElementById("quantityFields");
    const customFields = document.getElementById("customFields");

    if (pctFields) pctFields.classList.toggle("hidden", trackingType !== "percentage");
    if (qtyFields) qtyFields.classList.toggle("hidden", trackingType !== "quantity");
    if (customFields) customFields.classList.toggle("hidden", trackingType !== "custom");
}

// --- CORE DATA OPERATIONS ---
function saveToStorage() {
    localStorage.setItem("novaKitchenInventory", JSON.stringify(inventory));
}

function addItem() {
    const nameEl = document.getElementById("itemName");
    const categoryEl = document.getElementById("itemCategory");
    const locationEl = document.getElementById("itemLocation");
    const trackingTypeEl = document.getElementById("trackingType");
    const containerEl = document.getElementById("itemContainer");

    if (!nameEl || !locationEl || !trackingTypeEl) {
        console.error("Required form elements are missing from the HTML.");
        return;
    }

    const name = nameEl.value.trim();
    const category = (categoryEl && categoryEl.value.trim()) ? categoryEl.value.trim() : "Uncategorized";
    const location = locationEl.value;
    const trackingType = trackingTypeEl.value;
    const container = (containerEl && containerEl.value.trim()) ? containerEl.value.trim() : "unit";

    if (!name) {
        alert("Please enter an item name.");
        return;
    }

    const newItem = {
        id: Date.now(),
        name: name,
        category: category,
        location: location,
        container: container,
        type: trackingType
    };

    if (trackingType === "percentage") {
        const pctVal = document.getElementById("itemCurrentPercentage");
        const threshVal = document.getElementById("itemThresholdPercentage");
        newItem.currentPct = pctVal ? parseFloat(pctVal.value) || 100 : 100;
        newItem.thresholdPct = threshVal ? parseFloat(threshVal.value) || 25 : 25;
    } else if (trackingType === "quantity") {
        const qtyVal = document.getElementById("itemCurrentQuantity");
        const maxVal = document.getElementById("itemMaxQuantity");
        const threshVal = document.getElementById("itemThresholdQuantity");
        newItem.currentQty = qtyVal ? parseFloat(qtyVal.value) || 1 : 1;
        newItem.maxQty = maxVal ? parseFloat(maxVal.value) || 10 : 10;
        newItem.thresholdQty = threshVal ? parseFloat(threshVal.value) || 3 : 3;
    } else if (trackingType === "custom") {
        const curCustom = document.getElementById("itemCustomCurrent");
        const maxCustom = document.getElementById("itemCustomMax");
        const threshCustom = document.getElementById("itemCustomThreshold");
        newItem.customCurrent = curCustom ? curCustom.value.trim() : "1";
        newItem.customMax = maxCustom ? maxCustom.value.trim() : "1";
        newItem.customThreshold = threshCustom ? threshCustom.value.trim() : "0";
    }

    inventory.push(newItem);
    saveToStorage();
    resetForm();
    renderAll();

    // Give visual confirmation
    alert(`Added "${newItem.name}" to ${formatLocationName(newItem.location)}!`);
}

function deleteItem(id) {
    inventory = inventory.filter(item => item.id !== id);
    saveToStorage();
    renderAll();
}

function updateStock(id, changeAmount) {
    const item = inventory.find(i => i.id === id);
    if (!item) return;

    if (item.type === "percentage") {
        item.currentPct = Math.max(0, Math.min(100, item.currentPct + changeAmount));
    } else if (item.type === "quantity") {
        item.currentQty = Math.max(0, Math.min(item.maxQty, item.currentQty + changeAmount));
    }

    saveToStorage();
    renderAll();
}

function resetForm() {
    const fields = [
        "itemName", "itemCategory", "itemContainer",
        "itemCustomCurrent", "itemCustomMax", "itemCustomThreshold"
    ];
    fields.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = "";
    });

    const pct = document.getElementById("itemCurrentPercentage");
    if (pct) pct.value = "100";
    const threshPct = document.getElementById("itemThresholdPercentage");
    if (threshPct) threshPct.value = "25";

    const qty = document.getElementById("itemCurrentQuantity");
    if (qty) qty.value = "1";
    const maxQty = document.getElementById("itemMaxQuantity");
    if (maxQty) maxQty.value = "10";
    const threshQty = document.getElementById("itemThresholdQuantity");
    if (threshQty) threshQty.value = "3";
}

// --- CHECKS & COMPUTATIONS ---
function isLowStock(item) {
    if (item.type === "percentage") {
        return item.currentPct <= item.thresholdPct;
    }
    if (item.type === "quantity") {
        return item.currentQty <= item.thresholdQty;
    }
    return false;
}

// --- RENDERING ---
function renderAll() {
    renderStats();
    renderInventory();
    renderShoppingList();
}

function renderStats() {
    const totalItemsEl = document.getElementById("totalItems");
    const lowStockEl = document.getElementById("lowStock");
    const shoppingCountEl = document.getElementById("shoppingCount");

    const lowStockItems = inventory.filter(isLowStock);

    if (totalItemsEl) totalItemsEl.innerText = inventory.length;
    if (lowStockEl) lowStockEl.innerText = lowStockItems.length;
    if (shoppingCountEl) shoppingCountEl.innerText = lowStockItems.length;
}

function renderInventory(itemsToRender = inventory) {
    const container = document.getElementById("inventoryContainer");
    if (!container) return;

    container.innerHTML = "";

    if (itemsToRender.length === 0) {
        container.innerHTML = `<p style="color: #cbd9ff;">No items found.</p>`;
        return;
    }

    itemsToRender.forEach(item => {
        const card = document.createElement("div");
        card.className = "card inventory-card";

        let statusDisplay = "";
        let controls = "";

        if (item.type === "percentage") {
            statusDisplay = `
                <p>Status: ${item.currentPct}%</p>
                <div class="progress">
                    <div class="progress-fill" style="width: ${item.currentPct}%;"></div>
                </div>
            `;
            controls = `
                <button type="button" onclick="updateStock(${item.id}, -10)">-10%</button>
                <button type="button" onclick="updateStock(${item.id}, 10)">+10%</button>
            `;
        } else if (item.type === "quantity") {
            const fillPct = Math.min(100, (item.currentQty / item.maxQty) * 100);
            statusDisplay = `
                <p>Quantity: ${item.currentQty} / ${item.maxQty} ${item.container}</p>
                <div class="progress">
                    <div class="progress-fill" style="width: ${fillPct}%;"></div>
                </div>
            `;
            controls = `
                <button type="button" onclick="updateStock(${item.id}, -1)">-1</button>
                <button type="button" onclick="updateStock(${item.id}, 1)">+1</button>
            `;
        } else {
            statusDisplay = `
                <p>Current: ${item.customCurrent}</p>
                <p><small>Max: ${item.customMax} | Threshold: ${item.customThreshold}</small></p>
            `;
        }

        card.innerHTML = `
            <h3>${item.name}</h3>
            <p><strong>Category:</strong> ${item.category}</p>
            <p><strong>Location:</strong> ${formatLocationName(item.location)}</p>
            ${statusDisplay}
            <div style="margin-top: 10px;">
                ${controls}
                <button type="button" style="background: #ff4757;" onclick="deleteItem(${item.id})">Delete</button>
            </div>
        `;

        container.appendChild(card);
    });
}

function renderShoppingList() {
    const list = document.getElementById("shoppingList");
    if (!list) return;

    list.innerHTML = "";
    const lowStockItems = inventory.filter(isLowStock);

    if (lowStockItems.length === 0) {
        list.innerHTML = `<li>All items are well stocked!</li>`;
        return;
    }

    lowStockItems.forEach(item => {
        const li = document.createElement("li");
        let detail = item.type === "percentage" ? `${item.currentPct}% remaining` : `${item.currentQty} remaining`;
        li.innerHTML = `
            <strong>${item.name}</strong> (${formatLocationName(item.location)})
            <br><small style="color: #ff7ac8;">${detail} (Low stock)</small>
        `;
        list.appendChild(li);
    });
}

// --- SEARCH & LOCATION FILTER ---
function searchInventory() {
    const searchBox = document.getElementById("searchBox");
    if (!searchBox) return;

    const query = searchBox.value.toLowerCase();
    const filtered = inventory.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query)
    );
    renderInventory(filtered);
}

// --- KITCHEN MAP INTERACTION ---
function showLocationItems(locationKey) {
    const details = document.getElementById("locationDetails");
    if (!details) return;

    const matchedItems = inventory.filter(item => item.location === locationKey);
    const locName = formatLocationName(locationKey);

    if (matchedItems.length === 0) {
        details.innerHTML = `
            <h2>📍 ${locName}</h2>
            <p style="color: #cbd9ff;">No items are currently stored here.</p>
        `;
    } else {
        const itemList = matchedItems.map(item => {
            let amount = "";
            if (item.type === "percentage") amount = `— ${item.currentPct}% left`;
            else if (item.type === "quantity") amount = `— ${item.currentQty} ${item.container}`;
            else amount = `— ${item.customCurrent}`;
            
            return `<li><strong>${item.name}</strong> <small>(${item.category})</small> ${amount}</li>`;
        }).join("");

        details.innerHTML = `
            <h2>📍 ${locName}</h2>
            <ul style="list-style: square; padding-left: 20px; color: #d7e7ff; line-height: 1.8;">
                ${itemList}
            </ul>
        `;
    }

    // Smooth scroll down to the location details card so you see the result
    details.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function formatLocationName(key) {
    if (!key) return "Unknown";
    return key
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}
