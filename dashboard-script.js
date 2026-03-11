// Richiedi password semplice all'avvio (Opzionale - rimuovi se non serve)
const password = prompt("Inserisci password amministratore:");
if (password !== "admin") { // Puoi cambiare 'admin' con la tua password
    document.body.innerHTML = "<div style='text-align:center; padding:50px;'><h2>Accesso Negato</h2><a href='index.html'>Torna alla Home</a></div>";
    throw new Error("Accesso negato");
}

// Carica i dati correnti
let currentMenu = getMenuData();
const editorArea = document.getElementById('editor-area');

// Database Ingredienti Comuni
const commonIngredients = [
    "Pomodoro", "Fior di Latte", "Mozzarella di Bufala", "Basilico", "Olio EVO", "Aglio", "Origano",
    "Acciughe", "Capperi", "Olive", "Prosciutto Cotto", "Prosciutto Crudo", "Salame Piccante",
    "Salsiccia", "Würstel", "Speck", "Pancetta", "Funghi", "Carciofi", "Melanzane", "Zucchine",
    "Peperoni", "Patatine", "Rucola", "Grana", "Scamorza", "Gorgonzola", "Stracciatella",
    "Tonno", "Cipolla", "Burrata", "Pistacchio", "Mortadella", "Noci", "Miele"
].sort();

function renderEditor() {
    editorArea.innerHTML = '';

    currentMenu.forEach((category, catIndex) => {
        // Crea blocco categoria
        const catBlock = document.createElement('div');
        catBlock.className = 'category-block';
        catBlock.setAttribute('draggable', true);
        catBlock.setAttribute('data-cat-index', catIndex);
        catBlock.setAttribute('data-cat-id', category.id);

        // Header Categoria (Cliccabile)
        const header = document.createElement('div');
        header.className = 'category-header';
        header.innerHTML = `<span class="drag-handle">☰</span> ${category.title} <span>▼</span>`;
        header.onclick = (e) => {
            if (e.target.classList.contains('drag-handle')) return; // Non aprire se si trascina
            catBlock.classList.toggle('active');
        };

        // Contenuto Categoria
        const content = document.createElement('div');
        content.className = 'category-content';

        // Lista Piatti
        let itemsHtml = `
            <div class="category-controls">
                <button class="btn btn-edit-cat" onclick="editCategory(${catIndex})">MODIFICA NOME SEZIONE</button>
                <button class="btn btn-delete-cat" onclick="deleteCategory(${catIndex})">ELIMINA SEZIONE</button>
            </div>
        `;

        category.items.forEach((item, itemIndex) => {
            // Logica ordinamento ingredienti (Priorità a Pomodoro e Fior di Latte)
            let sortedIngs = [];
            if (item.ingredients && item.ingredients.length > 0) {
                sortedIngs = [...item.ingredients].sort((a, b) => {
                    const priority = ["Pomodoro", "Fior di Latte"];
                    const idxA = priority.indexOf(a);
                    const idxB = priority.indexOf(b);
                    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
                    if (idxA !== -1) return -1;
                    if (idxB !== -1) return 1;
                    return 0; // Mantiene l'ordine alfabetico originale per gli altri
                });
            }

            const ingList = sortedIngs.length > 0 
                ? sortedIngs.map(i => `<span class="ing-badge">${i}</span>`).join('') 
                : '<span style="opacity:0.5;">Nessun ingrediente selezionato</span>';

            itemsHtml += `
                <div class="item-row" draggable="true" data-cat-index="${catIndex}" data-item-index="${itemIndex}">
                    <span class="drag-handle">☰</span>
                    <div class="form-group col-name">
                        <label>Nome Piatto</label>
                        <input type="text" value="${item.name}" onchange="updateItem(${catIndex}, ${itemIndex}, 'name', this.value)">
                    </div>
                    
                    <div class="form-group col-price">
                        <label>Prezzo (€)</label>
                        <input type="text" value="${item.price}" onchange="updateItem(${catIndex}, ${itemIndex}, 'price', this.value)">
                    </div>

                    <div class="form-group col-desc">
                        <label>Ingredienti</label>
                        <div class="ingredients-preview">
                            <button class="btn btn-ing" onclick="openIngredientModal(${catIndex}, ${itemIndex})">✏️ Modifica Ingredienti</button>
                            <div style="margin-top:5px;">${ingList}</div>
                        </div>

                        <label class="label-optional">Descrizione (Opzionale)</label>
                        <input type="text" value="${item.desc || ''}" placeholder="Sovrascrive la lista ingredienti automatica" onchange="updateItem(${catIndex}, ${itemIndex}, 'desc', this.value)">

                        <label class="label-optional">Immagine (URL)</label>
                        <input type="text" value="${item.image || ''}" placeholder="https://esempio.com/foto.jpg" onchange="updateItem(${catIndex}, ${itemIndex}, 'image', this.value); const preview = this.nextElementSibling; preview.src = this.value; preview.style.display = this.value ? 'block' : 'none';">
                        <img src="${item.image || ''}" class="item-image-preview" style="display: ${item.image ? 'block' : 'none'};" alt="Anteprima" onerror="this.style.display='none'">
                    </div>

                    <div class="actions-group">
                        <button class="btn btn-save-small" onclick="saveAll()">Salva</button>
                        <button class="btn btn-delete" onclick="deleteItem(${catIndex}, ${itemIndex})">Elimina</button>
                    </div>
                </div>
            `;
        });

        // Bottone Aggiungi Piatto
        itemsHtml += `<button class="btn btn-add" onclick="addItem(${catIndex})">+ Aggiungi Piatto a ${category.title}</button>`;

        content.innerHTML = itemsHtml;
        
        catBlock.appendChild(header);
        catBlock.appendChild(content);
        editorArea.appendChild(catBlock);
    });
}

// Funzioni di Logica
window.updateItem = function(catIndex, itemIndex, field, value) {
    currentMenu[catIndex].items[itemIndex][field] = value;
};

window.addCategory = function() {
    const title = prompt("Inserisci il nome della nuova categoria:");
    if (title && title.trim() !== "") {
        const newCategory = {
            id: title.trim().toLowerCase().replace(/\s+/g, '-'),
            title: title.trim().toUpperCase(),
            disclaimer: "",
            items: []
        };
        currentMenu.push(newCategory);
        renderEditor();
    }
};

window.editCategory = function(catIndex) {
    const newTitle = prompt("Inserisci il nuovo nome per la sezione:", currentMenu[catIndex].title);
    if (newTitle && newTitle.trim() !== "") {
        currentMenu[catIndex].title = newTitle.trim().toUpperCase();
        renderEditor();
        // Riapri la categoria per mostrare la modifica
        setTimeout(() => {
            document.querySelectorAll('.category-block')[catIndex].classList.add('active');
        }, 50);
    }
};

window.deleteCategory = function(catIndex) {
    if (confirm(`Sei sicuro di voler ELIMINARE l'intera sezione "${currentMenu[catIndex].title}" e tutti i piatti contenuti?\nQuesta azione non può essere annullata.`)) {
        currentMenu.splice(catIndex, 1);
        renderEditor();
    }
};

window.addItem = function(catIndex) {
    currentMenu[catIndex].items.push({
        name: "Nuovo Piatto",
        price: "0,00",
        desc: "",
        ingredients: [],
        image: ""
    });
    renderEditor();
    // Riapri la categoria appena modificata
    setTimeout(() => {
        document.querySelectorAll('.category-block')[catIndex].classList.add('active');
    }, 50);
};

window.deleteItem = function(catIndex, itemIndex) {
    if(confirm("Sei sicuro di voler eliminare questo piatto?")) {
        currentMenu[catIndex].items.splice(itemIndex, 1);
        renderEditor();
        setTimeout(() => {
            document.querySelectorAll('.category-block')[catIndex].classList.add('active');
        }, 50);
    }
};

window.saveAll = function() {
    saveMenuData(currentMenu);
    const notif = document.getElementById('notification');
    notif.style.display = 'block';
    setTimeout(() => { notif.style.display = 'none'; }, 3000);
};

window.resetDefaults = function() {
    if(confirm("Attenzione: Questo cancellerà tutte le tue modifiche e riporterà il menu allo stato originale. Continuare?")) {
        currentMenu = resetMenuData();
        renderEditor();
        alert("Menu ripristinato!");
    }
};

// --- Nuove Funzioni Gestione Ingredienti ---

let editingItem = { cat: null, idx: null };

function renderIngredientGrid(currentIngredients = []) {
    const grid = document.getElementById('ingredients-grid');
    grid.innerHTML = '';

    commonIngredients.forEach(ing => {
        const div = document.createElement('div');
        div.className = 'ing-option';
        div.innerText = ing;
        if (currentIngredients.includes(ing)) { div.classList.add('selected'); }
        div.onclick = function() {
            this.classList.toggle('selected');
        };
        grid.appendChild(div);
    });
}

window.openIngredientModal = function(catIndex, itemIndex) {
    editingItem = { cat: catIndex, idx: itemIndex };
    const item = currentMenu[catIndex].items[itemIndex];
    
    renderIngredientGrid(item.ingredients || []);
    document.getElementById('ingredientModal').style.display = 'block';
};

window.closeIngredientModal = function() {
    document.getElementById('ingredientModal').style.display = 'none';
};

window.applyIngredients = function() {
    const selectedDivs = document.querySelectorAll('.ing-option.selected');
    const newIngredients = Array.from(selectedDivs).map(div => div.innerText);
    
    // Aggiorna l'array ingredienti
    currentMenu[editingItem.cat].items[editingItem.idx].ingredients = newIngredients;
    
    // OPZIONALE: Se la descrizione è vuota, potremmo forzarla vuota per attivare l'automatico
    // ma lasciamo la libertà all'utente.
    
    closeIngredientModal();
    renderEditor();
    
    // Riapri categoria
    setTimeout(() => {
        document.querySelectorAll('.category-block')[editingItem.cat].classList.add('active');
    }, 50);
};

window.addNewIngredient = function() {
    const input = document.getElementById('new-ingredient-input');
    let newIng = input.value.trim();
    if (!newIng) {
        alert("Il nome dell'ingrediente non può essere vuoto.");
        return;
    }

    // Formattazione: Prima lettera maiuscola, resto minuscolo
    newIng = newIng.charAt(0).toUpperCase() + newIng.slice(1).toLowerCase();

    // Controlla duplicati (case-insensitive)
    const exists = commonIngredients.some(ing => ing.toLowerCase() === newIng.toLowerCase());
    if (exists) {
        alert(`L'ingrediente "${newIng}" esiste già.`);
        return;
    }

    // Aggiungi e riordina
    commonIngredients.push(newIng);
    commonIngredients.sort();

    input.value = '';

    // Aggiorna la griglia mantenendo gli ingredienti già selezionati
    const currentlySelected = Array.from(document.querySelectorAll('#ingredients-grid .ing-option.selected')).map(el => el.innerText);
    renderIngredientGrid(currentlySelected);
};

// Avvio iniziale
renderEditor();

// --- Logica Drag & Drop ---

const editor = document.getElementById('editor-area');
let draggedElement = null;

function removeDropIndicators() {
    document.querySelectorAll('.drop-indicator-before, .drop-indicator-after').forEach(el => {
        el.classList.remove('drop-indicator-before', 'drop-indicator-after');
    });
}

editor.addEventListener('dragstart', e => {
    draggedElement = e.target.closest('[draggable="true"]');
    if (draggedElement) {
        e.dataTransfer.effectAllowed = 'move';
        setTimeout(() => {
            draggedElement.classList.add('dragging');
        }, 0);
    }
});

editor.addEventListener('dragend', e => {
    if (draggedElement) {
        draggedElement.classList.remove('dragging');
    }
    removeDropIndicators();
    draggedElement = null;
});

editor.addEventListener('dragover', e => {
    e.preventDefault();
    const target = e.target.closest('[draggable="true"]');
    
    if (target && draggedElement && target !== draggedElement) {
        const isDraggedCategory = draggedElement.classList.contains('category-block');
        const isTargetCategory = target.classList.contains('category-block');
        
        // Permetti drop solo tra elementi dello stesso tipo (categoria con categoria, item con item)
        if (isDraggedCategory !== isTargetCategory) return;

        // Se si sta trascinando un piatto, permetti il drop solo nella sua categoria di origine
        if (!isDraggedCategory) {
            if (draggedElement.dataset.catIndex !== target.dataset.catIndex) {
                removeDropIndicators();
                return;
            }
        }

        removeDropIndicators();

        const rect = target.getBoundingClientRect();
        const isAfter = (e.clientY - rect.top) > (rect.height / 2);
        
        target.classList.add(isAfter ? 'drop-indicator-after' : 'drop-indicator-before');
    }
});

editor.addEventListener('dragleave', e => {
    const related = e.relatedTarget;
    // Rimuovi l'indicatore solo se si esce dall'area dell'editor
    if (!editor.contains(related)) {
        removeDropIndicators();
    }
});

editor.addEventListener('drop', e => {
    e.preventDefault();
    if (!draggedElement) return;

    // Salva gli ID delle categorie aperte prima di modificare il DOM/dati
    const openCategoryIds = new Set();
    document.querySelectorAll('.category-block.active').forEach(block => {
        if (block.dataset.catId) {
            openCategoryIds.add(block.dataset.catId);
        }
    });

    const targetElement = document.querySelector('.drop-indicator-before, .drop-indicator-after');
    if (!targetElement) { removeDropIndicators(); return; }

    const isCategoryDrag = draggedElement.classList.contains('category-block');
    const isAfter = targetElement.classList.contains('drop-indicator-after');

    if (isCategoryDrag) {
        const fromIndex = parseInt(draggedElement.dataset.catIndex, 10);
        let toIndex = parseInt(targetElement.dataset.catIndex, 10);
        if (fromIndex < toIndex && !isAfter) toIndex--;
        if (fromIndex > toIndex && isAfter) toIndex++;
        
        const [movedCategory] = currentMenu.splice(fromIndex, 1);
        currentMenu.splice(toIndex, 0, movedCategory);
    } else {
        const catIndex = parseInt(draggedElement.dataset.catIndex, 10);
        const fromIndex = parseInt(draggedElement.dataset.itemIndex, 10);
        let toIndex = parseInt(targetElement.dataset.itemIndex, 10);
        if (fromIndex < toIndex && !isAfter) toIndex--;
        if (fromIndex > toIndex && isAfter) toIndex++;

        const [movedItem] = currentMenu[catIndex].items.splice(fromIndex, 1);
        currentMenu[catIndex].items.splice(toIndex, 0, movedItem);
    }

    renderEditor();

    // Riapri le categorie che erano aperte
    openCategoryIds.forEach(id => {
        const blockToReopen = document.querySelector(`.category-block[data-cat-id="${id}"]`);
        if (blockToReopen) {
            blockToReopen.classList.add('active');
        }
    });
});