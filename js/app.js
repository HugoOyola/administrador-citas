// Selectores
const pacienteInput = document.querySelector("#paciente");
const propietarioInput = document.querySelector("#propietario");
const emailInput = document.querySelector("#email");
const fechaInput = document.querySelector("#fecha");
const sintomasInput = document.querySelector("#sintomas");

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

// Funciones
function datosCitas(e) {
  citaObj[e.target.name] = e.target.value;
  console.log(citaObj);
}

