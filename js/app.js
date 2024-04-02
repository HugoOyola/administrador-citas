// Selectores
const pacienteInput = document.querySelector("#paciente");
const propietarioInput = document.querySelector("#propietario");
const emailInput = document.querySelector("#email");
const fechaInput = document.querySelector("#fecha");
const sintomasInput = document.querySelector("#sintomas");

const formulario = document.querySelector("#formulario-cita");
const contenedorCitas = document.querySelector("#citas");

// EventListeners
pacienteInput.addEventListener("change", datosCitas);
propietarioInput.addEventListener("change", datosCitas);
emailInput.addEventListener("change", datosCitas);
fechaInput.addEventListener("change", datosCitas);
sintomasInput.addEventListener("change", datosCitas);

formulario.addEventListener("submit", submitCita);

// Objeto de cita
const citaObj = {
  paciente: "",
  propietario: "",
  email: "",
  fecha: "",
  sintomas: "",
};

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

class AdminCitas{
  constructor() {
    this.citas = [];
  }

  agregarCita(cita){
    this.citas = [...this.citas, cita];
    this.mostrarCitas();
  }

  mostrarCitas(){
    // Limpiar el HTML
    while(contenedorCitas.firstChild){
      contenedorCitas.removeChild(contenedorCitas.firstChild);
    }

    this.citas.forEach(cita => {
      const divCita = document.createElement("DIV");
      divCita.classList.add("mx-5", 'my-10', 'bg-white', 'shadow-md', 'px-5', 'py-10', 'rounded-xl');

      const paciente = document.createElement("P");
      paciente.classList.add("font-normal", "mb-3", "text-gray-700","normal-case");
      paciente.innerHTML = `<span class="font-bold uppercase">Paciente:</span> ${cita.paciente}`;

      // Insertar en el HTML
      divCita.appendChild(paciente);

      contenedorCitas.appendChild(divCita);
    })
  }
}

// Funciones
function datosCitas(e) {
  citaObj[e.target.name] = e.target.value;
  // console.log(citaObj);
}

const citas = new AdminCitas();

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

  citas.agregarCita(citaObj);
}
