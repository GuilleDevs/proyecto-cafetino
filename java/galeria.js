document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const allImages = Array.from(galleryItems).map(item => ({
        src: item.getAttribute('data-src'),
        alt: item.getAttribute('data-alt')
    }));
    let currentIndex = 0;

    // Función para mostrar la imagen actual en el lightbox
    function showImage(index) {
        currentIndex = index;
        lightboxImage.src = allImages[currentIndex].src;
        lightboxImage.alt = allImages[currentIndex].alt;
    }

    // Abrir el lightbox
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const index = parseInt(item.getAttribute('data-index'));
            lightbox.classList.remove('lightbox-hidden');
            showImage(index);
        });
    });

    // Cerrar el lightbox
    closeBtn.addEventListener('click', () => {
        lightbox.classList.add('lightbox-hidden');
    });

    // Navegar a la imagen anterior
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Evita que el click se propague al fondo
        let newIndex = currentIndex - 1;
        if (newIndex < 0) {
            newIndex = allImages.length - 1; // Vuelve al final
        }
        showImage(newIndex);
    });

    // Navegar a la imagen siguiente
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Evita que el click se propague al fondo
        let newIndex = currentIndex + 1;
        if (newIndex >= allImages.length) {
            newIndex = 0; // Vuelve al inicio
        }
        showImage(newIndex);
    });

    // Cerrar al hacer clic fuera de la imagen (en el fondo del modal)
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.add('lightbox-hidden');
        }
    });

    // Cerrar con la tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !lightbox.classList.contains('lightbox-hidden')) {
            lightbox.classList.add('lightbox-hidden');
        }
        // Navegación con flechas del teclado
        if (!lightbox.classList.contains('lightbox-hidden')) {
             if (e.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                nextBtn.click();
            }
        }
    });
});
