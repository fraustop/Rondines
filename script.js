// Referencias a los elementos HTML
const paginaInicial = document.getElementById("pagina-inicial");
const paginaOpciones = document.getElementById("pagina-opciones");
const modalReporte = document.getElementById("modal-reporte");
const cerrarModal = document.getElementById("cerrar-modal");
const botonRegresar = document.getElementById("regresar-aplicacion");
const botonConfirmarSeleccion = document.getElementById("confirmar-seleccion");
const casetaSelect = document.getElementById("caseta");
const responsableCheckbox = document.getElementById("responsable-turno");
const mensajeSeleccion = document.getElementById("mensaje-seleccion");
const casetaConfirmada = document.getElementById("caseta-confirmada");

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

// Función para abrir el modal con el formulario de Microsoft Forms
document.getElementById("realizar-reporte").addEventListener("click", () => {
    modalReporte.style.display = "block";
    paginaOpciones.style.display = "none";
});

// Cerrar el modal al hacer clic en el botón "×"
cerrarModal.addEventListener("click", () => {
    modalReporte.style.display = "none";
    paginaOpciones.style.display = "block";
});

// Regresar a la aplicación al hacer clic en "Regresar a la aplicación"
botonRegresar.addEventListener("click", () => {
    modalReporte.style.display = "none";
    paginaOpciones.style.display = "block";
});

// Cerrar el modal si el usuario hace clic fuera del contenido del modal
window.addEventListener("click", (event) => {
    if (event.target === modalReporte) {
        modalReporte.style.display = "none";
        paginaOpciones.style.display = "block";
    }
});

// Función para cambiar entre páginas
function cambiarPagina(pagina) {
    paginaInicial.style.display = "none";
    paginaOpciones.style.display = "none";

    if (pagina === "inicial") {
        paginaInicial.style.display = "block";
    } else if (pagina === "opciones") {
        paginaOpciones.style.display = "block";
    }
}
