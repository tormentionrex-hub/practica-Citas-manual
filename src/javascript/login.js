const form = document.getElementById("formLogin");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const mensaje = document.getElementById("mensaje");


let usuarios = JSON.parse(localStorage.getItem("usuarios")) || []; // aqui se llama a el array de usuarios

form.addEventListener("submit", function(recarga) {

recarga.preventDefault(); // evita que la pagina se recargue

const email = inputEmail.value; // value es el valor del input
const password = inputPassword.value; // value es el valor del input

console.log("Login:", email, password);
console.log("Usuarios en el sistema:", usuarios);

// buscar al usuario por el correo
let usuarioValido = usuarios.find(u => u.email === email);   // find busca dentro del array usuarios si hay alguien con ese mismo correo (asi se evita que haya )


console.log("El usuario valido es:", usuarioValido); 
// usuarioValido es el usuario que se encuentra con el correo ingresado

if (!usuarioValido ) {
    mensaje.textContent = "Usuario no encontrado"; // si el correo no existe
    return;
}

if (usuarioValido.password !== password) {
    mensaje.textContent = "Contraseña incorrecta"; // si la contraseña no coincide
    return;
}

if (usuarioValido) {
    mensaje.textContent = "Login exitoso"; // si todo es correcto

   localStorage.setItem("sesion", JSON.stringify({     // aqui se guarda en localStorage
    nombre: usuarioValido.nombre,
    email: usuarioValido.email

}));


    setTimeout(() => {
        window.location.href = "../html/dashboard.html";  // aqui te redirige a la pagina de dashboard
    }   

    , 1500) 
}

});
