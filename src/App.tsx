import { useState, useEffect } from 'react'
import { MessageCircle, Target, ChefHat, User } from 'lucide-react'
import Chat from './components/Chat'
import Metas from './components/Metas'
import Cozinha from './components/Cozinha'
import Perfil from './components/Perfil'

type Tab = 'chat' | 'metas' | 'cozinha' | 'perfil'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('chat')
  
  // Estado do Perfil (Memória da Udy)
  const [userProfile, setUserProfile] = useState({
    nome: '',
    objetivo: '',
    preferencias: ''
  })

  // Carregar dados ao abrir o app
  useEffect(() => {
    const savedProfile = localStorage.getItem('@UdyApp:profile')
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile))
    }
  }, [])

  // Função para salvar o perfil
  const handleSaveProfile = (newProfile: typeof userProfile) => {
    setUserProfile(newProfile)
    localStorage.setItem('@UdyApp:profile', JSON.stringify(newProfile))
  }

  const tabs = [
    { id: 'chat' as Tab, label: 'Conversa', icon: MessageCircle },
    { id: 'metas' as Tab, label: 'Metas', icon: Target },
    { id: 'cozinha' as Tab, label: 'Cozinha', icon: ChefHat },
    { id: 'perfil' as Tab, label: 'Perfil', icon: User },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        // Passamos o perfil para o Chat saber com quem está falando
        return <Chat userProfile={userProfile} />
      case 'metas':
        return <Metas />
      case 'cozinha':
        // Passamos o perfil para a Cozinha sugerir receitas personalizadas
        return <Cozinha userProfile={userProfile} />
      case 'perfil':
        // Passamos os dados e a função de salvar para a aba Perfil
        return <Perfil userProfile={userProfile} onSave={handleSaveProfile} />
      default:
        return <Chat userProfile={userProfile} />
    }
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Conteúdo Principal */}
      <main className="flex-1 overflow-hidden">
        {renderContent()}
      </main>

      {/* Navegação Inferior */}
      <nav className="bg-white border-t border-gray-200 shadow-lg">
        <div className="flex justify-around items-center h-16">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  isActive ? 'text-green-600' : 'text-gray-400'
                }`}
              >
                <Icon size={24} />
                <span className={`text-xs mt-1 ${isActive ? 'font-semibold' : 'font-normal'}`}>
                  {tab.label}
                </span>
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}

export default App
