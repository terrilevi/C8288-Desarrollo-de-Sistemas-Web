// Tenemos nuestro mismo objeto creado: 

const tienda3 = {
    manzana: {
        pedidos : 1,
    }
};

// (Create) Crear una funcion para agregar un producto(ejemplo: pera) 

const funcion_agregar = (producto) => {
    tienda3[producto] = { pedidos: 0 };
    return tienda3; //Verifiquemos si es que se logró añadir la pera: 
}; 

// (Delete) Eliminar un productos(ejemplo: pera)
const funcion_eliminar = (producto) => {
    delete tienda3[producto];
    return tienda3; //Verifiquemos si es que se logró eliminar la pera: 
};


// Intentemos encapsular estas dos funciones en arrow functions
// y luego usamos closures 
const tienda_Encapsulada = (() => {
    const tiendita = { ...tienda3 }; // no deseo tocar mi tienda3, si no usar tiendita.
    
    // creo mis dos funciones arrow:
    // primero la funciones para agregarProducto
    const agregarProducto = (producto) => {
        tiendita[producto] = { pedidos: 0 };
        return tiendita;
    };
    // segundo creo mi funcion para eliminarProducto
    const eliminarProducto = (producto) => {
        delete tiendita[producto];
        return tiendita;
    };

    return {
        agregarProducto,
        eliminarProducto,
    };
})();

// Intentemos encapsular estas dos funciones con closures :
// Primero para agregarProducto:
console.log(tienda_Encapsulada.agregarProducto('pera'));
// Segundo para eliminarProducto:
console.log(tienda_Encapsulada.eliminarProducto('pera'));

// A lo que ya tenemos, todos son objetos, pero podemos implementar 
// un ejemplo de como esto seria en una clase
// que represente otro producto como platano y su pedido que sea
// tambien una clase. 

class Producto {
    // Definimos nuestro constructor que inicializa un producto con su nombre 
    // y el número de pedidos, ponemos primero
    // que el numero de pedidos sea 0 (hasta que recien lo actualicemos con un valor).
    constructor(nombre, pedidos = 0) {
        this.nombre = nombre;
        this.pedidos = pedidos;
    }
    // aqui ya podemos incrementar nuestros pedidos con un metodo de instancia.
    incrementarPedidos() {
        this.pedidos += 1;
    }

    // Luego estos deben tener metodos de instancia y metodos
    // estaticos.
    // Como estamos usando productos y sus numeros de pedidos,
    // podemos comparar los dos productos y ver el numero de pedidos totales.
    static compararPedidos(producto1, producto2) {
        return producto1.pedidos - producto2.pedidos;
    }

    // Por ultimo podemos usar getters y setters para gestionar la
    // propiedad y su pedido.
    // EN este caso usaremos getters y setter de la siguiente manera:

    // Getter para obtener el número de pedidos de un producto
    get pedidosProducto() {
        return this.pedidos;
    }

    // Setter para actualizar el número de pedidos de un producto
    set pedidosProducto(cantidad) {
        this.pedidos = cantidad;
    }
}

// probemos nuestra clase producto 
const platano = new Producto('platano', 5);
platano.incrementarPedidos(); 

// aca queremos ver el numero de pedidos de nuestro producto platano
console.log(platano.pedidosProducto); 
 
// Y si actualizamos el numero de pedidos de nuestro producto platano a 10:
platano.pedidosProducto = 10;          
console.log(platano.pedidosProducto);




