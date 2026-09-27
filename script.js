document.addEventListener("DOMContentLoaded", function () {

    console.log("MARUTI NANDAN CATERERS - Premium Compact Menu Book");

    /* =====================================================
       SMOOTH SCROLL
    ====================================================== */

    /* =====================================================
       PREMIUM MENU OPENING EXPERIENCE
    ====================================================== */

    let menuOpeningBusy = false;

    function createMenuOpening() {
        if (document.getElementById("menuOpeningExperience")) {
            return document.getElementById("menuOpeningExperience");
        }

        const overlay = document.createElement("div");
        overlay.id = "menuOpeningExperience";
        overlay.className = "menu-opening-experience";

        overlay.innerHTML = `
            <div class="menu-opening-glow"></div>
            <div class="menu-opening-particles" aria-hidden="true">
                <span></span><span></span><span></span><span></span><span></span>
                <span></span><span></span><span></span><span></span><span></span>
                <span></span><span></span><span></span><span></span><span></span>
            </div>

            <div class="menu-opening-curtain menu-opening-curtain-left"></div>
            <div class="menu-opening-curtain menu-opening-curtain-right"></div>

            <div class="menu-opening-center">
                <div class="menu-opening-monogram">MN</div>
                <div class="menu-opening-kicker">MARUTI NANDAN CATERERS</div>
                <div class="menu-opening-title">The Menu Collection</div>
                <div class="menu-opening-subtitle">A refined collection of vegetarian favourites</div>
                <div class="menu-opening-line"><span>✦</span></div>
                <div class="menu-opening-caption">Explore the menu</div>
            </div>
        `;

        document.body.appendChild(overlay);
        return overlay;
    }

    function openMenuExperience(target) {
        if (!target || menuOpeningBusy) return;

        menuOpeningBusy = true;
        const overlay = createMenuOpening();

        overlay.classList.remove("is-closing");
        overlay.classList.add("is-opening");
        document.body.classList.add("menu-opening-lock");

        window.setTimeout(function () {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }, 520);

        window.setTimeout(function () {
            overlay.classList.add("is-closing");
        }, 1050);

        window.setTimeout(function () {
            overlay.classList.remove("is-opening", "is-closing");
            document.body.classList.remove("menu-opening-lock");
            menuOpeningBusy = false;
        }, 1750);
    }

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            if (targetId === "#menu") {
                openMenuExperience(target);
                return;
            }

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });


    /* =====================================================
       MENU ELEMENTS
    ====================================================== */

    const menuFilters = document.getElementById("menuFilters");
    const menuGrid = document.getElementById("menuGrid");

    if (!menuFilters || !menuGrid) {
        console.error("Premium menu elements were not found.");
        return;
    }


    /* =====================================================
       MENU DATA CHECK
    ====================================================== */

    if (typeof menuData === "undefined" || !Array.isArray(menuData)) {

        menuGrid.innerHTML = `
            <div class="menu-error">
                <h3>Menu Could Not Be Loaded</h3>
                <p>
                    Please make sure menu-data.js is in the same folder
                    and is loaded before script.js.
                </p>
            </div>
        `;

        return;
    }


    /* =====================================================
       HELPERS
    ====================================================== */

    function escapeHTML(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    function categoryNumber(index) {
        return String(index + 1).padStart(2, "0");
    }


    function getCategoryIndex(categoryKey) {
        return menuData.findIndex(function (category) {
            return category.category === categoryKey;
        });
    }


    /* =====================================================
       FILTER BUTTONS
    ====================================================== */

    menuFilters.innerHTML = "";

    const allButton = document.createElement("button");
    allButton.type = "button";
    allButton.className = "menu-filter active";
    allButton.dataset.category = "all";
    allButton.textContent = "Menu Index";
    menuFilters.appendChild(allButton);

    menuData.forEach(function (category) {
        const button = document.createElement("button");

        button.type = "button";
        button.className = "menu-filter";
        button.dataset.category = category.category;
        button.textContent = category.title;

        menuFilters.appendChild(button);
    });


    /* =====================================================
       ACTIVE FILTER
    ====================================================== */

    function setActiveFilter(categoryKey) {
        menuFilters.querySelectorAll(".menu-filter").forEach(function (button) {
            button.classList.toggle(
                "active",
                button.dataset.category === categoryKey
            );
        });
    }


    /* =====================================================
       COVER
    ====================================================== */

    function createCover() {
        return `
            <section class="menu-book-cover compact-cover">
                <div class="menu-cover-content">
                    <div class="menu-cover-kicker">
                        THE SIGNATURE MENU
                    </div>

                    <div class="menu-cover-monogram">MN</div>

                    <h2>
                        Maruti Nandan
                        <span>Caterers</span>
                    </h2>

                    <div class="menu-cover-rule"></div>

                    <p>A COLLECTION OF TASTE & TRADITION</p>
                </div>
            </section>
        `;
    }


    /* =====================================================
       MENU INDEX
    ====================================================== */

    function createIndex() {
        let indexItems = "";

        menuData.forEach(function (category, index) {
            const number = categoryNumber(index);
            const groups = Array.isArray(category.groups) ? category.groups : [];
            const itemCount = groups.reduce(function (total, group) {
                return total + (Array.isArray(group.items) ? group.items.length : 0);
            }, 0);
            const groupCount = groups.length;

            indexItems += `
                <button
                    type="button"
                    class="menu-index-item"
                    data-index-category="${escapeHTML(category.category)}"
                >
                    <span class="menu-index-number">${number}</span>
                    <span class="menu-index-main">
                        <span class="menu-index-title">${escapeHTML(category.title)}</span>
                        <span class="menu-index-meta">${itemCount} items · ${groupCount} ${groupCount === 1 ? "section" : "sections"}</span>
                    </span>
                    <span class="menu-index-arrow" aria-hidden="true">↗</span>
                </button>
            `;
        });

        return `
            <section class="menu-book-index compact-index">
                <div class="menu-index-heading">
                    <span class="menu-index-eyebrow">THE MENU</span>
                    <h3>Menu Index</h3>
                    <div class="menu-index-heading-rule"><i>✦</i></div>
                    <p>Browse the complete menu by chapter.</p>
                </div>

                <div class="menu-index-intro-row">
                    <span>${String(menuData.length).padStart(2, "0")} CHAPTERS</span>
                    <span>20 CHAPTERS • VEGETARIAN MENU</span>
                </div>

                <div class="menu-index-list">
                    ${indexItems}
                </div>

                <div class="menu-index-footer-note">
                    <span>MARUTI NANDAN CATERERS</span>
                    <span>SELECT A CHAPTER TO BEGIN</span>
                </div>
            </section>
        `;
    }


    /* =====================================================
       MENU PAGE
    ====================================================== */

    function createMenuPage(category, index) {

        const number = categoryNumber(index);
        const previousIndex = index === 0 ? menuData.length - 1 : index - 1;
        const nextIndex = index === menuData.length - 1 ? 0 : index + 1;

        let groupsHTML = "";

        if (Array.isArray(category.groups)) {

            category.groups.forEach(function (group) {

                let itemsHTML = "";

                if (Array.isArray(group.items)) {
                    group.items.forEach(function (item) {
                        itemsHTML += `
                            <li class="menu-item">
                                <span class="menu-item-bullet">✦</span>
                                <span>${escapeHTML(item)}</span>
                            </li>
                        `;
                    });
                }

                groupsHTML += `
                    <div class="menu-group">
                        <h4 class="menu-group-title">
                            ${escapeHTML(group.title)}
                        </h4>

                        <ul class="menu-items">
                            ${itemsHTML}
                        </ul>
                    </div>
                `;
            });
        }

        return `
            <article
                class="menu-page compact-menu-page"
                data-menu-category="${escapeHTML(category.category)}"
            >
                <div class="menu-page-inner">

                    <header class="menu-page-header">
                        <div class="menu-page-topline">
                            <span>MARUTI NANDAN CATERERS</span>
                            <span>PREMIUM VEGETARIAN MENU</span>
                        </div>

                        <div class="menu-page-number">${number}</div>

                        <div class="menu-page-kicker">MENU</div>

                        <h3 class="menu-page-title">
                            ${escapeHTML(category.title)}
                        </h3>

                        <div class="menu-page-ornament">✦</div>
                    </header>

                    <div class="menu-page-groups">
                        ${groupsHTML}
                    </div>

                    <footer class="menu-page-footer">
                        <button
                            type="button"
                            class="menu-page-nav menu-prev"
                            data-nav-index="${previousIndex}"
                        >
                            ← Previous
                        </button>

                        <button
                            type="button"
                            class="menu-page-index"
                            data-nav-index="index"
                        >
                            ${number} / ${String(menuData.length).padStart(2, "0")}
                            <span>Index</span>
                        </button>

                        <button
                            type="button"
                            class="menu-page-nav menu-next"
                            data-nav-index="${nextIndex}"
                        >
                            Next →
                        </button>
                    </footer>

                </div>
            </article>
        `;
    }


    /* =====================================================
       SHOW MENU INDEX
    ====================================================== */

    function renderIndex() {

        menuGrid.innerHTML = `
            <div class="menu-book compact-book menu-page-entering">
                ${createCover()}
                ${createIndex()}
            </div>
        `;

        requestAnimationFrame(function () {
            const book = menuGrid.querySelector(".menu-page-entering");
            if (book) book.classList.add("menu-page-entered");
        });

        setActiveFilter("all");
    }


    /* =====================================================
       SHOW ONE CATEGORY PAGE
    ====================================================== */

    function renderCategory(index) {

        if (index < 0 || index >= menuData.length) return;

        const category = menuData[index];

        menuGrid.innerHTML = `
            <div class="menu-book compact-book single-category-book menu-page-entering menu-chapter-entering">
                ${createMenuPage(category, index)}
            </div>
        `;

        requestAnimationFrame(function () {
            const book = menuGrid.querySelector(".menu-page-entering");
            if (book) book.classList.add("menu-page-entered");
        });

        setActiveFilter(category.category);
    }


    /* =====================================================
       SCROLL MENU INTO VIEW
    ====================================================== */

    function scrollToMenu() {
        const menuSection = document.getElementById("menu");

        if (!menuSection) return;

        const offset = 92;
        const top = menuSection.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
            top: Math.max(0, top),
            behavior: "smooth"
        });
    }


    /* =====================================================
       INITIAL STATE
    ====================================================== */

    renderIndex();


    /* =====================================================
       FILTER CLICK
    ====================================================== */

    menuFilters.addEventListener("click", function (event) {

        const button = event.target.closest(".menu-filter");

        if (!button) return;

        const categoryKey = button.dataset.category;

        if (!categoryKey) return;

        if (categoryKey === "all") {
            renderIndex();
        } else {
            const index = getCategoryIndex(categoryKey);

            if (index !== -1) {
                renderCategory(index);
            }
        }

        scrollToMenu();
    });


    /* =====================================================
       INDEX + PREVIOUS/NEXT NAVIGATION
    ====================================================== */

    menuGrid.addEventListener("click", function (event) {

        const indexButton = event.target.closest(".menu-index-item");

        if (indexButton) {
            const categoryKey = indexButton.dataset.indexCategory;
            const index = getCategoryIndex(categoryKey);

            if (index !== -1) {
                renderCategory(index);
                scrollToMenu();
            }

            return;
        }


        const navigationButton = event.target.closest(
            ".menu-page-nav, .menu-page-index"
        );

        if (!navigationButton) return;

        const navigationIndex = navigationButton.dataset.navIndex;

        if (navigationIndex === "index") {
            renderIndex();
            scrollToMenu();
            return;
        }

        const index = Number(navigationIndex);

        if (!Number.isNaN(index)) {
            renderCategory(index);
            scrollToMenu();
        }
    });


    console.log(
        "Compact menu book initialized:",
        menuData.length,
        "categories"
    );

});
