import "express-async-errors";
import app from "./config/app.routes";
import checkEnvironmentVariables, { SERVER_PORT } from "./config/environment";
import prisma from "./config/prisma";

const main = async () => {
  try {
    checkEnvironmentVariables();

    await prisma.$connect();
    console.log("Conexão com o banco de dados estabelecida com sucesso.");

    app.listen(SERVER_PORT, () => {
      console.log(`Servidor rodando na porta ${SERVER_PORT}`);
    });
  } catch (error) {
    console.error(
      "Não foi possível estabelecer conexão com o banco de dados:",
      error
    );
    process.exit(1);
  }
};

main();

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
