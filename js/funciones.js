import Notificacion from "./classes/Notificacion.js";
import AdminCitas from "./classes/AdminCitas.js";
import { citaObj, editando} from "./variables.js";
import { formulario, formularioInput, pacienteInput, propietarioInput, emailInput, fechaInput, sintomasInput } from "./selectores.js";

export const citas = new AdminCitas();

export function datosCitas(e) {
  citaObj[e.target.name] = e.target.value;
  // console.log(citaObj);
}

export function submitCita(e) {
  e.preventDefault();
  if (Object.values(citaObj).some((valor) => valor.trim() === "")) {
    const notificacion = new Notificacion({
      texto: "Todos los campos son obligatorios",
      tipo: "error",
    });
    notificacion.mostrar();
    return;
  }

  if (editando.value) {
    citas.editarCita({ ...citaObj });
    new Notificacion({
      texto: "Guardado correctamente",
      tipo: "correcto",
    }).mostrar();
  } else {
    citas.agregarCita({ ...citaObj });
    new Notificacion({
      texto: "Cita agregada correctamente",
      tipo: "correcto",
    }).mostrar();
  }
  formulario.reset();
  reiniciarObjetoCita();
  formularioInput.value = "Registrar cita";
  editando.value = false;
}

export function reiniciarObjetoCita() {
  // Reiniciar el objeto
  // citaObj.paciente = "";
  // citaObj.propietario = "";
  // citaObj.email = "";
  // citaObj.fecha = "";
  // citaObj.sintomas = "";

  Object.assign(citaObj, {
    id: generarId(),
    paciente: "",
    propietario: "",
    email: "",
    fecha: "",
    sintomas: "",
  });
}

export function generarId(){
  return Math.random().toString(36).substring(2)+Date.now();
}

export function cargarEdicion(cita) {
  Object.assign(citaObj, cita);

  pacienteInput.value = cita.paciente;
  propietarioInput.value = cita.propietario;
  emailInput.value = cita.email;
  fechaInput.value = cita.fecha;
  sintomasInput.value = cita.sintomas;

  editando.value = true;

  formularioInput.value = "Guardar cambios";
}