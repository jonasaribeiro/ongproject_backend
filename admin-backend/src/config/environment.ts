import { EnvironmentVariableError } from "../errors/CustomErrors";

const dotenv = require("dotenv");
dotenv.config();

const REQUIRED_ENV_VARIABLES = [
  "DATABASE_URL",
  "SECRET_KEY",
  "TOKEN_EXPIRES_IN",
  "VIDEO_STORAGE_PATH",
  "SERVER_PORT",
];
const OPTIONAL_ENV_VARIABLES = [];

function checkEnvironmentVariables(): void {
  const missingRequired = REQUIRED_ENV_VARIABLES.filter(
    (variable) =>
      typeof process.env[variable] === "undefined" ||
      process.env[variable] === ""
  );

  const missingOptional = OPTIONAL_ENV_VARIABLES.filter(
    (variable) =>
      typeof process.env[variable] === "undefined" ||
      process.env[variable] === ""
  );

  if (missingRequired.length > 0) {
    if (!process.env.SKIP_ENV_VALIDATION) {
      throw new EnvironmentVariableError(missingRequired);
    } else {
      console.warn(
        `Warning: Missing required environment variables: ${missingRequired.join(
          ", "
        )}. Running with SKIP_ENV_VALIDATION enabled.`
      );
    }
  }

  if (missingOptional.length > 0) {
    console.warn(
      `Warning: Missing optional environment variables: ${missingOptional.join(
        ", "
      )}`
    );
  }
}

export const SERVER_PORT = parseInt(process.env.SERVER_PORT!);
export const DATABASE_URL = process.env.DATABASE_URL!;
export const SECRET_KEY = process.env.SECRET_KEY!;
export const TOKEN_EXPIRES_IN = process.env.TOKEN_EXPIRES_IN!;
export const VIDEO_STORAGE_PATH = process.env.VIDEO_STORAGE_PATH!;

export default checkEnvironmentVariables;
