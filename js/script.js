let currentMusic = null;

// Animación del header al hacer scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('header-scroll');
    } else {
        header.classList.remove('header-scroll');
    }
});

// Configurar animaciones para los iconos sociales
document.addEventListener('DOMContentLoaded', function() {
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach((link, index) => {
        link.style.setProperty('--i', index);
    });

    // Cargar header y footer
    loadHeaderAndFooter();
});

// Función para cargar header y footer
function loadHeaderAndFooter() {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
            initializeMusic();
            setupHeaderNavigation();
        })
        .catch(error => console.error('Error loading header:', error));

    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
}

// Configurar navegación del header
function setupHeaderNavigation() {
    const navLinks = document.querySelectorAll('.header-right a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Detener música si estamos saliendo de una página con música
            const music = document.getElementById('backgroundMusic');
            if (music && !music.paused) {
                music.pause();
                localStorage.setItem('musicState', 'paused');
            }
        });
    });
}

// Inicializar sistema de música
function initializeMusic() {
    const music = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');
    const musicStatus = document.getElementById('musicStatus');
    
    if (!music || !musicToggle || !musicStatus) return;

    // Detener la música actual si está sonando
    if (currentMusic && !currentMusic.paused) {
        currentMusic.pause();
    }
    currentMusic = music;

    // Configurar música según la página
    const path = window.location.pathname;
    let musicFile = 'intro.mp3'; // Default
    
    if (path.includes('padrinos')) musicFile = 'padrino.mp3';
    else if (path.includes('padres')) musicFile = 'padre.mp3';
    else if (path.includes('fecha')) musicFile = 'fecha.mp3';
    else if (path.includes('invitacion')) musicFile = 'intro.mp3';
    else if (path.includes('mi-bautizo')) {
        // No reproducir música en mi-bautizo (tiene su propio video)
        return;
    }

    // Configurar la nueva música
    music.src = `musica/${musicFile}`;
    music.volume = 0.3;
    music.loop = true;
    document.getElementById('musicControls').style.display = 'flex';

    // Siempre intentar reproducir la música
    const tryPlay = () => {
        music.play()
            .then(() => {
                musicStatus.textContent = 'Pausar';
                localStorage.setItem('musicState', 'playing');
            })
            .catch(e => {
                console.log("Autoplay bloqueado:", e);
                showMobilePlayMessage(music, musicStatus);
            });
    };
    
    // Pequeño retraso para asegurar la carga
    setTimeout(tryPlay, 300);

    // Configurar el controlador del botón
    musicToggle.addEventListener('click', function() {
        toggleMusic(music, musicStatus);
    });
}

// Función para alternar play/pause
function toggleMusic(music, musicStatus) {
    if (music.paused) {
        music.play()
            .then(() => {
                musicStatus.textContent = 'Pausar';
                localStorage.setItem('musicState', 'playing');
            })
            .catch(e => {
                console.log("Error al reproducir:", e);
                showMobilePlayMessage(music, musicStatus);
            });
    } else {
        music.pause();
        musicStatus.textContent = 'Reproducir';
        localStorage.setItem('musicState', 'paused');
    }
}

// Mostrar mensaje para móviles
function showMobilePlayMessage(music, musicStatus) {
    // Si ya hay un mensaje, no hacer nada
    if (document.getElementById('music-activation-message')) return;
    
    const msg = document.createElement('div');
    msg.id = 'music-activation-message';
    msg.style.position = 'fixed';
    msg.style.bottom = '20px';
    msg.style.left = '0';
    msg.style.right = '0';
    msg.style.backgroundColor = '#FFB703';
    msg.style.color = '#023047';
    msg.style.padding = '10px';
    msg.style.textAlign = 'center';
    msg.style.zIndex = '10000';
    msg.style.borderRadius = '5px';
    msg.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    msg.textContent = 'Toca en cualquier parte para activar la música';
    document.body.appendChild(msg);

    const activateMusic = () => {
        music.play()
            .then(() => {
                musicStatus.textContent = 'Pausar';
                localStorage.setItem('musicState', 'playing');
                msg.remove();
            })
            .catch(e => console.log("Error al activar:", e));
    };

    // Eliminar el mensaje después de 10 segundos si no se interactúa
    setTimeout(() => {
        if (document.getElementById('music-activation-message')) {
            msg.remove();
        }
    }, 10000);

    document.addEventListener('click', activateMusic, { once: true });
}

// Manejar cambios de página
window.addEventListener('beforeunload', function() {
    const music = document.getElementById('backgroundMusic');
    if (music) {
        localStorage.setItem('musicState', music.paused ? 'paused' : 'playing');
    }
});

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    // Cargar header y footer
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
            initializeMusic();
        });

    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        });
});

// Cuenta regresiva para el bautizo
const bautizoDate = new Date('June 28, 2025 14:30:00').getTime();
const countdown = setInterval(function() {
    const now = new Date().getTime();
    const distance = bautizoDate - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        countdownElement.innerHTML = `
            <div><span>${days}</span><br>Días</div>
            <div><span>${hours}</span><br>Horas</div>
            <div><span>${minutes}</span><br>Minutos</div>
            <div><span>${seconds}</span><br>Segundos</div>
        `;
    }
    
    if (distance < 0) {
        clearInterval(countdown);
        if (countdownElement) {
            countdownElement.innerHTML = "¡El bautizo ha comenzado!";
        }
    }
}, 1000);