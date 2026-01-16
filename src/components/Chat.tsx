import { useState, useRef, useEffect } from 'react'
import { Send, Camera, X } from 'lucide-react'
import { callGeminiAPI } from '../utils/geminiApi'

// --- CONFIGURAÇÃO DA SUA FOTO DE PERFIL ---
// Certifique-se de que o arquivo minha-foto.jpg está na pasta public
const AVATAR_URL = '/minha-foto.png'; 

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
  imageUrl?: string
}

// Interface para receber os dados do Perfil
interface ChatProps {
  userProfile: {
    nome: string;
    objetivo: string;
    preferencias: string;
  };
}

const mockResponses = [
  'Que ótima escolha! 🌟',
  'Lembre de beber água! 💧',
  'Posso sugerir uma receita com isso? 👨‍🍳',
  'Excelente! Você está no caminho certo! 💪',
  'Que tal incluirmos mais vegetais na sua refeição? 🥗',
]

function Chat({ userProfile }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: userProfile.nome 
        ? `Olá, ${userProfile.nome}! Eu sou a Udy, sua nutricionista pessoal. Como posso te ajudar hoje? 😊`
        : 'Olá! Eu sou a Udy, sua nutricionista pessoal. Como posso te ajudar hoje? 😊',
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [selectedImage, setSelectedImage] = useState<{ file: File; preview: string } | null>(null)
  const [imageBase64, setImageBase64] = useState<string | null>(null)
  const [imageMimeType, setImageMimeType] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        const base64 = result.split(',')[1]
        resolve(base64)
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) return

    const preview = URL.createObjectURL(file)
    setSelectedImage({ file, preview })

    try {
      const base64 = await convertImageToBase64(file)
      setImageBase64(base64)
      setImageMimeType(file.type)
    } catch (error) {
      console.error('Erro ao converter imagem:', error)
      setSelectedImage(null)
    }
  }

  const handleRemoveImage = () => {
    if (selectedImage) URL.revokeObjectURL(selectedImage.preview)
    setSelectedImage(null)
    setImageBase64(null)
    setImageMimeType(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSend = async () => {
    if (!inputText.trim() && !selectedImage) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText || (selectedImage ? '📷 [Imagem enviada]' : ''),
      isUser: true,
      timestamp: new Date(),
      imageUrl: selectedImage?.preview,
    }

    setMessages((prev) => [...prev, userMessage])
    const messageText = inputText || 'Analise esta imagem de comida e me dê informações nutricionais.'
    
    const contextoParaUdy = `
      Usuário: ${userProfile.nome || 'Amigo'}. 
      Objetivo: ${userProfile.objetivo || 'Saúde geral'}. 
      Preferências: ${userProfile.preferencias || 'Nenhuma'}.
    `

    setInputText('')
    setIsTyping(true)
    handleRemoveImage()

    try {
      const response = await callGeminiAPI(messageText, contextoParaUdy)
      
      setIsTyping(false)
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      setIsTyping(false)
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)]
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `Poxa, tive um probleminha técnico, mas vamos continuar! ${randomResponse}`,
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* HEADER COM AVATAR */}
      <header className="bg-green-600 text-white px-6 py-6 shadow-md flex items-center gap-4">
        <div className="relative">
          <img 
            src={AVATAR_URL} 
            alt="Udy" 
            className="w-14 h-14 rounded-full border-2 border-white shadow-lg object-cover bg-white"
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Udy&background=fff&color=16a34a' }}
          />
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-green-600 rounded-full"></div>
        </div>
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">🌸 A Udy com você</h1>
          <p className="text-xs text-green-100 italic">Sua nutricionista pessoal e amiga</p>
        </div>
      </header>

      {/* CHAT COM AVATARES NAS MENSAGENS */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} items-end gap-2`}
          >
            {/* Foto da Udy ao lado da resposta dela */}
            {!message.isUser && (
              <img 
                src={AVATAR_URL} 
                alt="Udy Avatar" 
                className="w-8 h-8 rounded-full border border-green-200 mb-1 object-cover bg-white"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Udy' }}
              />
            )}

            <div className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
                message.isUser ? 'bg-green-500 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none'
              }`}>
              {message.imageUrl && (
                <div className="mb-2 rounded-lg overflow-hidden">
                  <img src={message.imageUrl} alt="Upload" className="max-w-full h-auto max-h-64 object-cover" />
                </div>
              )}
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start items-center gap-2">
            <img src={AVATAR_URL} className="w-8 h-8 rounded-full opacity-50 object-cover" alt="typing" />
            <div className="bg-white rounded-2xl rounded-bl-none shadow-sm px-4 py-2">
              <span className="text-xs text-gray-400 animate-pulse font-medium">Udy está pensando... ✨</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* ÁREA DE INPUT */}
      <div className="bg-white border-t border-gray-100 p-4">
        {selectedImage && (
          <div className="mb-3 relative inline-block">
            <img src={selectedImage.preview} alt="Preview" className="w-20 h-20 object-cover rounded-xl border-2 border-green-500" />
            <button onClick={handleRemoveImage} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md">
              <X size={14} />
            </button>
          </div>
        )}
        <div className="flex items-center gap-2">
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
          <button onClick={() => fileInputRef.current?.click()} className="p-2 text-gray-400 hover:text-green-600 transition-colors">
            <Camera size={24} />
          </button>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Conversar com a Udy..."
            className="flex-1 bg-gray-100 border-none rounded-2xl px-4 py-2 focus:ring-2 focus:ring-green-500 resize-none text-sm max-h-32"
            rows={1}
          />
          <button onClick={handleSend} disabled={!inputText.trim() && !selectedImage} className="bg-green-600 text-white p-3 rounded-full hover:bg-green-700 disabled:opacity-50 shadow-md transition-all active:scale-90">
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chat