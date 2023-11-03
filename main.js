// Declarar un objeto con el menú de la semana
const menuSemana = {
    Lunes: {
        primerPlato: "Sopa de lentejas",
        segundoPlato: "Lomo de cerdo a la parrilla con salsa de mostaza",
        postre: "Tarta de chocolate con helado de vainilla",
    },
    Martes: {
        primerPlato: "Sopa de tomate",
        segundoPlato: "Pollo al curry con arroz basmati",
        postre: "Flan de caramelo",
    },
    Miércoles: {
        primerPlato: "Gazpacho",
        segundoPlato: "Entrecot a la pimienta con patatas gratinadas",
        postre: "Pastel de queso con frutos rojos",
    },
    Jueves: {
        primerPlato: "Sopa de calabaza",
        segundoPlato: "Costillas de cerdo a la barbacoa con maíz asado",
        postre: "Tarta de manzana",
    },
    Viernes: {
        primerPlato: "Sopa de cebolla",
        segundoPlato: "Pechuga de pollo a la naranja con arroz salvaje",
        postre: "Tiramisú",
    },
};

// Función para resaltar palabras buscadas en el menú
function resaltarPalabraBuscada() {
    const searchBox = document.getElementById("searchBox");
    const menuText = document.getElementById("menuOfDay").textContent;
    const searchText = searchBox.value.toLowerCase(); // Convertir a minúsculas para hacer coincidencia sin distinción entre mayúsculas y minúsculas

    if (searchText) {
         //'g' para que no se pare en la primera coincidencia y 'i' para que no distinga de mayuscula o minuscula
        const menuResaltado = menuText.replace(new RegExp(searchText, 'gi'),
        (match) => `<span class="text-success">${match}</span>`);
        document.getElementById("menuOfDay").innerHTML = menuResaltado;
    } else {
        // Si el cuadro de búsqueda está vacío, mostrar el menú original
        mostrarMenuDelDia();
    }
}

// Event listener para el cuadro de búsqueda
document.getElementById("searchBox").addEventListener("input", resaltarPalabraBuscada);

// Función para mostrar el menú del día actual
function mostrarMenuDelDiaActual() {
    const today = new Date();
    const weekdays = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const currentDay = weekdays[today.getDay()]; // Obtener el día de la semana actual
    document.getElementById("daySelector").value = currentDay

    // Obtén los elementos de entrada para el horario de apertura y cierre
    const openTimeInput = document.getElementById("openTime");
    const closeTimeInput = document.getElementById("closeTime");

    // Si el día actual está en el menú, muestra la información
    if (currentDay in menuSemana) {
        // Obtén el menú del día actual
        const menuOfDay = menuSemana[currentDay];

        // Llena el menú del día
        const menuHTML = `<h3>${currentDay}</h3>
            <p>Primer Plato: ${menuOfDay.primerPlato}</p>
            <p>Segundo Plato: ${menuOfDay.segundoPlato}</p>
            <p>Postre: ${menuOfDay.postre}</p>`;

        document.getElementById("menuOfDay").innerHTML = menuHTML;

        // Si el menú tiene horario, llénalo en los campos de entrada
        if (menuOfDay.openTime && menuOfDay.closeTime) {
            openTimeInput.value = menuOfDay.openTime;
            closeTimeInput.value = menuOfDay.closeTime;
        }
    } else {
        // Si el día actual no tiene un menú, muestra un mensaje
        document.getElementById("menuOfDay").textContent = "No se encontró el menú para este día.";

        // Borra los valores de los horarios de apertura y cierre
        openTimeInput.value = "";
        closeTimeInput.value = "";
    }
}

// Mostrar el menú del día actual al cargar la página
mostrarMenuDelDiaActual();

// Event listener para el cambio en el campo de selección
document.getElementById("daySelector").addEventListener("change", () => {
    mostrarMenuDelDia();
});

// Event listener para el botón de comprobar estado
document.getElementById("checkStatusBtn").addEventListener("click", comprobarEstado);

// Función para mostrar el menú correspondiente al día seleccionado en el select
function mostrarMenuDelDia() {
    const selectedDay = document.getElementById("daySelector").value;
    const menuOfDay = menuSemana[selectedDay];

    // Obtén los elementos de entrada para el horario de apertura y cierre
    const openTimeInput = document.getElementById("openTime");
    const closeTimeInput = document.getElementById("closeTime");

    if (menuOfDay) {
        // Si el día seleccionado tiene un menú, muestra la información
        const menuHTML = `<h3>${selectedDay}</h3>
            <p>Primer Plato: ${menuOfDay.primerPlato}</p>
            <p>Segundo Plato: ${menuOfDay.segundoPlato}</p>
            <p>Postre: ${menuOfDay.postre}</p>`;

        document.getElementById("menuOfDay").innerHTML = menuHTML;

        // Si el menú tiene horario, llénalo en los campos de entrada
        if (menuOfDay.openTime && menuOfDay.closeTime) {
            openTimeInput.value = menuOfDay.openTime;
            closeTimeInput.value = menuOfDay.closeTime;
        }
    } else {
        // Si el día seleccionado no tiene un menú, muestra un mensaje
        document.getElementById("menuOfDay").textContent = "No se encontró el menú para este día.";

        // Borra los valores de los horarios de apertura y cierre
        openTimeInput.value = "";
        closeTimeInput.value = "";
    }
}

// Event listener para comprobar el estado
document.getElementById("checkStatusBtn").addEventListener("click", comprobarEstado);

// Función para comprobar el estado del restaurante
function comprobarEstado() {
    const openTimeInput = document.getElementById("openTime");
    const closeTimeInput = document.getElementById("closeTime");

    // Obtener los valores de los campos de entrada
    const openTime = openTimeInput.value;
    const closeTime = closeTimeInput.value;

    const [openHours, openMinutes] = openTime.split(":");
    const [closeHours, closeMinutes] = closeTime.split(":");

    const currentTime = new Date();
    const openDateTime = new Date();
    const closeDateTime = new Date();

    openDateTime.setHours(openHours, openMinutes, 0, 0);
    closeDateTime.setHours(closeHours, closeMinutes, 0, 0);

    if (currentTime >= openDateTime && currentTime <= closeDateTime) {
        // El restaurante está abierto
        document.getElementById("timeRemaining").textContent = 'El restaurante ya está abierto.';
    } else {
        if (currentTime < openDateTime) {
            // Calcular la diferencia de tiempo hasta la próxima apertura (tomando en cuenta el cierre anterior)
            const timeRemaining = openDateTime - currentTime;
            const hoursRemaining = Math.floor(timeRemaining / 3600000);
            const minutesRemaining = Math.floor((timeRemaining % 3600000) / 60000);
            document.getElementById("timeRemaining").textContent = `Falta: ${hoursRemaining} horas y ${minutesRemaining} minutos para la apertura.`;
        } else {
            // Calcular la diferencia de tiempo hasta la próxima apertura (tomando en cuenta el cierre posterior)
            const nextOpenDateTime = new Date(openDateTime.getTime() + 24 * 60 * 60 * 1000); // Agregar 24 horas
            const timeRemaining = nextOpenDateTime - currentTime;
            const hoursRemaining = Math.floor(timeRemaining / 3600000);
            const minutesRemaining = Math.floor((timeRemaining % 3600000) / 60000);
            document.getElementById("timeRemaining").textContent = `Falta: ${hoursRemaining} horas y ${minutesRemaining} minutos para la apertura.`;
        }
    }
}
