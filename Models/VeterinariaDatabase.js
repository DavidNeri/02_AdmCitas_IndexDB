export class veterinariaDatabase{

    static listarCitas(id){
        return new Promise((resolve, reject)=>{
            const veterinariaDBConection = indexedDB.open('veterinariaDatabase',1)

            veterinariaDBConection.onsuccess = ()=>{
                const veterinariaDatabase = veterinariaDBConection.result;

                const transaccion =  veterinariaDatabase.transaction('citas','readonly')
                const objStoreCitas = transaccion.objectStore('citas');

                const request = id !== undefined ? objStoreCitas.get(id) : objStoreCitas.getAll()

                request.onsuccess = ()=>{
                    resolve(request.result)
                }

                request.onerror = (e)=>{
                    reject(e)
                }
            }

            veterinariaDBConection.onerror = (e) =>{
                reject(e)
            }            
        })        
    }    

    static guardarCita(cita){
        const SolicitudConeccion = indexedDB.open('veterinariaDatabase',1)
        SolicitudConeccion.onsuccess = (e)=>{
            const db = e.target.result;
            const transaccion = db.transaction('citas','readwrite') //Inicio de transaccion
            const citasStore = transaccion.objectStore('citas') //Acceso al Store

            citasStore.add({
                id:cita.id,
                mascota: cita.mascota, 
                propietario: cita.propietario,
                telefono: cita.telefono,
                fecha:cita.fecha,
                hora: cita.hora,
                sintomas: cita.sintomas
            })   
        }
    }

}




