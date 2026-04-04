// 0. Applica Impostazioni Globali sulla Index
const settings = (typeof getSettings === 'function') ? getSettings() : null;

if (settings) {
    // Aggiorna Testi e Colori
    const h1 = document.querySelector('.container h1');
    const subtitle = document.querySelector('.subtitle');
    const bottomLogo = document.querySelector('.bottom-logo');
    
    if (h1) h1.innerText = settings.restaurantName;
    if (subtitle) subtitle.innerText = settings.subtitle;
    if (bottomLogo && settings.logo) bottomLogo.src = settings.logo;

    // Popola il Modal Info & Contatti
    const info = settings.infoContatti;
    const modalContent = document.querySelector('.modal-content');
    if (modalContent && info) {
        modalContent.innerHTML = `
            <button class="close-btn" onclick="closeModal()">&times;</button>
            <div class="modal-header"><div class="modal-title">INFO & CONTATTI</div></div>
            <div class="info-block">
                <h3>📍 Dove Siamo</h3>
                <p><a href="${info.addressLink}" target="_blank">${info.address}</a></p>
            </div>
            <div class="info-block">
                <h3>📞 Telefono</h3>
                ${info.phones.map(p => p ? `<p>Tel: <a href="tel:${p}">${p}</a></p>` : '').join('')}
                <p>Per Info & Prenotazioni</p>
            </div>
            <div class="info-block">
                <h3>🕐 Orari di Apertura</h3>
                ${info.hours.map(h => `<div class="hours-item"><span class="hours-day">${h.day}</span><span>${h.time}</span></div>`).join('')}
            </div>
            <div class="info-block">
                <h3>📱 Social</h3>
                <p>Instagram: <a href="${info.socials.instagramLink}" target="_blank">${info.socials.instagram}</a></p>
                <p>Facebook: <a href="${info.socials.facebookLink}" target="_blank">${info.socials.facebook}</a></p>
            </div>`;
    }
}

function openModal() {
    document.getElementById('infoModal').classList.add('active');
    history.pushState({modal: true}, null, "#info");
}

function closeModal() {
    if (window.location.hash === '#info') {
        history.back();
    } else {
        document.getElementById('infoModal').classList.remove('active');
    }
}

window.addEventListener('popstate', function() {
    document.getElementById('infoModal').classList.remove('active');
});

// Chiudi il modal cliccando fuori dal contenuto
document.getElementById('infoModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Chiudi il modal con il tasto ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});