import express, { Request, Response } from "express";
import path from "path";

const server = express();
const port = 3000;

// Ruta /hello
server.get("/hello", (_req: Request, res: Response): void => {
    res.send("Hello, world!");
});

// Ruta /api/names
server.get("/api/names", async (_req: Request, res: Response): Promise<void> => {
    try {
        const names = ["Alice", "Bob", "Charlie"];
        res.json(names);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error en el servidor");
    }
});

// Ruta /api/weather/:zipcode
server.get("/api/weather/:zipcode", (req: Request, res: Response): void => {
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
server.get("/components/weather", (req: Request, res: Response): void => {
    const filePath = path.join(process.cwd(), "public", "weather.xhtml");
    res.setHeader("Content-Type", "text/html");
    res.sendFile(filePath);
});

// Iniciar el servidor
server.listen(port, (): void => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});