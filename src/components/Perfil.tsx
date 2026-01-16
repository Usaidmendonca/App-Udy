import React, { useState } from 'react';
import { User, Target, ClipboardList, Save } from 'lucide-react';

interface PerfilProps {
  userProfile: {
    nome: string;
    objetivo: string;
    preferencias: string;
  };
  onSave: (newProfile: any) => void;
}

const Perfil: React.FC<PerfilProps> = ({ userProfile, onSave }) => {
  const [localProfile, setLocalProfile] = useState(userProfile);

  const handleLocalSave = () => {
    onSave(localProfile);
    // Um feedback visual de sucesso
    alert("Udy: 'Dados guardados no meu caderninho! Agora já te conheço melhor. ✨'");
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 p-6 overflow-y-auto">
      <header className="mb-8 text-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-200">
          <User size={48} className="text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Meu Perfil Health</h1>
        <p className="text-gray-500">Ajuste como a Udy deve cuidar de você</p>
      </header>

      <div className="space-y-6">
        {/* Campo Nome */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <User size={18} className="text-green-500" /> Como quer ser chamado?
          </label>
          <input
            type="text"
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={localProfile.nome}
            onChange={(e) => setLocalProfile({ ...localProfile, nome: e.target.value })}
            placeholder="Ex: Usaid"
          />
        </div>

        {/* Campo Objetivo */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <Target size={18} className="text-green-500" /> Qual seu foco principal?
          </label>
          <input
            type="text"
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={localProfile.objetivo}
            onChange={(e) => setLocalProfile({ ...localProfile, objetivo: e.target.value })}
            placeholder="Ex: Emagrecer, ganhar massa, mais energia..."
          />
        </div>

        {/* Campo Preferências/Restrições */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <ClipboardList size={18} className="text-green-500" /> Preferências ou Alergias
          </label>
          <textarea
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 h-24"
            value={localProfile.preferencias}
            onChange={(e) => setLocalProfile({ ...localProfile, preferencias: e.target.value })}
            placeholder="Ex: Não gosto de coentro, sou vegetariano, evito glúten..."
          />
        </div>

        {/* Botão Salvar */}
        <button
          onClick={handleLocalSave}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
        >
          <Save size={20} />
          Salvar Minhas Informações
        </button>
      </div>
      
      <div className="mt-8 text-center text-xs text-gray-400">
        As informações ficam salvas apenas no seu navegador.
      </div>
    </div>
  );
};

export default Perfil;