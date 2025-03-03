type LogLevel = "debug" | "info" | "warn" | "error";

// Configuración del logger
const LOG_LEVEL: LogLevel = (process.env.LOG_LEVEL as LogLevel) || "info";

// Mapa de prioridad de niveles de log
const LOG_LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

// Colores para consola
const COLORS = {
  reset: "\x1b[0m",
  debug: "\x1b[36m", // Cyan
  info: "\x1b[32m", // Verde
  warn: "\x1b[33m", // Amarillo
  error: "\x1b[31m", // Rojo
};

// Clase Logger
class Logger {
  constructor() {
    // No hay inicialización de sistema de archivos en entorno serverless
  }

  // Método principal de log
  private log(level: LogLevel, message: string, ...args: any[]): void {
    // Solo registrar si el nivel es igual o mayor al configurado
    if (LOG_LEVEL_PRIORITY[level] >= LOG_LEVEL_PRIORITY[LOG_LEVEL]) {
      const timestamp = new Date().toISOString();
      const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;

      // Formatear objetos para log
      const formattedArgs = args.map((arg) =>
        typeof arg === "object" ? JSON.stringify(arg, null, 2) : arg,
      );

      // En Vercel, todos los logs van a stdout/stderr y son capturados automáticamente
      if (level === "error") {
        console.error(
          `${COLORS[level]}${logMessage}${COLORS.reset}`,
          ...formattedArgs,
        );
      } else {
        console.log(
          `${COLORS[level]}${logMessage}${COLORS.reset}`,
          ...formattedArgs,
        );
      }
    }
  }

  // Métodos públicos para cada nivel de log
  debug(message: string, ...args: any[]): void {
    this.log("debug", message, ...args);
  }

  info(message: string, ...args: any[]): void {
    this.log("info", message, ...args);
  }

  warn(message: string, ...args: any[]): void {
    this.log("warn", message, ...args);
  }

  error(message: string, ...args: any[]): void {
    this.log("error", message, ...args);
  }
}

// Exportar una única instancia
export const logger = new Logger();
