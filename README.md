# Kanban Board - PWA (Quasar + Vue 3 + TypeScript)

Este projeto é um Kanban Board funcional desenvolvido como parte de um teste técnico. A aplicação foca em organização, tipagem forte e capacidades PWA (Progressive Web App).

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

## 📦 Como rodar o projeto
1. Instale as dependências: `npm install`
2. Inicie em modo de desenvolvimento: `npx quasar dev`
3. Para testar o modo PWA: `npx quasar dev -m pwa`