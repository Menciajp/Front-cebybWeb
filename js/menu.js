document.addEventListener('DOMContentLoaded', function () {
    //menu desplegable
    var botonMenu = document.getElementById('boton-menu');
    var menu = document.getElementById('menu');
    var scrollbar = document.documentElement.style;
    // correr las imagenes automaticamente
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    botonMenu.addEventListener('click', function () {
        // Cambiar el estilo de la barra de desplazamiento al abrir el menú
        scrollbar.overflowY = 'hidden'; // Oculta la barra de desplazamiento vertical
        if (menu.style.right === '0px') {
            document.documentElement.style.opacity = '0';
            setTimeout(() => { scrollbar.overflowY = ''; }, 300);
            menu.style.right = '-60vw';
        } else {
            menu.style.right = '0px';
        }
    });

    document.addEventListener('click', function (event) {
        var target = event.target;
        if (!menu.contains(target) && target !== botonMenu) {
            document.documentElement.style.opacity = '1';
            setTimeout(() => {
                document.documentElement.style.overflowY = 'auto'; // Restablece después de la animación
            }, 300);
            menu.style.right = '-60vw';
        }
    });

    var enlaces = document.querySelectorAll('a[href^="#"]');

    for (var i = 0; i < enlaces.length; i++) {
        enlaces[i].addEventListener('click', function (e) {
            e.preventDefault();

            var destino = this.getAttribute('href');
            var seccion = document.querySelector(destino);

            if (seccion) {
                var posicion = seccion.offsetTop - (window.innerHeight / 4);

                window.scrollTo({
                    top: posicion,
                    behavior: 'smooth'
                });
                document.documentElement.style.opacity = '1';
                setTimeout(() => {
                    document.documentElement.style.overflowY = 'auto'; // Restablece después de la animación
                }, 300);
                menu.style.right = '-60vw';
            }
        });
    }

    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
    }

    function nextSlide() {
        currentSlide++;
        if(currentSlide==totalSlides){
            currentSlide = 0;
        }
        showSlide(currentSlide);
    }

    showSlide(1);
    setInterval(nextSlide, 3000); // Cambia la imagen cada 3 segundos (3000 milisegundos)

    var map = L.map('map').setView([-27.362043450854927, -55.89704962883511], 100); // Coordenadas y nivel de zoom inicial

        // Agregar capa de OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Agregar marcador en una ubicación específica
        L.marker([-27.362043450854927, -55.89704962883511]).addTo(map)
            .bindPopup('Laboratorio CEByB').openPopup();
});