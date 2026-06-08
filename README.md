# Cosmos Explorer

Aplicativo mobile desenvolvido com **React Native** e **Expo** que permite explorar o universo diretamente do seu bolso, consumindo dados em tempo real das APIs públicas da NASA.

---

## Proposta e Escopo

O Cosmos Explorer foi criado para aproximar o público geral — especialmente estudantes e entusiastas de astronomia — do vasto acervo de imagens e dados científicos que a NASA disponibiliza gratuitamente.

O aplicativo resolve um problema de acesso: as APIs da NASA são ricas em conteúdo, mas técnicas e pouco acessíveis para quem não é desenvolvedor. O Cosmos Explorer apresenta esses dados de forma visual, intuitiva e em português, organizados em três eixos temáticos:

- **Foto Astronômica do Dia (APOD):** a imagem ou vídeo mais impressionante do cosmos selecionada diariamente pela NASA, com explicação científica.
- **Terra vista do Espaço (EPIC):** imagens do disco completo da Terra capturadas pelo satélite DSCOVR, mostrando nosso planeta de 1,5 milhão de km de distância.
- **Asteroides Próximos (NEO):** rastreamento de objetos que se aproximam da órbita terrestre, com dados de tamanho, velocidade e classificação de risco.

**Público-alvo:** estudantes do ensino médio e superior, professores de ciências e qualquer pessoa curiosa sobre astronomia e exploração espacial.

---

## Funcionalidades Principais

- Visualização diária da **Foto Astronômica do Dia** com imagem em alta resolução e explicação completa
- **Grade de imagens da Terra** (EPIC) com data e coordenadas de captura
- **Lista de asteroides próximos** com indicador visual de risco para objetos potencialmente perigosos
- **Tela de detalhes** para cada item, com todas as informações disponíveis na API
- **Sistema de Favoritos** global: salve itens de qualquer aba e acesse todos em um só lugar
- Remoção de favoritos diretamente da aba Favoritos
- Tratamento de **estados de carregamento** (loading) e **erros de rede** com opção de tentar novamente
- Datas exibidas no **formato brasileiro** (dd/mm/aaaa)
- Tema visual **dark space** inspirado no cosmos

---

## API Utilizada

**NASA Open APIs**
- Documentação oficial: https://api.nasa.gov
- Endpoints consumidos:
  - `GET /planetary/apod` — Astronomy Picture of the Day
  - `GET /EPIC/api/natural` — Earth Polychromatic Imaging Camera
  - `GET /neo/rest/v1/feed` — Near Earth Objects Feed

A chave de API padrão (`DEMO_KEY`) é suficiente para testes. Para uso intensivo, cadastre uma chave gratuita em https://api.nasa.gov.

---

## Instruções de Execução

### Pré-requisitos

- [Node.js](https://nodejs.org) v18 ou superior
- [Expo Go](https://expo.dev/go) instalado no celular (iOS ou Android), **ou** um emulador Android/iOS configurado

### Passo a passo

**1. Clone o repositório**
```bash
git clone https://github.com/bibiritriz/Cosmos-Explorer.git
cd Cosmos-Explorer
```

**2. Instale as dependências**
```bash
npm install
```

**3. Configure a chave da API**

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
```
EXPO_PUBLIC_NASA_API_KEY=DEMO_KEY
```
> Opcionalmente, substitua `DEMO_KEY` por uma chave gratuita obtida em https://api.nasa.gov para evitar limites de requisições.

**4. Inicie o servidor de desenvolvimento**
```bash
npm run start
```

**5. Abra no dispositivo**

- **Celular físico:** escaneie o QR Code exibido no terminal com o aplicativo Expo Go
- **Emulador Android:** pressione `a` no terminal
- **Simulador iOS (macOS):** pressione `i` no terminal
