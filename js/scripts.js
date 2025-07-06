/**
 * EcoTurismo México - Scripts principales
 * Funcionalidades interactivas para el sitio web
 */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar validación de formularios
    initFormValidation();
    
    // Inicializar filtros de destinos
    initDestinationFilters();
    
    // Inicializar botón de volver arriba
    initBackToTopButton();
    
    // Inicializar tooltips y popovers de Bootstrap
    initBootstrapComponents();
    
    // Añadir animaciones de entrada
    initScrollAnimations();
});

/**
 * Inicializa la validación de formularios
 */
function initFormValidation() {
    // Obtener todos los formularios a los que queremos aplicar estilos de validación de Bootstrap
    const forms = document.querySelectorAll('.needs-validation');
    
    // Bucle sobre ellos y evitar el envío
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                // Si el formulario es válido, mostrar mensaje de éxito
                if (form.id === 'contactForm') {
                    event.preventDefault();
                    showFormSuccessMessage(form);
                } else if (form.id === 'newsletterForm') {
                    event.preventDefault();
                    showNewsletterSuccessMessage(form);
                }
            }
            
            form.classList.add('was-validated');
        }, false);
    });
}

/**
 * Muestra un mensaje de éxito después de enviar el formulario de contacto
 * @param {HTMLFormElement} form - El formulario enviado
 */
function showFormSuccessMessage(form) {
    // Crear el mensaje de éxito
    const successMessage = document.createElement('div');
    successMessage.className = 'alert alert-success mt-3 fade-in';
    successMessage.setAttribute('role', 'alert');
    successMessage.innerHTML = `
        <h4 class="alert-heading">¡Mensaje enviado!</h4>
        <p>Gracias por contactarnos. Hemos recibido tu mensaje y te responderemos lo antes posible.</p>
    `;
    
    // Insertar el mensaje después del formulario
    form.insertAdjacentElement('afterend', successMessage);
    
    // Limpiar el formulario
    form.reset();
    form.classList.remove('was-validated');
    
    // Desplazarse al mensaje
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Eliminar el mensaje después de 5 segundos
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

/**
 * Muestra un mensaje de éxito después de suscribirse al boletín
 * @param {HTMLFormElement} form - El formulario enviado
 */
function showNewsletterSuccessMessage(form) {
    // Crear el mensaje de éxito
    const successMessage = document.createElement('div');
    successMessage.className = 'alert alert-success mt-3 fade-in';
    successMessage.setAttribute('role', 'alert');
    successMessage.innerHTML = `
        <h4 class="alert-heading">¡Suscripción exitosa!</h4>
        <p>Gracias por suscribirte a nuestro boletín. Pronto recibirás noticias y ofertas exclusivas.</p>
    `;
    
    // Insertar el mensaje después del formulario
    form.insertAdjacentElement('afterend', successMessage);
    
    // Limpiar el formulario
    form.reset();
    form.classList.remove('was-validated');
    
    // Eliminar el mensaje después de 5 segundos
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

/**
 * Inicializa los filtros de destinos en la página de destinos
 */
function initDestinationFilters() {
    const filterButton = document.getElementById('filterButton');
    if (!filterButton) return;
    
    filterButton.addEventListener('click', function() {
        const regionFilter = document.getElementById('regionFilter').value;
        const activityFilter = document.getElementById('activityFilter').value;
        
        // Obtener todas las tarjetas de destino
        const destinationCards = document.querySelectorAll('.destination-card');
        
        // Filtrar las tarjetas según los criterios seleccionados
        destinationCards.forEach(card => {
            const cardRegion = card.querySelector('.badge').textContent.toLowerCase();
            const cardActivities = Array.from(card.querySelectorAll('.list-unstyled li'))
                .map(li => li.textContent.toLowerCase());
            
            let showCard = true;
            
            // Filtrar por región
            if (regionFilter && !cardRegion.includes(regionFilter.toLowerCase())) {
                showCard = false;
            }
            
            // Filtrar por actividad
            if (activityFilter && !cardActivities.some(activity => 
                activity.includes(activityFilter.toLowerCase()))) {
                showCard = false;
            }
            
            // Mostrar u ocultar la tarjeta
            card.closest('.col-md-6').style.display = showCard ? 'block' : 'none';
        });
        
        // Mostrar mensaje si no hay resultados
        const visibleCards = document.querySelectorAll('.destination-card[style="display: block"]');
        const noResultsMessage = document.getElementById('noResultsMessage');
        
        if (visibleCards.length === 0) {
            if (!noResultsMessage) {
                const message = document.createElement('div');
                message.id = 'noResultsMessage';
                message.className = 'col-12 text-center my-5';
                message.innerHTML = `
                    <div class="alert alert-info">
                        <i class="fas fa-info-circle me-2"></i>
                        No se encontraron destinos que coincidan con los filtros seleccionados.
                    </div>
                `;
                document.querySelector('.row.g-4').appendChild(message);
            }
        } else if (noResultsMessage) {
            noResultsMessage.remove();
        }
    });
}

/**
 * Inicializa el botón de volver arriba
 */
function initBackToTopButton() {
    // Crear el botón si no existe
    if (!document.querySelector('.back-to-top')) {
        const backToTopButton = document.createElement('a');
        backToTopButton.href = '#';
        backToTopButton.className = 'back-to-top';
        backToTopButton.setAttribute('aria-label', 'Volver arriba');
        backToTopButton.innerHTML = '<i class="fas fa-arrow-up" aria-hidden="true"></i>';
        document.body.appendChild(backToTopButton);
        
        // Mostrar/ocultar el botón según el scroll
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });
        
        // Acción de scroll suave al hacer clic
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

/**
 * Inicializa componentes de Bootstrap como tooltips y popovers
 */
function initBootstrapComponents() {
    // Inicializar todos los tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Inicializar todos los popovers
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
}

/**
 * Inicializa animaciones basadas en scroll
 */
function initScrollAnimations() {
    // Seleccionar elementos para animar
    const animatedElements = document.querySelectorAll('.section-title, .card, .testimonial-item');
    
    // Función para verificar si un elemento está en el viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Función para manejar la animación de scroll
    function handleScrollAnimation() {
        animatedElements.forEach(element => {
            if (isElementInViewport(element) && !element.classList.contains('fade-in')) {
                element.classList.add('fade-in');
            }
        });
    }
    
    // Ejecutar una vez al cargar la página
    handleScrollAnimation();
    
    // Añadir evento de scroll
    window.addEventListener('scroll', handleScrollAnimation);
}

/**
 * Mejora la accesibilidad del carrusel añadiendo pausas al enfocar
 */
document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.carousel');
    
    carousels.forEach(carousel => {
        const carouselInstance = bootstrap.Carousel.getInstance(carousel);
        
        // Pausar el carrusel cuando se enfoca un elemento dentro
        carousel.addEventListener('focusin', function() {
            if (carouselInstance) {
                carouselInstance.pause();
            }
        });
        
        // Reanudar el carrusel cuando se pierde el foco
        carousel.addEventListener('focusout', function(event) {
            if (!carousel.contains(event.relatedTarget) && carouselInstance) {
                carouselInstance.cycle();
            }
        });
        
        // Pausar el carrusel al pasar el ratón por encima
        carousel.addEventListener('mouseenter', function() {
            if (carouselInstance) {
                carouselInstance.pause();
            }
        });
        
        // Reanudar el carrusel al quitar el ratón
        carousel.addEventListener('mouseleave', function() {
            if (carouselInstance) {
                carouselInstance.cycle();
            }
        });
    });
});
