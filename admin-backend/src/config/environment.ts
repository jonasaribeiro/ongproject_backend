import { EnvironmentVariableError } from "../errors/CustomErrors";

const dotenv = require("dotenv");
dotenv.config();

const REQUIRED_ENV_VARIABLES = {
  common: [
    "DATABASE_URL",
    "SECRET_KEY",
    "TOKEN_EXPIRES_IN",
    "VIDEO_STORAGE_PATH",
  ],
  development: [],
  production: [],
  test: [],
};

type EnvironmentType = "development" | "production" | "test";

function checkEnvironmentVariables(): void {
  const currentEnv = (process.env.NODE_ENV || "development") as EnvironmentType;

  const requiredVariables = [
    ...REQUIRED_ENV_VARIABLES.common,
    ...REQUIRED_ENV_VARIABLES[currentEnv],
  ];

  const missingVariables = requiredVariables.filter(
    (variable) =>
      typeof process.env[variable] === "undefined" ||
      process.env[variable] === ""
  );

  if (missingVariables.length > 0)
    throw new EnvironmentVariableError(missingVariables);
}

export const SERVER_PORT = process.env.SERVER_PORT
  ? parseInt(process.env.SERVER_PORT)
  : 3001;

export const DATABASE_URL = process.env.DATABASE_URL!;
export const SECRET_KEY = process.env.SECRET_KEY!;
export const TOKEN_EXPIRES_IN = process.env.TOKEN_EXPIRES_IN!;
export const VIDEO_STORAGE_PATH = process.env.VIDEO_STORAGE_PATH!;

export default checkEnvironmentVariables;
