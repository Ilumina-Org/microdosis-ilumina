import React from "react";
import styles from "./NotFound.module.css";

const NotFoundPage = () => {
  return (
    <div className={styles.notFoundContainer}>
      <h1 className={styles.title}>😢 Paquete no encontrado</h1>
      <p className={styles.description}>
        El paquete que estás buscando no existe o ha sido eliminado
      </p>
      <a href="/pricing" className={styles.homeLink}>
        Volver al catálogo
      </a>
    </div>
  );
};

export default NotFoundPage;
