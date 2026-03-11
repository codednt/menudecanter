const body = document.body;

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

        const imageHtml = item.image ? `<img src="${item.image}" alt="${item.name}" class="menu-item-image">` : '';
        const hasImageClass = item.image ? 'has-image' : '';

        itemsHtml += `
        <div class="menu-item ${hasImageClass}">
            ${imageHtml}
            <div class="item-content">
                <div class="item-header">
                    <div class="item-name">${item.name}</div>
                    <div class="item-price">€ ${item.price}</div>
                </div>
                ${descriptionText ? `<div class="item-description">${descriptionText}</div>` : ''}
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