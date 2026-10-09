// =====================================
// NOVAII - ROOM ORGANIZATION DASHBOARD
// WITH SUPABASE CLOUD SYNC
// =====================================

// ---------- DEFAULT DATA ----------

const morningRoutine = [
    "6:00 - Wake up",
    "6:01 - Pray",
    "6:02 - Drink water",
    "6:07 - Number 1 and 2",
    "6:09 - Brush teeth",
    "6:10 - Check calendar",
    "6:25 - Read Bible (15 mins)",
    "6:55 - Run (30 mins)",
    "7:05 - Bath + Change + Make bed",
    "7:15 - Eat breakfast"
];

const bedRoutine = [
    "Put lunch box away",
    "Change",
    "Brush teeth",
    "Wash face",
    "Put cream",
    "Update calendar",
    "Switch on fan",
    "Turn off light",
    "Pray",
    "Sleep"
];

const defaultTodos = [
    { name: "JD Robot", priority: "Medium-High", done: false },
    { name: "Make list of things to do for items project", priority: "Low", done: false },
    { name: "Fix shed", priority: "Medium", done: false },
    { name: "Clean fish tank", priority: "Medium", done: false },
    { name: "Clean fish tank filter", priority: "Medium", done: false },
    { name: "Fix cupboard closet top", priority: "Medium", done: false },
    { name: "Cleanup tools", priority: "High", done: false },
    { name: "Fix Lego Lamborghini", priority: "Low", done: false },
    { name: "Get notebook, pencil and eraser", priority: "Low", done: false },
    { name: "Write prayer", priority: "Medium", done: false },
    { name: "Make holders for arts and crafts", priority: "High", done: false },
    { name: "Add inventory items", priority: "Medium", done: false },
    { name: "Fix guitar and store it", priority: "Medium-High", done: false },
    { name: "Add Nova", priority: "High", done: false },
    { name: "Make playlist", priority: "Medium-High", done: true },
    { name: "Add garbage bags/bin", priority: "High", done: false }
];

const defaultWants = [
    {
        item: "Table",
        reason: "Have a place for computers",
        priority: "High",
        done: true
    },
    {
        item: "Pocket charger",
        reason: "Charge phone anywhere",
        priority: "High",
        done: true
    },
    {
        item: "Extra bed sheet",
        reason: "Need enough space to share",
        priority: "High",
        done: true
    },
    {
        item: "Arts and crafts holder",
        reason: "Keep things organised",
        priority: "Medium-High",
        done: false
    },
    {
        item: "Plug expansion",
        reason: "More outlets for devices",
        priority: "Medium-High",
        done: true
    }
];

const calendar = [
    "Tuesday: Dishwasher",
    "Wednesday 7 PM - 8 PM: Violin Class",
    "Friday: Dishwasher",
    "Friday-Sunday: Washing",
    "Thursday: Kumon Work",
    "August 12: Brother's Birthday",
    "August 28: Violin Scale Exam"
];

// ---------- ROOM INVENTORY ----------

const inventory = {
    "Random stuff": "Under Bed → Box 1 → Blue Box",
    "Toys": "Under Bed → Box 1 → Blue Box",
    "Accessory toys": "Under Bed → Box 1 → Blue Box",
    "Clips": "Under Bed → Box 1 → Green Box",
    "Pumpkin cutters": "Under Bed → Box 1 → Green Box",
    "Headphones": "Under Bed → Box 1 → Grey Box",
    "Chargers": "Under Bed → Box 1 → Grey Box",
    "Raspberry Pi": "Under Bed → Box 2 → Electronics Box",
    "Arduino": "Under Bed → Box 2 → Electronics Box",
    "Arduino Uno R3": "Under Bed → Box 2 → Electronics Box",
    "Wires": "Under Bed → Box 2 → Ziploc Bags",
    "Broken fan": "Under Bed → Box 2 → Electronics Box",
    "Electronic components": "Under Bed → Box 2 → Old Shoe Box",
    "Colored pencils": "Under Bed → Box 3 → Aqua Box → Blue Bag",
    "Paint": "Under Bed → Box 3 → Aqua Box → Ziploc Bag",
    "Paint brushes": "Under Bed → Box 3 → Aqua Box → Ziploc Bag",
    "Pokemon box": "Under Bed → Box 3 → Aqua Box",
    "Pens": "Under Bed → Box 3 → Pokemon Box",
    "Colored pens": "Under Bed → Box 3 → Black Panther Case",
    "Pencils": "Under Bed → Box 3 → Avengers Box",
    "Crayons": "Under Bed → Box 3 → Avengers Box → Crayon Box",
    "Highlighters": "Under Bed → Box 3 → Reindeer Pencil Case",
    "Oil pastels": "Under Bed → Box 3 → Ziploc Bag",
    "Books": "Under Bed → Box 3",
    "Rulers": "Under Bed → Box 3",
    "Green backpack": "Under Bed → Green Backpack",
    "Mini bookshelf": "Under Bed → Empty Mini Bookshelf",
    "Board games": "Bunk Bed Drawer 1",
    "Battleship": "Bunk Bed Drawer 1 → Board Games",
    "Sequence": "Bunk Bed Drawer 1 → Board Games",
    "Scrabble": "Bunk Bed Drawer 1 → Board Games",
    "Pokemon cards": "Bunk Bed Drawer 1 → Cards",
    "Uno": "Bunk Bed Drawer 1 → Cards",
    "Spot It": "Bunk Bed Drawer 1 → Cards",
    "3x3 Rubik's Cube": "Bunk Bed Drawer 1",
    "4x4 Rubik's Cube": "Bunk Bed Drawer 1",
    "Circle Rubik's Cube": "Bunk Bed Drawer 1",
    "Pyramid Rubik's Cube": "Bunk Bed Drawer 1",
    "Old fan base": "Bunk Bed Drawer 2",
    "Bunk bed spare parts": "Bunk Bed Drawer 2",
    "Chess": "Bunk Bed Drawer 2 → Board Game Combo",
    "Checkers": "Bunk Bed Drawer 2 → Board Game Combo",
    "Backgammon": "Bunk Bed Drawer 2 → Board Game Combo",
    "Ludo": "Bunk Bed Drawer 2 → Board Game Combo",
    "Snakes and Ladders": "Bunk Bed Drawer 2 → Board Game Combo",
    "Wood puzzles": "Bunk Bed Drawer 3",
    "Medium balls": "Bunk Bed Drawer 3",
    "Bible cards": "Bunk Bed Drawer 3",
    "Christmas cards": "Bunk Bed Drawer 3",
    "Fit the Box": "Bunk Bed Drawer 3",
    "Dice": "Bunk Bed Drawer 3 → Dice Pack",
    "Empty drawer": "Bunk Bed Drawer 4",
    "Lego mug": "Desk → Lego Mug",
    "Everyday stationery": "Desk → Clear Bin",
    "Calculator": "Desk → Clear Bin",
    "Comb": "Nightstand → Top Drawer",
    "Watches": "Nightstand → Top Drawer",
    "Gum": "Nightstand → Drawer 2",
    "Hand sanitizer": "Nightstand → Drawer 2",
    "Fan remote": "Nightstand → Drawer 2",
    "Glasses screwdriver": "Nightstand → Drawer 2",
    "LEGO manuals": "Nightstand → Drawer 3",
    "Letters": "Nightstand → Drawer 3",
    "Water bottle covers": "Nightstand → Drawer 3",
    "Broken phone": "Nightstand → Drawer 3 Repair Project",
    "Broken LED wire": "Nightstand → Drawer 3 Repair Project"
};

// ---------- ACTIVE DATA ----------

let todos = defaultTodos.map(task => ({ ...task, id: null }));
let wants = defaultWants.map(item => ({ ...item }));

// ---------- SUPABASE CONNECTION ----------

// Uses the same Supabase project as Nova K.
const SUPABASE_URL = "https://whvghfgaqjzjbytnkwtn.supabase.co";
const SUPABASE_KEY = "sb_publishable_8XkDH_vzIYxSOBCjlnm1VA_T-lcXM4k";
const TASKS_TABLE = "nova_tasks";

const supabaseClient = window.supabase?.createClient
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)
    : null;

let tasksLoadedFromSupabase = false;
let tasksChannel = null;

const VALID_PRIORITIES = [
    "High",
    "Medium-High",
    "Medium",
    "Low"
];

const PRIORITY_EMOJIS = {
    "High": "🔴",
    "Medium-High": "🟠",
    "Medium": "🟡",
    "Low": "🟢"
};

// ---------- SAFE STORAGE ----------

function readStoredArray(key) {
    try {
        const saved = localStorage.getItem(key);

        if (saved === null) {
            return null;
        }

        const parsed = JSON.parse(saved);

        return Array.isArray(parsed) ? parsed : null;
    } catch (error) {
        console.warn("Could not read saved data:", key, error);
        return null;
    }
}

// Save the wants list locally.
// Tasks are stored in Supabase.
function saveData() {
    try {
        localStorage.setItem("novaWants", JSON.stringify(wants));
        return true;
    } catch (error) {
        console.error("Could not save NovaII data:", error);

        showTaskMessage(
            "Unable to save your wants list. Check your browser storage settings.",
            true
        );

        return false;
    }
}

// Save a local backup of the cloud tasks.
function saveTaskCache() {
    try {
        localStorage.setItem(
            "novaTodos",
            JSON.stringify(
                todos.map(({ id, name, priority, done }) => ({
                    id,
                    name,
                    priority,
                    done
                }))
            )
        );
    } catch (error) {
        console.warn("Could not cache NovaII tasks locally:", error);
    }
}

function loadData() {
    // Load local tasks as a backup in case the cloud table is empty.
    const savedTodos = readStoredArray("novaTodos");

    if (savedTodos !== null) {
        todos = savedTodos
            .filter(task =>
                task &&
                typeof task.name === "string" &&
                typeof task.priority === "string" &&
                VALID_PRIORITIES.includes(task.priority)
            )
            .map(task => ({
                id: Number.isFinite(Number(task.id)) && task.id !== null
                    ? Number(task.id)
                    : null,
                name: task.name,
                priority: task.priority,
                done: task.done === true
            }));
    }

    // Load the wants list from this browser.
    const savedWants = readStoredArray("novaWants");

    if (savedWants !== null) {
        wants = savedWants
            .filter(item => item && typeof item.item === "string")
            .map(item => ({
                item: item.item,
                reason: typeof item.reason === "string"
                    ? item.reason
                    : "",
                priority: typeof item.priority === "string"
                    ? item.priority
                    : "Medium",
                done: item.done === true
            }));
    }
}

// ---------- TODAY'S FOCUS ----------

function getMandatoryTasks() {
    const today = new Date();
    const day = today.getDay();
    const tasks = [];

    // PLASP placement period.
    if (today <= new Date("2026-08-06T23:59:59")) {
        tasks.push("PLASP IT 8:30 AM - 3:30 PM");
    }

    tasks.push("Practice violin scales (1 hour)");

    // Dishwasher: Tuesday and Friday.
    if (day === 2 || day === 5) {
        tasks.push("Dishwasher");
    }

    return tasks;
}

// ---------- GENERAL LIST HELPER ----------

function createList(id, items) {
    const list = document.getElementById(id);

    if (!list) return;

    list.replaceChildren();

    items.forEach(item => {
        const li = document.createElement("li");
        const span = document.createElement("span");

        span.textContent = item;

        li.appendChild(span);
        list.appendChild(li);
    });
}

// ---------- TASK MESSAGE ----------

function showTaskMessage(message, isError = false) {
    const element = document.getElementById("taskMessage");

    if (!element) return;

    element.textContent = message;
    element.style.color = isError ? "#ffd0d0" : "#ffffff";
}

// ---------- ADD TASK ----------

async function addTask(name, priority) {
    const cleanName = name.trim();

    if (!cleanName) {
        showTaskMessage("Please enter a task name.", true);
        return false;
    }

    if (cleanName.length > 200) {
        showTaskMessage(
            "Task names must be 200 characters or fewer.",
            true
        );
        return false;
    }

    if (!VALID_PRIORITIES.includes(priority)) {
        showTaskMessage("Please choose a valid priority.", true);
        return false;
    }

    if (!supabaseClient) {
        showTaskMessage(
            "Supabase did not load. Check the Supabase script in index.html.",
            true
        );
        return false;
    }

    if (!tasksLoadedFromSupabase) {
        showTaskMessage(
            "Wait for cloud tasks to finish loading, then try again.",
            true
        );
        return false;
    }

    const { data, error } = await supabaseClient
        .from(TASKS_TABLE)
        .insert({
            name: cleanName,
            priority: priority,
            done: false
        })
        .select()
        .single();

    if (error) {
        console.error("Could not add task to Supabase:", error);

        showTaskMessage(
            "Task wasn't saved to the cloud. Check the Supabase table and policies.",
            true
        );

        return false;
    }

    if (!todos.some(task => task.id === data.id)) {
        todos.push(data);
    }

    saveTaskCache();
    renderTodos();
    renderFocus();
    updateStats();

    showTaskMessage("Task added and synced!");

    return true;
}

// ---------- UPDATE TASK ----------

async function updateTask(task, changes) {
    if (
        !supabaseClient ||
        !tasksLoadedFromSupabase ||
        task.id === null ||
        task.id === undefined
    ) {
        showTaskMessage(
            "This task isn't connected to Supabase yet. Wait for cloud sync.",
            true
        );
        return;
    }

    const previous = { ...task };

    Object.assign(task, changes);

    renderTodos();
    renderFocus();
    updateStats();

    const { data, error } = await supabaseClient
        .from(TASKS_TABLE)
        .update(changes)
        .eq("id", task.id)
        .select()
        .single();

    if (error) {
        console.error("Could not update task in Supabase:", error);

        Object.assign(task, previous);

        renderTodos();
        renderFocus();
        updateStats();

        showTaskMessage(
            "Task update failed. Check the connection and try again.",
            true
        );

        return;
    }

    Object.assign(task, data);

    saveTaskCache();
    renderTodos();
    renderFocus();
    updateStats();

    showTaskMessage("Task synced.");
}

// ---------- LOAD TASKS FROM SUPABASE ----------

async function loadTasksFromSupabase({ seedIfEmpty = true } = {}) {
    if (!supabaseClient) {
        showTaskMessage(
            "Supabase didn't load. Check index.html includes the Supabase CDN script.",
            true
        );
        return;
    }

    const { data, error } = await supabaseClient
        .from(TASKS_TABLE)
        .select("*")
        .order("created_at", { ascending: true })
        .order("id", { ascending: true });

    if (error) {
        console.error("Could not load NovaII tasks:", error);

        showTaskMessage(
            "Couldn't load cloud tasks. Check Supabase policies and table name.",
            true
        );

        return;
    }

    // If the cloud table is empty, upload the current local/default tasks.
    if (data.length === 0 && seedIfEmpty) {
        const initialTasks = todos.map(task => ({
            name: task.name,
            priority: VALID_PRIORITIES.includes(task.priority)
                ? task.priority
                : "Medium",
            done: task.done === true
        }));

        if (initialTasks.length > 0) {
            const { data: seeded, error: seedError } = await supabaseClient
                .from(TASKS_TABLE)
                .insert(initialTasks)
                .select();

            if (seedError) {
                console.error("Could not seed initial tasks:", seedError);

                showTaskMessage(
                    "Cloud table is empty, but initial tasks couldn't be uploaded.",
                    true
                );

                return;
            }

            todos = seeded || [];
        } else {
            todos = [];
        }
    } else {
        // The cloud list is authoritative when it already contains tasks.
        todos = data || [];
    }

    tasksLoadedFromSupabase = true;

    saveTaskCache();
    renderTodos();
    renderFocus();
    updateStats();

    showTaskMessage("Tasks synced with Supabase.");
}

// ---------- REALTIME SYNC ----------

function subscribeToTaskChanges() {
    if (!supabaseClient || tasksChannel) return;

    tasksChannel = supabaseClient
        .channel("nova-ii-task-changes")
        .on(
            "postgres_changes",
            {
                event: "*",
                schema: "public",
                table: TASKS_TABLE
            },
            () => {
                loadTasksFromSupabase({ seedIfEmpty: false });
            }
        )
        .subscribe(status => {
            if (status === "CHANNEL_ERROR") {
                console.error("NovaII Realtime subscription failed.");
            }
        });
}

// ---------- DELETE TASK ----------

async function deleteTask(task) {
    if (
        !supabaseClient ||
        !tasksLoadedFromSupabase ||
        task.id === null ||
        task.id === undefined
    ) {
        showTaskMessage(
            "This task isn't connected to Supabase yet.",
            true
        );
        return;
    }

    const { error } = await supabaseClient
        .from(TASKS_TABLE)
        .delete()
        .eq("id", task.id);

    if (error) {
        console.error("Could not delete task:", error);

        showTaskMessage(
            "Couldn't delete task. Check the connection and try again.",
            true
        );

        return;
    }

    todos = todos.filter(item => item.id !== task.id);

    saveTaskCache();
    renderTodos();
    renderFocus();
    updateStats();

    showTaskMessage("Task deleted from all devices.");
}

// ---------- RENDER TASKS ----------

function renderTodos() {
    const list = document.getElementById("todoList");

    if (!list) return;

    list.replaceChildren();

    if (todos.length === 0) {
        const empty = document.createElement("li");
        empty.textContent = "No tasks yet. Add your first task above!";
        list.appendChild(empty);
    }

    todos.forEach(task => {
        const li = document.createElement("li");

        if (task.done) {
            li.classList.add("completed");
        }

        // Completion checkbox.
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.checked = task.done;
        checkbox.setAttribute(
            "aria-label",
            "Mark " + task.name + " as complete"
        );
        checkbox.disabled = !tasksLoadedFromSupabase;

        checkbox.addEventListener("change", () => {
            updateTask(task, { done: checkbox.checked });
        });

        // Task name and priority.
        const details = document.createElement("div");
        details.className = "task-details";

        const name = document.createElement("span");
        name.className = "task-name";
        name.textContent = task.name;

        const priority = document.createElement("span");
        priority.className = "task-priority";
        priority.textContent =
            (PRIORITY_EMOJIS[task.priority] || "") +
            " " +
            task.priority;

        details.append(name, priority);

        // Delete button.
        const deleteButton = document.createElement("button");

        deleteButton.type = "button";
        deleteButton.className = "delete-task";
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute(
            "aria-label",
            "Delete task " + task.name
        );
        deleteButton.disabled = !tasksLoadedFromSupabase;

        deleteButton.addEventListener("click", () => {
            deleteTask(task);
        });

        li.append(checkbox, details, deleteButton);
        list.appendChild(li);
    });

    const remaining = todos.filter(task => !task.done).length;
    const count = document.getElementById("taskCount");

    if (count) {
        count.textContent =
            `${remaining} remaining / ${todos.length} total`;
    }
}

// ---------- RENDER WANTS ----------

function renderWants() {
    const list = document.getElementById("wantList");

    if (!list) return;

    list.replaceChildren();

    wants.forEach(item => {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.checked = item.done;
        checkbox.setAttribute(
            "aria-label",
            "Mark " + item.item + " as complete"
        );

        checkbox.addEventListener("change", () => {
            const previous = item.done;

            item.done = checkbox.checked;

            if (!saveData()) {
                item.done = previous;
                checkbox.checked = previous;
            }
        });

        const text = document.createElement("span");

        text.appendChild(document.createTextNode(item.item));
        text.appendChild(document.createElement("br"));
        text.appendChild(
            document.createTextNode("Reason: " + item.reason)
        );

        text.appendChild(document.createElement("br"));
        text.appendChild(
            document.createTextNode("Priority: " + item.priority)
        );

        li.append(checkbox, text);
        list.appendChild(li);
    });
}

// ---------- TODAY'S FOCUS DISPLAY ----------

function renderFocus() {
    const mandatory = document.getElementById("mandatoryTasks");
    const optionsBox = document.getElementById("focusOptions");

    if (!mandatory || !optionsBox) return;

    mandatory.replaceChildren();
    optionsBox.replaceChildren();

    getMandatoryTasks().forEach(item => {
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        const span = document.createElement("span");

        checkbox.type = "checkbox";
        checkbox.setAttribute("aria-label", item);

        span.textContent = item;

        li.append(checkbox, span);
        mandatory.appendChild(li);
    });

    const options = todos
        .filter(task => !task.done)
        .filter(task =>
            task.priority === "High" ||
            task.priority === "Medium-High"
        )
        .slice(0, 3);

    if (options.length === 0) {
        const li = document.createElement("li");

        li.textContent = "No outstanding high-priority tasks!";

        optionsBox.appendChild(li);
        return;
    }

    options.forEach(task => {
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        const span = document.createElement("span");

        checkbox.type = "checkbox";
        checkbox.checked = task.done;

        span.textContent = task.name;

        checkbox.setAttribute(
            "aria-label",
            "Complete focus task " + task.name
        );

        checkbox.disabled = !tasksLoadedFromSupabase;

        checkbox.addEventListener("change", () => {
            updateTask(task, { done: checkbox.checked });
        });

        li.append(checkbox, span);
        optionsBox.appendChild(li);
    });
}

// ---------- QUICK STATS ----------

function updateStats() {
    const stats = document.getElementById("stats");

    if (!stats) return;

    const done = todos.filter(task => task.done).length;
    const total = todos.length;
    const remaining = total - done;

    stats.textContent =
        `${done}/${total} tasks completed · ${remaining} remaining`;
}

// ---------- INVENTORY SEARCH ----------

function searchItem() {
    const input = document.getElementById("searchBox");
    const output = document.getElementById("result");

    if (!input || !output) return;

    const query = input.value.toLowerCase().trim();

    if (!query) {
        output.textContent = "Enter an item to search for.";
        return;
    }

    const matches = Object.keys(inventory).filter(item =>
        item.toLowerCase().includes(query)
    );

    output.replaceChildren();

    if (matches.length === 0) {
        output.textContent = "Not found.";
        return;
    }

    matches.forEach(item => {
        const entry = document.createElement("p");
        const name = document.createElement("strong");

        name.textContent = item;

        entry.appendChild(name);
        entry.appendChild(document.createElement("br"));
        entry.appendChild(
            document.createTextNode(inventory[item])
        );

        output.appendChild(entry);
    });
}

// ---------- CLOCK, GREETING AND THEME ----------

function clock() {
    const now = new Date();
    const hour = now.getHours();

    const greeting = document.getElementById("greeting");
    const clockElement = document.getElementById("clock");
    const date = document.getElementById("date");

    if (greeting) {
        if (hour < 12) {
            greeting.textContent = "☀️ Good Morning";
        } else if (hour < 18) {
            greeting.textContent = "🌤️ Good Afternoon";
        } else {
            greeting.textContent = "🌙 Good Evening";
        }
    }

    if (clockElement) {
        clockElement.textContent = now.toLocaleTimeString();
    }

    if (date) {
        date.textContent = now.toDateString();
    }

    document.body.classList.toggle(
        "night",
        hour >= 18 || hour < 6
    );
}

// ---------- EVENT LISTENERS ----------

function setupTaskForm() {
    const form = document.getElementById("taskForm");
    const nameInput = document.getElementById("taskName");
    const priorityInput = document.getElementById("taskPriority");

    if (!form || !nameInput || !priorityInput) return;

    form.addEventListener("submit", async event => {
        event.preventDefault();

        const added = await addTask(
            nameInput.value,
            priorityInput.value
        );

        if (added) {
            nameInput.value = "";
            priorityInput.value = "Medium";
            nameInput.focus();
        }
    });
}

function setupInventorySearch() {
    const form = document.getElementById("inventorySearchForm");

    if (!form) return;

    form.addEventListener("submit", event => {
        event.preventDefault();
        searchItem();
    });
}

// ---------- START DASHBOARD ----------

function initNovaII() {
    loadData();

    createList("morningRoutine", morningRoutine);
    createList("bedRoutine", bedRoutine);
    createList("calendar", calendar);

    setupTaskForm();
    setupInventorySearch();

    renderTodos();
    renderWants();
    renderFocus();
    updateStats();
    clock();

    // Load shared tasks, then listen for changes from other devices.
    loadTasksFromSupabase().then(() => {
        if (tasksLoadedFromSupabase) {
            subscribeToTaskChanges();
        }
    });

    setInterval(clock, 1000);
}

initNovaII();
