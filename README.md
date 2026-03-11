# Fluid AI — Task Manager

A full-stack task management system built with **FastAPI** and **Next.js**.  
Manage your tasks with a clean, minimal interface — create, update, filter, and delete tasks with real-time persistence.

**Live Demo**
- Frontend → [fluid-ai-yqba.vercel.app/tasks](https://fluid-ai-yqba.vercel.app/tasks)
- API Docs → [fluid-ai-smoky.vercel.app/docs](https://fluid-ai-smoky.vercel.app/docs)

---

## Monorepo Structure

```
Fluid-AI/
├── backend/        # FastAPI REST API
└── frontend/       # Next.js web application
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | FastAPI, Python 3.13, Pydantic, Uvicorn |
| Frontend | Next.js 14, TypeScript, Tailwind CSS |
| Storage | JSON file (v1) |
| Deployment | Vercel |
| Package Manager | uv (backend), npm (frontend) |

---

## Versioning

| Tag | Description |
|---|---|
| `v1.0` | CRUD with local JSON file storage |
| `v2.0` | Firebase + Google Auth *(future upgrade planing)* |

---

## Getting Started

```bash
git clone https://github.com/pandey-rakshit/Fluid-AI
cd Fluid-AI
```

See [`backend/README.md`](./backend/README.md) and [`frontend/README.md`](./frontend/README.md) for individual setup instructions.

---

## Author

**Rakshit Pandey**
[github.com/pandey-rakshit](https://github.com/pandey-rakshit) · [linkedin.com/in/pandey-rakshit](https://linkedin.com/in/pandey-rakshit)