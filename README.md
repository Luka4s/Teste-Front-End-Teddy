# 📌 Teste técnico Front End

Este projeto é uma aplicação **React** que permite gerenciar clientes, selecioná-los e navegar entre telas de forma simples e intuitiva.

---

## Link do vídeo do Youtube

`https://youtu.be/oVqkAoCLd24`

## 🚀 Como iniciar o projeto

1. **Clone este repositório**

   ```bash
   git clone https://github.com/Luka4s/Teste-Front-End-Teddy.git
   ```

2. **Acesse a pasta do projeto**

   ```bash
   cd seu-repo
   ```

3. **Instale as dependências**  
   Se estiver usando npm:

   ```bash
   npm install
   ```

   Ou com pnpm:

   ```bash
   pnpm install
   ```

4. **Inicie o servidor de desenvolvimento**

   ```bash
   npm run dev
   ```

5. **Abra no navegador**  
   Normalmente em: [http://localhost:5173](http://localhost:5173)

---

## 🖥️ Telas da Aplicação

### 1️⃣ Tela Welcome

- Composta por um **título de boas-vindas** ("Olá, seja bem-vindo").
- Um **campo de input** onde o usuário insere o **nome**.
- Esse nome será exibido nas demais telas.

---

### 2️⃣ Tela de Clientes

- **Header fixo** no topo com:
  - Rotas de navegação: **Clientes** e **Clientes Selecionados**.
  - Botão **Sair**.
  - Saudação do tipo: _Olá, {nomeDoUsuário}_.
- **Sidebar lateral**:
  - Logo da empresa.
  - Ícone de menu para abrir/fechar a sidebar.
  - Links de navegação da aplicação.
- **Listagem de Clientes**:
  - Todos os clientes retornados pela API.
  - Cada **card de cliente** contém:
    - Botão para **adicionar cliente** à lista de selecionados.
    - Botão para **editar cliente**.
    - Botão para **excluir cliente**.
  - Além da informações de cadastro, sendo elas: Nome do cliente, Salário e valor da empresa

---

### 3️⃣ Tela de Clientes Selecionados

- Exibe a **listagem dos clientes** escolhidos na tela anterior.
- Cada card possui:
  - Botão para **remover individualmente** o cliente da lista.
- Abaixo da listagem:
  - Botão **"Limpar Todos"** → remove todos os clientes selecionados de uma só vez.

---

## 🧪 Testes

Os testes foram implementados para garantir a qualidade e o bom funcionamento dos componentes principais da aplicação.

### Componentes testados:

- **WelcomeForm** → Verifica se o formulário de boas-vindas renderiza corretamente e aceita o nome do usuário.
- **ClientForm** → Testa o formulário de clientes, garantindo que os campos e validações funcionem.
- **Sidebar** → Confirma se o menu lateral abre, fecha e exibe os links de navegação corretamente.
- **Header** → Verifica se o cabeçalho renderiza as rotas, saudação e botão de sair corretamente.
- **CardClient** → Testa se cada card de cliente renderiza as informações corretas e se os botões (adicionar, editar, excluir) funcionam.

Para executar os testes, utilize:

```bash
npm run test
```

ou

```bash
pnpm test
```

---

## 📂 Estrutura sugerida do projeto

```
.
├── src
│   ├── pages
│   │   ├── Welcome
│   │   ├── Clientes
│   │   └── ClientesSelecionados
│   ├── components
│   │   ├── Header
│   │   ├── Sidebar
│   │   ├── ClienteCard
│   │   └── ...
│   ├── context (para gerenciar estado global)
│   └── App.tsx
├── public
├── package.json
└── README.md
```

---

## 🔧 Tecnologias utilizadas

- **React + Vite**
- **TypeScript**
- **TailwindCSS** para estilização
- **Context API** para gerenciamento de estado
- **API REST** para obter dados dos clientes
- **Testing Library / Jest** para testes unitários
