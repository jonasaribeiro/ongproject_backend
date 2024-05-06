const errorFactory = (defaultMessage: string, statusCode: number) => {
  return class extends AppError {
    constructor(message: string = defaultMessage) {
      super(message, statusCode);
    }
  };
};

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}

export class EnvironmentVariableError extends AppError {
  constructor(missingVariables: string[]) {
    super("Environment variable error", 500);
    console.error(
      "============================================================================",
      "\nErro crítico: As seguintes variáveis de ambiente necessárias estão faltando:\n",
      "\n*",
      missingVariables.join("\n* "),
      "\n\n============================================================================\n"
    );
  }
}

export class ExpiredTokenError extends AppError {
  expiredIn: Date;

  constructor(message: string = "Token expirado", expiredIn: Date) {
    super(message, 401);
    this.expiredIn = expiredIn;
  }
}

export const ServerError = errorFactory("Erro interno do servidor", 500);
export const FieldIsNotUniqueError = errorFactory(
  "Algum campo não é único",
  400
);
export const ValidationError = errorFactory("Falha na validação", 400);
export const NotFoundError = errorFactory("Recurso não encontrado", 404);
export const ConflictError = errorFactory("Ocorreu algum conflito", 409);
export const AuthenticationError = errorFactory("Autenticação falhou", 401);
