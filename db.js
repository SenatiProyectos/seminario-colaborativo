function abrirDB(){
    const nombreDB = "productosDB"
    const objStore = "almacen"

    return new Promise((resolve, reject) =>{
        // Abrir base de datos
        const req = indexedDB.open(nombreDB, 1)
        
        // Manejadores para la conexion
        req.onsuccess = ()=>{
            console.log("Capacidad para almacenar datos [ACTIVA]")
        }
    
        req.onerror = (e)=>{
            console.log("Capacidad para almacenar datos [ERROR]")
            console.log(e.target.errorCode)
        }
    
        req.onupgradeneeded = (e)=>{
            let db = e.target.result
            console.log("Actualizando ó creando estructura de base de datos")
            
            // Crear la tabla donde irá a almacenar los productos
            if(!db.objectStoreNames.contains(objStore)){
                db.createObjectStore(objStore, {keyPath: "id"})       
            }
        }
    })
}


function test_abrirDB(){
    abrirDB().then(db => {
        console.log("Acceso a base de datos: ", db)
    }).catch(error => {
        console.error("No se pudo abrir la base de datos: ", error)
    })
}

test_abrirDB()