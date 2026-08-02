document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       1. MENÚ HAMBURGUESA Y NAVEGACIÓN MÓVIL
       ========================================================================== */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        const isOpen = navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isOpen);
    };

    hamburger.addEventListener('click', toggleMenu);

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    /* ==========================================================================
       2. CAMBIO DE ESTADO EN NAVBAR AL HACER SCROLL
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Mostrar u ocultar botón "Volver arriba"
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }, { passive: true });

    /* ==========================================================================
       3. BOTÓN VOLVER ARRIBA
       ========================================================================== */
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* ==========================================================================
       4. ANIMACIONES CON INTERSECTION OBSERVER (FADE-IN)
       ========================================================================== */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target); // Dejar de observar una vez animado
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-up');
    fadeElements.forEach(el => appearOnScroll.observe(el));

    /* ==========================================================================
       5. VALIDACIÓN BÁSICA DEL FORMULARIO DE CONTACTO
       ========================================================================== */
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;

        // Inputs
        const nameInput = document.getElementById('name');
        const phoneInput = document.getElementById('phone');
        const messageInput = document.getElementById('message');

        // Reset validaciones previas
        [nameInput, phoneInput, messageInput].forEach(input => {
            input.parentElement.classList.remove('invalid');
        });

        // Validar Nombre
        if (!nameInput.value.trim()) {
            nameInput.parentElement.classList.add('invalid');
            isValid = false;
        }

        // Validar Teléfono (mínimo 8 dígitos)
        const phoneRegex = /^[0-9\s+]{8,}$/;
        if (!phoneRegex.test(phoneInput.value.trim())) {
            phoneInput.parentElement.classList.add('invalid');
            isValid = false;
        }

        // Validar Mensaje
        if (!messageInput.value.trim()) {
            messageInput.parentElement.classList.add('invalid');
            isValid = false;
        }

        // Si es válido, simular envío
        if (isValid) {
            formStatus.style.color = '#10b981';
            formStatus.textContent = '¡Gracias! Tu mensaje ha sido enviado con éxito.';
            contactForm.reset();

            setTimeout(() => {
                formStatus.textContent = '';
            }, 5000);
        } else {
            formStatus.style.color = '#ef4444';
            formStatus.textContent = 'Por favor corrige los errores antes de enviar.';
        }
    });
});