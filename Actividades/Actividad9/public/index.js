"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const server = (0, express_1.default)();
const port = 3000;
// Ruta /hello
server.get("/hello", (_req, res) => {
    res.send("Hello, world!");
});
// Ruta /api/names
server.get("/api/names", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const names = ["Alice", "Bob", "Charlie"];
        res.json(names);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Error en el servidor");
    }
}));
// Ruta /api/weather/:zipcode
server.get("/api/weather/:zipcode", (req, res) => {
    const { zipcode } = req.params;
    // Simulación de datos meteorológicos
    const weatherData = {
        zipcode,
        weather: "sunny",
        temperature: 25
    };
    res.json(weatherData);
});
// Ruta para servir el archivo weather.xhtml
server.get("/components/weather", (req, res) => {
    const filePath = path_1.default.join(process.cwd(), "public", "weather.xhtml");
    res.setHeader("Content-Type", "text/html");
    res.sendFile(filePath);
});
// Iniciar el servidor
server.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
