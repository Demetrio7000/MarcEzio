// Cuenta regresiva para el bautizo
document.addEventListener('DOMContentLoaded', function() {
    // Fecha del bautizo: 28 de Junio 2025 a las 2:30 pm
    const bautizoDate = new Date('June 28, 2025 14:30:00').getTime();
    
    // Actualizar la cuenta regresiva cada segundo
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
});