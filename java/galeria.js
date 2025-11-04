document.addEventListener('DOMContentLoaded', () => {
    // Referencias a elementos
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    // Referencia al elemento de título/leyenda
    const lightboxCaption = document.getElementById('lightbox-caption'); 
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    // Mapea todas las imágenes, incluyendo si son de maquinaria
    const allImages = Array.from(galleryItems).map(item => ({
        src: item.getAttribute('data-src'),
        alt: item.getAttribute('data-alt'),
        // Verifica si el ítem tiene la clase 'maquinaria-item'
        isMaquinaria: item.classList.contains('maquinaria-item') 
    }));

    let currentIndex = 0;

    function showImage(index) {
        // Lógica de bucle (loop)
        if (index < 0) {
            currentIndex = allImages.length - 1;
        } else if (index >= allImages.length) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }
        
        const currentImage = allImages[currentIndex];
        
        lightboxImage.src = currentImage.src;
        lightboxImage.alt = currentImage.alt;
        
        // Lógica clave: Mostrar el título solo para la maquinaria
        if (currentImage.isMaquinaria) {
            lightboxCaption.textContent = currentImage.alt; 
            lightboxCaption.style.display = 'block'; // Muestra el caption
        } else {
            lightboxCaption.textContent = ''; // Limpia el texto
            lightboxCaption.style.display = 'none'; // Oculta el elemento caption
        }
    }

    // Abrir el lightbox
    galleryItems.forEach((item, index) => { 
        item.addEventListener('click', () => {
            lightbox.classList.remove('lightbox-hidden');
            showImage(index); 
        });
    });

    // Cerrar el lightbox
    closeBtn.addEventListener('click', () => {
        lightbox.classList.add('lightbox-hidden');
    });

    // Navegación (Anterior)
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        showImage(currentIndex - 1);
    });

    // Navegación (Siguiente)
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        showImage(currentIndex + 1);
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