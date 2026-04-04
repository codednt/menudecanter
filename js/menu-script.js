const body = document.body;

// 0. Applica Impostazioni Globali
const settings = getSettings();

// Aggiorna Titoli
const headerH1 = document.querySelector('.header h1');
const restaurantNameText = document.querySelector('.header .restaurant-name');
const subtitleText = document.querySelector('.header .subtitle-sm');
const bottomLogo = document.querySelector('.bottom-logo');

if(headerH1) headerH1.innerText = "MENÙ"; // Titolo fisso o personalizzabile
if(restaurantNameText) restaurantNameText.innerText = settings.restaurantName;
if(subtitleText) subtitleText.innerText = settings.subtitle;
if(bottomLogo && settings.logo) bottomLogo.src = settings.logo;

// Applica Colore Primario e Sfondo tramite CSS dinamico
const dynamicStyle = document.createElement('style');
dynamicStyle.innerHTML = `
    :root { --primary-color: ${settings.primaryColor}; }
    .category-section { background: ${settings.primaryColor}F2 !important; border-color: white !important; } 
    .category-title { color: white !important; }
    .allergen-badge { background: white !important; color: var(--primary-color) !important; }
    .image-modal-close { color: white !important; text-shadow: 0 0 10px var(--primary-color); }
    ${settings.backgroundImage ? `body::before, html { background-image: url('${settings.backgroundImage}') !important; }` : ''}
`;
document.head.appendChild(dynamicStyle);

// 1. Carica i dati e Genera l'HTML
const menuData = getMenuData();
const menuContainer = document.getElementById('dynamic-menu-content');

menuData.forEach(category => {
    const section = document.createElement('div');
    section.className = 'category-section';
    
    let itemsHtml = '';
    
    // Aggiungi disclaimer se presente
    if (category.disclaimer) {
        itemsHtml += `<div class="pizza-disclaimer">${category.disclaimer}</div>`;
    }
    
    // Genera items
    category.items.forEach(item => {
        // Logica di visualizzazione descrizione:
        // Se c'è una descrizione manuale, usa quella. Altrimenti usa la lista ingredienti.
        
        let finalIngredientsString = '';
        if (item.ingredients && item.ingredients.length > 0) {
            // Ordina ingredienti per priorità
            const sortedIngredients = [...item.ingredients].sort((a, b) => {
                const priority = ["Pomodoro", "Fior di Latte"];
                const idxA = priority.indexOf(a);
                const idxB = priority.indexOf(b);
                if (idxA !== -1 && idxB !== -1) return idxA - idxB;
                if (idxA !== -1) return -1;
                if (idxB !== -1) return 1;
                return 0;
            });
            finalIngredientsString = sortedIngredients.join(', ');
        }

        const descriptionText = (item.desc && item.desc.trim() !== "") 
            ? item.desc 
            : finalIngredientsString;

        // Gestione Asterisco Surgelato
        let cleanName = item.name.replace(/\s*\*\s*$/, '');
        const displayName = item.isFrozen ? `${cleanName} *` : cleanName;

        // Gestione Nota Allergeni
        const allergenNote = (item.showAllergens && item.allergens && item.allergens.length > 0)
            ? `<div class="item-description" style="font-size: 0.75em; color: #ffc107;">Allergeni: ${item.allergens.join(', ')}</div>`
            : '';

        const imageHtml = item.image ? `<img src="${item.image}" alt="${item.name}" class="menu-item-image" onclick="event.stopPropagation(); openImageModal(this.src)">` : '';
        const hasImageClass = item.image ? 'has-image' : '';

        itemsHtml += `
        <div class="menu-item ${hasImageClass}">
            ${imageHtml}
            <div class="item-content">
                <div class="item-header">
                    <div class="item-name">${displayName}</div>
                    <div class="item-price">€ ${item.price}</div>
                </div>
                ${descriptionText ? `<div class="item-description">${descriptionText}</div>` : ''}
                ${allergenNote}
            </div>
        </div>`;
    });

    section.innerHTML = `
        <div class="category-title">
            ${category.title}
            <span class="category-toggle">▼</span>
        </div>
        <div class="category-items">
            ${itemsHtml}
        </div>
    `;
    
    menuContainer.appendChild(section);
});

// --- Logica Modale Immagine ---
// Crea il modale se non esiste nel DOM
if (!document.getElementById('imageModal')) {
    const modalHTML = `
        <div id="imageModal" class="image-modal">
            <span class="image-modal-close">&times;</span>
            <img class="image-modal-content" id="modalImage">
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

const imageModal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const closeBtn = document.querySelector('.image-modal-close');

window.openImageModal = function(src) {
    imageModal.style.display = "flex";
    modalImg.src = src;
}

closeBtn.onclick = function() { imageModal.style.display = "none"; }

// Chiudi cliccando fuori dall'immagine
imageModal.onclick = function(event) {
    if (event.target == imageModal) {
        imageModal.style.display = "none";
    }
}

// 2. Logica Accordion (ora collegata agli elementi appena creati)
const categorySections = document.querySelectorAll('.category-section');

function checkScrollability() {
    const hasActiveSection = document.querySelector('.category-section.active');
    
    if (hasActiveSection) {
        body.classList.add('scrollable');
    } else {
        body.classList.remove('scrollable');
        // Riporta la pagina all'inizio quando tutti i riquadri sono chiusi
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

categorySections.forEach(section => {
    section.addEventListener('click', function() {
        const wasActive = this.classList.contains('active');
        this.classList.toggle('active');
        checkScrollability();
        
        // Se il riquadro è stato appena aperto, scrolla per visualizzarlo completamente portandolo in alto
        if (!wasActive && this.classList.contains('active')) {
            setTimeout(() => {
                this.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        } 
        // Se il riquadro è stato appena chiuso, cerca se c'è un altro riquadro ancora aperto
        else if (wasActive && !this.classList.contains('active')) {
            setTimeout(() => {
                // Trova tutti i riquadri ancora aperti
                const activeSections = document.querySelectorAll('.category-section.active');
                if (activeSections.length > 0) {
                    // Scrolla verso l'ultimo riquadro aperto (quello più in basso)
                    const lastActive = activeSections[activeSections.length - 1];
                    lastActive.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }
    });
});