// aqui se captura el formulario
const form = document.getElementById("formRegistro");


// aqui se capturan los inputs
const inputNombre = document.getElementById("nombre");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");


// aqui se captura el mensaje
const mensaje = document.getElementById("mensaje");


// Trae los usuarios guardados. Si no hay nada, crea un array vacío.
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];    // array de usuarios


// aqui se escucha el evento submit del formulario
form.addEventListener("submit", function(e){  // submit es el evento que se ejecuta cuando se envia el formulario
e.preventDefault(); // evita que la pagina se recargue


const nombre = inputNombre.value;               // value es el valor del input
const email = inputEmail.value;
const password = inputPassword.value;


console.log("Usuarios actuales:", usuarios);                // usuarios es el array de usuarios
console.log("Nuevo registro:", nombre, email, password);    // nombre, email y password son los valores de los inputs

let usuarioExistente = usuarios.find(u => u.email === email); // find busca si ya existe un usuario con el mismo correo y u.email === email es para buscar si el correo ya existe

console.log("el usuario existente es:", usuarioExistente);        // usuarioExistente es el usuario que se encuentra con el correo ingresado

if (usuarioExistente) {
    mensaje.textContent = "El usuario ya existe";    // Si el correo ya existe no se permite registrar y muestra el mensaje de "El usuario ya existe"
    return;
}

let nuevoUsuario = {
    
    nombre: nombre,
    email: email,
    password: password                   
                                        
                                        
                                       
}

usuarios.push(nuevoUsuario);             // se agrega el usuario al array
localStorage.setItem("usuarios", JSON.stringify(usuarios)); // aqui se guarda en localStorage
mensaje.textContent = "Registro exitoso"; // y aqui lanzaria el mensaje de confirmación

form.reset(); // aqui se resetea el formulario osea borra los inputs automáticamente después de registrar

setTimeout(() => {
    window.location.href = "../html/login.html";  // aqui te redirige a la pagina de login  
}   

, 1500) // aqui espera 1500 milisegundos para que se redirija (agregar "," antes de 1500 porque si no da error)

});
