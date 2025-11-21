import { GoogleGenAI, Type, Schema } from "@google/genai";
import { QuizData } from "../types";

// NOTE: In a real app, this key should come from a secure backend proxy.
// Since the user is expected to run this locally with an environment variable setup or key, 
// we access it via process.env.API_KEY.
const getAIClient = () => {
  if (!process.env.API_KEY) {
    throw new Error("API Key manquante. Veuillez configurer process.env.API_KEY");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

/**
 * Generates a stream of responses for a chat session acting as a Literature Tutor.
 */
export async function* streamTutorResponse(
  history: { role: string; parts: { text: string }[] }[],
  newMessage: string,
  courseContext: string
) {
  const ai = getAIClient();
  
  // System instruction to set the persona
  const systemInstruction = `
    Tu es un professeur expert en Lettres Modernes à l'université.
    Tu es pédagogue, précis, et encourageant.
    
    Le contexte du cours actuel est le suivant :
    ---
    ${courseContext}
    ---
    
    Réponds aux questions de l'étudiant en te basant sur ce cours. 
    Si la question sort du cours, utilise tes connaissances générales en littérature mais précise que ce n'est pas dans l'extrait ci-dessus.
    Sois concis mais complet. Utilise le formatage Markdown pour la clarté.
  `;

  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: systemInstruction,
      temperature: 0.7,
    },
    history: history, // Pass existing chat history
  });

  const responseStream = await chat.sendMessageStream({ message: newMessage });

  for await (const chunk of responseStream) {
    yield chunk.text;
  }
}

/**
 * Generates a structured JSON quiz based on the course content.
 */
export async function generateQuiz(courseContent: string): Promise<QuizData> {
  const ai = getAIClient();

  const prompt = `Génère un quiz de 3 questions (QCM) pour tester la compréhension de ce cours. 
  Le cours est : ${courseContent.substring(0, 3000)}`; // Truncate just in case, though usually fits context

  const responseSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING, description: "Titre du quiz" },
      questions: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "4 options possibles"
            },
            correctAnswerIndex: { type: Type.INTEGER, description: "Index de la bonne réponse (0-3)" },
            explanation: { type: Type.STRING, description: "Courte explication de la réponse" }
          },
          required: ["question", "options", "correctAnswerIndex", "explanation"],
          propertyOrdering: ["question", "options", "correctAnswerIndex", "explanation"]
        }
      }
    },
    required: ["title", "questions"],
    propertyOrdering: ["title", "questions"]
  };

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: responseSchema,
      temperature: 0.5,
    }
  });

  const text = response.text;
  if (!text) {
    throw new Error("Pas de réponse de l'IA");
  }

  return JSON.parse(text) as QuizData;
}