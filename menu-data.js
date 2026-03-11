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
            { name: "Marinara", price: "3,50", desc: "Pomodoro, Aglio, Prezzemolo" },
            { name: "Margherita", price: "4,50", desc: "Pomodoro, Fior di Latte" },
            { name: "Diavola", price: "6,00", desc: "Pomodoro, Fior di Latte, Salamino Piccante" },
            { name: "Napoli", price: "6,00", desc: "Pomodoro, Fior di Latte, Acciughe, Capperi, Origano" },
            { name: "Capricciosa", price: "7,50", desc: "Pomodoro, Fior di Latte, Carciofi, Funghi, Cotto, Olive" },
            { name: "Quattro Formaggi", price: "7,50", desc: "Pomodoro, Fior di Latte, Svizzero, Scamorza, Gorgonzola" },
            { name: "Tonno e Cipolla", price: "6,50", desc: "Pomodoro, Fior di Latte, Tonno, Cipolla" },
            { name: "Peppa Pig *", price: "7,00", desc: "Pomodoro, Fior di Latte, Würstel, Patatine" },
            { name: "Crudo e Panna", price: "7,00", desc: "Pomodoro, Fior di Latte, Crudo, Panna" },
            { name: "Crudo e Patatine", price: "7,50", desc: "Pomodoro, Fior di Latte, Crudo, Patatine" },
            { name: "Salsiccia", price: "6,50", desc: "Pomodoro, Fior di Latte, Salsiccia" },
            { name: "Salsiccia e Patatine", price: "7,50", desc: "Pomodoro, Fior di Latte, Salsiccia, Patatine" },
            { name: "Diavola e Patatine", price: "7,00", desc: "Pomodoro, Fior di Latte, Diavola, Patatine" },
            { name: "Contadina", price: "7,50", desc: "Pomodoro, Fior di Latte, Melanzane, Zucchine, Peperoni" },
            { name: "Regina", price: "7,50", desc: "Pomodoro, Mozzarella di Bufala, Basilico" },
            { name: "Frutti di Mare *", price: "9,00", desc: "Pomodoro, Fior di Latte, Cozze, Gamberi, Calamari" },
            { name: "Mare e Monti *", price: "9,00", desc: "Pomodoro, Fior di Latte, Gamberi, Porcini" },
            { name: "Crudo più", price: "8,00", desc: "Pomodoro, Fior di Latte, Crudo, Grana, Rucola" }
        ]
    },
    {
        id: "bianche",
        title: "PIZZE BIANCHE",
        disclaimer: "* Prodotto Surgelato",
        items: [
            { name: "Caprese", price: "6,00", desc: "Fior di Latte, Pomodorini, Basilico" },
            { name: "Crudaiola", price: "8,00", desc: "Fior di Latte, Pomodorini, Crudo, Grana, Rucola" },
            { name: "Affumicata", price: "7,00", desc: "Fior di Latte, Scamorza Affumicata, Speck" },
            { name: "Virginia", price: "9,00", desc: "Fior di Latte, Porcini, Salsa Tartufata, Grana" },
            { name: "Decanter", price: "9,00", desc: "Fior di Latte, Angus, Stracciatella, Vincotto" },
            { name: "Norvegese", price: "9,00", desc: "Fior di Latte, Brie, Salmone, Fette di Limone" },
            { name: "Salento", price: "8,00", desc: "Fior di Latte, Pomodori Secchi, Cacioricotta, Rucola" },
            { name: "Mortacchio", price: "9,00", desc: "Stracciatella, Mortadella, Granella di Pistacchio" }
        ]
    },
    {
        id: "speciali",
        title: "PIZZE SPECIALI",
        disclaimer: "* Prodotto Surgelato",
        items: [
            { name: "Annamaria", price: "8,50", desc: "Pomodoro, Fior di Latte, Melanzane Fritte, Salsiccia, Caciocavallo" },
            { name: "Torrino", price: "8,50", desc: "Pomodoro, Fior di Latte, Pancetta, Funghi, Gorgonzola, Rucola" },
            { name: "Martinese", price: "8,00", desc: "Pomodoro, Stracciatella, Capocollo, Rucola" },
            { name: "A modo mio *", price: "9,00", desc: "Pomodoro, Fior di Latte, Tocchetti di Spada, Olive Nere, Pinoli, Uvetta Passa, Melanzane Fritte" },
            { name: "Gampola *", price: "9,00", desc: "Pomodoro, Fior di Latte, Gamberetti, Pomodorini, Rucola" }
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