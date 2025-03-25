// Referencias a los elementos HTML
const paginaInicial = document.getElementById("pagina-inicial");
const paginaOpciones = document.getElementById("pagina-opciones");
const modalReporte = document.getElementById("modal-reporte");
const cerrarModal = document.getElementById("cerrar-modal");
const botonRegresar = document.getElementById("regresar-aplicacion");
const botonConfirmarSeleccion = document.getElementById("confirmar-seleccion");
const botonActualizarUbicacion = document.getElementById("actualizar-ubicacion");
const casetaSelect = document.getElementById("caseta");
const responsableCheckbox = document.getElementById("responsable-turno");
const mensajeSeleccion = document.getElementById("mensaje-seleccion");
const casetaConfirmada = document.getElementById("caseta-confirmada");
const mapaDiv = document.getElementById("mapa");

let mapa;
let marcador;

// Manejar la confirmación de caseta y responsable (opcional)
botonConfirmarSeleccion.addEventListener("click", () => {
    const casetaSeleccionada = casetaSelect.value;

    if (!casetaSeleccionada) {
        mensajeSeleccion.innerText = "Por favor selecciona una caseta.";
        return;
    }

    const esResponsable = responsableCheckbox.checked ? "Sí" : "No";
    mensajeSeleccion.innerText = "";
    casetaConfirmada.innerText = `Caseta seleccionada: ${casetaSeleccionada}, Responsable de turno: ${esResponsable}`;
    cambiarPagina("opciones");
});

// Inicializar el mapa de Google
function inicializarMapa(lat, lng) {
    const coordenadas = { lat: lat, lng: lng };

    // Crear el mapa centrado en las coordenadas
    if (!mapa) {
        mapa = new google.maps.Map(mapaDiv, {
            center: coordenadas,
            zoom: 15, // Nivel de zoom inicial
        });

        // Crear el marcador en las coordenadas
        marcador = new google.maps.Marker({
            position: coordenadas,
            map: mapa,
            title: "Tu ubicación actual",
        });
    } else {
        // Actualizar el marcador y centrar el mapa si ya existe
        mapa.setCenter(coordenadas);
        marcador.setPosition(coordenadas);
    }
}

// Solicitar la ubicación del dispositivo
function obtenerUbicacion() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                // Mostrar la ubicación en el mapa
                inicializarMapa(lat, lng);

                console.log(`Ubicación actualizada: Latitud ${lat}, Longitud ${lng}`);
            },
            (error) => {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        alert("Permiso denegado para acceder a la ubicación.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        alert("La ubicación no está disponible.");
                        break;
                    case error.TIMEOUT:
                        alert("La solicitud de ubicación agotó el tiempo.");
                        break;
                    default:
                        alert("Ocurrió un error desconocido.");
                }
            }
        );
    } else {
        alert("La geolocalización no es compatible con este navegador.");
    }
}

// Manejar el evento del botón "Actualizar ubicación"
botonActualizarUbicacion.addEventListener("click", obtenerUbicacion);

// Abrir el modal con el formulario de Microsoft Forms
document.getElementById("realizar-reporte").addEventListener("click", () => {
    modalReporte.style.display = "block";
    paginaOpciones.style.display = "none";
});

// Cerrar el modal al hacer clic en el botón "×"
cerrarModal.addEventListener("click", () => {
    modalReporte.style.display = "none";
    paginaOpciones.style.display = "block";
});

// Regresar a la
