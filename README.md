# 🧠 Guía para Asistente de Desarrollo (IA)

## 📌 Contexto del Proyecto
**TBlackbox** es una agencia creativa que desarrolla soluciones digitales combinando branding, producción audiovisual y desarrollo de software. Este proyecto es una plataforma que integra diseño personalizado, backend robusto y frontend interactivo.

## 🧱 Stack Tecnológico
- **Frontend:** Vue 3
- **Backend:** Node.js con Express
- **Base de Datos:** MongoDB
- **Control de versiones:** Git + GitHub
- **Gestión de tareas:** Jira
- **Colaboración IA:** Gemini (Google) + ChatGPT (OpenAI)

## 🧩 Convenciones de Código
- Lenguaje principal: JavaScript (ES2022+)
- Sintaxis: Preferencia por `const` y `let`
- Convención de nombres: `camelCase`
- Componentes Vue: **PascalCase** (`MyComponent.vue`)
- Archivos SCSS: `kebab-case.scss`
- Carpetas por dominio funcional, no por tipo

## 📂 Estructura esperada
```bash
tblackbox/
├── frontend/       # Vue 3
│   ├── components/
│   ├── pages/
│   ├── layouts/
│   ├── styles/
│   └── main.js
├── backend/        # Node.js + Express
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── server.js
├── database/       # Esquemas Mongo
├── docs/           # Documentación del proyecto
│   └── AI_GUIDE.md
