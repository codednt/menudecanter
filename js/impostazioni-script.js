let currentSettings = getSettings();

function initSettings() {
    // Popola i campi con i valori attuali
    document.getElementById('set-name').value = currentSettings.restaurantName || "";
    document.getElementById('set-subtitle').value = currentSettings.subtitle || "";
    document.getElementById('set-color').value = currentSettings.primaryColor || "#7f1734";
    document.getElementById('color-hex-label').innerText = currentSettings.primaryColor || "#7f1734";

    // Contatti
    const info = currentSettings.infoContatti;
    document.getElementById('set-addr').value = info.address;
    document.getElementById('set-addr-link').value = info.addressLink;
    document.getElementById('set-tel1').value = info.phones[0];
    document.getElementById('set-tel2').value = info.phones[1];
    document.getElementById('set-h1-day').value = info.hours[0].day;
    document.getElementById('set-h1-time').value = info.hours[0].time;
    document.getElementById('set-h2-day').value = info.hours[1].day;
    document.getElementById('set-h2-time').value = info.hours[1].time;
    document.getElementById('set-ig-name').value = info.socials.instagram;
    document.getElementById('set-ig-link').value = info.socials.instagramLink;
    document.getElementById('set-fb-name').value = info.socials.facebook;
    document.getElementById('set-fb-link').value = info.socials.facebookLink;
    
    // Carica anteprima Logo
    const lp = document.getElementById('logo-preview');
    if(currentSettings.logo) {
        lp.src = currentSettings.logo;
        lp.style.display = 'block';
    } else {
        lp.style.display = 'none';
    }
    
    // Carica anteprima Sfondo
    const bp = document.getElementById('bg-preview');
    if(currentSettings.backgroundImage) {
        bp.src = currentSettings.backgroundImage;
        bp.style.display = 'block';
    } else {
        bp.style.display = 'none';
    }

    // Aggiorna l'etichetta HEX in tempo reale quando si cambia il colore
    document.getElementById('set-color').oninput = function() {
        document.getElementById('color-hex-label').innerText = this.value;
    };
}

window.previewImage = function(input, previewId) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const dataUrl = e.target.result;
            const preview = document.getElementById(previewId);
            preview.src = dataUrl;
            preview.style.display = 'block';
            
            // Memorizza temporaneamente nell'oggetto corrente
            if(previewId === 'logo-preview') currentSettings.logo = dataUrl;
            if(previewId === 'bg-preview') currentSettings.backgroundImage = dataUrl;
        };
        reader.readAsDataURL(file);
    }
};

window.saveAllSettings = function() {
    // Raccoglie i valori dai campi di testo
    currentSettings.restaurantName = document.getElementById('set-name').value;
    currentSettings.subtitle = document.getElementById('set-subtitle').value;
    currentSettings.primaryColor = document.getElementById('set-color').value;

    // Raccoglie Contatti
    currentSettings.infoContatti = {
        address: document.getElementById('set-addr').value,
        addressLink: document.getElementById('set-addr-link').value,
        phones: [document.getElementById('set-tel1').value, document.getElementById('set-tel2').value],
        hours: [
            { day: document.getElementById('set-h1-day').value, time: document.getElementById('set-h1-time').value },
            { day: document.getElementById('set-h2-day').value, time: document.getElementById('set-h2-time').value }
        ],
        socials: {
            instagram: document.getElementById('set-ig-name').value,
            instagramLink: document.getElementById('set-ig-link').value,
            facebook: document.getElementById('set-fb-name').value,
            facebookLink: document.getElementById('set-fb-link').value
        }
    };
    
    // Salva tramite la funzione definita in menu-data.js
    saveSettings(currentSettings);
    
    // Mostra notifica di successo
    const notif = document.getElementById('notification');
    if(notif) {
        notif.style.display = 'block';
        setTimeout(() => { notif.style.display = 'none'; }, 3000);
    }
};

window.resetToDefaults = function() {
    if(confirm("Vuoi davvero ripristinare le impostazioni grafiche originali?")) {
        currentSettings = resetSettings();
        initSettings();
        alert("Impostazioni ripristinate correttamente!");
    }
};

// Controllo Accesso e Inizializzazione
if (sessionStorage.getItem('auth_token') !== 'admin_logged') {
    window.location.href = 'dashboard.html';
} else {
    initSettings();
}