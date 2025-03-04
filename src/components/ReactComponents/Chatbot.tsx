import React, { useState, useEffect } from 'react';
import './Chatbot.css';

interface Question {
  id: number;
  text: string;
  options: string[];
  type?: string;
}

interface EnfermedadData {
  ajuste: number;
  horas: number;
}

const ChatBot: React.FC = () => {
  // Constantes
  const questions: Question[] = [
    {
      id: 1,
      text: "Bienvenido a nuestro asistente de evaluación. ¿Deseas saber cual es tu dosis correcta de ayahuasca para sanar?",
      options: ["Sí, continuar", "Más información", "No, gracias"]
    },
    {
      id: 2,
      text: "¿Cuántos años tienes?",
      options: ["De 17 a 34 años", "De 35 a 54 años", "De 55 a 74 años", "De 75 a más"]
    },
    {
      id: 3,
      text: "¿Cuál es tu peso actual?",
      options: ["De 40 a 54 kg", "De 55 a 64 kg", "De 65 a 84 kg", "De 85 kg a más"]
    },
    {
      id: 4,
      text: "¿Tienes algún diagnóstico?",
      options: ["Sí", "No"]
    },
    {
      id: 5,
      text: "¿Qué diagnóstico tienes?",
      options: [
        "Ansiedad", "Depresión", "Diabetes", "Migraña", "Presión Alta",
        "Presión Baja", "Insomnio", "Gastritis", "Hipertiroidismo",
        "Hipotiroidismo", "Cáncer", "Artritis", "Artrosis", "Parkinson",
        "Alzheimer", "Asma", "Próstata", "Dermatitis", "Hepatitis",
        "Colon Irritable", "ETS", "Esquizofrenia", "Paranoia", "Demencia"
      ]
    },
    {
      id: 6,
      text: "¿Toma algún medicamento?",
      options: ["Sí", "No"]
    },
    {
      id: 7,
      text: "¿En qué momento del día tomas tus medicamentos?",
      type: "multiselect",
      options: ["Mañana", "Tarde", "Noche"]
    },
    {
      id: 8,
      text: "¿Qué estás buscando con la microdosis?",
      options: [
        "Despertar espiritual y meditación",
        "Mejorar la concentración y creatividad",
        "Mejorar calidad de sueño",
        "Más energía y productividad"
      ]
    }
  ];

  const resultInfo: Record<string, string> = {
    "Más información":
      "Este cuestionario evalúa la aptitud para el uso de la microdosis de ayahuasca. Es importante responder con honestidad para recibir recomendaciones apropiadas. Los resultados son orientativos y no reemplazan la consulta profesional.",

    "No, gracias":
      "Entendemos. Si en otro momento deseas realizar la evaluación, estaremos aquí para ayudarte."
  };

  // Valores de gotas por edad
  const edadGotas: Record<string, number> = {
    "De 17 a 34 años": 6,
    "De 35 a 54 años": 7,
    "De 55 a 74 años": 5,
    "De 75 a más": 4
  };

  // Valores de gotas por peso
  const pesoGotas: Record<string, number> = {
    "De 40 a 54 kg": 5,
    "De 55 a 64 kg": 7,
    "De 65 a 84 kg": 8,
    "De 85 kg a más": 7
  };

  // Valores de ajuste por enfermedad con horas de espera
  const enfermedadData: Record<string, EnfermedadData> = {
    "Ansiedad": { ajuste: 1, horas: 1 },
    "Depresión": { ajuste: 1, horas: 1 },
    "Diabetes": { ajuste: 2, horas: 2 },
    "Migraña": { ajuste: 1, horas: 1 },
    "Presión Alta": { ajuste: 2, horas: 2 },
    "Presión Baja": { ajuste: 2, horas: 2 },
    "Insomnio": { ajuste: 1, horas: 1 },
    "Gastritis": { ajuste: 3, horas: 2 },
    "Hipertiroidismo": { ajuste: 3, horas: 2 },
    "Hipotiroidismo": { ajuste: 3, horas: 2 },
    "Cáncer": { ajuste: 3, horas: 3 },
    "Artritis": { ajuste: 3, horas: 2 },
    "Artrosis": { ajuste: 3, horas: 2 },
    "Parkinson": { ajuste: 4, horas: 1 },
    "Alzheimer": { ajuste: 4, horas: 1 },
    "Asma": { ajuste: 2, horas: 1 },
    "Próstata": { ajuste: 2, horas: 1 },
    "Dermatitis": { ajuste: 2, horas: 1 },
    "Hepatitis": { ajuste: 3, horas: 1 },
    "Colon Irritable": { ajuste: 3, horas: 1 },
    "ETS": { ajuste: 4, horas: 3 },
    "Esquizofrenia": { ajuste: -1, horas: 2 },
    "Paranoia": { ajuste: -1, horas: 2 },
    "Demencia": { ajuste: -2, horas: 2 }
  };

  // Estados
  const [chatVisible, setChatVisible] = useState<boolean>(true);
  const [step, setStep] = useState<number>(0);
  const [respuestas, setRespuestas] = useState<string[]>([]);
  const [gotasCalculadas, setGotasCalculadas] = useState<number>(0);
  const [tieneEnfermedad, setTieneEnfermedad] = useState<boolean>(false);
  const [tomaMedicamentos, setTomaMedicamentos] = useState<boolean>(false);
  const [momentoMedicacion, setMomentoMedicacion] = useState<string[]>([]);
  const [diagnosticoSeleccionado, setDiagnosticoSeleccionado] = useState<string>("");
  const [horasEspera, setHorasEspera] = useState<number>(1);
  const [showThinking, setShowThinking] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [resultado, setResultado] = useState<string>("");
  const [showQuestionSection, setShowQuestionSection] = useState<boolean>(true);

  // Manejadores de eventos
  const toggleChat = () => {
    setChatVisible(!chatVisible);
  };

  const closeChat = () => {
    setChatVisible(false);
  };

  const restartChat = () => {
    setStep(0);
    setRespuestas([]);
    setGotasCalculadas(0);
    setTieneEnfermedad(false);
    setTomaMedicamentos(false);
    setMomentoMedicacion([]);
    setDiagnosticoSeleccionado("");
    setHorasEspera(1);
    setShowResult(false);
    setShowQuestionSection(true);
  };

  const handleMultiSelect = () => {
    setStep(step + 1);
  };

  const handleOptionToggle = (option: string) => {
    setMomentoMedicacion(prev => {
      if (prev.includes(option)) {
        return prev.filter(item => item !== option);
      } else {
        return [...prev, option];
      }
    });
  };

  const nextQuestion = (answer: string) => {
    const newResponses = [...respuestas, answer];
    setRespuestas(newResponses);

    if (step === 0 && (answer === "Más información" || answer === "No, gracias")) {
      showSpecialResult(answer);
      return;
    }

    // Lógica para calcular gotas
    if (step === 1) { // Respuesta de edad
      setGotasCalculadas(prev => prev + (edadGotas[answer] || 0));
    }
    else if (step === 2) { // Respuesta de peso
      setGotasCalculadas(prev => {
        const nuevasGotas = prev + (pesoGotas[answer] || 0);
        return Math.round(nuevasGotas / 2);
      });
    }
    else if (step === 3) { // ¿Tiene diagnóstico?
      const tieneDiagnostico = answer === "Sí";
      setTieneEnfermedad(tieneDiagnostico);
    }
    else if (step === 4 && tieneEnfermedad) { // Tipo de diagnóstico
      setDiagnosticoSeleccionado(answer);
      const data = enfermedadData[answer] || { ajuste: 0, horas: 1 };
      setGotasCalculadas(prev => prev + data.ajuste);
      setHorasEspera(data.horas);
    }
    else if (step === 5 && tieneEnfermedad) { // ¿Toma medicamentos?
      const tomaMeds = answer === "Sí";
      setTomaMedicamentos(tomaMeds);
    }

    let nextStep = step + 1;

    // Lógica para saltar preguntas según respuestas
    if (!tieneEnfermedad && nextStep === 4) {
      nextStep = 7; // Saltar a la última pregunta
    }
    else if (!tomaMedicamentos && tieneEnfermedad && nextStep === 6) {
      nextStep = 7; // Saltar a la última pregunta
    }

    setStep(nextStep);

    if (nextStep >= questions.length) {
      startThinking();
    }
  };

  const showSpecialResult = (answer: string) => {
    setShowQuestionSection(false);
    setShowResult(true);
    setResultado(resultInfo[answer]);
  };

  const startThinking = () => {
    setShowQuestionSection(false);
    setShowThinking(true);

    setTimeout(() => {
      generateResult();
    }, 1500);
  };

  const generateResult = () => {
    setShowThinking(false);
    setShowResult(true);

    let gotas = gotasCalculadas;
    // Asegurar que la dosis no sea negativa
    if (gotas < 0) {
      gotas = 0;
    }

    let instrucciones = "";

    if (gotas === 0) {
      instrucciones = "Basado en tus respuestas, no recomendamos el uso de microdosis de ayahuasca en este momento. Por favor consulta con un profesional de la salud.";
    } else {
      // Instrucciones básicas
      let instruccionesBasicas = `💊 Tu dosis recomendada es de ${gotas} gotas, dos veces al día.\n\n`;

      // Instrucciones para la mañana
      let instruccionesMañana = `💊 Por la mañana: Apenas te despiertas y en ayunas, antes de lavarte los dientes y antes de tomar agua, se echan ${gotas} gotas bajo la lengua; dejan que pase un minuto bajo la lengua y luego pasan lo que resta; luego de media hora ya te puedes lavar los dientes y tomar agua, luego de media hora más ya puedes tomar tu desayuno`;

      if (tomaMedicamentos && momentoMedicacion.includes("Mañana")) {
        instruccionesMañana += ` y después de una hora de la microdosis ya puedes tomar tus medicamentos.\n`;
      } else {
        instruccionesMañana += `.\n`;
      }

      // Instrucciones para la noche
      let instruccionesNoche = `\n💊 Por la noche: Tener en cuenta que tu última comida debe ser máximo a las 8 pm (luego de esa hora el estómago ya no hace digestión). `;

      if (tomaMedicamentos && momentoMedicacion.includes("Noche")) {
        instruccionesNoche += `Toma tus medicamentos inmediatamente después de la cena y después de hora y media tomas las ${gotas} gotas de microdosis de ayahuasca.\n`;
      } else {
        instruccionesNoche += `Después de hora y media de haber cenado, tomas las ${gotas} gotas de microdosis de ayahuasca.\n`;
      }

      // Añadir nota específica sobre medicamentos si seleccionó ambos momentos
      let notaMedicamentos = "";
      if (tomaMedicamentos && momentoMedicacion.includes("Mañana") && momentoMedicacion.includes("Noche")) {
        notaMedicamentos = `\n⚠️ IMPORTANTE: Recuerda que el orden es diferente: en la mañana primero tomas la microdosis y DESPUÉS los medicamentos (1 hora después), mientras que en la noche primero tomas los medicamentos y DESPUÉS la microdosis (1.5 horas después).\n`;
      }

      // Instrucciones de calendario
      let instruccionesCalendario = `\n💊 Se toma dos días sí y uno no; por ejemplo, empiezas martes y miércoles y descansas de la medicina el jueves, vuelves a tomar viernes y sábado y descansas domingo.\n`;

      // Restricciones y cuidados
      let restricciones = `\n⚠️ Si tomas alcohol no tomar ayahuasca. Se deja ese día la medicina y se empieza al siguiente día como día uno.\n`;

      // Instrucciones específicas para el diagnóstico
      let instruccionesDiagnostico = "";
      if (tieneEnfermedad && diagnosticoSeleccionado) {
        instruccionesDiagnostico = `\n💊 Nota para tu diagnóstico de ${diagnosticoSeleccionado}: Se ha ajustado tu dosis considerando esta condición. Recuerda mantener un seguimiento de cómo te sientes durante el tratamiento.\n`;
      }

      // Instrucciones de conservación y dieta
      let conservacion = `\n🌿 Mantener la microdosis en un lugar fresco. El frasco abierto tiene vencimiento en 6 meses.\n`;

      let dieta = `\n🌿 Durante la toma de las microdosis hay que tener coherencia en la alimentación, evitar en lo máximo la carne de res y chancho, no café, no gaseosas, no comida chatarra, comidas bajas en azúcar y harinas.\n`;

      instrucciones = instruccionesBasicas + instruccionesMañana + instruccionesNoche + notaMedicamentos + instruccionesCalendario + restricciones + instruccionesDiagnostico + conservacion + dieta;
    }

    setResultado(instrucciones);
  };

  return (
    <div className="chat-wrapper">
      <button onClick={toggleChat} className="chat-toggle">
        <svg className="robot-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="10" rx="2" />
          <circle cx="12" cy="5" r="2" />
          <path d="M12 7v4" />
          <line x1="8" y1="16" x2="8" y2="16" />
          <line x1="16" y1="16" x2="16" y2="16" />
        </svg>
      </button>


      <div className="chat-container">
        <div className="chat-box">
          <button onClick={closeChat} className="close-button">×</button>

          {showQuestionSection && (
            <>
              <div className="chat-message bot">
                <p>{questions[step].text}</p>
              </div>
              <div className="options">
                {questions[step].type === "multiselect" ? (
                  <>
                    <div className="multi-select">
                      {questions[step].options.map((option, index) => (
                        <div
                          key={index}
                          className={`checkbox-option ${momentoMedicacion.includes(option) ? 'selected' : ''}`}
                          onClick={() => handleOptionToggle(option)}
                          data-value={option}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                    <button
                      className="continue-button"
                      onClick={handleMultiSelect}
                    >
                      Continuar
                    </button>
                  </>
                ) : (
                  questions[step].options.map((option, index) => (
                    <button
                      key={index}
                      className="button"
                      onClick={() => nextQuestion(option)}
                    >
                      {option}
                    </button>
                  ))
                )}
              </div>
            </>
          )}

          {showThinking && (
            <div className="thinking">
              <div className="loading-spinner"></div>
              <p>Analizando tus respuestas...</p>
            </div>
          )}

          {showResult && (
            <div className="result-container">
              <p className="result">{resultado}</p>
              <button onClick={restartChat} className="restart-button">
                Realizar otra consulta
              </button>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default ChatBot;
