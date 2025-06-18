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
});

// Incluir aquí también el código del countdown.js anterior
// Cuenta regresiva para el bautizo
const bautizoDate = new Date('June 28, 2025 14:30:00').getTime();
    
const countdown = setInterval(function() {
    const now = new Date().getTime();
    const distance = bautizoDate - now;
    
    // Cálculos de tiempo
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Mostrar el resultado
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        countdownElement.innerHTML = `
            <div><span>${days}</span><br>Días</div>
            <div><span>${hours}</span><br>Horas</div>
            <div><span>${minutes}</span><br>Minutos</div>
            <div><span>${seconds}</span><br>Segundos</div>
        `;
    }
    
    // Si la cuenta regresiva termina
    if (distance < 0) {
        clearInterval(countdown);
        if (countdownElement) {
            countdownElement.innerHTML = "¡El bautizo ha comenzado!";
        }
    }
}, 1000);