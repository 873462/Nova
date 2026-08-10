/* =====================================
   NOVA K - KITCHEN MANAGEMENT SCRIPT
===================================== */

// Load existing inventory from LocalStorage or start with defaults
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
        name: "Eggs",
        category: "Dairy",
        location: "refrigerator",
        container: "count",
        type: "quantity",
        currentQty: 2,
        maxQty: 12,
        thresholdQty: 4
    }
];

// Initialize application on DOM content load
document.addEventListener("DOMContentLoaded", () => {
    updateDateTime();
    setInterval(updateDateTime, 1000);
    renderAll();
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

// --- NAVIGATION TABS ---
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
    const trackingType = document.getElementById("trackingType").value;

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
    const name = document.getElementById("itemName").value.trim();
    const category = document.getElementById("itemCategory").value.trim() || "Uncategorized";
    const location = document.getElementById("itemLocation").value;
    const trackingType = document.getElementById("trackingType").value;
    const container = document.getElementById("itemContainer").value.trim() || "unit";

    if (!name) {
        alert("Please provide an item name.");
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
        newItem.currentPct = parseFloat(document.getElementById("itemCurrentPercentage").value) || 0;
        newItem.thresholdPct = parseFloat(document.getElementById("itemThresholdPercentage").value) || 25;
    } else if (trackingType === "quantity") {
        newItem.currentQty = parseFloat(document.getElementById("itemCurrentQuantity").value) || 0;
        newItem.maxQty = parseFloat(document.getElementById("itemMaxQuantity").value) || 1;
        newItem.thresholdQty = parseFloat(document.getElementById("itemThresholdQuantity").value) || 1;
    } else if (trackingType === "custom") {
        newItem.customCurrent = document.getElementById("itemCustomCurrent").value.trim() || "0";
        newItem.customMax = document.getElementById("itemCustomMax").value.trim() || "1";
        newItem.customThreshold = document.getElementById("itemCustomThreshold").value.trim() || "0";
    }

    inventory.push(newItem);
    saveToStorage();
    resetForm();
    renderAll();
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
    document.getElementById("itemName").value = "";
    document.getElementById("itemCategory").value = "";
    document.getElementById("itemContainer").value = "";
    document.getElementById("itemCurrentPercentage").value = "100";
    document.getElementById("itemThresholdPercentage").value = "25";
    document.getElementById("itemCurrentQuantity").value = "1";
    document.getElementById("itemMaxQuantity").value = "10";
    document.getElementById("itemThresholdQuantity").value = "3";
    document.getElementById("itemCustomCurrent").value = "";
    document.getElementById("itemCustomMax").value = "";
    document.getElementById("itemCustomThreshold").value = "";
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
        container.innerHTML = `<p style="color: #cbd9ff;">No items found matching your criteria.</p>`;
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
                <button onclick="updateStock(${item.id}, -10)">-10%</button>
                <button onclick="updateStock(${item.id}, 10)">+10%</button>
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
                <button onclick="updateStock(${item.id}, -1)">-1</button>
                <button onclick="updateStock(${item.id}, 1)">+1</button>
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
                <button style="background: #ff4757;" onclick="deleteItem(${item.id})">Delete</button>
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
            <br><small style="color: #ff7ac8;">${detail} (Restock Threshold reached)</small>
        `;
        list.appendChild(li);
    });
}

// --- SEARCH & LOCATION FILTER ---
function searchInventory() {
    const query = document.getElementById("searchBox").value.toLowerCase();
    const filtered = inventory.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query)
    );
    renderInventory(filtered);
}

function showLocationItems(locationKey) {
    const details = document.getElementById("locationDetails");
    const matchedItems = inventory.filter(item => item.location === locationKey);
    const locName = formatLocationName(locationKey);

    if (!details) return;

    if (matchedItems.length === 0) {
        details.innerHTML = `
            <h2>📍 ${locName}</h2>
            <p>No items currently stored here.</p>
        `;
    } else {
        const itemList = matchedItems.map(item => `<li>${item.name} (${item.category})</li>`).join("");
        details.innerHTML = `
            <h2>📍 ${locName}</h2>
            <ul>${itemList}</ul>
        `;
    }
}

function formatLocationName(key) {
    return key
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}
