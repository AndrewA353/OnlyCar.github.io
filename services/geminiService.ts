import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { NewsResult } from "../types";

const apiKey = process.env.API_KEY || '';

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey });

export const explainCarPart = async (partName: string): Promise<string> => {
  if (!apiKey) return "API Key отсутствует. Пожалуйста, настройте окружение.";
  
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Объясни простым, "пацанским" но технически грамотным языком, как работает ${partName} в автомобиле. Расскажи про основные неисправности. Используй форматирование markdown.`,
    });
    return response.text || "Не удалось получить ответ от ИИ.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Ошибка соединения с сервисом ИИ.";
  }
};

export const getCarReview = async (carName: string): Promise<string> => {
  if (!apiKey) return "API Key отсутствует.";

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Сделай краткий, дерзкий обзор на машину ${carName}. Выдели главные плюсы (валит/не валит) и минусы (расход, ремонт).`,
    });
    return response.text || "Информации нет.";
  } catch (error) {
    console.error(error);
    return "Ошибка загрузки обзора.";
  }
};

export const generatePDDScenario = async (): Promise<string> => {
  if (!apiKey) return "API Key отсутствует.";

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Придумай сложную ситуацию по ПДД (Правила Дорожного Движения РФ). Опиши ситуацию и задай вопрос "Кто должен уступить?" или "Можно ли здесь обогнать?". Не пиши ответ сразу. Просто ситуация.`,
    });
    return response.text || "Не удалось сгенерировать задачу.";
  } catch (error) {
    console.error(error);
    return "Ошибка генерации задачи.";
  }
};

export const checkPDDAnswer = async (scenario: string, answer: string): Promise<string> => {
  if (!apiKey) return "API Key отсутствует.";

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Ситуация: ${scenario}. Ответ пользователя: ${answer}. Правильно ли это согласно ПДД РФ? Объясни почему кратко и четко.`,
    });
    return response.text || "Ошибка проверки.";
  } catch (error) {
    console.error(error);
    return "Ошибка проверки ответа.";
  }
};

export const getCarCareAdvice = async (topic: string): Promise<string> => {
  if (!apiKey) return "API Key отсутствует.";

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Дай профессиональные, практичные советы по теме: "${topic}" для автомобиля. Напиши как для друга: четко, по делу, без воды. Если нужно что-то купить (химия, инструмент), посоветуй типы средств. Используй Markdown.`,
    });
    return response.text || "Нет советов.";
  } catch (error) {
    console.error(error);
    return "Ошибка получения совета.";
  }
};

export const getAutoNews = async (): Promise<NewsResult> => {
  if (!apiKey) return { content: "API Key отсутствует.", sources: [] };

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "Найди самые свежие и горячие новости автомира за последнюю неделю. Новые модели, анонсы, скандалы в автоиндустрии, изменения в законах (РФ). Сделай подборку из 3-5 главных новостей. Используй Markdown.",
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const content = response.text || "Новости не найдены.";
    
    // Extract sources from grounding metadata
    // @ts-ignore
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = chunks
      .map((c: any) => c.web)
      .filter((w: any) => w)
      .map((w: any) => ({ title: w.title, uri: w.uri }));

    return { content, sources };
  } catch (error) {
    console.error("News Error:", error);
    return { content: "Не удалось загрузить новости. Попробуйте позже.", sources: [] };
  }
};