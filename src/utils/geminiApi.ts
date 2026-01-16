// Pega a chave do arquivo .env (Segurança para o GitHub/Vercel)
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export async function callGeminiAPI(userText: string, context?: string): Promise<string> {
  const apiUrl = `https://api.groq.com/openai/v1/chat/completions`;

  // Definindo a personalidade da Udy de forma organizada
  const systemPrompt = `Você é a Udy, uma nutricionista que se comporta como uma amiga próxima. 
Seu tom de voz é carinhoso, empático e encorajador.

REGRAS DE OURO:
1. Se o usuário disser "Oi", "Olá" ou algo genérico, responda de forma ampla: "Olá! Eu sou a Udy, sua nutricionista pessoal. Como posso te ajudar hoje?" (ou variações carinhosas similares).
2. Não force o assunto de "geladeira" logo de cara. Deixe o usuário ditar o ritmo.
3. Seja um apoio psicológico: se o usuário estiver cansado ou desanimado, acolha primeiro, nutra depois.
4. Use emojis que transmitam amizade (🌸, ✨, 😊, 🍎).

Contexto do Usuário: ${context || "Novo amigo"}.`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userText }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Erro na API:", data);
      return `Erro na Udy: ${data.error?.message || "Probleminha técnico"}`;
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error("Erro de conexão:", error);
    return "Ops! Tive um erro de conexão. Pode tentar falar comigo de novo? 🌸";
  }
}