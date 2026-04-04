/**
 * Gestione Dati Menu
 * Se esiste una versione salvata nel LocalStorage (modificata dalla dashboard), usa quella.
 * Altrimenti usa i dati di default.
 */

const defaultMenuData = [
    {
        id: "classiche",
        title: "PIZZE CLASSICHE",
        disclaimer: "* Prodotto Surgelato",
        items: [
            { name: "Marinara", price: "3,50", desc: "", ingredients: ["Pomodoro", "Aglio", "Prezzemolo"] },
            { name: "Margherita", price: "4,50", desc: "", ingredients: ["Pomodoro", "Fior di Latte"] },
            { name: "Diavola", price: "6,00", desc: "", ingredients: ["Pomodoro", "Fior di Latte", "Salame Piccante"] },
            { name: "Napoli", price: "6,00", desc: "", ingredients: ["Pomodoro", "Fior di Latte", "Acciughe", "Capperi", "Origano"] },
            { name: "Capricciosa", price: "7,50", desc: "", ingredients: ["Pomodoro", "Fior di Latte", "Carciofi", "Funghi", "Prosciutto Cotto", "Olive"] },
            { name: "Quattro Formaggi", price: "7,50", desc: "", ingredients: ["Pomodoro", "Fior di Latte", "Svizzero", "Scamorza", "Gorgonzola"] },
            { name: "Tonno e Cipolla", price: "6,50", desc: "", ingredients: ["Pomodoro", "Fior di Latte", "Tonno", "Cipolla"] },
            { name: "Peppa Pig *", price: "7,00", desc: "", ingredients: ["Pomodoro", "Fior di Latte", "Würstel", "Patatine"] },
            { name: "Crudo e Panna", price: "7,00", desc: "", ingredients: ["Pomodoro", "Fior di Latte", "Prosciutto Crudo", "Panna"] },
            { name: "Crudo e Patatine", price: "7,50", desc: "", ingredients: ["Pomodoro", "Fior di Latte", "Prosciutto Crudo", "Patatine"] },
            { name: "Salsiccia", price: "6,50", desc: "", ingredients: ["Pomodoro", "Fior di Latte", "Salsiccia"] },
            { name: "Salsiccia e Patatine", price: "7,50", desc: "", ingredients: ["Pomodoro", "Fior di Latte", "Salsiccia", "Patatine"] },
            { name: "Diavola e Patatine", price: "7,00", desc: "", ingredients: ["Pomodoro", "Fior di Latte", "Salame Piccante", "Patatine"] },
            { name: "Contadina", price: "7,50", desc: "", ingredients: ["Pomodoro", "Fior di Latte", "Melanzane", "Zucchine", "Peperoni"] },
            { name: "Regina", price: "7,50", desc: "", ingredients: ["Pomodoro", "Mozzarella di Bufala", "Basilico"] },
            { name: "Frutti di Mare *", price: "9,00", desc: "", ingredients: ["Pomodoro", "Fior di Latte", "Cozze", "Gamberi", "Calamari"] },
            { name: "Mare e Monti *", price: "9,00", desc: "", ingredients: ["Pomodoro", "Fior di Latte", "Gamberi", "Porcini"] },
            { name: "Crudo più", price: "8,00", desc: "", ingredients: ["Pomodoro", "Fior di Latte", "Prosciutto Crudo", "Grana", "Rucola"] }
        ]
    },
    {
        id: "bianche",
        title: "PIZZE BIANCHE",
        disclaimer: "* Prodotto Surgelato",
        items: [
            { name: "Caprese", price: "6,00", desc: "", ingredients: ["Fior di Latte", "Pomodorini", "Basilico"] },
            { name: "Crudaiola", price: "8,00", desc: "", ingredients: ["Fior di Latte", "Pomodorini", "Prosciutto Crudo", "Grana", "Rucola"] },
            { name: "Affumicata", price: "7,00", desc: "", ingredients: ["Fior di Latte", "Scamorza Affumicata", "Speck"] },
            { name: "Virginia", price: "9,00", desc: "", ingredients: ["Fior di Latte", "Porcini", "Salsa Tartufata", "Grana"] },
            { name: "Decanter", price: "9,00", desc: "", ingredients: ["Fior di Latte", "Angus", "Stracciatella", "Vincotto"] },
            { name: "Norvegese", price: "9,00", desc: "", ingredients: ["Fior di Latte", "Brie", "Salmone", "Fette di Limone"] },
            { name: "Salento", price: "8,00", desc: "", ingredients: ["Fior di Latte", "Pomodori Secchi", "Cacioricotta", "Rucola"] },
            { name: "Mortacchio", price: "9,00", desc: "", ingredients: ["Stracciatella", "Mortadella", "Granella di Pistacchio"] }
        ]
    },
    {
        id: "speciali",
        title: "PIZZE SPECIALI",
        disclaimer: "* Prodotto Surgelato",
        items: [
            { name: "Annamaria", price: "8,50", desc: "", ingredients: ["Pomodoro", "Fior di Latte", "Melanzane Fritte", "Salsiccia", "Caciocavallo"] },
            { name: "Torrino", price: "8,50", desc: "", ingredients: ["Pomodoro", "Fior di Latte", "Pancetta", "Funghi", "Gorgonzola", "Rucola"] },
            { name: "Martinese", price: "8,00", desc: "", ingredients: ["Pomodoro", "Stracciatella", "Capocollo", "Rucola"] },
            { name: "A modo mio *", price: "9,00", desc: "", ingredients: ["Pomodoro", "Fior di Latte", "Tocchetti di Spada", "Olive Nere", "Pinoli", "Uvetta Passa", "Melanzane Fritte"] },
            { name: "Gampola *", price: "9,00", desc: "", ingredients: ["Pomodoro", "Fior di Latte", "Gamberetti", "Pomodorini", "Rucola"] }
        ]
    },
    {
        id: "bevande",
        title: "BEVANDE",
        disclaimer: "",
        items: [
            { name: "Acqua Naturale/Frizzante", price: "2,00", desc: "" },
            { name: "Coca Cola", price: "3,00", desc: "" },
            { name: "Fanta", price: "3,00", desc: "" },
            { name: "Birra Artigianale", price: "3,00", desc: "" }
        ]
    },
    {
        id: "dolci",
        title: "DOLCI",
        disclaimer: "",
        items: [
            { name: "Tiramisu", price: "6,00", desc: "" },
            { name: "Panna Cotta", price: "5,50", desc: "" }
        ]
    }
];

// Funzione per ottenere i dati correnti
function getMenuData() {
    const storedData = localStorage.getItem('decanterMenuData');
    return storedData ? JSON.parse(storedData) : defaultMenuData;
}

// Funzione per salvare i dati (chiamata dalla Dashboard)
function saveMenuData(newData) {
    localStorage.setItem('decanterMenuData', JSON.stringify(newData));
}

// Funzione per resettare i dati originali
function resetMenuData() {
    localStorage.removeItem('decanterMenuData');
    return defaultMenuData;
}

// --- Gestione Impostazioni Globali ---
const defaultSettings = {
    restaurantName: "IL TUO LOCALE",
    subtitle: "Specialità e Qualità",
    primaryColor: "#333333", // Colore neutro iniziale
    logo: "img/logotrasp.png",
    backgroundImage: "", // Se vuoto usa quello di default dei CSS
    infoContatti: {
        address: "Via del Gusto, 1 - Città (Prov)",
        addressLink: "#",
        phones: ["+39 000 0000", ""],
        hours: [
            { day: "Lunedì - Sabato", time: "18:00 - 23:00" },
            { day: "Domenica", time: "12:00 - 15:00" }
        ],
        socials: {
            instagram: "@tuoaccount",
            instagramLink: "#",
            facebook: "Nome Pagina",
            facebookLink: "#"
        }
    }
};

function getSettings() {
    const stored = localStorage.getItem('decanterSettings');
    return stored ? JSON.parse(stored) : defaultSettings;
}

function saveSettings(settings) {
    localStorage.setItem('decanterSettings', JSON.stringify(settings));
}

function resetSettings() {
    localStorage.removeItem('decanterSettings');
    return defaultSettings;
}

/**
 * Applica il tema globale istantaneamente per evitare il flash dei vecchi colori.
 * Da chiamare nell'head delle pagine.
 */
function applyGlobalTheme() {
    const settings = getSettings();
    const color = settings.primaryColor || "#333333";
    const style = document.createElement('style');
    style.id = "dynamic-theme-head";
    style.innerHTML = `
        :root { --primary-color: ${color}; }
        body { opacity: 1 !important; visibility: visible !important; }
        h1, .subtitle, .modal-title, .info-block h3, .form-group label, .container h1, .subtitle-sm, .restaurant-name, .hours-day { color: var(--primary-color) !important; }
        .menu-btn, .btn-save, .btn-save-small, .btn-ing, .ing-option.selected, .btn-add-ing, .btn-allergen, .top-nav-btn, .hub-card, .save-header-btn, .btn-upload, .btn-add, .admin-btn { background-color: var(--primary-color) !important; }
        .category-section, .category-block { background-color: ${color}F2 !important; border-color: white !important; }
        .category-title, .hub-card, .item-name, .item-price, .item-description { color: white !important; }
        .hub-card:hover, .top-nav-btn:hover { background-color: white !important; color: var(--primary-color) !important; }
        .container { border-top: 5px solid var(--primary-color) !important; box-shadow: 0 8px 32px ${color}4D !important; }
        .admin-btn:hover, .close-btn, .image-modal-close { color: var(--primary-color) !important; }
        .allergen-badge { background-color: white !important; color: var(--primary-color) !important; }
        ${settings.backgroundImage ? `body::before, html, body { background-image: url('${settings.backgroundImage}') !important; background-size: cover !important; background-attachment: fixed !important; }` : ''}
    `;
    document.head.appendChild(style);
}