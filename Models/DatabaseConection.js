class DatabaseConection {
    constructor(){
        this.createConection()
    }

    createConection  = () =>{
        const veterinariaDB = indexedDB.open('veterinariaDatabase',1);

        veterinariaDB.onupgradeneeded = (e)=>{
            const veterinariaDatabase =  e.target.result;

            const citas = veterinariaDatabase.createObjectStore('citas',{                                                    
                keyPath:'id',
                autoIncrement: false
            })

            citas.createIndex('ix_Mascota','Mascota',{unique: false})
            citas.createIndex('ix_propietario','propietario',{unique:false})
            citas.createIndex('ix_telefono','telefono',{unique:false})
            citas.createIndex('ix_fecha','fecha',{unique:false})
            citas.createIndex('ix_hora','hora',{unique:false})
            citas.createIndex('ix_sintomas','sintomas',{unique:false})
            
        }

    }
}

new DatabaseConection();

export default DatabaseConection