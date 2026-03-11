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