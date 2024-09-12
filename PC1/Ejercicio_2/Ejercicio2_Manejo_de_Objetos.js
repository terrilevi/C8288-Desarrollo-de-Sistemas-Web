// ******* Creacion del objeto que representa productos y pedidos: 
// primero creare un objeto, este objeto tendrá como propiedades productos y pedidos

const tienda3 = {
    manzana: {
        pedidos : 1,
    }
};

// ******* Uso de copias superficiales y profundas

// Si por ejemplo alguien, desea realizar una copia de 
// el estado actual porque un cliente hizo un pedido de manzana
// pero todavia no pago, entonces, se realiza una copia de
// productos se cambiaria a manzana.pedidos = 2 



// ¿Que pasaria si realizo una copia superficial? , veamos:

// realizo una copia a mi tienda3:
let tiendacopia_superficial = tienda3
console.log(tiendacopia_superficial)

// modifico mi copia:
tiendacopia_superficial.pedidos = 2

// verificamos si mi tienda3 cambio, SE SUPONE QUE NO DEBERIA:
console.log(tienda3) // si cambió.


// entonces no deberia realizar eso, puedo usar copia profunda:
// veamos:
// cabe señalar que pueda que esto no funcione, si mi objeto tuviese mas anidaciones estaremos
// usando una referencia.
// Pero, en este caso, si funciona:


// realizamos la copia a mi tienda3:

function copiarCategoriaProf(categoria) {
    return { ...tienda3[categoria] };
}
let copiaSuperficial_tienda = copiarCategoriaProf('manzana');
console.log("Copia a mi tienda3:" + copiaSuperficial_tienda)

// hacemos el cambio para que pedidos = 2 
copiaSuperficial_tienda.pedidos = 2

// verificamos que se haya hecho el cambio en la copia:
console.log("Verificamos que se haya hecho el cambio en la copia: " + copiaSuperficial_tienda)

// verificamos que no se haya modificado tienda3.
console.log("tienda3.manzana.pedidos no cambió: " + tienda3.manzana.pedidos) // no cambió nada. yeey!!


// ******* Fusion de objetos para actualizar la informacion de
// ******* los productos y pedidos:
delete(tienda3.pedidos)
// voy a agregar mas productos de manzana pero que necesiten ser fusionado
// por ejemplo para tener nuestra categoria de mayorcantidad_de_manzana:

tienda3.manzana.pedidos = 3 // creo una propiedad manzana

// Creo mi función para fusionar productos.
function fusionarProductos(categoria1, categoria2, nuevaCategoria){
    tienda3[nuevaCategoria] = { ...tienda3[categoria1], ...tienda3[categoria2] };
}

fusionarProductos('manzana', 'manzana', 'categoriaMax_Manzana')
console.log(tienda3)

// ******* Uso de optional chaining:
// Un ejemplo simple seria solo verificar si en tienda3 existe
// una propiedad llamada stock...

console.log(tienda3?.stock) // no existe esa propiedad
console.log(tienda3?.manzana) // si existe esa propiedad



