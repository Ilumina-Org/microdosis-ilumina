// utils/logger.ts
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Niveles de log
type LogLevel = "debug" | "info" | "warn" | "error";

// Configuración del logger
const LOG_LEVEL: LogLevel = (process.env.LOG_LEVEL as LogLevel) || "info";
const LOG_TO_FILE = process.env.LOG_TO_FILE === "true";
const LOG_DIR = process.env.LOG_DIR || "../logs";

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
  private logDirectory: string;

  constructor() {
    // Configurar directorio de logs
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    this.logDirectory = path.resolve(__dirname, LOG_DIR);

    // Crear directorio de logs si no existe y LOG_TO_FILE está activado
    if (LOG_TO_FILE && !fs.existsSync(this.logDirectory)) {
      fs.mkdirSync(this.logDirectory, { recursive: true });
    }
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

      // Log a consola con colores
      console.log(
        `${COLORS[level]}${logMessage}${COLORS.reset}`,
        ...formattedArgs,
      );

      // Log a archivo si está activado
      if (LOG_TO_FILE) {
        const logFile = path.join(this.logDirectory, `${level}.log`);
        const logEntry = `${logMessage} ${formattedArgs.join(" ")}\n`;

        fs.appendFile(logFile, logEntry, (err) => {
          if (err) console.error("Error escribiendo al archivo de log:", err);
        });

        // Para errores, guardar también en un log general
        if (level === "error") {
          const allLogsFile = path.join(this.logDirectory, "all.log");
          fs.appendFile(allLogsFile, logEntry, () => {});
        }
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
