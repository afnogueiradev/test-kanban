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



## 📦 Como rodar o projeto
1. Instale as dependências: `npm install`
2. Inicie em modo de desenvolvimento: `npx quasar dev`
3. Para testar o modo PWA: `npx quasar dev -m pwa`