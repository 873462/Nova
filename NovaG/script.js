/* =========================================================
   NOVAG - CLOUD-SYNCED GARAGE & UTILITY SYSTEM
   ========================================================= */

// Your Firebase Configuration
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
const itemsRef = db.collection("novag_items");
const projectsRef = db.collection("novag_projects");

let items = [];
let projects = [];
let currentItemLocation = "";

/* =========================================================
   REAL-TIME CLOUD LISTENERS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    updateClock();
    setInterval(updateClock, 1000);

    // Sync Items in Real-Time
    itemsRef.onSnapshot(snapshot => {
        items = [];
        snapshot.forEach(doc => {
            items.push({ docId: doc.id, ...doc.data() });
        });
        renderAll();
    }, err => console.error("Error fetching items:", err));

    // Sync Projects in Real-Time
    projectsRef.onSnapshot(snapshot => {
        projects = [];
        snapshot.forEach(doc => {
            projects.push({ docId: doc.id, ...doc.data() });
        });
        renderAll();
    }, err => console.error("Error fetching projects:", err));
});

/* =========================================================
   CLOCK
   ========================================================= */

function updateClock() {
    const now = new Date();

    const time = now.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit"
    });

    const date = now.toLocaleDateString([], {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
    });

    const clockEl = document.getElementById("clock");
    const dateEl = document.getElementById("date");

    if (clockEl) clockEl.textContent = time;
    if (dateEl) dateEl.textContent = date;
}

/* =========================================================
   SECTION NAVIGATION
   ========================================================= */

function showSection(sectionName) {
    const sections = document.querySelectorAll(".page-section");

    sections.forEach(section => {
        section.classList.remove("active");
    });

    const selectedSection = document.getElementById(sectionName);

    if (selectedSection) {
        selectedSection.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

/* =========================================================
   MODALS & ITEMS
   ========================================================= */

function openAddItem(location) {
    currentItemLocation = location;

    const modal = document.getElementById("itemModal");
    const title = document.getElementById("modalTitle");

    if (location === "garage") {
        title.textContent = "🚗 Add Garage Item";
    } else if (location === "tools") {
        title.textContent = "🔧 Add Tool";
    } else if (location === "laundry") {
        title.textContent = "🧺 Add Laundry Room Item";
    }

    document.getElementById("itemName").value = "";
    document.getElementById("itemCategory").value = "";
    document.getElementById("itemLocation").value = "";
    document.getElementById("itemQuantity").value = "1";
    document.getElementById("itemNotes").value = "";

    modal.classList.remove("hidden");
}

function closeModal() {
    document.getElementById("itemModal").classList.add("hidden");
}

function saveItem() {
    const name = document.getElementById("itemName").value.trim();
    const category = document.getElementById("itemCategory").value.trim();
    const location = document.getElementById("itemLocation").value.trim();
    const quantity = Number(document.getElementById("itemQuantity").value) || 1;
    const notes = document.getElementById("itemNotes").value.trim();

    if (!name) {
        alert("Please enter an item name.");
        return;
    }

    const newItem = {
        name: name,
        category: category || "Uncategorized",
        storageLocation: location || "Not specified",
        quantity: quantity,
        notes: notes,
        area: currentItemLocation,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    itemsRef.add(newItem)
        .then(() => {
            closeModal();
            showSection(currentItemLocation);
        })
        .catch(err => console.error("Error saving item:", err));
}

function deleteItem(docId) {
    if (!confirm("Delete this item?")) return;
    itemsRef.doc(docId).delete().catch(err => console.error("Error deleting item:", err));
}

function renderItems(area) {
    let containerId = "";
    let emptyId = "";

    if (area === "garage") {
        containerId = "garageItems";
        emptyId = "garageEmpty";
    } else if (area === "tools") {
        containerId = "toolsItems";
        emptyId = "toolsEmpty";
    } else if (area === "laundry") {
        containerId = "laundryItems";
        emptyId = "laundryEmpty";
    }

    const container = document.getElementById(containerId);
    const emptyState = document.getElementById(emptyId);

    if (!container || !emptyState) return;

    const areaItems = items.filter(item => item.area === area);
    container.innerHTML = "";

    if (areaItems.length === 0) {
        emptyState.classList.remove("hidden");
        return;
    }

    emptyState.classList.add("hidden");

    areaItems.forEach(item => {
        const card = document.createElement("div");
        card.className = "item-card";

        card.innerHTML = `
            <span class="item-category">${escapeHTML(item.category)}</span>
            <h3>${escapeHTML(item.name)}</h3>
            <p>📍 ${escapeHTML(item.storageLocation)}</p>
            <p>📦 Quantity: ${item.quantity}</p>
            ${item.notes ? `<p>📝 ${escapeHTML(item.notes)}</p>` : ""}
            <button class="delete-button" onclick="deleteItem('${item.docId}')">
                🗑️ Delete
            </button>
        `;

        container.appendChild(card);
    });
}

/* =========================================================
   PROJECTS
   ========================================================= */

function openAddProject() {
    document.getElementById("projectName").value = "";
    document.getElementById("projectDescription").value = "";
    document.getElementById("projectModal").classList.remove("hidden");
}

function closeProjectModal() {
    document.getElementById("projectModal").classList.add("hidden");
}

function saveProject() {
    const name = document.getElementById("projectName").value.trim();
    const description = document.getElementById("projectDescription").value.trim();

    if (!name) {
        alert("Please enter a project name.");
        return;
    }

    const newProject = {
        name: name,
        description: description || "No description.",
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    projectsRef.add(newProject)
        .then(() => closeProjectModal())
        .catch(err => console.error("Error saving project:", err));
}

function deleteProject(docId) {
    if (!confirm("Delete this project?")) return;
    projectsRef.doc(docId).delete().catch(err => console.error("Error deleting project:", err));
}

function renderProjects() {
    const container = document.getElementById("projectItems");
    const emptyState = document.getElementById("projectEmpty");

    if (!container || !emptyState) return;

    container.innerHTML = "";

    if (projects.length === 0) {
        emptyState.classList.remove("hidden");
        return;
    }

    emptyState.classList.add("hidden");

    projects.forEach(project => {
        const card = document.createElement("div");
        card.className = "project-card";

        card.innerHTML = `
            <h3>🛠️ ${escapeHTML(project.name)}</h3>
            <p>${escapeHTML(project.description)}</p>
            <button class="delete-button project-delete" onclick="deleteProject('${project.docId}')">
                🗑️ Delete
            </button>
        `;

        container.appendChild(card);
    });
}

/* =========================================================
   SEARCH
   ========================================================= */

function searchNovaG() {
    const search = document.getElementById("searchBox").value.toLowerCase().trim();
    const resultsContainer = document.getElementById("searchResults");
    const resultsList = document.getElementById("resultsList");

    if (!search) {
        resultsContainer.classList.add("hidden");
        return;
    }

    const itemResults = items.filter(item => (
        item.name.toLowerCase().includes(search) ||
        item.category.toLowerCase().includes(search) ||
        item.storageLocation.toLowerCase().includes(search) ||
        (item.notes && item.notes.toLowerCase().includes(search))
    ));

    const projectResults = projects.filter(project => (
        project.name.toLowerCase().includes(search) ||
        project.description.toLowerCase().includes(search)
    ));

    resultsList.innerHTML = "";

    if (itemResults.length === 0 && projectResults.length === 0) {
        resultsList.innerHTML = `<div class="result-item">No results found.</div>`;
        resultsContainer.classList.remove("hidden");
        return;
    }

    itemResults.forEach(item => {
        const result = document.createElement("div");
        result.className = "result-item";
        result.innerHTML = `
            <strong>${escapeHTML(item.name)}</strong>
            <div>${escapeHTML(item.category)}</div>
            <div class="result-location">
                📍 ${getAreaName(item.area)} → ${escapeHTML(item.storageLocation)}
            </div>
        `;
        resultsList.appendChild(result);
    });

    projectResults.forEach(project => {
        const result = document.createElement("div");
        result.className = "result-item";
        result.innerHTML = `
            <strong>🛠️ ${escapeHTML(project.name)}</strong>
            <div class="result-location">Project</div>
        `;
        resultsList.appendChild(result);
    });

    resultsContainer.classList.remove("hidden");
}

/* =========================================================
   UTILITIES & COUNTERS
   ========================================================= */

function getAreaName(area) {
    if (area === "garage") return "🚗 Garage";
    if (area === "tools") return "🔧 Tool Room";
    if (area === "laundry") return "🧺 Laundry Room";
    return "NovaG";
}

function escapeHTML(value) {
    return String(value || "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function updateCounters() {
    const garageItems = items.filter(item => item.area === "garage");
    const toolItems = items.filter(item => item.area === "tools");
    const laundryItems = items.filter(item => item.area === "laundry");

    const setTxt = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
    };

    setTxt("garageCount", garageItems.length);
    setTxt("toolsCount", toolItems.length);
    setTxt("laundryCount", laundryItems.length);
    setTxt("projectCount", projects.length);

    setTxt("totalItems", items.length);
    setTxt("totalTools", toolItems.length);
    setTxt("totalProjects", projects.length);
}

function renderAll() {
    renderItems("garage");
    renderItems("tools");
    renderItems("laundry");
    renderProjects();
    updateCounters();
}
