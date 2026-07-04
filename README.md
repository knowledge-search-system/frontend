# Frontend

React 18 + TypeScript + Vite клиент для поисковой системы по внутренней базе
знаний университета. Работает поверх `gateway` (см. `../gateway`).

## Стек

- React 19 + TypeScript, Vite
- @tanstack/react-query — загрузка данных, поллинг статуса индексации, бесконечный скролл
- axios — HTTP-клиент
- react-router-dom — страницы «Документы» и «Поиск»
- react-dropzone — drag-and-drop загрузка
- Tailwind CSS v4 (через `@tailwindcss/vite`)

## Локальная разработка

Требуется Node.js >= 20.19 (см. `.nvmrc`).

```bash
npm install
npm run dev
```

Dev-сервер Vite проксирует `/api/*` на gateway (по умолчанию
`http://localhost:8082`, см. `vite.config.ts` и `VITE_GATEWAY_PROXY_TARGET` в
`.env`, скопируйте `.env.example` → `.env` при необходимости изменить адрес).
Запустите `gateway` отдельно (см. `../gateway/README` при наличии), чтобы
загрузка и поиск реально работали.

## Проверки перед коммитом

```bash
npm run lint
npm run build
```

## Docker

```bash
docker build -t frontend .
docker run --rm -p 8080:80 -e GATEWAY_UPSTREAM=host.docker.internal:8082 frontend
```

Контейнер — multi-stage: сборка статики через Node, отдача через Nginx.
Nginx проксирует `/api/` на адрес из `GATEWAY_UPSTREAM` (по умолчанию
`gateway:8082` — имя сервиса в `docker-compose.yml`), поэтому браузеру не
нужен CORS: и статика, и API отдаются с одного origin.

## Структура

```
src/
├── components/   # переиспользуемые UI-блоки (upload/, search/, layout/)
├── pages/        # DocumentsPage, SearchPage
├── services/     # HTTP-запросы к gateway (api.ts, documents.ts, search.ts)
├── hooks/        # react-query хуки (список документов, поллинг статуса, поиск)
├── types/        # TS-зеркало схем gateway (schemas.py)
└── utils/        # highlight.tsx (подсветка совпадений), status.ts (стадии документа)
```
