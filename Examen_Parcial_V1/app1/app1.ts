// para el primer ejercicio no olvidar:
// transpilar el codigo ts a js 
// mostrar ejecucion del js

// tsc base.tsc
// node app1.js


// En este código usaré:
// setTimeout para las macro-tasks,
// Promises y process.nextTick para las micro-tasks

function primerMicroTask() {
    return Promise.resolve().then(() => { // si usamos promise.resolve().then  
        // nos permite añadir a la cola el microstask
        // en este caso planteo que un microstask tiene mayor prioridad a un macrotask
      console.log('MICROTASK: Soy un microTask, tengo prioridad antes que los macroTask, y me acabo de ejecutar al final de la primera fase antes de pasar a la siguiente iteracion del Event loop'); // usamos la funcion flecha que
      // solo imprime en la consola un mensaje sin recibir parametros.
    });
  }
  
  // Function to simulate a macrotask using setTimeout
function primerMacroTask() {
    setTimeout(() => {
      console.log('MACROTASK: Soy un macroTask, me ejecuto porque ya pasó la primera fase del event loop. Tambien, tuve que esperar a la microTask');
    }, 0); // tiene un delay de 0, pero igual esta tarea se ejecuta despues de las microstasks
  }


// Another function to simulate a task using process.nextTick
function nextTickTask() {
    process.nextTick(() => {
      console.log('NEXTTICK TASK: soy un nextTickTask, me ejecuto antes de cualquier tarea en esta fase del event loop, de hecho, me ejecuto antes de las microTasks');
    });
  }


  // Hagamos una funcion que use promises y async y await
async function primerasyncTask() {
    console.log('ASYNCTASK: Iniciando un ASYNC TASK');
  
    // Usemos una promesa que resuelve despues de un segundo
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log('ASYNCTASK: Resolviendo promesa del ASYNC TASK despues de 3 segundos'); 
        resolve(); // se resuleve despues del settimeout 3 segundos
      }, 3000);
    });
  
    console.log('ASYNCTASK: Promesa resuelta del ASYNC TASK.');
  }
  
  
// Clase q encapsula la simulacion
class evenLoopEjemplo {
// metodo q inicia la simulacion
public inicioSimulacion() {
    console.log('Empezando simulacion del EVENT LOOP...');
    nextTickTask();
    primerMicroTask();     
    primerMacroTask();     
    primerasyncTask();     
    }
  }
  
// creamos una instancia de la simulacion
const simulator = new evenLoopEjemplo();
// ejecutamos la simulacion
simulator.inicioSimulacion();