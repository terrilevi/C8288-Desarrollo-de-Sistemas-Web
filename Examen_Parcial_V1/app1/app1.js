// para el primer ejercicio no olvidar:
// transpilar el codigo ts a js 
// mostrar ejecucion del js
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// tsc base.tsc
// node app1.js
// En este código usaré:
// setTimeout para las macro-tasks,
// Promises y process.nextTick para las micro-tasks
function primerMicroTask() {
    return Promise.resolve().then(function () {
        // nos permite añadir a la cola el microstask
        // en este caso planteo que un microstask tiene mayor prioridad a un macrotask
        console.log('MICROTASK: Soy un microTask, tengo prioridad antes que los macroTask, y me acabo de ejecutar al final de la primera fase antes de pasar a la siguiente iteracion del Event loop'); // usamos la funcion flecha que
        // solo imprime en la consola un mensaje sin recibir parametros.
    });
}
// Function to simulate a macrotask using setTimeout
function primerMacroTask() {
    setTimeout(function () {
        console.log('MACROTASK: Soy un macroTask, me ejecuto porque ya pasó la primera fase del event loop. Tambien, tuve que esperar a la microTask');
    }, 0); // tiene un delay de 0, pero igual esta tarea se ejecuta despues de las microstasks
}
// Another function to simulate a task using process.nextTick
function nextTickTask() {
    process.nextTick(function () {
        console.log('NEXTTICK TASK: soy un nextTickTask, me ejecuto antes de cualquier tarea en esta fase del event loop, de hecho, me ejecuto antes de las microTasks');
    });
}
// Hagamos una funcion que use promises y async y await
function primerasyncTask() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('ASYNCTASK: Iniciando un ASYNC TASK');
                    // Usemos una promesa que resuelve despues de un segundo
                    return [4 /*yield*/, new Promise(function (resolve) {
                            setTimeout(function () {
                                console.log('ASYNCTASK: Resolviendo promesa del ASYNC TASK despues de 3 segundos');
                                resolve(); // se resuleve despues del settimeout 3 segundos
                            }, 3000);
                        })];
                case 1:
                    // Usemos una promesa que resuelve despues de un segundo
                    _a.sent();
                    console.log('ASYNCTASK: Promesa resuelta del ASYNC TASK.');
                    return [2 /*return*/];
            }
        });
    });
}
// Clase q encapsula la simulacion
var evenLoopEjemplo = /** @class */ (function () {
    function evenLoopEjemplo() {
    }
    // metodo q inicia la simulacion
    evenLoopEjemplo.prototype.inicioSimulacion = function () {
        console.log('Empezando simulacion del EVENT LOOP...');
        nextTickTask();
        primerMicroTask();
        primerMacroTask();
        primerasyncTask();
    };
    return evenLoopEjemplo;
}());
// creamos una instancia de la simulacion
var simulator = new evenLoopEjemplo();
// ejecutamos la simulacion
simulator.inicioSimulacion();
