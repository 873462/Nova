<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Nova K - Kitchen</title>

    <link rel="stylesheet" href="style.css">

</head>


<body>


<!-- =====================================
     HEADER
===================================== -->

<header class="top-header">

    <div class="brand">

        <h1>🍳 Nova K</h1>

        <p>Kitchen Management System</p>

    </div>


    <div class="datetime">

        <div id="clock"></div>

        <div id="date"></div>

    </div>

</header>



<!-- =====================================
     NAVIGATION
===================================== -->

<nav class="main-nav">


    <a
        href="../index.html"
        class="nav-button dashboard-button"
    >
        🏠
        <span>Nova Dashboard</span>
    </a>


    <button
        class="nav-button active"
        onclick="showSection('inventory')"
    >
        📦
        <span>Inventory</span>
    </button>


    <button
        class="nav-button"
        onclick="showSection('shopping')"
    >
        🛒
        <span>Shopping List</span>
    </button>


    <button
        class="nav-button"
        onclick="showSection('map')"
    >
        🗺️
        <span>Kitchen Map</span>
    </button>


    <button
        class="nav-button"
        onclick="showSection('add-item')"
    >
        ➕
        <span>Add Item</span>
    </button>


</nav>



<!-- =====================================
     INVENTORY SECTION
===================================== -->

<section
    id="inventory"
    class="section"
>


    <!-- SEARCH -->

    <div class="search-card">

        <h2>🔍 Search Kitchen</h2>

        <p class="section-description">
            Search by item, category, or location.
        </p>


        <div class="search-wrapper">

            <span>🔎</span>

            <input
                id="searchBox"
                type="text"
                placeholder="Search item, category, or location..."
                oninput="searchInventory()"
            >

        </div>

    </div>



    <!-- STATISTICS -->

    <div class="stats">


        <div class="stat-card">

            <div class="stat-icon">
                📦
            </div>

            <div>

                <p class="stat-label">
                    Total Items
                </p>

                <p
                    id="totalItems"
                    class="stat-number"
                >
                    0
                </p>

            </div>

        </div>



        <div class="stat-card">

            <div class="stat-icon">
                ⚠️
            </div>

            <div>

                <p class="stat-label">
                    Low Stock
                </p>

                <p
                    id="lowStock"
                    class="stat-number"
                >
                    0
                </p>

            </div>

        </div>



        <div class="stat-card">

            <div class="stat-icon">
                🛒
            </div>

            <div>

                <p class="stat-label">
                    Shopping Items
                </p>

                <p
                    id="shoppingCount"
                    class="stat-number"
                >
                    0
                </p>

            </div>

        </div>


    </div>



    <!-- INVENTORY -->

    <div class="section-heading">

        <div>

            <h2>📦 Kitchen Inventory</h2>

            <p>
                Everything currently stored in your kitchen.
            </p>

        </div>


        <button
            class="small-action"
            onclick="showSection('add-item')"
        >
            ➕ Add Item
        </button>

    </div>


    <div id="inventoryContainer"></div>


</section>



<!-- =====================================
     SHOPPING SECTION
===================================== -->

<section
    id="shopping"
    class="section hidden"
>


    <div class="section-heading">

        <div>

            <h2>🛒 Kitchen Shopping List</h2>

            <p>
                Items that need to be purchased.
            </p>

        </div>


        <button
            class="action-button"
            onclick="refillAll()"
        >
            🔄 Refill All
        </button>

    </div>



    <div class="shopping-card">

        <div
            id="shoppingEmpty"
            class="empty-state hidden"
        >

            <div class="empty-icon">
                ✅
            </div>

            <h3>
                Nothing Needs To Be Bought
            </h3>

            <p>
                Your kitchen inventory is fully stocked.
            </p>

        </div>


        <div
            id="shoppingList"
            class="shopping-list"
        ></div>

    </div>


</section>



<!-- =====================================
     MAP SECTION
===================================== -->

<section
    id="map"
    class="section hidden"
>


    <div class="section-heading">

        <div>

            <h2>🗺 Kitchen Map</h2>

            <p>
                Select a location to see what's stored there.
            </p>

        </div>

    </div>



    <div class="kitchen-map">


        <button
            class="location"
            onclick="showLocationItems('upper-cupboard')"
        >
            <span>🗄️</span>
            Upper Cupboard
        </button>


        <button
            class="location"
            onclick="showLocationItems('microwave-oven')"
        >
            <span>🔥</span>
            Microwave / Oven
        </button>


        <button
            class="location"
            onclick="showLocationItems('oven-storage')"
        >
            <span>📦</span>
            Oven Storage
        </button>


        <button
            class="location"
            onclick="showLocationItems('countertop')"
        >
            <span>🍽️</span>
            Countertop
        </button>


        <button
            class="location"
            onclick="showLocationItems('drawer-1')"
        >
            <span>🥄</span>
            Drawer 1
            <small>Utensils</small>
        </button>


        <button
            class="location"
            onclick="showLocationItems('drawer-2')"
        >
            <span>🥣</span>
            Drawer 2
            <small>Small Containers</small>
        </button>


        <button
            class="location"
            onclick="showLocationItems('drawer-3')"
        >
            <span>📏</span>
            Drawer 3
            <small>Measuring Tools</small>
        </button>


        <button
            class="location"
            onclick="showLocationItems('drawer-4')"
        >
            <span>🛍️</span>
            Drawer 4
            <small>Wraps & Bags</small>
        </button>


        <button
            class="location"
            onclick="showLocationItems('kitchen-island')"
        >
            <span>🏝️</span>
            Kitchen Island
        </button>


        <button
            class="location"
            onclick="showLocationItems('stove')"
        >
            <span>🔥</span>
            Stove
        </button>


        <button
            class="location"
            onclick="showLocationItems('pots-pans')"
        >
            <span>🍳</span>
            Pots & Pans Cabinet
        </button>


        <button
            class="location"
            onclick="showLocationItems('spice-rack')"
        >
            <span>🧂</span>
            Pull-Out Spice Rack
        </button>


        <button
            class="location"
            onclick="showLocationItems('sink-cabinet')"
        >
            <span>🚰</span>
            Sink Cabinet
        </button>


        <button
            class="location"
            onclick="showLocationItems('dishwasher')"
        >
            <span>🍽️</span>
            Dishwasher
        </button>


        <button
            class="location"
            onclick="showLocationItems('right-cabinet')"
        >
            <span>🗄️</span>
            Right Cabinet
        </button>


        <button
            class="location"
            onclick="showLocationItems('island-upper-cabinets')"
        >
            <span>🗄️</span>
            Island Upper Cabinets
        </button>


        <button
            class="location"
            onclick="showLocationItems('double-cabinet')"
        >
            <span>🗄️</span>
            Double Cabinet
        </button>


        <button
            class="location"
            onclick="showLocationItems('coffee-cabinet')"
        >
            <span>☕</span>
            Coffee Cabinet
        </button>


        <button
            class="location"
            onclick="showLocationItems('coffee-counter')"
        >
            <span>☕</span>
            Coffee Counter
        </button>


        <button
            class="location"
            onclick="showLocationItems('coffee-drawers')"
        >
            <span>☕</span>
            Coffee Drawers
        </button>


        <button
            class="location"
            onclick="showLocationItems('freezer')"
        >
            <span>❄️</span>
            Freezer
        </button>


        <button
            class="location"
            onclick="showLocationItems('refrigerator')"
        >
            <span>🧊</span>
            Refrigerator
        </button>


        <button
            class="location"
            onclick="showLocationItems('fridge-upper-cabinet')"
        >
            <span>🗄️</span>
            Refrigerator Upper Cabinet
        </button>


        <button
            class="location"
            onclick="showLocationItems('fridge-lower-cabinet')"
        >
            <span>🗄️</span>
            Refrigerator Lower Cabinet
        </button>


        <button
            class="location"
            onclick="showLocationItems('display-storage')"
        >
            <span>✨</span>
            Display Storage
        </button>


        <button
            class="location"
            onclick="showLocationItems('marketplace-cabinet')"
        >
            <span>🛍️</span>
            Marketplace Cabinet
        </button>


        <button
            class="location"
            onclick="showLocationItems('curio-cabinet')"
        >
            <span>🏺</span>
            Curio Cabinet
        </button>


        <button
            class="location"
            onclick="showLocationItems('window')"
        >
            <span>🪟</span>
            Window
            <small>Salt & Pepper</small>
        </button>


    </div>



    <div
        id="locationDetails"
        class="location-details"
    >

        <div class="empty-icon">
            📍
        </div>

        <h3>
            Select a Location
        </h3>

        <p>
            Click a location above to see the items stored there.
        </p>

    </div>


</section>



<!-- =====================================
     ADD ITEM SECTION
===================================== -->

<section
    id="add-item"
    class="section hidden"
>


    <div class="section-heading">

        <div>

            <h2>➕ Add Kitchen Item</h2>

            <p>
                Add a new item to your kitchen inventory.
            </p>

        </div>

    </div>



    <div class="form-card">


        <!-- BASIC INFORMATION -->

        <div class="form-section">

            <h3>
                📋 Item Information
            </h3>


            <div class="form-grid">


                <div class="form-group">

                    <label for="itemName">
                        Item Name
                    </label>

                    <input
                        id="itemName"
                        type="text"
                        placeholder="e.g. Milk"
                    >

                </div>


                <div class="form-group">

                    <label for="itemCategory">
                        Category
                    </label>

                    <input
                        id="itemCategory"
                        type="text"
                        placeholder="e.g. Dairy, Pantry"
                    >

                </div>


            </div>


            <div class="form-group">

                <label for="itemLocation">
                    Location
                </label>

                <select id="itemLocation">

                    <option value="upper-cupboard">
                        Upper Cupboard
                    </option>

                    <option value="microwave-oven">
                        Microwave / Oven
                    </option>

                    <option value="oven-storage">
                        Oven Storage
                    </option>

                    <option value="countertop">
                        Countertop
                    </option>

                    <option value="drawer-1">
                        Drawer 1 - Utensils
                    </option>

                    <option value="drawer-2">
                        Drawer 2 - Small Containers
                    </option>

                    <option value="drawer-3">
                        Drawer 3 - Measuring Tools
                    </option>

                    <option value="drawer-4">
                        Drawer 4 - Wraps & Bags
                    </option>

                    <option value="kitchen-island">
                        Kitchen Island
                    </option>

                    <option value="stove">
                        Stove
                    </option>

                    <option value="pots-pans">
                        Pots & Pans Cabinet
                    </option>

                    <option value="spice-rack">
                        Pull-Out Spice Rack
                    </option>

                    <option value="sink-cabinet">
                        Sink Cabinet
                    </option>

                    <option value="dishwasher">
                        Dishwasher
                    </option>

                    <option value="right-cabinet">
                        Right Cabinet
                    </option>

                    <option value="island-upper-cabinets">
                        Island Upper Cabinets
                    </option>

                    <option value="double-cabinet">
                        Double Cabinet
                    </option>

                    <option value="coffee-cabinet">
                        Coffee Cabinet
                    </option>

                    <option value="coffee-counter">
                        Coffee Counter
                    </option>

                    <option value="coffee-drawers">
                        Coffee Drawers
                    </option>

                    <option value="freezer">
                        Freezer
                    </option>

                    <option value="refrigerator">
                        Refrigerator
                    </option>

                    <option value="fridge-upper-cabinet">
                        Refrigerator Upper Cabinet
                    </option>

                    <option value="fridge-lower-cabinet">
                        Refrigerator Lower Cabinet
                    </option>

                    <option value="display-storage">
                        Display Storage
                    </option>

                    <option value="marketplace-cabinet">
                        Marketplace Cabinet
                    </option>

                    <option value="curio-cabinet">
                        Curio Cabinet
                    </option>

                    <option value="window">
                        Window - Salt & Pepper
                    </option>

                </select>

            </div>


            <div class="form-group">

                <label for="itemContainer">
                    Container / Unit
                </label>

                <input
                    id="itemContainer"
                    type="text"
                    placeholder="e.g. jug, box, bag, packets"
                >

            </div>


        </div>



        <!-- TRACKING -->

        <div class="form-section">

            <h3>
                📊 Stock Tracking
            </h3>


            <div class="form-group">

                <label for="trackingType">
                    Tracking Type
                </label>

                <select
                    id="trackingType"
                    onchange="updateMeasurementFields()"
                >

                    <option value="percentage">
                        Percentage
                    </option>

                    <option value="quantity">
                        Quantity
                    </option>

                    <option value="custom">
                        Custom Measurement
                    </option>

                </select>

            </div>



            <!-- PERCENTAGE -->

            <div
                id="percentageFields"
                class="measurement-box"
            >

                <div class="form-grid">

                    <div class="form-group">

                        <label for="itemCurrentPercentage">
                            Current Amount
                        </label>

                        <div class="input-with-unit">

                            <input
                                id="itemCurrentPercentage"
                                type="number"
                                min="0"
                                max="100"
                                value="100"
                            >

                            <span>%</span>

                        </div>

                    </div>


                    <div class="form-group">

                        <label for="itemThresholdPercentage">
                            Shopping Threshold
                        </label>

                        <div class="input-with-unit">

                            <input
                                id="itemThresholdPercentage"
                                type="number"
                                min="0"
                                max="100"
                                value="25"
                            >

                            <span>%</span>

                        </div>

                    </div>

                </div>

            </div>



            <!-- QUANTITY -->

            <div
                id="quantityFields"
                class="measurement-box hidden"
            >

                <div class="form-grid">

                    <div class="form-group">

                        <label for="itemCurrentQuantity">
                            Current Quantity
                        </label>

                        <input
                            id="itemCurrentQuantity"
                            type="number"
                            min="0"
                            step="0.5"
                            value="1"
                        >

                    </div>


                    <div class="form-group">

                        <label for="itemMaxQuantity">
                            Maximum Quantity
                        </label>

                        <input
                            id="itemMaxQuantity"
                            type="number"
                            min="0"
                            step="0.5"
                            value="10"
                        >

                    </div>


                    <div class="form-group">

                        <label for="itemThresholdQuantity">
                            Shopping Threshold
                        </label>

                        <input
                            id="itemThresholdQuantity"
                            type="number"
                            min="0"
                            step="0.5"
                            value="3"
                        >

                    </div>

                </div>

            </div>



            <!-- CUSTOM -->

            <div
                id="customFields"
                class="measurement-box hidden"
            >

                <div class="form-grid">

                    <div class="form-group">

                        <label for="itemCustomCurrent">
                            Current Measurement
                        </label>

                        <input
                            id="itemCustomCurrent"
                            type="text"
                            placeholder="e.g. 1.5 bags"
                        >

                    </div>


                    <div class="form-group">

                        <label for="itemCustomMax">
                            Maximum Measurement
                        </label>

                        <input
                            id="itemCustomMax"
                            type="text"
                            placeholder="e.g. 3 bags"
                        >

                    </div>


                    <div class="form-group">

                        <label for="itemCustomThreshold">
                            Shopping Threshold
                        </label>

                        <input
                            id="itemCustomThreshold"
                            type="text"
                            placeholder="e.g. 0.5 bags"
                        >

                    </div>

                </div>

            </div>


        </div>



        <!-- FORM ACTIONS -->

        <div class="form-actions">

            <button
                class="cancel-button"
                onclick="showSection('inventory')"
            >
                Cancel
            </button>


            <button
                id="addItemButton"
                class="primary-button"
                onclick="addItem()"
            >
                ➕ Add Item
            </button>

        </div>


    </div>


</section>



<!-- =====================================
     FOOTER
===================================== -->

<footer>

    Nova K • Part of the Nova Home System

</footer>



<script src="script.js"></script>

</body>

</html>
