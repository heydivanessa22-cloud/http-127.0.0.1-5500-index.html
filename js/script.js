/* ========================================
   PORTAFOLIO PROFESIONAL - HEYDI VANESSA RIVERO
   JavaScript para funcionalidades interactivas
   ======================================== */

// ========================================
// CONFIGURACIÓN INICIAL Y VARIABLES GLOBALES
// ========================================

// Variables globales para elementos del DOM
let hamburger, navMenu, navLinks, contactForm, profileImage;

// Configuración de animaciones
const ANIMATION_CONFIG = {
    smileInterval: 30000, // 30 segundos
    blinkInterval: 2000,  // 2 segundos
    scrollOffset: 80      // Offset para scroll suave
};

// ========================================
// INICIALIZACIÓN CUANDO EL DOM ESTÉ LISTO
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Portafolio de Heydi Vanessa Rivero cargado correctamente');
    
    try {
        // Inicializar todos los componentes
        initializeNavigation();
        initializeContactForm();
        initializeScrollEffects();
        initializeImageAnimations();
        
        console.log('✅ Todas las funcionalidades inicializadas');
    } catch (error) {
        console.error('❌ Error durante la inicialización:', error);
    }
});

// ========================================
// NAVEGACIÓN RESPONSIVE Y MENÚ HAMBURGUESA
// ========================================
function initializeNavigation() {
    try {
        // Obtener elementos del DOM
        hamburger = document.querySelector('.hamburger');
        navMenu = document.querySelector('.nav-menu');
        navLinks = document.querySelectorAll('.nav-link');
        
        // Event listener para el menú hamburguesa
        if (hamburger) {
            hamburger.addEventListener('click', toggleMobileMenu);
        }
        
        // Event listeners para los enlaces de navegación
        navLinks.forEach(link => {
            link.addEventListener('click', handleNavClick);
        });
        
        // Event listener para cerrar menú al hacer clic fuera
        document.addEventListener('click', function(event) {
            if (hamburger && navMenu && !hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                closeMobileMenu();
            }
        });
        
        console.log('📱 Navegación inicializada');
    } catch (error) {
        console.error('❌ Error en navegación:', error);
    }
}

// Función para alternar el menú móvil
function toggleMobileMenu() {
    try {
        if (hamburger && navMenu) {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevenir scroll del body cuando el menú está abierto
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        }
    } catch (error) {
        console.error('❌ Error en toggleMobileMenu:', error);
    }
}

// Función para cerrar el menú móvil
function closeMobileMenu() {
    try {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    } catch (error) {
        console.error('❌ Error en closeMobileMenu:', error);
    }
}

// Función para manejar clics en enlaces de navegación
function handleNavClick(event) {
    try {
        event.preventDefault();
        
        const targetId = event.target.getAttribute('href');
        if (!targetId) return;
        
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Cerrar menú móvil si está abierto
            closeMobileMenu();
            
            // Scroll suave hacia la sección
            const offsetTop = targetSection.offsetTop - ANIMATION_CONFIG.scrollOffset;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            console.log(`🎯 Navegando a: ${targetId}`);
        }
    } catch (error) {
        console.error('❌ Error en handleNavClick:', error);
    }
}

// ========================================
// FORMULARIO DE CONTACTO
// ========================================
function initializeContactForm() {
    try {
        contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', handleFormSubmit);
            
            // Validación en tiempo real
            const formInputs = contactForm.querySelectorAll('input, textarea');
            formInputs.forEach(input => {
                input.addEventListener('blur', validateField);
                input.addEventListener('input', clearFieldError);
            });
            
            console.log('📝 Formulario de contacto inicializado');
        }
    } catch (error) {
        console.error('❌ Error en initializeContactForm:', error);
    }
}

// Función para manejar el envío del formulario
function handleFormSubmit(event) {
    try {
        event.preventDefault();
        
        // Obtener datos del formulario
        const formData = new FormData(contactForm);
        const nombre = formData.get('nombre');
        const email = formData.get('email');
        const mensaje = formData.get('mensaje');
        
        // Validar todos los campos
        if (validateForm(nombre, email, mensaje)) {
            // Simular envío del formulario
            simulateFormSubmission(nombre, email, mensaje);
        }
    } catch (error) {
        console.error('❌ Error en handleFormSubmit:', error);
    }
}

// Función para validar el formulario completo
function validateForm(nombre, email, mensaje) {
    try {
        let isValid = true;
        
        // Validar nombre
        if (!nombre || nombre.trim().length < 2) {
            showFieldError('nombre', 'El nombre debe tener al menos 2 caracteres');
            isValid = false;
        }
        
        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            showFieldError('email', 'Por favor ingresa un email válido');
            isValid = false;
        }
        
        // Validar mensaje
        if (!mensaje || mensaje.trim().length < 10) {
            showFieldError('mensaje', 'El mensaje debe tener al menos 10 caracteres');
            isValid = false;
        }
        
        return isValid;
    } catch (error) {
        console.error('❌ Error en validateForm:', error);
        return false;
    }
}

// Función para validar un campo individual
function validateField(event) {
    try {
        const field = event.target;
        const value = field.value.trim();
        
        switch (field.name) {
            case 'nombre':
                if (value.length < 2) {
                    showFieldError('nombre', 'El nombre debe tener al menos 2 caracteres');
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    showFieldError('email', 'Por favor ingresa un email válido');
                }
                break;
            case 'mensaje':
                if (value.length < 10) {
                    showFieldError('mensaje', 'El mensaje debe tener al menos 10 caracteres');
                }
                break;
        }
    } catch (error) {
        console.error('❌ Error en validateField:', error);
    }
}

// Función para mostrar error en un campo
function showFieldError(fieldName, message) {
    try {
        const field = document.getElementById(fieldName);
        if (!field) return;
        
        const formGroup = field.closest('.form-group');
        if (!formGroup) return;
        
        // Remover error anterior si existe
        const existingError = formGroup.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Crear elemento de error
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.color = '#ff6b6b';
        errorElement.style.fontSize = '0.9rem';
        errorElement.style.marginTop = '0.5rem';
        
        // Agregar error al campo
        formGroup.appendChild(errorElement);
        field.style.borderColor = '#ff6b6b';
    } catch (error) {
        console.error('❌ Error en showFieldError:', error);
    }
}

// Función para limpiar error de un campo
function clearFieldError(event) {
    try {
        const field = event.target;
        const formGroup = field.closest('.form-group');
        if (!formGroup) return;
        
        const existingError = formGroup.querySelector('.field-error');
        
        if (existingError) {
            existingError.remove();
            field.style.borderColor = 'rgba(123, 200, 50, 0.3)';
        }
    } catch (error) {
        console.error('❌ Error en clearFieldError:', error);
    }
}

// Función para simular el envío del formulario
function simulateFormSubmission(nombre, email, mensaje) {
    try {
        // Mostrar estado de carga
        const submitButton = contactForm.querySelector('button[type="submit"]');
        if (!submitButton) return;
        
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        
        // Simular delay de envío
        setTimeout(() => {
            // Mostrar mensaje de éxito
            showSuccessMessage();
            
            // Limpiar formulario
            contactForm.reset();
            
            // Restaurar botón
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            // Log en consola
            console.log('Formulario enviado correctamente');
            console.log('📧 Datos del formulario:', {
                nombre: nombre,
                email: email,
                mensaje: mensaje,
                timestamp: new Date().toISOString()
            });
            
        }, 2000);
    } catch (error) {
        console.error('❌ Error en simulateFormSubmission:', error);
    }
}

// Función para mostrar mensaje de éxito
function showSuccessMessage() {
    try {
        // Crear elemento de mensaje de éxito
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <div style="
                background: #7BC832;
                color: #084003;
                padding: 1rem 2rem;
                border-radius: 10px;
                margin-top: 1rem;
                text-align: center;
                font-weight: 600;
                animation: fadeInUp 0.5s ease-out;
            ">
                ✅ ¡Mensaje enviado correctamente! Te contactaremos pronto.
            </div>
        `;
        
        // Insertar mensaje después del formulario
        contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
        
        // Remover mensaje después de 5 segundos
        setTimeout(() => {
            if (successMessage.parentNode) {
                successMessage.remove();
            }
        }, 5000);
    } catch (error) {
        console.error('❌ Error en showSuccessMessage:', error);
    }
}

// ========================================
// EFECTOS DE SCROLL Y ANIMACIONES
// ========================================
function initializeScrollEffects() {
    try {
        // Efecto de navbar al hacer scroll
        window.addEventListener('scroll', handleScroll);
        
        // Animaciones al hacer scroll (Intersection Observer)
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(handleIntersection, observerOptions);
        
        // Observar elementos que deben animarse
        const animatedElements = document.querySelectorAll('.experience-card, .project-card, .skill-item');
        animatedElements.forEach(element => {
            observer.observe(element);
        });
        
        console.log('📜 Efectos de scroll inicializados');
    } catch (error) {
        console.error('❌ Error en initializeScrollEffects:', error);
    }
}

// Función para manejar el scroll
function handleScroll() {
    try {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(8, 64, 3, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(8, 64, 3, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    } catch (error) {
        console.error('❌ Error en handleScroll:', error);
    }
}

// Función para manejar intersecciones (animaciones al scroll)
function handleIntersection(entries) {
    try {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    } catch (error) {
        console.error('❌ Error en handleIntersection:', error);
    }
}

// ========================================
// ANIMACIONES DE LA IMAGEN DE PERFIL
// ========================================
function initializeImageAnimations() {
    try {
        profileImage = document.getElementById('profileImage');
        
        if (profileImage) {
            // Iniciar animaciones automáticas
            startImageAnimations();
            
            // Agregar efectos de hover
            addImageHoverEffects();
            
            console.log('🖼️ Animaciones de imagen inicializadas');
        }
    } catch (error) {
        console.error('❌ Error en initializeImageAnimations:', error);
    }
}

// Función para iniciar las animaciones automáticas de la imagen
function startImageAnimations() {
    try {
        // Animación de sonrisa cada 30 segundos
        setInterval(() => {
            triggerSmileAnimation();
        }, ANIMATION_CONFIG.smileInterval);
        
        // Animación de parpadeo cada 2 segundos
        setInterval(() => {
            triggerBlinkAnimation();
        }, ANIMATION_CONFIG.blinkInterval);
    } catch (error) {
        console.error('❌ Error en startImageAnimations:', error);
    }
}

// Función para activar animación de sonrisa
function triggerSmileAnimation() {
    try {
        const smileElement = document.querySelector('.smile-animation');
        if (smileElement) {
            smileElement.style.animation = 'none';
            smileElement.offsetHeight; // Trigger reflow
            smileElement.style.animation = 'smile 3s infinite';
            
            console.log('😊 Animación de sonrisa activada');
        }
    } catch (error) {
        console.error('❌ Error en triggerSmileAnimation:', error);
    }
}

// Función para activar animación de parpadeo
function triggerBlinkAnimation() {
    try {
        const blinkElement = document.querySelector('.blink-animation');
        if (blinkElement) {
            blinkElement.style.animation = 'none';
            blinkElement.offsetHeight; // Trigger reflow
            blinkElement.style.animation = 'blink 2s infinite';
            
            console.log('👁️ Animación de parpadeo activada');
        }
    } catch (error) {
        console.error('❌ Error en triggerBlinkAnimation:', error);
    }
}

// Función para agregar efectos de hover a la imagen
function addImageHoverEffects() {
    try {
        const imageContainer = document.querySelector('.profile-image-container');
        
        if (imageContainer && profileImage) {
            imageContainer.addEventListener('mouseenter', () => {
                // Efecto de brillo al hacer hover
                profileImage.style.filter = 'brightness(1.1) saturate(1.2)';
                
                // Activar animaciones manualmente
                triggerSmileAnimation();
                triggerBlinkAnimation();
            });
            
            imageContainer.addEventListener('mouseleave', () => {
                // Restaurar imagen normal
                profileImage.style.filter = 'brightness(1) saturate(1)';
            });
        }
    } catch (error) {
        console.error('❌ Error en addImageHoverEffects:', error);
    }
}

// ========================================
// FUNCIONES UTILITARIAS
// ========================================

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    try {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Estilos de la notificación
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#7BC832' : type === 'error' ? '#ff6b6b' : '#A5EA5C'};
            color: ${type === 'success' ? '#084003' : '#FFFFFF'};
            padding: 1rem 2rem;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            max-width: 300px;
            font-weight: 500;
        `;
        
        document.body.appendChild(notification);
        
        // Remover notificación después de 4 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 4000);
    } catch (error) {
        console.error('❌ Error en showNotification:', error);
    }
}

// Función para detectar dispositivos móviles
function isMobileDevice() {
    try {
        return window.innerWidth <= 768;
    } catch (error) {
        console.error('❌ Error en isMobileDevice:', error);
        return false;
    }
}

// Función para optimizar animaciones en dispositivos móviles
function optimizeForMobile() {
    try {
        if (isMobileDevice()) {
            // Reducir intervalos de animación en móviles para ahorrar batería
            ANIMATION_CONFIG.smileInterval = 60000; // 1 minuto
            ANIMATION_CONFIG.blinkInterval = 4000;  // 4 segundos
            
            console.log('📱 Optimizaciones móviles aplicadas');
        }
    } catch (error) {
        console.error('❌ Error en optimizeForMobile:', error);
    }
}

// ========================================
// MANEJO DE ERRORES Y LOGGING
// ========================================

// Función para manejar errores de JavaScript
window.addEventListener('error', function(event) {
    console.error('❌ Error en el portafolio:', event.error);
    console.error('❌ Error details:', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
    });
    // Solo mostrar notificación para errores críticos que no sean de elementos no encontrados
    if (event.error && 
        event.error.name !== 'TypeError' && 
        !event.message.includes('Cannot read properties') &&
        !event.message.includes('null') &&
        !event.message.includes('undefined')) {
        showNotification('Ha ocurrido un error. Por favor, recarga la página.', 'error');
    }
});

// Función para logging de rendimiento
window.addEventListener('load', function() {
    try {
        const loadTime = performance.now();
        console.log(`⚡ Página cargada en ${loadTime.toFixed(2)}ms`);
        
        // Optimizar para móviles si es necesario
        optimizeForMobile();
    } catch (error) {
        console.error('❌ Error en load event:', error);
    }
});

// ========================================
// FUNCIONES DE ACCESIBILIDAD
// ========================================

// Función para mejorar la accesibilidad del teclado
document.addEventListener('keydown', function(event) {
    try {
        // Cerrar menú móvil con tecla Escape
        if (event.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
        
        // Navegación con teclado en el formulario
        if (event.key === 'Enter' && event.target.tagName === 'INPUT') {
            const form = event.target.closest('form');
            if (form) {
                const inputs = Array.from(form.querySelectorAll('input, textarea'));
                const currentIndex = inputs.indexOf(event.target);
                const nextInput = inputs[currentIndex + 1];
                
                if (nextInput) {
                    nextInput.focus();
                } else {
                    const submitButton = form.querySelector('button[type="submit"]');
                    if (submitButton) {
                        submitButton.focus();
                    }
                }
            }
        }
    } catch (error) {
        console.error('❌ Error en keydown handler:', error);
    }
});

// ========================================
// INICIALIZACIÓN FINAL
// ========================================

// Mensaje de bienvenida en consola
console.log(`
🎉 ¡Bienvenido al portafolio de Heydi Vanessa Rivero!
👩‍💼 Administradora de Empresas | Visitadora Médica | Emprendedora
🌿 Especialista en Productos Naturales
📧 Contacto: heydi.rivero@email.com
📱 Instagram: @soyvanessarivero

Desarrollado con ❤️ por Welinton Suares
`);

// Exportar funciones para uso global si es necesario
window.PortfolioApp = {
    showNotification,
    triggerSmileAnimation,
    triggerBlinkAnimation,
    isMobileDevice
};