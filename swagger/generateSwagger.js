const fs = require("fs");
const path = require("path");
const swaggerJsdoc = require("swagger-jsdoc");
const { swaggerOptions } = require("../src/swagger");

const swaggerSpec = swaggerJsdoc(swaggerOptions);

fs.writeFileSync(
  path.resolve(__dirname, "../swagger/swagger.json"),
  JSON.stringify(swaggerSpec, null, 2)
);

console.log("✅ Swagger JSON generated: swagger.json");
