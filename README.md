# Kanban Board - PWA (Quasar + Vue 3 + TypeScript)

## 🚀 Tecnologias Utilizadas
- **Framework:** [Quasar Framework v2](https://quasar.dev/) (Vue 3)
- **Linguagem:** TypeScript (Strict Mode)
- **Build Tool:** Vite
- **PWA:** Configurado para suporte offline e instalação (Manifest & Service Worker)
- **Componentização:** SFC (Single File Components) com Script Setup

## 🛠️ O que foi implementado até agora:
- **Estrutura Base:** Configuração de ambiente com suporte a PWA e TypeScript.
- **Modelagem de Dados:** Criação de interfaces robustas para Tarefas (`Task`), Colunas (`Column`) e Prioridades (`Priority`).
- **Componente de Card (`TaskCard`):** Exibição de informações da tarefa com badges de prioridade coloridos (Verde/Amarelo/Vermelho) conforme os requisitos.
- **Componente de Coluna (`KanbanColumn`):** Componente reutilizável para renderização das colunas fixas: *To Do*, *In Progress* e *Done*.
- **Layout Responsivo:** Implementação de grid sistema do Quasar para adaptação automática entre Mobile e Desktop.
- **Lógica de Estado Inicial:** Orquestração das colunas e tarefas através da `IndexPage` utilizando Composition API.

- **Interatividade Drag-and-Drop:** Integração da biblioteca `vuedraggable` para permitir a movimentação de tarefas entre as colunas "To Do", "In Progress" e "Done".
- **Feedback Visual de UX:** Implementação de `ghost-class` para indicar a área de drop e feedback visual durante o arraste dos cards.
- **Sincronização de Estado:** Gerenciamento reativo da ordem e posicionamento das tarefas entre diferentes colunas utilizando Composition API.

- **Persistência Offline-First:** Implementação de armazenamento local via `localStorage`, garantindo que os dados do Kanban sejam preservados mesmo após o fechamento do navegador ou recarregamento da página.
- **Sincronização Automática:** Utilização de `watch` com profundidade (`deep: true`) para detectar e salvar qualquer alteração nas tarefas ou movimentação entre colunas em tempo real.
- **Ciclo de Vida:** Gerenciamento de estado inicial via `onMounted` para recuperação de dados persistidos no boot da aplicação.

- **Fluxo de Cadastro Multi-Etapa:** Implementação de um sistema de criação de tarefas segmentado (Título -> Descrição -> Prioridade) para otimizar a experiência do usuário em dispositivos móveis.
- **Validação e Tipagem:** Uso de validações obrigatórias para o título da tarefa e tratamento estrito de tipos para evitar erros de compilação com `vue-tsc`.
- **Entrada de Dados Flexível:** Suporte para descrições detalhadas utilizando campos de `textarea` dentro de modais dinâmicas do Quasar.

### 📝 Gestão de Tarefas (CRUD)
- **Edição Completa**: Implementação de um fluxo reativo que permite a alteração de títulos, descrições detalhadas e níveis de prioridade diretamente nos cards.
- **Interface Fluida**: Utilização de `QDialog` e `BottomSheet` para criar um ambiente de edição focado (modal), ideal para aplicações PWA e utilização móvel.
- **Arquitetura de Eventos**: Comunicação eficiente entre componentes (Card -> Coluna -> Página) através de `emits`, mantendo o estado da aplicação centralizado e previsível.
- **Feedback em Tempo Real**: Uso do plugin `QNotify` para confirmar atualizações e garantir que o utilizador saiba que as alterações foram guardadas.

- **Persistência Reativa**: Integração entre o estado reativo do Vue 3 (`ref` com `deep watch`) e o `localStorage`, garantindo que qualquer edição seja guardada instantaneamente no dispositivo do utilizador (Offline-first).

### 📦 Gerenciamento de Estado (State Management)
Nesta etapa, o projeto passou por uma refatoração arquitetural para utilizar o **Pinia**, elevando a escalabilidade da aplicação:

* **Store Centralizada:** Toda a lógica de manipulação de dados (Criação, Leitura, Atualização e Exclusão) foi movida para a `KanbanStore`, deixando os componentes focados apenas na interface.
* **Single Source of Truth:** O estado das colunas e tarefas é gerenciado de forma global, garantindo consistência de dados em toda a aplicação.
* **Persistência Reativa Sincronizada:** Utilização de *actions* e *watchers* profundos para garantir que qualquer alteração no estado (incluindo o Drag-and-Drop) seja refletida instantaneamente no `localStorage`.
* **Código Limpo e Tipado:** Total integração com TypeScript, garantindo que as interfaces de `Task` e `Column` sejam respeitadas em todas as operações de estado.

## 📸 Demonstração

### Tela Principal (Board)
![Home Screen](kanban-test/src/screenshots/principal.png)

### Cadastro de Tarefas (PWA)
![Nova Tarefa Titulo](kanban-test/src/screenshots/nova-tarefa-titulo.png)
![Nova Tarefa Descrição](kanban-test/src/screenshots/nova-tarefa-descricao.png)
![Nova Tarefa Prioridade](kanban-test/src/screenshots/nova-tarefa-prioridade.png)


## 📦 Como rodar o projeto
1. Instale as dependências: `npm install`
2. Inicie em modo de desenvolvimento: `npx quasar dev`
3. Para testar o modo PWA: `npx quasar dev -m pwa`

## 📱 Como Instalar no Celular (PWA)

Como este projeto é um **Progressive Web App**, você pode instalá-lo e utilizá-lo com experiência de aplicativo nativo, sem precisar da App Store ou Play Store.

### No Android (Chrome):
1.  Acesse o link do projeto pelo navegador **Chrome**.
2.  Clique no ícone de **três pontos** no canto superior direito.
3.  Selecione a opção **"Instalar aplicativo"** ou **"Adicionar à tela de início"**.
4.  O ícone do **MeuKanban** aparecerá na sua grade de aplicativos.

### No iOS (Safari):
1.  Acesse o link do projeto pelo navegador **Safari**.
2.  Clique no ícone de **Compartilhar** (quadrado com uma seta para cima).
3.  Role as opções e clique em **"Adicionar à Tela de Início"**.
4.  Confirme clicando em **"Adicionar"** no canto superior direito.

