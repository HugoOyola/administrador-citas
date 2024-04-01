// Selectores
const pacienteInput = document.querySelector("#paciente");
const propietarioInput = document.querySelector("#propietario");
const emailInput = document.querySelector("#email");
const fechaInput = document.querySelector("#fecha");
const sintomasInput = document.querySelector("#sintomas");

const formulario = document.querySelector("#formulario-cita");

// Objeto de cita
const citaObj = {
  paciente: "",
  propietario: "",
  email: "",
  fecha: "",
  sintomas: "",
};

// EventListeners
pacienteInput.addEventListener("change", datosCitas);
propietarioInput.addEventListener("change", datosCitas);
emailInput.addEventListener("change", datosCitas);
fechaInput.addEventListener("change", datosCitas);
sintomasInput.addEventListener("change", datosCitas);

formulario.addEventListener("submit", submitCita);

// Funciones
function datosCitas(e) {
  citaObj[e.target.name] = e.target.value;
  // console.log(citaObj);
}

function submitCita(e) {
  e.preventDefault();

  if (Object.values(citaObj).some(valor => valor.trim() === "")) {
    const notificacion = new Notificacion({
      texto: "Todos los campos son obligatorios",
      tipo: "error"
    });
    notificacion.mostrar();
    return;
  }
}

class Notificacion {
  constructor({texto, tipo}) {
    this.texto = texto;
    this.tipo = tipo;
  }

  mostrar(){
    // Crear notificación
    const alerta = document.createElement("DIV");
    alerta.classList.add("text-center", "w-full", "p-3", "text-white", "my-5", "alert", "uppercase", "font-bold", "text-sm");

    // Eliminar alertas previas
    const alertaPrevia = document.querySelector(".alert");
    alertaPrevia?.remove()

    // Si es tipo error, agregar una clase
    this.tipo === "error" ? alerta.classList.add("bg-red-500") : alerta.classList.add("bg-green-500");

    // Mensaje de error
    alerta.textContent = this.texto;

    // Agregar al DOM
    formulario.parentElement.insertBefore(alerta, formulario);

    // Eliminar la alerta después de 5 segundos
    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
}
