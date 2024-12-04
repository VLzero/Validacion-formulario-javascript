document.getElementById("formulario").addEventListener("submit", (event) => {
  event.preventDefault();

  // Validar campo nombre
  let entradaNombre = document.getElementById("name");
  let errorNombre = document.getElementById("nameError");
  validarCampo(entradaNombre, errorNombre, "Por favor introducir tu nombre");

  // Validar correo electrónico
  let emailEntrada = document.getElementById("email");
  let emailError = document.getElementById("emailError");
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Patrón de validación
  validarCampo(
    emailEntrada,
    emailError,
    "Por favor introducir un email válido",
    emailPattern
  );

  // Validar la contraseña
  let contrasenaEntrada = document.getElementById("password").value;
  let contrasenaError = document.getElementById("passwordError");
  const caracteres = document.getElementById("caracteres");
  const numeros = document.getElementById("numeros");
  const mayusculas = document.getElementById("mayusculas");
  const minusculas = document.getElementById("minusculas");
  const caracteresEsp = document.getElementById("caracteresEsp");

  let error = false;

  // Validar longitud
  error =
    validarContrasena(
      contrasenaEntrada.length >= 7,
      caracteres,
      "Más de 7 Caracteres"
    ) || error;

  // Validar números
  error =
    validarContrasena(/\d/.test(contrasenaEntrada), numeros, "Números") ||
    error;

  // Validar mayúsculas
  error =
    validarContrasena(
      /[A-Z]/.test(contrasenaEntrada),
      mayusculas,
      "Mayúsculas"
    ) || error;

  // Validar minúsculas
  error =
    validarContrasena(
      /[a-z]/.test(contrasenaEntrada),
      minusculas,
      "Minúsculas"
    ) || error;

  // Validar caracteres especiales
  error =
    validarContrasena(
      /[$@$!%*?&#.$($)$-$_]/.test(contrasenaEntrada),
      caracteresEsp,
      "Caracteres Especiales"
    ) || error;

  // Mostrar mensaje de error si hay algún error
  if (error) {
    contrasenaError.classList.add("error-message");
  } else {
    contrasenaError.classList.remove("error-message");
  }

  // Si todos los campos están validados, enviar formulario
  if (!errorNombre.textContent && !emailError.textContent && !error) {
    // BACKEND QUE RECIBA LA INFORMACIÓN
    alert("El formulario se ha enviado con éxito");
    document.getElementById("formulario").reset();
  }
});

function validarCampo(campo, errorCampo, mensajeError, pattern = /.+/) {
  if (!pattern.test(campo.value.trim())) {
    errorCampo.textContent = mensajeError;
    errorCampo.classList.add("error-message");
  } else {
    errorCampo.textContent = "";
    errorCampo.classList.remove("error-message");
  }
}

function validarContrasena(condicion, elemento, mensaje) {
  if (condicion) {
    elemento.textContent = `✓ ${mensaje}`;
    elemento.classList.add("valid");
    elemento.classList.remove("invalid");
    return false;
  } else {
    elemento.textContent = `✗ ${mensaje}`;
    elemento.classList.add("invalid");
    elemento.classList.remove("valid");
    return true;
  }
}
