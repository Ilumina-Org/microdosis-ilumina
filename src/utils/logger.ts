// utils/logger.ts
type LogLevel = "debug" | "info" | "warn" | "error";

// Configuración desde variables de entorno
const LOG_LEVEL: LogLevel = (import.meta.env.LOG_LEVEL as LogLevel) || "info";
const LOG_TO_EXTERNAL = import.meta.env.LOG_TO_EXTERNAL === "true";
const LOG_SERVICE_URL = import.meta.env.LOG_SERVICE_URL || "";

// Mapa de prioridad de niveles de log
const LOG_LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

// Colores ANSI para consola
const COLORS = {
  reset: "\x1b[0m",
  debug: "\x1b[36m", // Cyan
  info: "\x1b[32m", // Verde
  warn: "\x1b[33m", // Amarillo
  error: "\x1b[31m", // Rojo
};

// Formateador de objetos para strings
const formatObject = (obj: unknown): string => {
  return typeof obj === "object" ? JSON.stringify(obj, null, 2) : String(obj);
};

class Logger {
  // Método principal de log
  private log(level: LogLevel, message: string, ...args: any[]): void {
    if (LOG_LEVEL_PRIORITY[level] >= LOG_LEVEL_PRIORITY[LOG_LEVEL]) {
      const timestamp = new Date().toISOString();
      const formattedMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
      const formattedArgs = args.map(formatObject).join(" ");

      // Log a consola
      console.log(
        `${COLORS[level]}${formattedMessage}${COLORS.reset}`,
        formattedArgs,
      );

      // Envío a servicio externo (opcional)
      if (LOG_TO_EXTERNAL && LOG_SERVICE_URL) {
        this.sendToLogService(level, formattedMessage, formattedArgs);
      }
    }
  }

  // Método para enviar logs a servicio externo
  private async sendToLogService(
    level: LogLevel,
    message: string,
    args: string,
  ): Promise<void> {
    try {
      await fetch(LOG_SERVICE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          level,
          message,
          args,
          timestamp: new Date().toISOString(),
          environment: import.meta.env.ENVIRONMENT || "development",
        }),
      });
    } catch (error) {
      console.error("Error enviando log a servicio externo:", error);
    }
  }

  // Métodos públicos
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

// Exportar instancia única
export const logger = new Logger();
