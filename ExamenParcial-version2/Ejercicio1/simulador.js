var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// creamos una clase abstracta Task que implementa BaseTask. Esta clase tiene un constructor que 
// toma un id y un type, y los asigna a propiedades públicas. También declara un método abstracto 
// execute() que puede devolver void o Promise<void>. Esta clase sirve como base para todos nuestros 
// tipos específicos de tareas, asi aseguramos que todas tengan un id, un tipo y un método execute.
var Task = /** @class */ (function () {
    function Task(id, type) {
        this.id = id;
        this.type = type;
    }
    return Task;
}());
// Implementamos cuatro clases concretas que extienden Task: MicroTask, MacroTask, NextTickTask y AsyncTask.
//  Cada una de estas clases representa un tipo específico de tarea en el Event Loop. Por ejemplo, MicroTask 
// tiene un constructor que toma un id y un mensaje, llama al constructor de la clase padre con el id y el tipo 
// 'micro', y guarda el mensaje como una propiedad privada
// Su método execute() devuelve una Promise que se resuelve inmediatamente y luego imprime un mensajito.
var MicroTask = /** @class */ (function (_super) {
    __extends(MicroTask, _super);
    function MicroTask(id, message) {
        var _this = _super.call(this, id, 'micro') || this;
        _this.message = message;
        return _this;
    }
    MicroTask.prototype.execute = function () {
        var _this = this;
        return Promise.resolve().then(function () {
            console.log("MICROTASK ".concat(_this.id, ": Soy un microTask, tengo prioridad antes que los macroTask, y me acabo de ejecutar al final de la primera fase antes de pasar a la siguiente iteraci\u00F3n del Event loop"));
        });
    };
    return MicroTask;
}(Task));
var MacroTask = /** @class */ (function (_super) {
    __extends(MacroTask, _super);
    function MacroTask(id, message, delay) {
        var _this = _super.call(this, id, 'macro') || this;
        _this.message = message;
        _this.delay = delay;
        return _this;
    }
    MacroTask.prototype.execute = function () {
        var _this = this;
        setTimeout(function () {
            console.log("MACROTASK ".concat(_this.id, ": Soy un macroTask, me ejecuto porque ya pas\u00F3 la primera fase del event loop. Tambi\u00E9n, tuve que esperar a la microTask"));
        }, this.delay);
    };
    return MacroTask;
}(Task));
var NextTickTask = /** @class */ (function (_super) {
    __extends(NextTickTask, _super);
    function NextTickTask(id, message) {
        var _this = _super.call(this, id, 'nextTick') || this;
        _this.message = message;
        return _this;
    }
    NextTickTask.prototype.execute = function () {
        var _this = this;
        process.nextTick(function () {
            console.log("NEXTTICK TASK ".concat(_this.id, ": Soy un nextTickTask, me ejecuto antes de cualquier tarea en esta fase del event loop, de hecho, me ejecuto antes de las microTasks"));
        });
    };
    return NextTickTask;
}(Task));
var AsyncTask = /** @class */ (function (_super) {
    __extends(AsyncTask, _super);
    function AsyncTask(id, message, delay) {
        var _this = _super.call(this, id, 'async') || this;
        _this.message = message;
        _this.delay = delay;
        return _this;
    }
    AsyncTask.prototype.execute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("ASYNCTASK ".concat(this.id, ": Iniciando un ASYNC TASK"));
                        return [4 /*yield*/, new Promise(function (resolve) {
                                setTimeout(function () {
                                    console.log("ASYNCTASK ".concat(_this.id, ": Resolviendo promesa del ASYNC TASK despu\u00E9s de ").concat(_this.delay / 1000, " segundos"));
                                    resolve();
                                }, _this.delay);
                            })];
                    case 1:
                        _a.sent();
                        console.log("ASYNCTASK ".concat(this.id, ": Promesa resuelta del ASYNC TASK."));
                        return [2 /*return*/];
                }
            });
        });
    };
    return AsyncTask;
}(Task));
// clase EventLoopSimulator es donde ocurre la lógica de nuestra simulación, me refiero a que:
// Tiene un array privado tasks para almacenar las tareas a ejecutar y un contador taskId para 
// asignar IDs únicos. El método privado createTask usa generics para crear instancias de tareas 
// de manera segura. Por ejemplo, cuando llamamos a createTask(MicroTask, "mensaje"), se crea una 
// nueva instancia de MicroTask con un ID único y el mensaje proporcionado.
var EventLoopSimulator = /** @class */ (function () {
    function EventLoopSimulator() {
        this.tasks = [];
        this.taskId = 0;
    }
    EventLoopSimulator.prototype.createTask = function (TaskClass) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return new (TaskClass.bind.apply(TaskClass, __spreadArray([void 0, ++this.taskId], args, false)))();
    };
    // Los métodos públicos addMicroTask, addMacroTask, addNextTickTask y addAsyncTask 
    // permiten agregar diferentes tipos de tareas
    EventLoopSimulator.prototype.addMicroTask = function (message) {
        this.tasks.push(this.createTask(MicroTask, message));
    };
    EventLoopSimulator.prototype.addMacroTask = function (message, delay) {
        this.tasks.push(this.createTask(MacroTask, message, delay));
    };
    EventLoopSimulator.prototype.addNextTickTask = function (message) {
        this.tasks.push(this.createTask(NextTickTask, message));
    };
    EventLoopSimulator.prototype.addAsyncTask = function (message, delay) {
        this.tasks.push(this.createTask(AsyncTask, message, delay));
    };
    // Este método recorre todas las tareas en el array tasks y las ejecuta en orden. 
    // Usa await para manejar tanto tareas síncronas como asíncronas, lo que significa 
    // que esperará a que cada tarea termine antes de pasar a la siguiente.
    EventLoopSimulator.prototype.runSimulation = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, task;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log('Empezando simulación del EVENT LOOP...');
                        _i = 0, _a = this.tasks;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        task = _a[_i];
                        return [4 /*yield*/, task.execute()];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        console.log('Simulación del Event Loop finalizada.');
                        return [2 /*return*/];
                }
            });
        });
    };
    return EventLoopSimulator;
}());
// Simulamos
function runDemo() {
    return __awaiter(this, void 0, void 0, function () {
        var simulator;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    simulator = new EventLoopSimulator();
                    // Crea una instancia del simulador, agrega varias tareas 
                    // de diferentes tipos (un nextTick, dos micro, dos macro y una async), y luego ejecuta la simulación.
                    simulator.addNextTickTask('Primera tarea nextTick');
                    simulator.addMicroTask('Primera microtarea');
                    simulator.addMacroTask('Primera macrotarea', 0);
                    simulator.addAsyncTask('Tarea asíncrona', 3000);
                    simulator.addMicroTask('Segunda microtarea');
                    simulator.addMacroTask('Segunda macrotarea', 1000);
                    return [4 /*yield*/, simulator.runSimulation()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
runDemo().catch(console.error);
// Para ejecutar este código:
// 1. Guarda este archivo como 'simulador.ts'
// 2. Compila el código TypeScript a JavaScript: tsc simulador.ts
// 3. Ejecuta el archivo JavaScript resultante: node simulador.js
