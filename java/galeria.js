document.addEventListener('DOMContentLoaded', () => {
    // Recoge TODOS los elementos de la galería de TODAS las secciones.
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    // Mapea todas las imágenes en un array, usando la lista completa.
    const allImages = Array.from(galleryItems).map(item => ({
        src: item.getAttribute('data-src'), // Usamos data-src como ya lo tienes
        alt: item.getAttribute('data-alt')
    }));

    let currentIndex = 0;

    // Función para mostrar la imagen actual en el lightbox
    function showImage(index) {
        // Validación para asegurar que el índice esté dentro del rango
        if (index < 0) {
            currentIndex = allImages.length - 1; // Loop al final
        } else if (index >= allImages.length) {
            currentIndex = 0; // Loop al inicio
        } else {
            currentIndex = index;
        }
        
        lightboxImage.src = allImages[currentIndex].src;
        lightboxImage.alt = allImages[currentIndex].alt;
    }

    // Abrir el lightbox
    galleryItems.forEach((item, index) => { // ¡Importante: usa el 'index' del forEach!
        item.addEventListener('click', () => {
            // El 'index' de la función de callback ya es el índice global correcto.
            lightbox.classList.remove('lightbox-hidden');
            showImage(index); // Le pasamos el índice global
        });
    });

    // Cerrar el lightbox
    closeBtn.addEventListener('click', () => {
        lightbox.classList.add('lightbox-hidden');
    });

    // Navegar a la imagen anterior
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        showImage(currentIndex - 1); // La función showImage manejará el 'loop'
    });

    // Navegar a la imagen siguiente
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        showImage(currentIndex + 1); // La función showImage manejará el 'loop'
    });

    // Cerrar al hacer clic fuera de la imagen (en el fondo del modal)
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.add('lightbox-hidden');
        }
    });

    // Cerrar con la tecla ESC y navegación con flechas
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('lightbox-hidden')) {
            if (e.key === 'Escape') {
                lightbox.classList.add('lightbox-hidden');
            } else if (e.key === 'ArrowLeft') {
                showImage(currentIndex - 1);
            } else if (e.key === 'ArrowRight') {
                showImage(currentIndex + 1);
            }
        }
    });
});