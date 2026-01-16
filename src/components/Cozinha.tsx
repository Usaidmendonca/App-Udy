import React, { useState } from 'react';
import { ChefHat, ShoppingBasket, Sparkles, Utensils } from 'lucide-react';
import { callGeminiAPI } from '../utils/geminiApi';

interface CozinhaProps {
  userProfile: {
    nome: string;
    objetivo: string;
    preferencias: string;
  };
}

const Cozinha: React.FC<CozinhaProps> = ({ userProfile }) => {
  const [ingredientes, setIngredientes] = useState('');
  const [receita, setReceita] = useState('');
  const [carregando, setCarregando] = useState(false);

  const gerarReceita = async () => {
    if (!ingredientes.trim()) return;

    setCarregando(true);
    setReceita('');

    const promptCozinha = `Aja como a Udy. O usuário tem os seguintes ingredientes: ${ingredientes}. 
    Considerando que o objetivo dele é ${userProfile.objetivo} e ele prefere ${userProfile.preferencias}, 
    sugira 2 opções de refeições rápidas e saudáveis. 
    Seja prática, amiga e organize em tópicos: Nome, Ingredientes extras e Preparo rápido.`;

    try {
      const resultado = await callGeminiAPI(promptCozinha);
      setReceita(resultado);
    } catch (error) {
      setReceita("Ops! Meu fogão deu defeito. Pode tentar de novo? 🍳");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-orange-50 p-6 overflow-y-auto pb-24">
      <header className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <ChefHat size={32} className="text-orange-600" />
          <h1 className="text-2xl font-bold text-gray-800">Cozinha da Udy</h1>
        </div>
        <p className="text-gray-600 italic">"O que vamos criar com o que você tem hoje?"</p>
      </header>

      <div className="bg-white p-5 rounded-2xl shadow-sm border border-orange-100 mb-6">
        <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
          <ShoppingBasket size={18} className="text-orange-500" /> O que tem na geladeira/despensa?
        </label>
        <textarea
          className="w-full p-4 bg-orange-50/50 border border-orange-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none resize-none h-28 text-sm"
          placeholder="Ex: 2 ovos, um resto de frango, espinafre e pão de forma..."
          value={ingredientes}
          onChange={(e) => setIngredientes(e.target.value)}
        />
        <button
          onClick={gerarReceita}
          disabled={carregando || !ingredientes}
          className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
        >
          {carregando ? <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" /> : <Sparkles size={18} />}
          {carregando ? 'Udy está criando...' : 'Sugerir Refeição'}
        </button>
      </div>

      {receita && (
        <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-orange-500 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center gap-2 mb-4 text-orange-600 font-bold">
            <Utensils size={18} />
            <span>Sugestões da Udy:</span>
          </div>
          <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
            {receita}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cozinha;
