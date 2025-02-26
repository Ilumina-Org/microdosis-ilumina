import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import "./shipping-section.css";

interface ShippingProps {
  paymentId: string;
  merchantOrderId: string;
}

const shippingSchema = z.object({
  name: z
    .string()
    .nonempty("Este campo es obligatorio")
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" })
    .max(100),
  email: z.string().email({ message: "Email inválido" }).max(100),
  phone: z
    .string()
    .min(7, { message: "Número de teléfono demasiado corto" })
    .max(20)
    .regex(/^[+]?[\d\s()-]{7,20}$/, {
      message: "Formato de teléfono inválido",
    }),
  address: z
    .string()
    .min(5, { message: "La dirección es demasiado corta" })
    .max(200),
  city: z.string().min(2, { message: "La ciudad es demasiado corta" }).max(100),
  state: z
    .string()
    .min(2, { message: "La provincia/estado es demasiado corta" })
    .max(100),
  zipCode: z.string().min(3, { message: "Código postal inválido" }).max(20),
  country: z.string().min(2, { message: "País inválido" }).max(100),
});

type ShippingFormData = z.infer<typeof shippingSchema>;

type FormStatus = "editing" | "submitting" | "success" | "error";

const ShippingSection: React.FC<ShippingProps> = ({
  paymentId,
  merchantOrderId,
}) => {
  const [formStatus, setFormStatus] = useState<FormStatus>("editing");
  const [errorMessage, setErrorMessage] = useState("");
  const STORAGE_KEY = `shipping_${paymentId}`;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
    mode: "onBlur",
  });

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "completed") {
      setFormStatus("success");
      return;
    }
    try {
      const savedData = localStorage.getItem(`${STORAGE_KEY}_data`);
      if (savedData) {
        const data = JSON.parse(savedData);
        if (data.shippingAddress) {
          reset(data.shippingAddress); // Cargar datos en el formulario
        }
      }
    } catch (e) {
      console.error("Error al recuperar datos guardados:", e);
    }
  }, [STORAGE_KEY, reset]);

  const onSubmit = async (formData: ShippingFormData) => {
    console.log("Submit ejecutado", formData);
    setFormStatus("submitting");

    const backupData = {
      timestamp: new Date().toISOString(),
      paymentId,
      merchantOrderId,
      shippingAddress: formData,
    };
    localStorage.setItem(`${STORAGE_KEY}_data`, JSON.stringify(backupData));

    try {
      const response = await fetch("/api/save-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentId,
          status: "completed",
          merchantOrderId,
          shippingAddress: formData,
        }),
      });

      const result = await response.json();
      if (result.success) {
        localStorage.setItem(STORAGE_KEY, "completed");
        setFormStatus("success");
      } else {
        setErrorMessage(result.error || "Error al guardar los datos");
        setFormStatus("error");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      setErrorMessage(
        "Error de conexión. Por favor, verifica tu conexión a internet e intenta nuevamente.",
      );
      setFormStatus("error");
    }
  };

  const handleEditInfo = () => {
    localStorage.removeItem(STORAGE_KEY);
    setFormStatus("editing");
  };

  const handleRetry = () => {
    setFormStatus("editing");
    setErrorMessage("");
  };

  return (
    <div className="shipping-section">
      <h2 className="shipping-title">Información de envío</h2>

      {formStatus === "submitting" && (
        <div className="shipping-loading">
          <div className="shipping-spinner"></div>
          <p className="shipping-message">Procesando información...</p>
        </div>
      )}

      {formStatus === "editing" && (
        <form onSubmit={handleSubmit(onSubmit)} className="shipping-form">
          <div className="form-group">
            <label htmlFor="name">Nombre completo *</label>
            <input
              id="name"
              className={errors.name ? "input-error" : ""}
              {...register("name")}
            />
            {errors.name && (
              <div className="error-message">{errors.name.message}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              type="email"
              className={errors.email ? "input-error" : ""}
              {...register("email")}
            />
            {errors.email && (
              <div className="error-message">{errors.email.message}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Teléfono *</label>
            <input
              id="phone"
              type="tel"
              className={errors.phone ? "input-error" : ""}
              {...register("phone")}
            />
            {errors.phone && (
              <div className="error-message">{errors.phone.message}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="address">Dirección *</label>
            <input
              id="address"
              className={errors.address ? "input-error" : ""}
              {...register("address")}
            />
            {errors.address && (
              <div className="error-message">{errors.address.message}</div>
            )}
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label htmlFor="city">Ciudad *</label>
              <input
                id="city"
                className={errors.city ? "input-error" : ""}
                {...register("city")}
              />
              {errors.city && (
                <div className="error-message">{errors.city.message}</div>
              )}
            </div>
            <div className="form-group half">
              <label htmlFor="state">Estado/Provincia *</label>
              <input
                id="state"
                className={errors.state ? "input-error" : ""}
                {...register("state")}
              />
              {errors.state && (
                <div className="error-message">{errors.state.message}</div>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label htmlFor="zipCode">Código Postal *</label>
              <input
                id="zipCode"
                className={errors.zipCode ? "input-error" : ""}
                {...register("zipCode")}
              />
              {errors.zipCode && (
                <div className="error-message">{errors.zipCode.message}</div>
              )}
            </div>
            <div className="form-group half">
              <label htmlFor="country">País *</label>
              <input
                id="country"
                className={errors.country ? "input-error" : ""}
                {...register("country")}
              />
              {errors.country && (
                <div className="error-message">{errors.country.message}</div>
              )}
            </div>
          </div>

          <div className="form-controls">
            <button type="submit" className="btn-primary">
              Confirmar dirección de envío
            </button>
          </div>

          <div className="form-disclaimer">
            Tus datos se utilizarán únicamente para el envío de tu pedido.
          </div>
        </form>
      )}

      {formStatus === "success" && (
        <div className="shipping-success">
          <div className="success-icon">✓</div>
          <h3>¡Datos registrados con éxito!</h3>
          <p>Hemos guardado tu información de envío correctamente.</p>
          <div className="payment-info">ID de Pago: {paymentId}</div>
          <button onClick={handleEditInfo} className="btn-secondary">
            Editar información
          </button>
        </div>
      )}

      {formStatus === "error" && (
        <div className="shipping-error">
          <div className="error-icon">!</div>
          <h3>Ha ocurrido un error</h3>
          <p>
            {errorMessage ||
              "No pudimos procesar tu información. Por favor intenta nuevamente."}
          </p>
          <button onClick={handleRetry} className="btn-secondary">
            Intentar nuevamente
          </button>
        </div>
      )}
    </div>
  );
};

export default ShippingSection;
