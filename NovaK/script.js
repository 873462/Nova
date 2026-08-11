/* =====================================
   NOVA K - CLOUD-SYNCED KITCHEN SYSTEM
===================================== */

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_oFYpFpGShexZFXGCrUnXDsuz-MAdGYs",
  authDomain: "nova-ce013.firebaseapp.com",
  projectId: "nova-ce013",
  storageBucket: "nova-ce013.firebasestorage.app",
  messagingSenderId: "851087230223",
  appId: "1:851087230223:web:3e47058b472810dca22a7a",
  measurementId: "G-JZBQEPZN90"
};

// Initialize Firebase & Firestore
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const inventoryRef = db.collection("kitchen_inventory");

let inventory = [];

// Initialize when the DOM finishes loading
document.addEventListener("DOMContentLoaded", () => {
    updateDateTime();
    setInterval(updateDateTime, 1000);
    updateMeasurementFields();

    // Listen for real-time changes across all connected devices!
    listenToCloudDatabase();
});

// --- REAL-TIME DATABASE LISTENER ---
function listenToCloudDatabase() {
    inventoryRef.onSnapshot((snapshot) => {
        inventory = [];
        snapshot.forEach((doc) => {
            inventory.push({
                docId: doc.id, // Unique Firestore ID
                ...doc.data()
            });
        });
        renderAll();
    }, (error) => {
        console.error("Error connecting to cloud database:", error);
    });
}

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

// --- NAVIGATION / VIEW TOGGLE ---
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

// --- CLOUD DATA OPERATIONS ---
function addItem() {
    const nameEl = document.getElementById("itemName");
    const categoryEl = document.getElementById("itemCategory");
    const locationEl = document.getElementById("itemLocation");
    const trackingTypeEl = document.getElementById("trackingType");
    const containerEl = document.getElementById("itemContainer");

    if (!nameEl || !locationEl || !trackingTypeEl) return;

    const name = nameEl.value.trim();
    const category = categoryEl && categoryEl.value.trim() ? categoryEl.value.trim() : "Pantry";
    const location = locationEl.value;
    const trackingType = trackingTypeEl.value;
    const container = containerEl && containerEl.value.trim() ? containerEl.value.trim() : "unit";

    if (!name) {
        alert("Please provide an item name.");
        return;
    }

    const newItem = {
        name: name,
        category: category,
        location: location,
        container: container,
        type: trackingType
    };

    if (trackingType === "percentage") {
        const curPct = document.getElementById("itemCurrentPercentage");
        const threshPct = document.getElementById("itemThresholdPercentage");
        newItem.currentPct = curPct ? Math.max(0, Math.min(100, parseFloat(curPct.value) || 100)) : 100;
        newItem.thresholdPct = threshPct ? Math.max(0, Math.min(100, parseFloat(threshPct.value) || 25)) : 25;
    } else if (trackingType === "quantity") {
        const curQty = document.getElementById("itemCurrentQuantity");
        const maxQty = document.getElementById("itemMaxQuantity");
        const threshQty = document.getElementById("itemThresholdQuantity");
        newItem.currentQty = curQty ? parseFloat(curQty.value) || 1 : 1;
        newItem.maxQty = maxQty ? parseFloat(maxQty.value) || 10 : 10;
        newItem.thresholdQty = threshQty ? parseFloat(threshQty.value) || 3 : 3;
    } else if (trackingType === "custom") {
        const curCustom = document.getElementById("itemCustomCurrent");
        const maxCustom = document.getElementById("itemCustomMax");
        const threshCustom = document.getElementById("itemCustomThreshold");
        newItem.customCurrent = curCustom ? curCustom.value.trim() : "1";
        newItem.customMax = maxCustom ? maxCustom.value.trim() : "1";
        newItem.customThreshold = threshCustom ? threshCustom.value.trim() : "0";
    }

    // Add item directly to Firebase Cloud Storage
    inventoryRef.add(newItem).then(() => {
        resetForm();
        showLocationItems(newItem.location);
    }).catch(err => console.error("Error adding item:", err));
}

function deleteItem(docId) {
    inventoryRef.doc(docId).delete().catch(err => console.error("Error deleting item:", err));
}

function updateStock(docId, changeAmount) {
    const item = inventory.find(i => i.docId === docId);
    if (!item) return;

    let updateData = {};

    if (item.type === "percentage") {
        updateData.currentPct = Math.max(0, Math.min(100, item.currentPct + changeAmount));
    } else if (item.type === "quantity") {
        updateData.currentQty = Math.max(0, Math.min(item.maxQty, item.currentQty + changeAmount));
    }

    inventoryRef.doc(docId).update(updateData).catch(err => console.error("Error updating stock:", err));
}

function refillItem(docId) {
    const item = inventory.find(i => i.docId === docId);
    if (!item) return;

    let updateData = {};

    if (item.type === "percentage") {
        updateData.currentPct = 100;
    } else if (item.type === "quantity") {
        updateData.currentQty = item.maxQty;
    } else if (item.type === "custom") {
        updateData.customCurrent = item.customMax;
    }

    inventoryRef.doc(docId).update(updateData).catch(err => console.error("Error refilling item:", err));
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

// --- THRESHOLD CHECK ---
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
        container.innerHTML = `<p style="color: #cbd9ff;">No items found matching criteria.</p>`;
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
                <button type="button" onclick="updateStock('${item.docId}', -10)">-10%</button>
                <button type="button" onclick="updateStock('${item.docId}', 10)">+10%</button>
                <button type="button" style="background: #2ed573; color: white;" onclick="refillItem('${item.docId}')">Refill 100%</button>
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
                <button type="button" onclick="updateStock('${item.docId}', -1)">-1</button>
                <button type="button" onclick="updateStock('${item.docId}', 1)">+1</button>
                <button type="button" style="background: #2ed573; color: white;" onclick="refillItem('${item.docId}')">Restock Full</button>
            `;
        } else {
            statusDisplay = `
                <p>Current: ${item.customCurrent}</p>
                <p><small>Max: ${item.customMax} | Threshold: ${item.customThreshold}</small></p>
            `;
            controls = `
                <button type="button" style="background: #2ed573; color: white;" onclick="refillItem('${item.docId}')">Restock</button>
            `;
        }

        card.innerHTML = `
            <h3>${item.name}</h3>
            <p><strong>Category:</strong> ${item.category}</p>
            <p><strong>Location:</strong> ${formatLocationName(item.location)}</p>
            ${statusDisplay}
            <div style="margin-top: 10px; display: flex; gap: 8px; flex-wrap: wrap;">
                ${controls}
                <button type="button" style="background: #ff4757;" onclick="deleteItem('${item.docId}')">Delete</button>
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
        list.innerHTML = `<li>All items are well stocked! 🎉</li>`;
        return;
    }

    lowStockItems.forEach(item => {
        const li = document.createElement("li");
        li.style.display = "flex";
        li.style.justifyContent = "space-between";
        li.style.alignItems = "center";
        li.style.marginBottom = "10px";
        li.style.padding = "8px";
        li.style.background = "rgba(255, 255, 255, 0.05)";
        li.style.borderRadius = "8px";

        let detail = item.type === "percentage" ? `${item.currentPct}% remaining` : `${item.currentQty} remaining`;

        li.innerHTML = `
            <div>
                <strong>${item.name}</strong> (${formatLocationName(item.location)})
                <br><small style="color: #ff7ac8;">${detail} (Low stock)</small>
            </div>
            <button type="button" style="background: #2ed573; color: #fff; padding: 6px 12px; border-radius: 6px; border: none; cursor: pointer;" onclick="refillItem('${item.docId}')">
                ✅ Restocked
            </button>
        `;
        list.appendChild(li);
    });
}

// --- SEARCH & MAP FILTER ---
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

    details.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function formatLocationName(key) {
    if (!key) return "Unknown";
    return key
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}
