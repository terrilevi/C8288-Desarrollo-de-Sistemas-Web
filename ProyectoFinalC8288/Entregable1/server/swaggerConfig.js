import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "fake-media-social", // Change this title to reflect your project
      version: "1.0.0",
      description: "documentacion API de fake-social-media",
    },
    servers: [
      {
        url: "http://localhost:5000", // Replace 5000 with your server's actual port
      },
    ],
  },
  apis: ["./routes/*.js"], // Include all route files in the routes folder

};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
export default swaggerDocs;
