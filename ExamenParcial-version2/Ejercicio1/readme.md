## Para el desarrollo de esta pregunta, usé el código que realicé en el examen, pero le agregué algunas funcionalidades más:

En mi código original, defini funciones individuales para cada tipo de tarea: primerMicroTask(), primerMacroTask(), nextTickTask(), y primerasyncTask(), cada función implementaba directamente el comportamiento de su tipo de tarea. Por ejemplo, primerMicroTask() usaba Promise.resolve().then() para simular una microtarea, mientras que primerMacroTask() usaba setTimeout() para simular una macrotarea.
**Lo que hacemos ahora es usar una estructura orientada a objetos. En lugar de funciones independientes, ahora tenemos una jerarquía de clases. La clase abstracta Task sirve como base para todas las tareas, y luego tenemos clases específicas como MicroTask, MacroTask, NextTickTask, y AsyncTask que extienden esta clase base. Esto permite consistencia y reutilizacion para las tareas.**

En mi código original, para la simulación del Event Loop, estaba encapsulando en la clase evenLoopEjemplo, que tenía un único método inicioSimulacion(). Este método simplemente llamaba a las funciones de tarea. Era un enfoque fácil, pero menos flexible para agregar o modificar tareas.
**Ahora introducimos la clase EventLoopSimulator,esta clase mantiene un array de tareas y proporciona métodos para agregar diferentes tipos de tareas (como addMicroTask, addMacroTask). El método runSimulation() en esta clase ejecuta todas las tareas en el orden en que fueron agregadas**

En mi código original tipaba la promesa en primerasyncTask() como Promise<void>. **Ahora incluimos tipos unión (TaskType), interfaces (BaseTask), clases abstractas, y genéricos.**

En mi código original, usaba diferentes enfoques para cada tipo de tarea. Por ejemplo, primerMicroTask() devolvía una Promise, mientras que primerasyncTask() era una función async. **Ahora hacemos que todas las tareas implementen un método execute() que puede ser síncrono o asíncrono.**

En mi código original creaba una instancia de evenLoopEjemplo y llamabas a inicioSimulacion().  **Ahora definimos una función runDemo() que crea un EventLoopSimulator, agrega varias tareas, y luego ejecuta la simulación.**

