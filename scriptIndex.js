const rutaBaseImagenes = "img/"

function crearCatalogoProducto(producto){
    const catalogo = document.querySelector('.listProductos')
    const template = document.querySelector("#templateProducto");

    // Clonamos el template para modificarlo y agregarlo con los datos
    const clone = template.content.cloneNode(true);

    const img = clone.querySelector('#productoImg')
    const descripcion = clone.querySelector('#productoDescripcion')
    const precio = clone.querySelector('#productoPrecio')
    const stock = clone.querySelector('#productoStock')

    // Coloca los datos del producto al elemento
    img.src = rutaBaseImagenes + producto.img
    descripcion.textContent = producto.descripcion
    precio.textContent = "S/." + producto.precio
    stock.textContent = producto.stock
    stock.innerHTML += "<span> en stock</span>" // texto de apoyo para el cliente

    // Agregar al contenedor de todos los productos
    catalogo.appendChild(clone) 
}
// Cargar todos los productos de la base de datos: IndexedDB
document.addEventListener("DOMContentLoaded", async () => {
    const productoServicio = new ProductoServicio()

    // Producto de pruebas
    const producto = {
        descripcion: "Panadol Forte",
        precio: "99.0",
        stock: "29",
        img: "sin-imagen"
    }
    
    await productoServicio.abrirDB()

    // await productoServicio.agregarProducto(producto)
    const productos = await productoServicio.obtenerProductos()


    productos.forEach(producto => {
        crearCatalogoProducto(producto)
    });
});
