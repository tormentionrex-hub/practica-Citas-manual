const bienvenida = document.getElementById("bienvenida");
const formCita = document.getElementById("formCita");
const inputFecha = document.getElementById("fecha");
const inputHora = document.getElementById("hora");
const mensaje = document.getElementById("mensaje");

let sesion = JSON.parse(localStorage.getItem("sesion")); // aqui se guarda la sesion

if(!sesion){
    window.location.href = "login.html"; // si no hay sesion, te redirige a login
}

bienvenida.textContent = "Bienvenido " + sesion.nombre; 

let citas = JSON.parse(localStorage.getItem("citas")) || []; // aqui se guardan las citas

formCita.addEventListener("submit", function(e){  // el evento submit
    e.preventDefault();

    const fecha = inputFecha.value;
    const hora = inputHora.value;

    let hoy = new Date().toISOString().split("T")[0];    //aqui se valida las fechas pasadas

    if(fecha < hoy){
        mensaje.textContent = "No puedes reservar fechas pasadas";
        return;
    }

   
    let existeCita = citas.find(c =>        //aqui evito las citas duplicadas que tengan la misma fecha y hora 
        c.email === sesion.email &&
        c.fecha === fecha &&
        c.hora === hora
    );

    if(existeCita){
        mensaje.textContent = "Ya tienes una cita en esa fecha y hora";
        return;
    }

   
    let nuevaCita = {       //aqui se crea una nueva cita                   
        email: sesion.email,
        fecha: fecha,
        hora: hora
    };

    citas.push(nuevaCita);  //aqui con el "push" se guardan las citas en el localStorage
    localStorage.setItem("citas", JSON.stringify(citas));

    mensaje.textContent = "Cita creada correctamente";

    formCita.reset();

    
    console.log("Citas guardadas:", citas);

});
