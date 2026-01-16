import React, { useState } from 'react';
import { Target, Quote, Sparkles, RefreshCw } from 'lucide-react';
import { callGeminiAPI } from '../utils/geminiApi'; // Verifique se o nome do arquivo é geminiApi ou geminiApis

interface MetasProps {
  userProfile: {
    nome: string;
    objetivo: string;
    preferencias: string;
  };
}

const Metas: React.FC<MetasProps> = ({ userProfile }) => {
  const [fraseMotivacional, setFraseMotivacional] = useState('Clique para um incentivo! ✨');
  const [carregando, setCarregando] = useState(false);

  const gerarFrase = async () => {
    setCarregando(true);
    try {
      const contexto = `Nome: ${userProfile?.nome || 'Amigo'}. Objetivo: ${userProfile?.objetivo || 'Saúde'}.`;
      const resposta = await callGeminiAPI("Me dê uma frase curta de motivação nutricional.", contexto);
      setFraseMotivacional(resposta);
    } catch (error) {
      setFraseMotivacional("Você é capaz de coisas incríveis hoje! 💪");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-blue-50 p-6 overflow-y-auto">
      <header className="mb-6">
        <div className="flex items-center gap-2">
          <Target className="text-blue-600" size={28} />
          <h1 className="text-xl font-bold text-gray-800">Metas</h1>
        </div>
      </header>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100 text-center relative mb-6">
        <Quote className="text-blue-50 absolute top-2 left-2 w-12 h-12" />
        <p className="relative z-10 text-gray-700 italic mb-4">"{fraseMotivacional}"</p>
        <button 
          onClick={gerarFrase}
          disabled={carregando}
          className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm flex items-center gap-2 mx-auto disabled:opacity-50"
        >
          {carregando ? <RefreshCw className="animate-spin" size={16} /> : <Sparkles size={16} />}
          Nova Frase
        </button>
      </div>

      <div className="space-y-3">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Diário</h2>
        <div className="bg-white p-4 rounded-xl flex items-center gap-3 shadow-sm">
          <span className="text-xl">💧</span>
          <span className="flex-1 text-sm font-medium">Beber água</span>
          <input type="checkbox" className="w-5 h-5 rounded-full border-gray-300" />
        </div>
        <div className="bg-white p-4 rounded-xl flex items-center gap-3 shadow-sm">
          <span className="text-xl">🥗</span>
          <span className="flex-1 text-sm font-medium">Comer salada</span>
          <input type="checkbox" className="w-5 h-5 rounded-full border-gray-300" />
        </div>
      </div>
    </div>
  );
};

export default Metas;