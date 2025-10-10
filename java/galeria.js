document.addEventListener('DOMContentLoaded', () => {
    // --- 1. SELECCIÓN DE ELEMENTOS DEL DOM ---
    const tarjetas = document.querySelectorAll('.contenedor-categorias');
    const modal = document.getElementById('modalDetalle');
    const cerrarModal = document.querySelector('.cerrar-modal');
    const flechaAnterior = document.querySelector('.flecha-anterior');
    const flechaSiguiente = document.querySelector('.flecha-siguiente');
    const modalImagen = document.getElementById('modalImagen');
    
    // **CLAVE DE LA CORRECCIÓN DE LA TRANSICIÓN**
    const modalInfo = document.querySelector('.modal-info'); 
    
    const modalTitulo = document.getElementById('modalTitulo');
    const modalDescripcion = document.getElementById('modalDescripcion');

    // --- 2. ALMACENAMIENTO DE DATOS ---
    const productos = [];
    let indiceActual = 0; 

    // Llenamos el array 'productos'
    tarjetas.forEach(tarjeta => {
        productos.push({
            img: tarjeta.querySelector('.imagen-caja img').src,
            titulo: tarjeta.querySelector('.carta-categoria h2').textContent,
            descripcion: tarjeta.querySelector('.carta-categoria p').textContent,
        });
    });

    // --- 3. FUNCIONES DEL CARRUSEL ---

    // Función para mostrar el producto con un índice específico (con animación)
    const mostrarProducto = (index) => {
        // A. Asegura el índice circular
        if (index < 0) {
            index = productos.length - 1; 
        } else if (index >= productos.length) {
            index = 0; 
        }
        
        // B. Ocultar contenido (Fade Out) para iniciar la transición
        modalImagen.classList.add('modal-contenido-oculto');
        modalInfo.classList.add('modal-contenido-oculto');

        // C. Esperar 300ms (el tiempo de la transición CSS) para cambiar el contenido
        setTimeout(() => {
            indiceActual = index; // Actualiza el índice
            const producto = productos[indiceActual];
            
            // D. Cambiar los datos
            modalImagen.src = producto.img;
            modalTitulo.textContent = producto.titulo;
            modalDescripcion.textContent = producto.descripcion;

            // E. Mostrar contenido (Fade In)
            // Pequeño retraso para que el navegador registre el cambio de contenido
            setTimeout(() => {
                modalImagen.classList.remove('modal-contenido-oculto');
                modalInfo.classList.remove('modal-contenido-oculto');
            }, 50); 
            
        }, 300); 
    };

    // **FUNCIÓN CLAVE QUE FALTABA PARA ABRIR EL MODAL**
    const abrirModal = (index) => {
        mostrarProducto(index);
        modal.classList.add('modal-visible');
        document.body.style.overflow = 'hidden'; 
    };

    // **FUNCIÓN CLAVE QUE FALTABA PARA CERRAR EL MODAL**
    const cerrarModalFunc = () => {
        modal.classList.remove('modal-visible');
        document.body.style.overflow = 'auto'; 
    };


    // --- 4. ASIGNACIÓN DE EVENTOS ---

    // Evento de CLIC en cada tarjeta para abrir el modal
    tarjetas.forEach((tarjeta, index) => {
        tarjeta.addEventListener('click', () => {
            // Llama a la función 'abrirModal' para mostrar el modal con el producto correcto
            abrirModal(index); 
        });
    });

    // Evento de CLIC en las flechas de navegación
    flechaSiguiente.addEventListener('click', (e) => {
        e.stopPropagation(); 
        mostrarProducto(indiceActual + 1);
    });

    flechaAnterior.addEventListener('click', (e) => {
        e.stopPropagation(); 
        mostrarProducto(indiceActual - 1);
    });

    // Eventos para cerrar el modal
    cerrarModal.addEventListener('click', cerrarModalFunc);

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            cerrarModalFunc();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (modal.classList.contains('modal-visible')) {
            if (event.key === 'Escape') {
                cerrarModalFunc();
            } else if (event.key === 'ArrowRight') {
                mostrarProducto(indiceActual + 1);
            } else if (event.key === 'ArrowLeft') {
                mostrarProducto(indiceActual - 1);
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // ... tu código actual para el carrusel ...

    // ** NUEVO: FUNCIÓN PARA EL EFECTO PARALLAX **
    const heroSection = document.querySelector('.hero-almaris');
    
    // Este factor controla la velocidad. Un valor de 0.5 hará que el fondo
    // se mueva a la mitad de la velocidad del scroll.
    const parallaxSpeed = 0.5; 

    function applyParallax() {
        // Obtiene la posición de scroll vertical de la ventana
        const scrollPosition = window.pageYOffset;
        
        // Calcula cuánto debe moverse el fondo
        const yPos = scrollPosition * parallaxSpeed; 
        
    }

    // Escucha el evento de scroll en la ventana
    window.addEventListener('scroll', applyParallax);
});