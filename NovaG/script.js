```javascript
/* =========================================================
   NOVAG - GARAGE JAVASCRIPT
   ========================================================= */


/* =========================================================
   DATA
   ========================================================= */

// Empty for now.
// We will add your real items later.

let items = JSON.parse(
    localStorage.getItem("novaGItems")
) || [];

let projects = JSON.parse(
    localStorage.getItem("novaGProjects")
) || [];

let currentItemLocation = "";


/* =========================================================
   SAVE DATA
   ========================================================= */

function saveData() {

    localStorage.setItem(
        "novaGItems",
        JSON.stringify(items)
    );

    localStorage.setItem(
        "novaGProjects",
        JSON.stringify(projects)
    );

}


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

    document.getElementById("clock").textContent = time;
    document.getElementById("date").textContent = date;

}

updateClock();

setInterval(updateClock, 1000);


/* =========================================================
   SECTION NAVIGATION
   ========================================================= */

function showSection(sectionName) {

    const sections = document.querySelectorAll(".page-section");

    sections.forEach(section => {
        section.classList.remove("active");
    });

    const selectedSection =
        document.getElementById(sectionName);

    if (selectedSection) {
        selectedSection.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   OPEN ADD ITEM MODAL
   ========================================================= */

function openAddItem(location) {

    currentItemLocation = location;

    const modal =
        document.getElementById("itemModal");

    const title =
        document.getElementById("modalTitle");

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


/* =========================================================
   CLOSE ITEM MODAL
   ========================================================= */

function closeModal() {

    document
        .getElementById("itemModal")
        .classList.add("hidden");

}


/* =========================================================
   SAVE ITEM
   ========================================================= */

function saveItem() {

    const name =
        document.getElementById("itemName").value.trim();

    const category =
        document.getElementById("itemCategory").value.trim();

    const location =
        document.getElementById("itemLocation").value.trim();

    const quantity =
        Number(
            document.getElementById("itemQuantity").value
        ) || 1;

    const notes =
        document.getElementById("itemNotes").value.trim();


    if (!name) {

        alert("Please enter an item name.");

        return;

    }


    const newItem = {

        id: Date.now(),

        name: name,

        category: category || "Uncategorized",

        storageLocation: location || "Not specified",

        quantity: quantity,

        notes: notes,

        area: currentItemLocation

    };


    items.push(newItem);

    saveData();

    closeModal();

    renderAll();

    showSection(currentItemLocation);

}


/* =========================================================
   DELETE ITEM
   ========================================================= */

function deleteItem(id) {

    const confirmed =
        confirm("Delete this item?");

    if (!confirmed) {
        return;
    }


    items = items.filter(
        item => item.id !== id
    );

    saveData();

    renderAll();

}


/* =========================================================
   RENDER ITEMS
   ========================================================= */

function renderItems(area) {

    let containerId = "";
    let emptyId = "";

    if (area === "garage") {

        containerId = "garageItems";
        emptyId = "garageEmpty";

    }

    if (area === "tools") {

        containerId = "toolsItems";
        emptyId = "toolsEmpty";

    }

    if (area === "laundry") {

        containerId = "laundryItems";
        emptyId = "laundryEmpty";

    }


    const container =
        document.getElementById(containerId);

    const emptyState =
        document.getElementById(emptyId);


    if (!container || !emptyState) {
        return;
    }


    const areaItems =
        items.filter(
            item => item.area === area
        );


    container.innerHTML = "";


    if (areaItems.length === 0) {

        emptyState.classList.remove("hidden");

        return;

    }


    emptyState.classList.add("hidden");


    areaItems.forEach(item => {

        const card =
            document.createElement("div");

        card.className = "item-card";


        card.innerHTML = `

            <span class="item-category">
                ${escapeHTML(item.category)}
            </span>

            <h3>
                ${escapeHTML(item.name)}
            </h3>

            <p>
                📍 ${escapeHTML(item.storageLocation)}
            </p>

            <p>
                📦 Quantity: ${item.quantity}
            </p>

            ${
                item.notes
                ? `<p>📝 ${escapeHTML(item.notes)}</p>`
                : ""
            }

            <button
                class="delete-button"
                onclick="deleteItem(${item.id})"
            >
                🗑️ Delete
            </button>

        `;


        container.appendChild(card);

    });

}


/* =========================================================
   PROJECT MODAL
   ========================================================= */

function openAddProject() {

    document.getElementById("projectName").value = "";

    document.getElementById("projectDescription").value = "";

    document
        .getElementById("projectModal")
        .classList.remove("hidden");

}


function closeProjectModal() {

    document
        .getElementById("projectModal")
        .classList.add("hidden");

}


/* =========================================================
   SAVE PROJECT
   ========================================================= */

function saveProject() {

    const name =
        document
            .getElementById("projectName")
            .value
            .trim();

    const description =
        document
            .getElementById("projectDescription")
            .value
            .trim();


    if (!name) {

        alert("Please enter a project name.");

        return;

    }


    const newProject = {

        id: Date.now(),

        name: name,

        description:
            description || "No description."

    };


    projects.push(newProject);

    saveData();

    closeProjectModal();

    renderProjects();

}


/* =========================================================
   DELETE PROJECT
   ========================================================= */

function deleteProject(id) {

    const confirmed =
        confirm("Delete this project?");

    if (!confirmed) {
        return;
    }


    projects = projects.filter(
        project => project.id !== id
    );

    saveData();

    renderProjects();

}


/* =========================================================
   RENDER PROJECTS
   ========================================================= */

function renderProjects() {

    const container =
        document.getElementById("projectItems");

    const emptyState =
        document.getElementById("projectEmpty");


    if (!container || !emptyState) {
        return;
    }


    container.innerHTML = "";


    if (projects.length === 0) {

        emptyState.classList.remove("hidden");

        return;

    }


    emptyState.classList.add("hidden");


    projects.forEach(project => {

        const card =
            document.createElement("div");

        card.className = "project-card";


        card.innerHTML = `

            <h3>
                🛠️ ${escapeHTML(project.name)}
            </h3>

            <p>
                ${escapeHTML(project.description)}
            </p>

            <button
                class="delete-button project-delete"
                onclick="deleteProject(${project.id})"
            >
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

    const search =
        document
            .getElementById("searchBox")
            .value
            .toLowerCase()
            .trim();


    const resultsContainer =
        document.getElementById("searchResults");

    const resultsList =
        document.getElementById("resultsList");


    if (!search) {

        resultsContainer.classList.add("hidden");

        return;

    }


    const itemResults =
        items.filter(item => {

            return (

                item.name.toLowerCase().includes(search) ||

                item.category
                    .toLowerCase()
                    .includes(search) ||

                item.storageLocation
                    .toLowerCase()
                    .includes(search) ||

                item.notes
                    .toLowerCase()
                    .includes(search)

            );

        });


    const projectResults =
        projects.filter(project => {

            return (

                project.name
                    .toLowerCase()
                    .includes(search) ||

                project.description
                    .toLowerCase()
                    .includes(search)

            );

        });


    resultsList.innerHTML = "";


    if (
        itemResults.length === 0 &&
        projectResults.length === 0
    ) {

        resultsList.innerHTML = `
            <div class="result-item">
                No results found.
            </div>
        `;

        resultsContainer.classList.remove("hidden");

        return;

    }


    itemResults.forEach(item => {

        const result =
            document.createElement("div");

        result.className = "result-item";


        result.innerHTML = `

            <strong>
                ${escapeHTML(item.name)}
            </strong>

            <div>
                ${escapeHTML(item.category)}
            </div>

            <div class="result-location">
                📍 ${getAreaName(item.area)}
                → ${escapeHTML(item.storageLocation)}
            </div>

        `;


        resultsList.appendChild(result);

    });


    projectResults.forEach(project => {

        const result =
            document.createElement("div");

        result.className = "result-item";


        result.innerHTML = `

            <strong>
                🛠️ ${escapeHTML(project.name)}
            </strong>

            <div class="result-location">
                Project
            </div>

        `;


        resultsList.appendChild(result);

    });


    resultsContainer.classList.remove("hidden");

}


/* =========================================================
   AREA NAMES
   ========================================================= */

function getAreaName(area) {

    if (area === "garage") {
        return "🚗 Garage";
    }

    if (area === "tools") {
        return "🔧 Tool Room";
    }

    if (area === "laundry") {
        return "🧺 Laundry Room";
    }

    return "NovaG";

}


/* =========================================================
   SECURITY / HTML ESCAPING
   ========================================================= */

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* =========================================================
   COUNTERS
   ========================================================= */

function updateCounters() {

    const garageItems =
        items.filter(
            item => item.area === "garage"
        );

    const toolItems =
        items.filter(
            item => item.area === "tools"
        );

    const laundryItems =
        items.filter(
            item => item.area === "laundry"
        );


    document.getElementById("garageCount").textContent =
        garageItems.length;

    document.getElementById("toolsCount").textContent =
        toolItems.length;

    document.getElementById("laundryCount").textContent =
        laundryItems.length;

    document.getElementById("projectCount").textContent =
        projects.length;


    document.getElementById("totalItems").textContent =
        items.length;

    document.getElementById("totalTools").textContent =
        toolItems.length;

    document.getElementById("totalProjects").textContent =
        projects.length;

}


/* =========================================================
   RENDER EVERYTHING
   ========================================================= */

function renderAll() {

    renderItems("garage");

    renderItems("tools");

    renderItems("laundry");

    renderProjects();

    updateCounters();

}


/* =========================================================
   INITIALIZE
   ========================================================= */

renderAll();
```
