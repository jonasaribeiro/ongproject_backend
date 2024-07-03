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

// Generic errors
export const ServerError = errorFactory("Erro interno do servidor", 500);
export const FieldIsNotUniqueError = errorFactory(
  "Algum campo não é único",
  400
);
export const ValidationError = errorFactory("Falha na validação", 400);
export const NotFoundError = errorFactory("Recurso não encontrado", 404);
export const ConflictError = errorFactory("Ocorreu algum conflito", 409);
export const AuthenticationError = errorFactory("Autenticação falhou", 401);

// File upload errors
export const FileUploadError = errorFactory("Erro no upload do arquivo", 500);
export const FileNotFoundError = errorFactory("Arquivo não encontrado", 404);
export const FileDeletionError = errorFactory("Erro ao deletar arquivo", 500);
export const InvalidFileTypeError = errorFactory(
  "Tipo de arquivo inválido",
  400
);

// Video processing errors
export const VideoConversionError = errorFactory(
  "Falha na conversão do vídeo para qualquer resolução",
  500
);
export const FfmpegHelperError = errorFactory(
  "Erro ao obter resolução do vídeo",
  500
);
export const VideoConversionProcessError = errorFactory(
  "Erro na conversão do vídeo",
  500
);

// Database errors
export const DatabaseConnectionError = errorFactory(
  "Erro na conexão com o banco de dados",
  500
);
export const DatabaseQueryError = errorFactory(
  "Erro na consulta ao banco de dados",
  500
);
export const EntityCreationError = errorFactory(
  "Erro na criação da entidade no banco de dados",
  500
);
export const EntityDeletionError = errorFactory(
  "Erro ao deletar entidade no banco de dados",
  500
);
