// Servicio parz almacenamiento en base de datos local
class ProductoServicio{
    constructor(){
        this.nombreDB = "productosDB"
        this.db = null;
        this.objStore = "almacen"
    }

    
    // Recibe un objeto Producto para que podamos guardarlo en una base de datos local
    async agregarProducto(producto){
        if(!this.db){
            throw new Error("No se ha accedido a la base de datos")
        }

        return new Promise((resolve, reject) => {
            const req = this.db.transaction([this.objStore], "readwrite")
                                .objectStore(this.objStore)
                                .add(producto)
            req.onsuccess = (e)=>{
                resolve(e.target.result)
            }

            req.onerror = (e)=>{
                reject(e.target.result)
            }
        })
    }

    // Para el catalogo de productos
    async obtenerProductos(){
        this.verificarConexion()

        return new Promise((resolve, reject)=>{
            const req = this.db.transaction([this.objStore], "readonly")
            .objectStore(this.objStore)
            .getAll()

            req.onsuccess = (e)=>{
                resolve(e.target.result)
            }

            req.onerror = (e)=>{
                reject(e.target.result)
            }
        })
    }

    
    verificarConexion(){       
        if(!this.db){
            throw new Error("Base de datos no inicializada")
        }
    }

    async abrirDB(){
        return new Promise((resolve, reject) =>{
            // Abrir base de datos
            const req = indexedDB.open(this.nombreDB, 1)
            
            // Manejadores para la conexion
            req.onsuccess = (e)=>{
                console.log("Capacidad para almacenar datos [ACTIVA]")
                this.db = e.target.result
                resolve(this.db) // entregar la base de datos abierta
            }
        
            req.onerror = (e)=>{
                console.log("Capacidad para almacenar datos [ERROR]")
                console.log(e.target.errorCode)
                reject(e)
            }
        
            req.onupgradeneeded = (e)=>{
                this.db = e.target.result
                console.log("Actualizando ó creando estructura de base de datos")
                
                // Crear la tabla donde irá a almacenar los productos
                if(!this.db.objectStoreNames.contains(this.objStore)){
                    this.db.createObjectStore(this.objStore, {keyPath: "id", autoIncrement: true})       
                }
            }
        })
    }
}


// Pruebas para servicio
async function main(){
    const service = new ProductoServicio()
    await service.abrirDB()
    await service.agregarProducto({descripcion: "PC Gamer", precio: "999"})
    service.
    const productos = await service.obtenerProductos()
    console.log(productos)
}

main()