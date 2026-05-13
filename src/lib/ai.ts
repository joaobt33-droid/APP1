import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateWorkout(params: {
  objective: string;
  level: string;
  limitations: string;
  availability: number;
  equipment: string;
}) {
  const prompt = `Crie um plano de treino semanal (periodização simplificada) para um aluno com os seguintes dados:
  Objetivo: ${params.objective}
  Nível: ${params.level}
  Limitações: ${params.limitations}
  Disponibilidade: ${params.availability} dias por semana
  Equipamentos: ${params.equipment}
  
  Retorne um JSON estruturado com uma lista de treinos (A, B, etc) contendo exercícios com séries, repetições, descanso e observações técnicas em Português do Brasil.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          planTitle: { type: Type.STRING },
          workouts: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                exercises: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      sets: { type: Type.NUMBER },
                      reps: { type: Type.STRING },
                      rest: { type: Type.STRING },
                      notes: { type: Type.STRING }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });

  return JSON.parse(response.text || "{}");
}
