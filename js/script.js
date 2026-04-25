// MANEJO DEL FORMULARIO DE CONTACTO

const $form = document.querySelector('#miFormulario');
const $button = document.querySelector('#enviar-btn');

// Escucha el envío del formulario y lo procesa con fetch (sin recargar la página)
if ($form && $button) {
    $form.addEventListener('submit', async (e) => {
        e.preventDefault();
        $button.innerText = "Enviando...";
        $button.disabled = true;

        const form = new FormData($form);
        const response = await fetch($form.action, {
            method: $form.method,
            body: form,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            $form.reset();
            // Limpia también el localStorage al enviar exitosamente
            document.querySelectorAll('input, textarea').forEach(input => {
                localStorage.removeItem(input.id);
            });
            alert('¡Gracias por contactarme! Te responderé pronto.');
        } else {
            alert('Ups, hubo un error al enviar. Inténtalo de nuevo.');
        }

        $button.innerText = "Enviar mensaje";
        $button.disabled = false;
    });
}

// PERSISTENCIA DEL FORMULARIO CON LOCALSTORAGE

// Carga los valores guardados en localStorage al cargar la página
const inputs = document.querySelectorAll('input, textarea');
inputs.forEach(input => {
    const savedValue = localStorage.getItem(input.id);
    if (savedValue) input.value = savedValue;
});

// Guarda cada cambio en el formulario en localStorage automáticamente
if ($form) {
    $form.addEventListener('input', (e) => {
        localStorage.setItem(e.target.id, e.target.value);
    });
}

// REEMPLAZO DE ALERT NATIVO CON SWEETALERT2

// Sobreescribe window.alert para usar modales estilizados de SweetAlert2
window.alert = function (message) {
    const isSuccess = message.includes('Gracias');
    Swal.fire({
        text: message,
        icon: isSuccess ? 'success' : 'error',
        background: '#0a0a0a',
        color: '#ffffff',
        iconColor: isSuccess ? '#00aa00' : '#cc0000',
        confirmButtonText: 'OK',
        confirmButtonColor: '#006600',
        customClass: {
            popup: 'swal-custom-popup',
            confirmButton: 'swal-custom-btn'
        }
    });
};

// MENÚ HAMBURGUESA (RESPONSIVE)

const $menuToggle = document.getElementById('menuToggle');
const $menuLinks = document.getElementById('menuLinks');

// Alterna la apertura/cierre del menú en pantallas pequeñas
if ($menuToggle && $menuLinks) {
    $menuToggle.addEventListener('click', () => {
        const isOpen = $menuLinks.classList.toggle('open');
        $menuToggle.classList.toggle('active', isOpen);
        $menuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Cierra el menú al hacer clic en cualquier enlace
    $menuLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            $menuLinks.classList.remove('open');
            $menuToggle.classList.remove('active');
            $menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// MENSAJE DE BIENVENIDA AL CARGAR LA PÁGINA

// Muestra un banner de bienvenida animado al cargar el sitio y lo oculta tras 3 segundos
window.addEventListener('DOMContentLoaded', () => {
    const bienvenida = document.getElementById('bienvenida');
    if (bienvenida) {
        bienvenida.classList.add('visible');
        setTimeout(() => {
            bienvenida.classList.remove('visible');
        }, 3000);
    }
});

// INTERACTIVIDAD DOM: MOSTRAR/OCULTAR "SOBRE MÍ"
const $btnToggle = document.getElementById('btnToggleSobreMi');
const $sobreMiTexto = document.querySelector('.sobre-mi-texto');

// Alterna la visibilidad del texto de "Sobre mí" y actualiza el texto del botón
if ($btnToggle && $sobreMiTexto) {
    $btnToggle.addEventListener('click', () => {
        const estaOculto = $sobreMiTexto.classList.toggle('oculto');
        $btnToggle.textContent = estaOculto ? 'Mostrar descripción' : ' Ocultar descripción';
    });
}