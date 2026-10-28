import { Citas } from '../Models/Citas.js';
import {nuevaCitaForm} from '../Models/elementosDOM.js'
import { veterinariaDatabase } from '../Models/VeterinariaDatabase.js';

export let listadoCitas = await veterinariaDatabase.listarCitas(undefined)
export let nuevaCita = new Citas()

let CitaEditar = new Citas();

export class AdministrarCitas {
    
    static limpiarCitas(){
        listadoCitas = []
    }

    static enviarFormulario(objCita){
        const btnCita = nuevaCitaForm.querySelector('button[type="submit"]')
        const validacion = AdministrarCitas.ValidarFormulario(objCita)
        
        if (!validacion) {
            const div = document.createElement('div')
            div.setAttribute('id', 'divError')
            div.className = 'alert alert-danger align-items-center justify-content-center d-flex'

            const error = document.createElement('p');
            error.className = 'm-0 font-weight-bold';            
            error.textContent="Todos los campos son obligatorios"

            div.appendChild(error)            

            nuevaCitaForm.insertBefore(div, btnCita.parentElement)

            setTimeout(()=>{
                const div = document.getElementById('divError')
                if(div){
                    div.remove()
                }
                
            },2000)
            return
        }

        if (CitaEditar.id != undefined) {

            const citaAnterior = listadoCitas.find((cita) => cita.id == nuevaCita.id);

        if (citaAnterior != undefined) {
            Object.assign(citaAnterior, {...nuevaCita})
            CitaEditar = new Citas()
            nuevaCita = new Citas()
        }
        
        }else{
            nuevaCita.id = crypto.randomUUID()
            listadoCitas.push({...nuevaCita})
            veterinariaDatabase.guardarCita({...nuevaCita})

        }

        AdministrarCitas.mostrarCitas(listadoCitas)
        btnCita.innerText = "CREAR CITA"
        nuevaCitaForm.reset()
    }

    static editar(cita){
        CitaEditar = cita
        nuevaCita = cita
        
        const btnEnviar = nuevaCitaForm.querySelector('button[type="submit"]')       

        nuevaCitaForm.elements['mascota'].value = cita.mascota
        nuevaCitaForm.elements['propietario'].value = cita.propietario
        nuevaCitaForm.elements['telefono'].value = cita.telefono
        nuevaCitaForm.elements['fecha'].value = cita.fecha
        nuevaCitaForm.elements['hora'].value = cita.hora
        nuevaCitaForm.elements['sintomas'].value = cita.sintomas
        
        btnEnviar.innerText = "GUARDAR CAMBIOS"
        
    }

    static eliminar(id){
        listadoCitas = listadoCitas.filter(cita=>cita.id !== id)
        this.mostrarCitas(listadoCitas)
    }

    static mostrarCitas(objCitas){

        const listadoCitasDiv = document.querySelector('#citas')
        while(listadoCitasDiv.firstElementChild){
            listadoCitasDiv.removeChild(listadoCitasDiv.firstElementChild)
        }

        objCitas?.forEach((cita) => {            
            
            const divCard = document.createElement('div');
            divCard.style.height='160px';
            divCard.style.maxHeight='160px'

            const divCardContainer = document.createElement('div');
            const imgNumber = Math.floor(Math.random() * 5) + 1;
            divCardContainer.style.height='100%'

            divCardContainer.classList='mt-0 card w-full flex-row align-center justify-content-between overflow-hidden'


            const pictureContainer = document.createElement('figure');

            const divInfo = document.createElement('div');
            divInfo.className='col p-3'

            
            const pictureImg = document.createElement('img');
            pictureImg.src= `./img/${imgNumber}.jpg`
            console.log(imgNumber);
            pictureImg.classList=''
            pictureImg.style.width='100%'
            pictureImg.style.height='100%';
            pictureImg.style.objectPosition = 'center'
            pictureImg.style.objectFit = 'cover'
            /*pictureImg.className = 'object-fit-cover object-center'*/

            
            
            pictureContainer.style.width='30%'
            pictureContainer.style.height='100%'  /*cooregir*/
            
            pictureContainer.style.backgroundColor='rgb(250, 36, 36)'
             
            pictureContainer.className='col p-0 overflow-hidden'

            pictureContainer.appendChild(pictureImg);
            divCard.style.borderRadius = '8px'
            divCard.style.marginTop = '5%'
            // divCard.style.height = '50px'

            divCard.className = 'mb-2 shadow-md rounded-xl card__cita'
            divCard.style.position= 'relative'


            /*imagenes__contenedores*/            
            
            divCardContainer.appendChild(divInfo);
            divCardContainer.appendChild(pictureContainer)
            divCard.appendChild(divCardContainer)

            /*Info mascota*/
            Object.entries(cita).forEach(([key, value])=>{

                if (key != 'id') {
                
                const p = document.createElement('P')
                const spanKey = document.createElement('span')
                spanKey.style.color = 'inherit'
                const spanValue = document.createElement('span')
                spanValue.style.color = 'inherit'
                
                spanKey.style.fontWeight='bold'                
                p.className='m-0'
                p.style.color = 'rgba(0, 0, 0, 0.79)';
                p.appendChild(spanKey)
                p.appendChild(spanValue)
                spanKey.textContent = `${key}: `
                spanValue.textContent = value      
                divInfo.appendChild(p)
                
                }
            
            })

            const divBotones = document.createElement('DIV')
            divBotones.role='group'            
            divBotones.style.zIndex = 5
            divBotones.style.right='5px'
            divBotones.style.top='5px'            
            divBotones.style.position='absolute'
            divBotones.className = ''

            

            const btnEditar = document.createElement('button')
            const htmlIconEdit = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="M218.62-128q-38.35 0-64.48-26.14Q128-180.27 128-218.62v-522.76q0-38.35 26.14-64.48Q180.27-832 218.62-832h355.46l-66 66H218.62q-9.24 0-16.93 7.69-7.69 7.69-7.69 16.93v522.76q0 9.24 7.69 16.93 7.69 7.69 16.93 7.69h522.76q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93v-292.53l66-66v358.53q0 38.35-26.14 64.48Q779.73-128 741.38-128H218.62ZM480-480Zm-93 93v-123.62l353.77-353.76q10.61-10.62 22.1-14.66 11.49-4.04 23.75-4.04 12 0 24.49 4.54 12.5 4.54 22.74 14.39L861.31-838q10.38 10.62 15.19 23.25 4.81 12.63 4.81 25.53 0 12.91-4.34 24.7-4.33 11.79-15.12 22.21L506.77-387H387Zm427.54-401.62-26.46-30.76 26.46 30.76ZM453-453h25.69l254.62-253.62-12.85-13.84-15.38-14.39L453-482.77V-453Zm267.46-267.46-15.38-14.39 15.38 14.39 12.85 13.84-12.85-13.84Z"/></svg>';

            btnEditar.className='rounded rounded-4 border-0 m-1';
            btnEditar.style.backgroundColor ='#E0A458'
            btnEditar.insertAdjacentHTML('afterbegin',htmlIconEdit)

            const btnElimiar =  document.createElement('button')
            const htmlIconDelete='<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="M300.62-128q-38.85 0-64.74-25.88Q210-179.77 210-218.62V-724h-40v-66h188v-38.77h246V-790h188v66h-40v505.38q0 38.35-26.14 64.48Q699.73-128 661.38-128H300.62ZM686-724H276v505.38q0 10.77 6.92 17.7 6.93 6.92 17.7 6.92h360.76q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93V-724ZM371.31-275h66v-368h-66v368Zm153.38 0h66v-368h-66v368ZM276-724v530-530Z"/></svg>';

            btnElimiar.className= 'rounded rounded-4 border-0 m-1';
            btnElimiar.style.backgroundColor = '#D9534F'
            btnElimiar.insertAdjacentHTML('afterbegin',htmlIconDelete)

            

         
            divBotones.appendChild(btnEditar);
            divBotones.appendChild(btnElimiar);
            divCard.insertBefore(divBotones, divCardContainer)
            btnEditar.onclick = ()=> this.editar(cita)
            btnElimiar.onclick = ()=> this.eliminar(cita.id)
            listadoCitasDiv.appendChild(divCard)          

        });
    }
    
    static obtenerDatosFormulario(event, nuevaCita ){ 
        nuevaCita[event.target.name] = event.target.value
        
    };

    static ValidarFormulario(objCita){

        const {id, ...cita} = objCita
        if(Object.values(cita).some(prop=> prop === '' || prop == undefined)){
            return false
        }

        return true

    }
    
}
