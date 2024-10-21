// Aqui estamos definiendo como un tipo unión TaskType:
// que representa los cuatro tipos específicos de tareas que nuestra simulación maneja: 
// 'micro', 'macro', 'nextTick' y 'async'. significa que solo estos cuatro tipos de tareas 
// puedan ser creados en nuestra simulación
type TaskType = 'micro' | 'macro' | 'nextTick' | 'async';
//Luego definimos BaseTask, que es un tipo que especifica que cada tarea debe tener un id de
//  tipo number y un type que corresponde a uno de los cuatro tipos definidos en TaskType.
type BaseTask = {
  id: number;
  type: TaskType;
};

// creamos una clase abstracta Task que implementa BaseTask. Esta clase tiene un constructor que 
// toma un id y un type, y los asigna a propiedades públicas. También declara un método abstracto 
// execute() que puede devolver void o Promise<void>. Esta clase sirve como base para todos nuestros 
// tipos específicos de tareas, asi aseguramos que todas tengan un id, un tipo y un método execute.
abstract class Task implements BaseTask {
  constructor(public id: number, public type: TaskType) {}
  abstract execute(): void | Promise<void>;
}

// Implementamos cuatro clases concretas que extienden Task: MicroTask, MacroTask, NextTickTask y AsyncTask.
//  Cada una de estas clases representa un tipo específico de tarea en el Event Loop. Por ejemplo, MicroTask 
// tiene un constructor que toma un id y un mensaje, llama al constructor de la clase padre con el id y el tipo 
// 'micro', y guarda el mensaje como una propiedad privada
// Su método execute() devuelve una Promise que se resuelve inmediatamente y luego imprime un mensajito.

class MicroTask extends Task {
  constructor(id: number, private message: string) {
    super(id, 'micro');
  }
  execute(): Promise<void> {
    return Promise.resolve().then(() => {
      console.log(`MICROTASK ${this.id}: Soy un microTask, tengo prioridad antes que los macroTask, y me acabo de ejecutar al final de la primera fase antes de pasar a la siguiente iteración del Event loop`);
    });
  }
}

// Para implementar una macrotareas, creamos nuestro constructor q recibe tres parámetros: id para identificar la tarea, 
// message que será el contenido del mensaje a mostrar, y delay que determina el tiempo de espera. 
// Llamamos a super(id, 'macro') para inicializar la clase base con el tipo 'macro'. En el método execute() 
// usamos setTimeout para simular una tarea que se ejecuta después de un delay específico
class MacroTask extends Task {
  constructor(id: number, private message: string, private delay: number) {
    super(id, 'macro');
  }
  execute(): void {
    setTimeout(() => {
      console.log(`MACROTASK ${this.id}: Soy un macroTask, me ejecuto porque ya pasó la primera fase del event loop. También, tuve que esperar a la microTask`);
    }, this.delay);
  }
}

// Ahora, para implementar nuestro nextTick, Su constructor toma un id y un mensaje, y llama al constructor padre 
// especificando el tipo 'nextTick'. 
// El método execute() utiliza process.nextTick() de node.js, que tiene la prioridad más alta en el eventloop
class NextTickTask extends Task {
  constructor(id: number, private message: string) {
    super(id, 'nextTick');
  }
  execute(): void {
    process.nextTick(() => {
      console.log(`NEXTTICK TASK ${this.id}: Soy un nextTickTask, me ejecuto antes de cualquier tarea en esta fase del event loop, de hecho, me ejecuto antes de las microTasks`);
    });
  }
}

// esta clase representa una tarea asincrona, Su constructor toma id, message y delay. El método execute() 
// : es una función async que primero imprime un mensaje inicio,
// luego crea una nueva Promise que se resolverá después del delay especificado, y finalmente imprime un 
// mensaje de finalización
class AsyncTask extends Task {
  constructor(id: number, private message: string, private delay: number) {
    super(id, 'async');
  }
  async execute(): Promise<void> {
    console.log(`ASYNCTASK ${this.id}: Iniciando un ASYNC TASK`);
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log(`ASYNCTASK ${this.id}: Resolviendo promesa del ASYNC TASK después de ${this.delay/1000} segundos`);
        resolve();
      }, this.delay);
    });
    console.log(`ASYNCTASK ${this.id}: Promesa resuelta del ASYNC TASK.`);
  }
}

// clase EventLoopSimulator es donde ocurre la lógica de nuestra simulación, me refiero a que:
// Tiene un array privado tasks para almacenar las tareas a ejecutar y un contador taskId para 
// asignar IDs únicos. El método privado createTask usa generics para crear instancias de tareas 
// de manera segura. Por ejemplo, cuando llamamos a createTask(MicroTask, "mensaje"), se crea una 
// nueva instancia de MicroTask con un ID único y el mensaje proporcionado.
class EventLoopSimulator {
  private tasks: Task[] = [];
  private taskId: number = 0;

  private createTask<T extends Task>(
    TaskClass: new (...args: any[]) => T,
    ...args: any[]
  ): T {
    return new TaskClass(++this.taskId, ...args);
  }
  // Los métodos públicos addMicroTask, addMacroTask, addNextTickTask y addAsyncTask 
  // permiten agregar diferentes tipos de tareas
  // addMicroTask solo necesita un mensaje, mientras que addMacroTask y addAsyncTask necesitan 
  // un mensaje y un delay. internamente, cada método usa createTask para crear una nueva 
  // instancia del tipo de tarea correspondiente y la agrega al array tasks usando push
  public addMicroTask(message: string): void {
    this.tasks.push(this.createTask(MicroTask, message));
  }

  public addMacroTask(message: string, delay: number): void {
    this.tasks.push(this.createTask(MacroTask, message, delay));
  }

  public addNextTickTask(message: string): void {
    this.tasks.push(this.createTask(NextTickTask, message));
  }

  public addAsyncTask(message: string, delay: number): void {
    this.tasks.push(this.createTask(AsyncTask, message, delay));
  }
// esta es nuestra función asíncrona que primero imprime un mensaje de inicio. luego, itera sobre todas las tareas 
// almacenadas en el array tasks usando un bucle for. Para cada tarea llama a su método execute() usando await. 
// basicamente esperará a que cada tarea se complete antes de pasar a la siguiente q es como una simulacion de un event loop

  public async runSimulation(): Promise<void> {
    console.log('Empezando simulación del EVENT LOOP...');
    for (const task of this.tasks) {
      await task.execute();
    }
    console.log('Simulación del Event Loop finalizada.');
  }
}

// Simulamos
async function runDemo() {
  const simulator = new EventLoopSimulator();
  // Crea una instancia del simulador, agrega varias tareas 
  // de diferentes tipos (un nextTick, dos micro, dos macro y una async), y luego ejecuta la simulación.
  simulator.addNextTickTask('Primera tarea nextTick');
  simulator.addMicroTask('Primera microtarea');
  simulator.addMacroTask('Primera macrotarea', 0);
  simulator.addAsyncTask('Tarea asíncrona', 3000);
  simulator.addMicroTask('Segunda microtarea');
  simulator.addMacroTask('Segunda macrotarea', 1000);

  await simulator.runSimulation();
}

runDemo().catch(console.error);

// Para ejecutar este código:
// 1. Guarda este archivo como 'simulador.ts'
// 2. Compila el código TypeScript a JavaScript: tsc simulador.ts
// 3. Ejecuta el archivo JavaScript resultante: node simulador.js
