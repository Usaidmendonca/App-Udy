# A Udy com você

Uma aplicação de nutrição pessoal desenvolvida com React, TypeScript e Tailwind CSS.

## 🚀 Tecnologias

- **Vite** - Build tool
- **React** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Lucide React** - Ícones
- **Google Gemini API** - Análise de imagens e IA

## 📦 Instalação

```bash
npm install
```

## 🏃 Executar

```bash
npm run dev
```

## 🎨 Paleta de Cores

- **Sage Green** - Verde sábio suave
- **Warm Orange** - Laranja quente
- **White** - Branco

## 📱 Funcionalidades

- 💬 Chat com Udy com análise de imagens (Gemini API)
- 📷 Upload de fotos de comida para análise nutricional
- 🎯 Metas de água e humor
- 👨‍🍳 Receitas saudáveis
- 👤 Perfil do usuário

## 🔑 Configuração da API Gemini

Para usar a análise de imagens, você precisa configurar a chave da API Gemini:

1. Obtenha sua chave em: https://makersuite.google.com/app/apikey
2. Crie um arquivo `.env` na raiz do projeto
3. Adicione a seguinte linha:
   ```
   VITE_GEMINI_API_KEY=sua_chave_aqui
   ```
4. Reinicie o servidor de desenvolvimento

**Nota:** Se a chave não estiver configurada, o app usará respostas mockadas como fallback.

## 📸 Funcionalidade de Computer Vision

O app permite que os usuários:
- Enviem fotos de comida através do botão de câmera
- Vejam um preview da imagem antes de enviar
- Recebam análise nutricional detalhada da Udy
- Combinem texto e imagem nas mensagens
