import "../Models/DatabaseConection.js"
import {AdministrarCitas, nuevaCita, listadoCitas} from "../Controllers/AdministrarCitas.js"
import {    
    nuevaCitaForm,
    btnLimpiarCitas,
    mascotaInput,
    propietarioInput,
    telefonoInput,
    fechaInput,
    horaInput,
    sintomasInput} from "../Models/elementosDOM.js";


    AdministrarCitas.mostrarCitas(listadoCitas)

    nuevaCitaForm.addEventListener('submit',(e)=>{
        e.preventDefault();

        nuevaCita.mascota = mascotaInput.value
        nuevaCita.propietario = propietarioInput.value
        nuevaCita.telefono = telefonoInput.value
        nuevaCita.fecha = fechaInput.value
        nuevaCita.hora = horaInput.value
        nuevaCita.sintomas = sintomasInput.value
        console.log(nuevaCita);

        AdministrarCitas.enviarFormulario(nuevaCita)
    })
    
    btnLimpiarCitas.addEventListener('click',function(e){
        e.preventDefault()
        AdministrarCitas.limpiarCitas()
        AdministrarCitas.mostrarCitas(listadoCitas)
    })






