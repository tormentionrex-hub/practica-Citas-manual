const listaCitas = document.getElementById("listaCitas");
const mensaje = document.getElementById("mensaje");


let sesion = JSON.parse(localStorage.getItem("sesion")); // aqui se llama a la sesion

if(!sesion){
window.location.href = "login.html"; // si no hay sesion, te redirige a login
}


let citas = JSON.parse(localStorage.getItem("citas")) || []; // aqui se llama a las citas


let misCitas = citas.filter(c => c.email === sesion.email); // aqui se filtran las citas


if(misCitas.length === 0){ // si no hay citas
mensaje.textContent = "No tienes citas registradas"; // muestra el mensaje
}


misCitas.forEach((cita, index) => {     // aqui se recorren las citas
let li = document.createElement("li");  

let span = document.createElement("span");  
span.textContent = cita.fecha + " - " + cita.hora;  // aqui se muestra la fecha y hora de la cita

let boton = document.createElement("button"); // aqui se crea el boton de eliminar
boton.textContent = "Eliminar";
boton.setAttribute("data-index", index);  // Guardar el index de la cita en el botón para saber cuál eliminar después


// Agregar los elementos dentro de "li"
li.appendChild(span);
li.appendChild(boton);

// aqui agrego el <li> a la lista <ul>
listaCitas.appendChild(li);
});


// evento de escucha deberia escuchar clicks dentro de la lista
listaCitas.addEventListener("click", function(Evento){

    // verifica si lo que se hizo click fue un botón
if(Evento.target.tagName === "BUTTON"){

    //Obtengo el index guardado en el botón
let index = Evento.target.getAttribute("data-index");


// aqui se obtienen las citas globales osea se traen todas las citas del sistema
let citasGlobal = JSON.parse(localStorage.getItem("citas")) || [];


// aqui se filtran las citas globales para obtener solo las citas del usuario que no coincidan con la fecha y hora de la cita que se va a eliminar
let nuevasCitas = citasGlobal.filter(c =>
!(c.email === sesion.email &&
c.fecha === misCitas[index].fecha &&
c.hora === misCitas[index].hora)
);



localStorage.setItem("citas", JSON.stringify(nuevasCitas)); // aqui se guardan las citas en el localStorage


window.location.reload(); // aqui se recarga la pagina para mostrar las citas actualizadas
}
});